import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'apps/web/src/utils/ocsRegistry';

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

  // Set caching headers
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
  res.status(200).json(response);
}
