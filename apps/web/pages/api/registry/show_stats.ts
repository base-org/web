import { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const featuredRequests = await kv.get<number>(`stat:requests.api.ocs_registry.featured`);
  const entriesRequests = await kv.get<number>(`stat:requests.api.ocs_registry.entries`);

  // Set caching headers
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.status(200).json({
    featured: {
      requests: featuredRequests ?? 0,
    },
    entries: {
      requests: entriesRequests ?? 0,
    },
  });
}
