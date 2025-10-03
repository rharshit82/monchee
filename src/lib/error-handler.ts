import { NextResponse } from 'next/server';

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: any;
}

export class AppError extends Error {
  public statusCode: number;
  public code?: string;
  public details?: any;

  constructor(message: string, statusCode: number = 500, code?: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  // Handle known AppError instances
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }

  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any;
    
    switch (prismaError.code) {
      case 'P2002':
        return NextResponse.json(
          {
            success: false,
            error: 'A record with this information already exists',
            code: 'DUPLICATE_RECORD',
          },
          { status: 409 }
        );
      case 'P2025':
        return NextResponse.json(
          {
            success: false,
            error: 'Record not found',
            code: 'NOT_FOUND',
          },
          { status: 404 }
        );
      case 'P2003':
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid reference to related record',
            code: 'INVALID_REFERENCE',
          },
          { status: 400 }
        );
      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Database operation failed',
            code: 'DATABASE_ERROR',
          },
          { status: 500 }
        );
    }
  }

  // Handle validation errors
  if (error && typeof error === 'object' && 'issues' in error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: (error as any).issues,
      },
      { status: 400 }
    );
  }

  // Handle generic errors
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: 'INTERNAL_ERROR',
    },
    { status: 500 }
  );
}

export function validateRequired(data: any, fields: string[]): void {
  const missing = fields.filter(field => !data[field]);
  
  if (missing.length > 0) {
    throw new AppError(
      `Missing required fields: ${missing.join(', ')}`,
      400,
      'MISSING_FIELDS',
      { missing }
    );
  }
}

export function validateStringLength(value: string, min: number, max: number, fieldName: string): void {
  if (value.length < min) {
    throw new AppError(
      `${fieldName} must be at least ${min} characters long`,
      400,
      'INVALID_LENGTH',
      { field: fieldName, min, actual: value.length }
    );
  }
  
  if (value.length > max) {
    throw new AppError(
      `${fieldName} must be no more than ${max} characters long`,
      400,
      'INVALID_LENGTH',
      { field: fieldName, max, actual: value.length }
    );
  }
}

export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    throw new AppError(
      'Invalid email format',
      400,
      'INVALID_EMAIL',
      { email }
    );
  }
}

export function validateUsername(username: string): void {
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  
  if (!usernameRegex.test(username)) {
    throw new AppError(
      'Username can only contain letters, numbers, underscores, and hyphens',
      400,
      'INVALID_USERNAME',
      { username }
    );
  }
  
  validateStringLength(username, 3, 30, 'Username');
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}
