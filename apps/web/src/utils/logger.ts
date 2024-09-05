import { tracer } from 'dd-trace';
type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'verbose';

type LoggerOptions = {
  service: string;
};

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
    const activeSpan = tracer.scope().active();
    const traceId = activeSpan?.context().toTraceId() ?? '0';
    const spanId = activeSpan?.context().toSpanId() ?? '0';

    const logEntry = {
      message: `[${this.service}] ${message}`,
      level,
      dd: {
        trace_id: traceId,
        span_id: spanId,
      },
      data: meta,
      timestamp: new Date().toISOString(),
    };

    if (level === 'debug' || level === 'verbose' || level === 'info') {
      console.log(JSON.stringify(logEntry), meta);
    } else if (typeof console[level] === 'function') {
      console[level](logEntry, meta);
    } else {
      console.log(logEntry, meta);
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
    var e;
    if (error instanceof Error) {
      e = {
        name: error.name,
        cause: error.cause,
        message: error.message,
        stack: error.stack,
      };
    } else {
      e = {
        message: JSON.stringify(error),
      };
    }
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
