import { createKysely } from '@vercel/postgres-kysely';

type DiscountCodesTable = {
  code: string;
  expires_at: Date;
  usage_limit: number;
  usage_count: number;
};

type Database = {
  'public.basenames_discount_codes': DiscountCodesTable;
};

export enum DiscountCodeTableNamespace {
  DiscountCodes = 'basenames_discount_codes',
}
const publicTableName = 'public.basenames_discount_codes';

export async function getDiscountCode(code: string) {
  let query = createKysely<Database>().selectFrom(publicTableName).where('code', 'ilike', code);
  return query.selectAll().limit(1).execute();
}

export async function incrementDiscountCodeUsage(code: string) {
  const db = createKysely<Database>();
  const tableName = publicTableName;

  // Perform the update and return the updated row in a single query
  const result = await db
    .updateTable(tableName)
    .set((eb) => ({
      usage_count: eb('usage_count', '+', 1),
    }))
    .where('code', 'ilike', code)
    .executeTakeFirst();

  return result;
}
