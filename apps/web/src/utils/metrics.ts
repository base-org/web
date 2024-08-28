import { logger } from 'apps/web/src/utils/logger';

type Metric = {
  metric: string;
  points: [number];
  type: MetricTypeEnum;
  tags?: string[];
  interval?: number; // Required for type 'rate'
};

export enum MetricTypeEnum {
  unspecified,
  count,
  gauge,
  rate,
}

type MetricLoggerOptions = {
  datadogApiKey: string;
  service: string;
};

class CustomMetricLogger {
  private datadogApiKey: string;

  private service: string;

  constructor(options: MetricLoggerOptions) {
    this.datadogApiKey = options.datadogApiKey;
    this.service = options.service;
  }

  private async sendToDatadog(metrics: Metric[]) {
    const nowInSeconds = Math.round(Date.now() / 1000);
    const payload = {
      series: metrics.map((metric) => ({
        ...metric,
        points: metric.points.map((point) => ({ timestamp: nowInSeconds, value: point })),
        tags: metric.tags
          ? [...metric.tags, `service:${this.service}`]
          : [`service:${this.service}`],
      })),
    };

    try {
      await fetch(`https://api.datadoghq.com/api/v2/series`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'DD-API-KEY': this.datadogApiKey,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      logger.error('Failed to send metrics to Datadog', error);
    }
  }

  public sendMetric(metric: Metric) {
    this.sendToDatadog([metric]).catch((error) => {
      logger.error('Failed to send metrics to Datadog', error);
    });
  }

  public sendMetrics(metrics: Metric[]) {
    this.sendToDatadog(metrics).catch((error) => {
      logger.error('Failed to send metrics to Datadog', error);
    });
  }
}

export const metricLogger = new CustomMetricLogger({
  datadogApiKey: process.env.DD_API_KEY ?? '',
  service: 'base-org',
});

export async function measureExecutionTime<T>(
  metricName: string,
  fn: () => Promise<T>,
  tags: string[] = [],
): Promise<T> {
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();
  const durationMs = endTime - startTime;

  // Send the execution time as a metric
  metricLogger.sendMetric({
    metric: metricName,
    points: [durationMs],
    type: MetricTypeEnum.gauge,
    tags: tags,
  });
  return result;
}
