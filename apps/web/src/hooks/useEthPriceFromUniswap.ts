import abi from 'apps/web/src/abis/UniswapV2Pair.json';
import { UNISWAP_USDC_WETH_POOL } from 'apps/web/src/addresses/usernames';
import { base } from 'viem/chains';
import { useReadContract } from 'wagmi';

export function useEthPriceFromUniswap() {
  const network = base.id;

  const read = useReadContract({
    abi,
    address: UNISWAP_USDC_WETH_POOL[network],
    functionName: 'getReserves',
    args: [],
    chainId: network,
  });

  if (!read.data) {
    return undefined;
  }

  const data = read.data as [bigint, bigint, number];
  // usd per ether to the nearest dollar
  const price = Number((data[1] * BigInt(1e12)) / data[0]);
  return price;
}
