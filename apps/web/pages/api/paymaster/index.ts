import { UserOperation } from 'permissionless';
import { paymasterClient } from '../../../src/utils/paymasterConfig';
import { willSponsor } from '../../../src/utils/paymasterSponsor';
import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from 'apps/web/src/utils/logger';

type RequestBody = {
  params: [
    UserOperation<'v0.6'>, // userOp
    string, // endpoint
    number, // chainId
  ];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (!req.body?.params && !Array.isArray(req.body?.params)) {
    return res.status(400).json({ error: 'invalid body' });
  }
  const { params } = req.body as RequestBody;
  const [userOp, entrypoint, chainId] = params;
  try {
    const willSponsorDecision = await willSponsor({ chainId, entrypoint, userOp });
    if (!willSponsorDecision) {
      return res.json({ error: 'Not a sponsorable operation' });
    }

    if (method === 'pm_getPaymasterStubData') {
      // @ts-expect-error verified functional by @keshavSinghal
      const result = await paymasterClient.getPaymasterStubData({ userOperation: userOp });
      return res.json({ result });
    } else if (method === 'pm_getPaymasterData') {
      // @ts-expect-error verified functional by @keshavSinghal
      const result = await paymasterClient.getPaymasterData({ userOperation: userOp });
      return res.json({ result });
    }
  } catch (e) {
    logger.error('error validating paymaster', e);
    return res.status(500).json({ error: 'something went wrong validating ' });
  }
}
