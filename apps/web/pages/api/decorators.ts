import { measureExecutionTime } from 'apps/web/src/utils/metrics';
import { NextApiRequest, NextApiResponse } from 'next';

// Assuming `measureExecutionTime` and `metricLogger` are already defined as previously discussed

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
