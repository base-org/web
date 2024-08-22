import { NextApiRequest, NextApiResponse } from 'apps/web/node_modules/next/dist/shared/lib/utils';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import {
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
  normalizeName,
} from 'apps/web/src/utils/usernames';

export type IsNameAvailableResponse = {
  nameIsAvailable: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;
  try {
    const isNameAvailableResponse = await isNameAvailable(String(name));
    const responseData: IsNameAvailableResponse = {
      nameIsAvailable: isNameAvailableResponse,
    };
    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Could not read name availability:', error);
    return res.status(500).json({ error: 'Could not determine name availability' });
  }
}

async function isNameAvailable(name: string): Promise<boolean> {
  const client = createPublicClient({
    chain: base,
    transport: http(),
  });
  try {
    const normalizedName = normalizeName(name);
    if (!normalizedName) {
      throw new Error('Invalid ENS domain name');
    }

    const available = await client.readContract({
      address: REGISTER_CONTRACT_ADDRESSES[base.id],
      abi: REGISTER_CONTRACT_ABI,
      functionName: 'available',
      args: [normalizedName],
    });
    return available;
  } catch (error) {
    console.error('Error checking name availability:', error);
    throw error;
  }
}
