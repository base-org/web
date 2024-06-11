import { NextApiRequest, NextApiResponse } from 'next';
import { db, transformChallengeCard } from 'apps/web/src/utils/ocsRegistry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = '1', limit = '10' } = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const offset = (pageNum - 1) * limitNum;

  // Fetch total records count
  const totalRecords = await db
    .selectFrom('content')
    .select(db.fn.count('id').as('count'))
    .execute();
  const totalRecordsCount = parseInt(totalRecords[0].count as string, 10);

  // Fetch paginated content
  const content = await db
    .selectFrom('content')
    .selectAll()
    .limit(limitNum)
    .offset(offset)
    .execute();

  const response = {
    data: content.map((row) => ({
      id: row.id,
      category: row.category,
      content: transformChallengeCard(row.content),
    })),
    pagination: {
      total_records: totalRecordsCount,
      current_page: pageNum,
      total_pages: Math.ceil(totalRecordsCount / limitNum),
      limit: limitNum,
    },
  };

  res.status(200).json(response);
}
