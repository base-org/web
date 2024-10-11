import { createKysely } from '@vercel/postgres-kysely';
import { Address } from 'viem';

type Database = {
  proofs: ProofsTable;
};

export enum ProofTableNamespace {
  UsernamesEarlyAccess = 'usernames_early_access',
  BNSDiscount = 'basenames_bns_discount',
  BaseEthHolders = 'basenames_base_eth_holders_discount',
  CBIDDiscount = 'basenames_cbid_discount',
  DiscountCodes = 'basenames_discount_codes',
}

type ProofsTable = {
  address: Address;
  namespace: string;
  proofs: string;
};

// username_proofs

const proofTableName = 'proofs';

export async function getProofsByNamespaceAndAddress(
  address: Address,
  namespace: ProofTableNamespace,
  caseInsensitive = true, // set false for big data sets
) {
  let query = createKysely<Database>()
    .selectFrom(proofTableName)
    .where('namespace', '=', namespace.valueOf());

  /**
   * use = when possible to search by namespace_address index otherwise it's a text based search.
   */
  if (caseInsensitive) {
    query = query.where('address', 'ilike', address);
  } else {
    query = query.where('address', '=', address);
  }
  return query.selectAll().limit(1).execute();
}

// Not a proof: should be somewhere else?
export async function getDiscountCode(code: string) {
  const codeBuffer = Buffer.from(code);
  const query = createKysely<Database>()
    .selectFrom('public.basenames_discount_codes')
    .where('code', '=', codeBuffer);

  return query.selectAll().limit(1).execute();
}
