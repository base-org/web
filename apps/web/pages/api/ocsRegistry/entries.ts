import { ColumnType, JSONColumnType } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';
import { NextApiRequest, NextApiResponse } from 'next';

type Database = {
  content: ContentTable;
};

type OcsChallengeCard = {
  title: string;
  short_description: string;
  full_description: string;
  image_url: string;
  target_url: string;
  cta_text: string;
  function_signature: string;
  contract_address: string;
  token_id: string;
  token_amount: string;
  creator_name: string;
  creator_image_url: string;
};

type ContentTable = {
  id: string;
  category: string;
  created_at: ColumnType<Date, string | undefined, never>;
  content: JSONColumnType<OcsChallengeCard>;
};

export const db = createKysely<Database>();

function transformChallengeCard(card: OcsChallengeCard) {
  return {
    title: card.title,
    shortDescription: card.short_description,
    fullDescription: card.full_description,
    imageUrl: card.image_url,
    targetUrl: card.target_url,
    ctaText: card.cta_text,
    functionSignature: card.function_signature,
    contractAddress: card.contract_address,
    tokenId: card.token_id,
    tokenAmount: card.token_amount,
    creatorName: card.creator_name,
    creatorImageUrl: card.creator_image_url,
  };
}

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
