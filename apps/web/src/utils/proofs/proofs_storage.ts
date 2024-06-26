import { createKysely } from '@vercel/postgres-kysely';
import { Address } from 'viem';

type Database = {
  proofs: ProofsTable;
};

export enum ProofTableNamespace {
  Usernames = 'usernames',
}

type ProofsTable = {
  address: string;
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
    .where('address', '=', address)
    .where('namespace', '=', namespace.valueOf())
    .selectAll()
    .limit(1)
    .execute();
}
