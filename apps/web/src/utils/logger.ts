type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'verbose';

type LoggerOptions = {
  service: string;
  datadogApiKey: string;
};

class CustomLogger {
  private static instance: CustomLogger;

  private service: string;

  private datadogApiKey: string;

  private constructor(options: LoggerOptions) {
    this.service = options.service;
    this.datadogApiKey = options.datadogApiKey;
  }

  public static getInstance(options: LoggerOptions): CustomLogger {
    if (!CustomLogger.instance) {
      CustomLogger.instance = new CustomLogger(options);
    }
    return CustomLogger.instance;
  }

  private async sendToDatadog(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    const log = {
      level,
      message,
      service: this.service,
      ...meta,
    };

    try {
      await fetch(
        `https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=${this.datadogApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(log),
        },
      );
    } catch (error) {
      console.error('Failed to send log to Datadog', error);
    }
  }

  private log(level: LogLevel, message: unknown, meta?: Record<string, unknown>) {
    if (level === 'debug' || level === 'verbose' || level === 'info') {
      console.log(message, meta);
    } else if (typeof console[level] === 'function') {
      console[level](message, meta);
    } else {
      console.log(message, meta);
    }
    if (typeof window === 'undefined' && message !== undefined) {
      this.sendToDatadog(level, JSON.stringify(message), meta).catch(() => {
        console.error('Failed to send log to Datadog');
      });
    }
  }

  public info(message: unknown, meta?: Record<string, unknown>) {
    this.log('info', message, meta);
  }

  public warn(message: unknown, meta?: Record<string, unknown>) {
    this.log('warn', message, meta);
  }

  public error(message: unknown, meta?: Record<string, unknown>) {
    this.log('error', message, meta);
  }

  public debug(message: unknown, meta?: Record<string, unknown>) {
    this.log('debug', message, meta);
  }

  public verbose(message: unknown, meta?: Record<string, unknown>) {
    this.log('verbose', message, meta);
  }
}

// Usage example
export const logger = CustomLogger.getInstance({
  service: 'base-org',
  datadogApiKey: process.env.DD_API_KEY ?? '',
});
