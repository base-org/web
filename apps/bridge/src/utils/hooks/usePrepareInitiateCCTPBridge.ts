import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';
import { Asset } from 'apps/bridge/src/types/Asset';
import { parseUnits, hexZeroPad, arrayify } from 'ethers/lib/utils.js';
import getConfig from 'next/config';
import { Address, usePrepareContractWrite } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UsePrepareInitiateCCTPBridgeProps = {
  mintRecipient?: Address;
  asset: Asset;
  depositAmount: string;
  destinationDomain: number;
  isPermittedToBridge: boolean;
  includeTosVersionByte: boolean;
};

export function usePrepareInitiateCCTPBridge({
  mintRecipient,
  asset,
  depositAmount,
  destinationDomain,
  isPermittedToBridge,
}: UsePrepareInitiateCCTPBridgeProps) {
  const { config: depositConfig } = usePrepareContractWrite({
    address:
      isPermittedToBridge && depositAmount !== '' && mintRecipient
        ? publicRuntimeConfig.l1CCTPTokenMessengerAddress
        : undefined,
    abi: TokenMessenger,
    functionName: 'depositForBurn',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: mintRecipient
      ? [
          depositAmount !== ''
            ? parseUnits(depositAmount, asset.decimals)
            : parseUnits('0', asset.decimals),
          destinationDomain,
          hexZeroPad(arrayify(mintRecipient), 32) as `0x${string}`,
          asset.L1contract as Address,
        ]
      : undefined,
  });
  return depositConfig;
}
