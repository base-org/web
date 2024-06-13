import {
  baseRegistrarContractABI,
  baseRegistrarSmartContractAddress,
} from 'apps/web/src/components/Usernames/constants';
import { ethers } from 'ethers';
import { base } from 'viem/chains';

export async function hasRegisteredWithDiscount(addresses: string[]): Promise<boolean> {
  // TODO: define which provider we are using
  const provider = new ethers.providers.BaseProvider(base.id);
  const contract = new ethers.Contract(
    baseRegistrarSmartContractAddress!,
    baseRegistrarContractABI,
    provider,
  );

  return contract.hasRegisteredWithDiscount(addresses);
}
