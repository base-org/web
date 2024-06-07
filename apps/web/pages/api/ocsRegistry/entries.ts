import { ColumnType, JSONColumnType } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';
import { NextApiRequest, NextApiResponse } from 'next';

interface Database {
  content: ContentTable;
}

interface OcsChallengeCard {
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
}

interface ContentTable {
  id: string;
  category: number;
  created_at: ColumnType<Date, string | undefined, never>;
  content: JSONColumnType<{
    OcsChallengeCard: OcsChallengeCard;
  }>;
}

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
  const content = await db.selectFrom('content').selectAll().execute();

  const response = content.map((row) => ({
    id: row.id,
    category: row.category,
    ...transformChallengeCard(row.content.OcsChallengeCard),
  }));

  res.status(200).json(response);
}
