import { logger } from 'apps/web/src/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;

const defaultTimeout = process.env.DEFAULT_API_TIMEOUT ?? 5000;
export function withTimeout(
  handler: NextApiHandler,
  timeoutLimit = defaultTimeout,
): NextApiHandler {
  return async (req, res) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeoutLimit as number),
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
          logger.error('Request timed out', error, {
            endpoint_url: req.url,
            params: req.query,
          });
          return res.status(408).json({ error: 'Request timed out' });
        }
      }
      logger.error('Error in withTimeout', error, {
        endpoint_url: req.url,
        params: req.query,
      });
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
}
