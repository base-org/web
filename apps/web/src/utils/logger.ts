// lib/logger.ts

import type { Tracer } from 'dd-trace';

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'verbose';

type LoggerOptions = {
  service: string;
};

let ddTrace: Tracer | undefined;

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
    let traceId: string | undefined;
    let spanId: string | undefined;

    //TODO: initialice ddTrace through dd-tracer
    if (ddTrace) {
      // Access trace information server-side
      const currentSpan = ddTrace.scope().active();
      traceId = currentSpan?.context().toTraceId() ?? undefined;
      spanId = currentSpan?.context().toSpanId() ?? undefined;
    }

    const logEntry = JSON.stringify({
      message: `[${this.service}] ${message}`,
      level,
      dd: {
        trace_id: traceId,
        span_id: spanId,
      },
      ...meta,
    });

    switch (level) {
      case 'debug':
      case 'verbose':
      case 'info':
        console.log(logEntry);
        break;
      case 'warn':
        console.warn(logEntry);
        break;
      case 'error':
        console.error(logEntry);
        break;
      default:
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
