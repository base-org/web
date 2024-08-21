import { NextApiRequest, NextApiResponse } from 'apps/web/node_modules/next/dist/shared/lib/utils';
import {
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
  validateEnsDomainName,
} from 'apps/web/src/utils/usernames';
import { ethers } from 'ethers';

export type IsNameAvailableResponse = {
  nameIsAvailable: boolean;
};

const url = 'https://mainnet.base.org';
const provider = new ethers.providers.JsonRpcProvider(url);
const baseMainnetChainId = 8453;
const contractAddress = REGISTER_CONTRACT_ADDRESSES[baseMainnetChainId];
const contract = new ethers.Contract(contractAddress, REGISTER_CONTRACT_ABI, provider);

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
  const normalizedName: string = normalizeEnsDomainName(name);
  const { valid } = validateEnsDomainName(name);

  if (!valid) {
    throw new Error('Invalid ENS domain name');
  }

  try {
    const available = (await contract.available(normalizedName)) as boolean;
    return available;
  } catch (error) {
    console.error('Error checking name availability:', error);
    throw error;
  }
}
