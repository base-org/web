import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'apps/web/src/utils/ocsRegistry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = '1', limit = '10', category } = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const offset = (pageNum - 1) * limitNum;

  // Base query for filtering by category if provided
  let baseQuery = db.selectFrom('content');

  if (category) {
    baseQuery = baseQuery.where('category', '=', category as string);
  }

  // Fetch total records count
  const totalRecordsQuery = baseQuery.select(db.fn.count('id').as('count'));
  const totalRecords = await totalRecordsQuery.execute();
  const totalRecordsCount = parseInt(totalRecords[0].count as string, 10);

  // Fetch paginated content
  const contentQuery = baseQuery.selectAll().limit(limitNum).offset(offset);
  const content = await contentQuery.execute();

  const response = {
    data: content.map((row) => ({
      id: row.id,
      category: row.category,
      content: row.content,
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
