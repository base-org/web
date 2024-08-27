import { logger } from 'apps/web/src/utils/logger';
import { measureExecutionTime } from 'apps/web/src/utils/metrics';
import { NextApiRequest, NextApiResponse } from 'next';

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;

export const apiLatencyMetricsNamespace = 'baseorg.api.latency';
export function withExecutionTime(
  handler: NextApiHandler,
  metricName: string,
  tags: string[] = [],
): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await measureExecutionTime(metricName, async () => handler(req, res), tags);
  };
}

const defaultTimeout = 5000;
export function withTimeout(
  handler: NextApiHandler,
  timeoutLimit = defaultTimeout,
): NextApiHandler {
  return async (req, res) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeoutLimit),
    );

    const handlerPromise = new Promise<void>((resolve, reject) => {
      Promise.resolve(handler(req, res))
        .then(() => resolve())
        .catch((error) => reject(error));
    });

    try {
      await Promise.race([handlerPromise, timeoutPromise]);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Request timed out') {
          logger.error('Request timed out');
          return res.status(408).json({ error: 'Request timed out' });
        }
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
}
