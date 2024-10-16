import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/pages/api/decorators';
import { incrementDiscountCodeUsage } from 'apps/web/src/utils/proofs/discount_code_storage';

/*
  this endpoint will increment the discount code usage to prevent abuse
*/

type DiscountCodeRequest = {
  code: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body as DiscountCodeRequest;

    if (!code || typeof code !== 'string') {
      return res.status(500).json({ error: 'Invalid request' });
    }

    await incrementDiscountCodeUsage(code);

    return res.status(200).json({ success: true });
  } catch (error: unknown) {
    logger.error('error incrementing the discount code', error);
  }
  // If error is not an instance of Error, return a generic error message
  return res.status(500).json({ error: 'An unexpected error occurred' });
}

export default withTimeout(handler);
