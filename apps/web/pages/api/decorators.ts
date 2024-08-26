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
