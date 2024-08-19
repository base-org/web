import { NextApiRequest, NextApiResponse } from 'apps/web/node_modules/next/dist/shared/lib/utils';
import { ethers } from 'ethers';
import {
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
  validateEnsDomainName,
} from 'apps/web/src/utils/usernames';
import { formatEthPrice, formatWeiPrice } from 'apps/web/src/utils/formatEthPrice';

const url = 'https://mainnet.base.org';
const provider = new ethers.providers.JsonRpcProvider(url);
const baseMainnetChainId = 8453;
const contractAddress = REGISTER_CONTRACT_ADDRESSES[baseMainnetChainId];
const contract = new ethers.Contract(contractAddress, REGISTER_CONTRACT_ABI, provider);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, years } = req.query;

  try {
    const registrationPrice = await getBasenameRegistrationPrice(String(name), Number(years));
    if (!registrationPrice) {
      throw new Error('Could not get registration price.');
    }

    const registrationPriceInWei = formatWeiPrice(registrationPrice).toString();
    const registrationPriceInEth = formatEthPrice(registrationPrice).toString();
    return res.status(200).json({ registrationPriceInWei, registrationPriceInEth });
  } catch (error) {
    console.error('Could not get registration price: ', error);
    return res.status(500).json(error);
  }
}

async function getBasenameRegistrationPrice(name: string, years: number): Promise<bigint | null> {
  const normalizedName = normalizeName(name);
  if (!normalizedName) {
    throw new Error('Invalid ENS domain name');
  }

  try {
    const claimPrice = (await contract.registerPrice(
      normalizedName,
      secondsInYears(years),
    )) as bigint;
    return claimPrice;
  } catch (error) {
    console.error('Could not get claim price:', error);
    return null;
  }
}

// async function getDiscountedBasenameClaimPrice(
//   name: string,
//   years: number,
//   discountKey: `0x${string}` | undefined,
// ) {
//   const normalizedName = normalizeName(name);
//   if (!normalizedName) {
//     throw new Error('Invalid ENS domain name');
//   }

//   try {
//     const discountedClaimPrice = await contract.discountedRegisterPrice(
//       normalizedName,
//       secondsInYears(years),
//       discountKey ?? '0x',
//     );
//     return discountedClaimPrice;
//   } catch (error) {
//     console.error('Could not get discounted claim price:', error);
//   }
// }

function normalizeName(name: string) {
  const normalizedName: string = normalizeEnsDomainName(name);
  const { valid } = validateEnsDomainName(name);

  if (!valid) {
    return null;
  }
  return normalizedName;
}

function secondsInYears(years: number) {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}
