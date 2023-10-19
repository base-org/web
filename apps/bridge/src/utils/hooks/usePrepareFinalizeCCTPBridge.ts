import { usePrepareContractWrite } from 'wagmi';
import getConfig from 'next/config';
import MessageTransmitter from 'apps/bridge/src/contract-abis/MessageTransmitter';

const { publicRuntimeConfig } = getConfig();

const BRIDGE_DIRECTION_TO_MESSAGE_TRANSMITTER: Record<'deposit' | 'withdraw', `0x${string}`> = {
  deposit: publicRuntimeConfig.l2CCTPMessageTransmitterAddress,
  withdraw: publicRuntimeConfig.l1CCTPMessageTransmitterAddress,
};

const BRIDGE_DIRECTION_TO_CHAIN_ID: Record<'deposit' | 'withdraw', number> = {
  deposit: parseInt(publicRuntimeConfig.l2ChainID),
  withdraw: parseInt(publicRuntimeConfig.l1ChainID),
};

type UsePrepareFinalizeCCTPBridgeProps = {
  isPermittedToBridge: boolean;
  message?: `0x${string}`;
  attestation?: `0x${string}`;
  bridgeDirection: 'deposit' | 'withdraw';
  includeTosVersionByte: boolean;
};

export function usePrepareFinalizeCCTPBridge({
  isPermittedToBridge,
  message,
  attestation,
  bridgeDirection,
  includeTosVersionByte,
}: UsePrepareFinalizeCCTPBridgeProps) {
  const shouldPrepare = isPermittedToBridge && message && attestation;

  const { config } = usePrepareContractWrite({
    address: shouldPrepare ? BRIDGE_DIRECTION_TO_MESSAGE_TRANSMITTER[bridgeDirection] : undefined,
    abi: MessageTransmitter,
    functionName: 'receiveMessage',
    chainId: BRIDGE_DIRECTION_TO_CHAIN_ID[bridgeDirection],
    args: shouldPrepare ? [message, attestation] : undefined,
    dataSuffix: includeTosVersionByte ? publicRuntimeConfig.tosVersion : undefined,
  });

  return config;
}
