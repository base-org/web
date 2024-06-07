import { ColumnType, JSONColumnType } from 'kysely';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const content = await db.selectFrom('content').selectAll().execute();

  console.log(content);

  res.status(200).json({ message: 'Hello' });
}
