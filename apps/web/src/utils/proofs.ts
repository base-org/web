import { createKysely } from '@vercel/postgres-kysely';

type Database = {
  proofs: ProofsTable;
};

export enum ProofTableNamespace {
  NFTBuilder = 'nft_builder',
  Usernames = 'usernames',
}

type ProofsTable = {
  address: string;
  namespace: string;
  proofs: string;
};

//username_proofs

const proofTableName = 'proofs';
const db = createKysely<Database>();

export async function getProofsByNamespaceAndAddress(
  address: string,
  namespace: ProofTableNamespace,
) {
  return await db
    .selectFrom(proofTableName)
    .where('address', '=', address)
    .where('namespace', '=', namespace.valueOf())
    .selectAll()
    .limit(1)
    .execute();
}
