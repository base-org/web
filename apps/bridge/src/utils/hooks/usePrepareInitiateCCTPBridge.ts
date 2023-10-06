import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';
import { Asset } from 'apps/bridge/src/types/Asset';
import { parseUnits, pad } from 'viem';
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
  const shouldPrepare = isPermittedToBridge && depositAmount !== '' && mintRecipient;

  const { config: depositConfig } = usePrepareContractWrite({
    address: shouldPrepare ? publicRuntimeConfig.l1CCTPTokenMessengerAddress : undefined,
    abi: TokenMessenger,
    functionName: 'depositForBurn',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: shouldPrepare
      ? [
          depositAmount !== ''
            ? parseUnits(depositAmount, asset.decimals)
            : parseUnits('0', asset.decimals),
          destinationDomain,
          pad(mintRecipient),
          asset.L1contract as Address,
        ]
      : undefined,
  });
  return depositConfig;
}
