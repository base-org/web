import { NextApiRequest, NextApiResponse } from 'apps/web/node_modules/next/dist/shared/lib/utils';
import {
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
  validateEnsDomainName,
} from 'apps/web/src/utils/usernames';
import { ethers } from 'ethers';

const url = 'https://mainnet.base.org';
const provider = new ethers.providers.JsonRpcProvider(url);

const baseMainnetChainId = 8453;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;
  try {
    const nameIsAvailable = await isNameAvailable(String(name));
    return res.status(200).json({ nameIsAvailable });
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

  const contractAddress = REGISTER_CONTRACT_ADDRESSES[baseMainnetChainId];
  const contract = new ethers.Contract(contractAddress, REGISTER_CONTRACT_ABI, provider);

  try {
    const available = await contract.available(normalizedName);
    if (typeof available !== 'boolean') {
      throw new Error('Invalid return type, expected boolean');
    }
    return available;
  } catch (error) {
    console.error('Error checking name availability:', error);
    throw error;
  }
}
