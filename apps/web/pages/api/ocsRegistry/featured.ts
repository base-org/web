import { NextApiRequest, NextApiResponse } from 'next';
import { db, transformChallengeCard } from 'apps/web/src/utils/ocsRegistry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const content = await db
    .selectFrom('content')
    .where('is_featured', '=', true)
    .selectAll()
    .limit(1)
    .execute();

  const row = content[0];

  const response = {
    data: {
      id: row.id,
      category: row.category,
      content: transformChallengeCard(row.content),
    },
  };

  res.status(200).json(response);
}
