import { ColumnType, JSONColumnType } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';

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
  curation: string;
  created_at: ColumnType<Date, string | undefined, never>;
  is_featured: boolean;
  updated_at: ColumnType<Date, string | undefined, never>;
  content: JSONColumnType<OcsChallengeCard>;
};

export const db = createKysely<Database>();
