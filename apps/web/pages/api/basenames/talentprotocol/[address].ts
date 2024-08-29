import { logger } from 'apps/web/src/utils/logger';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const { address } = req.query;

  if (typeof address !== 'string') {
    res.status(400).json({ error: 'address is required' });
    return;
  }

  try {
    const response = await fetch(
      `https://api.talentprotocol.com/api/v2/passports/${encodeURIComponent(address || '')}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.TALENT_PROTOCOL_API_KEY,
        },
      },
    );
    const data = await response.json();

    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    logger.error('error getting talent protocol information', error);
  }

  return res.status(404).json({ error: 'address not found' });
}
