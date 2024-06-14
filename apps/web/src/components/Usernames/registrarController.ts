import {
  baseRegistrarContractABI,
  baseRegistrarSmartContractAddress,
  cdpBaseRpcEndpoint,
} from 'apps/web/src/components/Usernames/constants';
import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';

const isProdEnv = process.env.NODE_ENV === 'production';

const publicClient = createPublicClient({
  chain: isProdEnv ? base : baseSepolia,
  transport: http(cdpBaseRpcEndpoint),
});

export async function hasRegisteredWithDiscount(addresses: string[]): Promise<boolean> {
  const res = (await publicClient.readContract({
    address: baseRegistrarSmartContractAddress,
    abi: baseRegistrarContractABI,
    functionName: 'hasRegisteredWithDiscount',
    args: [addresses],
  })) as boolean;

  return res;
}
