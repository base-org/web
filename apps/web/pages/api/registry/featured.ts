import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'apps/web/src/utils/ocsRegistry';
import { kv } from '@vercel/kv';
import { logger } from 'apps/web/src/utils/logger';

const pageKey = 'api.ocs_registry.featured';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const content = await db
    .selectFrom('content')
    .where('is_featured', '=', true)
    .selectAll()
    .limit(1)
    .execute();

  const row = content[0];

  const response = {
    data: row,
  };

  try {
    await kv.incr(`stat:requests.${pageKey}`);
  } catch (error) {
    logger.error(error);
  }

  // Set caching headers
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.status(200).json(response);
}
