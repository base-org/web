// lib/logger.ts

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
    const logEntry = {
      message: `[${this.service}] ${message}`,
      level,
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
