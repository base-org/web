import { cdpBaseRpcEndpoint } from 'apps/web/src/cdp/constants';
import { isDevelopment } from 'apps/web/src/constants';
import {
  baseRegistrarContractABI,
  baseRegistrarSmartContractAddress,
} from 'apps/web/src/contracts/Usernames/constants';
import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';

const publicClient = createPublicClient({
  chain: isDevelopment ? baseSepolia : base,
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
