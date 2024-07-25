import { createKysely } from '@vercel/postgres-kysely';
import { Address } from 'viem';

type Database = {
  proofs: ProofsTable;
};

export enum ProofTableNamespace {
  Usernames = 'usernames',
  UsernamesEarlyAccess = 'usernames_early_access',
}

type ProofsTable = {
  address: Address;
  namespace: string;
  proofs: string;
};

//username_proofs

const proofTableName = 'proofs';

export async function getProofsByNamespaceAndAddress(
  address: Address,
  namespace: ProofTableNamespace,
) {
  return createKysely<Database>()
    .selectFrom(proofTableName)
    .where('address', 'ilike', address)
    .where('namespace', '=', namespace.valueOf())
    .selectAll()
    .limit(1)
    .execute();
}
