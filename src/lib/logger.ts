export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  service: string;
  userId?: string;
  requestId?: string;
  metadata?: Record<string, any>;
}

class Logger {
  private service: string;

  constructor(service: string = 'monchee') {
    this.service = service;
  }

  private formatLog(level: LogLevel, message: string, metadata?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      service: this.service,
      ...metadata
    };
  }

  private writeLog(entry: LogEntry): void {
    const logString = JSON.stringify(entry);
    
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(logString);
        break;
      case LogLevel.WARN:
        console.warn(logString);
        break;
      case LogLevel.INFO:
        console.info(logString);
        break;
      case LogLevel.DEBUG:
        console.debug(logString);
        break;
    }
  }

  error(message: string, metadata?: Record<string, any>): void {
    const entry = this.formatLog(LogLevel.ERROR, message, metadata);
    this.writeLog(entry);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    const entry = this.formatLog(LogLevel.WARN, message, metadata);
    this.writeLog(entry);
  }

  info(message: string, metadata?: Record<string, any>): void {
    const entry = this.formatLog(LogLevel.INFO, message, metadata);
    this.writeLog(entry);
  }

  debug(message: string, metadata?: Record<string, any>): void {
    const entry = this.formatLog(LogLevel.DEBUG, message, metadata);
    this.writeLog(entry);
  }

  // API-specific logging methods
  apiRequest(method: string, path: string, userId?: string, metadata?: Record<string, any>): void {
    this.info(`API Request: ${method} ${path}`, {
      method,
      path,
      userId,
      ...metadata
    });
  }

  apiResponse(method: string, path: string, statusCode: number, duration: number, userId?: string): void {
    const level = statusCode >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    const entry = this.formatLog(level, `API Response: ${method} ${path}`, {
      method,
      path,
      statusCode,
      duration,
      userId
    });
    this.writeLog(entry);
  }

  databaseQuery(operation: string, table: string, duration: number, metadata?: Record<string, any>): void {
    this.debug(`Database Query: ${operation} on ${table}`, {
      operation,
      table,
      duration,
      ...metadata
    });
  }

  securityEvent(event: string, severity: 'low' | 'medium' | 'high', metadata?: Record<string, any>): void {
    const level = severity === 'high' ? LogLevel.ERROR : severity === 'medium' ? LogLevel.WARN : LogLevel.INFO;
    const entry = this.formatLog(level, `Security Event: ${event}`, {
      event,
      severity,
      ...metadata
    });
    this.writeLog(entry);
  }

  userAction(action: string, userId: string, metadata?: Record<string, any>): void {
    this.info(`User Action: ${action}`, {
      action,
      userId,
      ...metadata
    });
  }
}

// Create default logger instance
export const logger = new Logger();

// Create service-specific loggers
export const apiLogger = new Logger('api');
export const dbLogger = new Logger('database');
export const securityLogger = new Logger('security');
export const authLogger = new Logger('auth');
