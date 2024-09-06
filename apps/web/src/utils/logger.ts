// lib/logger.ts
import type { Tracer } from 'dd-trace';

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'verbose';

type LoggerOptions = {
  service: string;
};

let ddTrace: Tracer | undefined;

if (typeof window === 'undefined') {
  require('os');
  require('path');
  require('fs');
  // Use dynamic import to avoid build-time errors
  import('dd-trace')
    .then((module) => {
      ddTrace = module.default || module; // Handle default or named export
      ddTrace.init({
        service: 'your-nextjs-service-name',
        env: process.env.NODE_ENV,
        version: '1.0.0',
        logInjection: true,
      });
    })
    .catch((err) => {
      console.error('Failed to initialize dd-trace', err);
    });
}

class CustomLogger {
  private static instance: CustomLogger;

  private service: string;

  private constructor(options: LoggerOptions) {
    this.service = options.service;
  }

  public static getInstance(options: LoggerOptions): CustomLogger {
    if (!CustomLogger.instance) {
      CustomLogger.instance = new CustomLogger(options);
    }
    return CustomLogger.instance;
  }

  private createDatadogLog(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    const activeSpan = ddTrace?.scope().active();
    const traceId = activeSpan?.context().toTraceId() ?? '0';
    const spanId = activeSpan?.context().toSpanId() ?? '0';

    const logEntry = {
      message: `[${this.service}] ${message}`,
      level,
      dd: {
        trace_id: traceId,
        span_id: spanId,
      },
      ...meta,
    };

    if (level === 'debug' || level === 'verbose' || level === 'info') {
      console.log(logEntry);
    } else if (typeof console[level] === 'function') {
      console[level](logEntry);
    } else {
      console.log(logEntry);
    }
  }

  private log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    this.createDatadogLog(level, message, meta);
  }

  public info(message: string, meta?: Record<string, unknown>) {
    this.log('info', message, meta);
  }

  public warn(message: string, meta?: Record<string, unknown>) {
    this.log('warn', message, meta);
  }

  public error(message: string, error: Error | unknown, meta?: Record<string, unknown>) {
    const e =
      error instanceof Error
        ? {
            name: error.name,
            cause: error.cause,
            message: error.message,
            stack: error.stack,
          }
        : {
            message: JSON.stringify(error),
          };

    if (error) {
      this.log('error', message, {
        ...meta,
        error: e,
      });
    }
    this.log('error', message, meta);
  }

  public debug(message: string, meta?: Record<string, unknown>) {
    this.log('debug', message, meta);
  }

  public verbose(message: string, meta?: Record<string, unknown>) {
    this.log('verbose', message, meta);
  }
}

// Usage example
export const logger = CustomLogger.getInstance({
  service: 'base-org',
});
