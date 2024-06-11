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
  created_at: ColumnType<Date, string | undefined, never>;
  is_featured: boolean;
  content: JSONColumnType<OcsChallengeCard>;
};

export const db = createKysely<Database>();

export function transformChallengeCard(card: OcsChallengeCard) {
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
