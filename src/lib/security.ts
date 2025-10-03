import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface SecurityConfig {
  maxRequests?: number;
  windowMs?: number;
  skipSuccessfulRequests?: boolean;
}

export function rateLimit(config: SecurityConfig = {}) {
  const {
    maxRequests = 100,
    windowMs = 15 * 60 * 1000, // 15 minutes
    skipSuccessfulRequests = false
  } = config;

  return (request: NextRequest) => {
    const ip = getClientIP(request);
    const now = Date.now();
    const key = `${ip}:${request.nextUrl.pathname}`;
    
    const current = rateLimitStore.get(key);
    
    if (!current || now > current.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return null; // Allow request
    }
    
    if (current.count >= maxRequests) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter: Math.ceil((current.resetTime - now) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((current.resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(current.resetTime).toISOString()
          }
        }
      );
    }
    
    current.count++;
    return null; // Allow request
  };
}

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // CSP header
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
  );
  
  return response;
}

export function validateCSRF(request: NextRequest): boolean {
  // In a real app, implement proper CSRF token validation
  // For now, just check if it's a same-origin request
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  if (origin && !origin.includes(host || '')) {
    return false;
  }
  
  if (referer && !referer.includes(host || '')) {
    return false;
  }
  
  return true;
}

export function sanitizeHeaders(request: NextRequest): NextRequest {
  // Remove potentially dangerous headers
  const dangerousHeaders = [
    'x-forwarded-host',
    'x-forwarded-proto',
    'x-forwarded-port'
  ];
  
  dangerousHeaders.forEach(header => {
    if (request.headers.has(header)) {
      request.headers.delete(header);
    }
  });
  
  return request;
}

export function validateRequestSize(request: NextRequest, maxSize: number = 1024 * 1024): boolean {
  const contentLength = request.headers.get('content-length');
  
  if (contentLength && parseInt(contentLength) > maxSize) {
    return false;
  }
  
  return true;
}

export function logSecurityEvent(event: string, request: NextRequest, details?: any): void {
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const timestamp = new Date().toISOString();
  
  console.warn(`[SECURITY] ${event}`, {
    timestamp,
    ip,
    userAgent,
    path: request.nextUrl.pathname,
    method: request.method,
    details
  });
}

// Clean up rate limit store periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes
