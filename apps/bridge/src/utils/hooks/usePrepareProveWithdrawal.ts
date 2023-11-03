import { useEffect, useState } from 'react';
import OptimismPortal from 'apps/bridge/src/contract-abis/OptimismPortal';
import { WithdrawalMessage } from 'apps/bridge/src/types/WithdrawalMessage';
import { useL2OutputProposal } from 'apps/bridge/src/utils/hooks/useL2OutputProposal';
import { useWithdrawalL2OutputIndex } from 'apps/bridge/src/utils/hooks/useWithdrawalL2OutputIndex';
import { getWithdrawalMessage } from 'apps/bridge/src/utils/transactions/getWithdrawalMessage';
import getConfig from 'next/config';
import { usePrepareContractWrite, usePublicClient, useWaitForTransaction } from 'wagmi';
import { keccak256, encodeAbiParameters, parseAbiParameters, PublicClient, pad } from 'viem';
import { hashWithdrawal } from 'apps/bridge/src/utils/hashing/hashWithdrawal';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useTOSStatus } from 'apps/bridge/src/contexts/TOSContext';

const { publicRuntimeConfig } = getConfig();

async function makeStateTrieProof(
  client: PublicClient,
  blockNumber: bigint,
  address: `0x${string}`,
  slot: `0x${string}`,
): Promise<{
  accountProof: string[];
  storageProof: `0x${string}`[];
  storageValue: bigint;
  storageRoot: `0x${string}`;
}> {
  const proof = await client.getProof({ address, storageKeys: [slot], blockNumber });

  return {
    accountProof: proof.accountProof,
    storageProof: proof.storageProof[0].proof,
    storageValue: proof.storageProof[0].value,
    storageRoot: proof.storageHash,
  };
}

type BedrockCrossChainMessageProof = {
  l2OutputIndex: bigint;
  outputRootProof: {
    version: `0x${string}`;
    stateRoot: `0x${string}`;
    messagePasserStorageRoot: `0x${string}`;
    latestBlockhash: `0x${string}`;
  };
  withdrawalProof: `0x${string}`[];
};

export function usePrepareProveWithdrawal(
  withdrawalTx: `0x${string}`,
  blockNumberOfLatestL2OutputProposal?: bigint,
) {
  const [withdrawalForTx, setWithdrawalForTx] = useState<WithdrawalMessage | null>(null);
  const [proofForTx, setProofForTx] = useState<BedrockCrossChainMessageProof | null>(null);
  const { isTosAccepted } = useTOSStatus();

  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';
  const includeTosVersionByte = isMainnet;

  const { data: withdrawalReceipt } = useWaitForTransaction({
    hash: withdrawalTx,
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
  });
  const withdrawalL2OutputIndex = useWithdrawalL2OutputIndex(blockNumberOfLatestL2OutputProposal);
  const l2OutputProposal = useL2OutputProposal(withdrawalL2OutputIndex);
  const l2PublicClient = usePublicClient({ chainId: parseInt(publicRuntimeConfig.l2ChainID) });

  const shouldPrepare = withdrawalForTx && proofForTx && (isTosAccepted || !isMainnet);

  const { config } = usePrepareContractWrite({
    address: shouldPrepare ? publicRuntimeConfig.l1OptimismPortalProxyAddress : undefined,
    abi: OptimismPortal,
    functionName: 'proveWithdrawalTransaction',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args:
      withdrawalForTx && proofForTx
        ? [
            {
              nonce: withdrawalForTx.nonce,
              sender: withdrawalForTx.sender,
              target: withdrawalForTx.target,
              value: withdrawalForTx.value,
              gasLimit: withdrawalForTx.gasLimit,
              data: withdrawalForTx.data,
            },
            BigInt(proofForTx.l2OutputIndex),
            {
              version: proofForTx.outputRootProof.version,
              stateRoot: proofForTx.outputRootProof.stateRoot,
              messagePasserStorageRoot: proofForTx.outputRootProof.messagePasserStorageRoot,
              latestBlockhash: proofForTx.outputRootProof.latestBlockhash,
            },
            proofForTx.withdrawalProof,
          ]
        : undefined,
    dataSuffix: includeTosVersionByte ? publicRuntimeConfig.tosVersion : undefined,
  });

  useEffect(() => {
    void (async () => {
      if (
        withdrawalReceipt &&
        withdrawalL2OutputIndex &&
        l2OutputProposal &&
        blockNumberOfLatestL2OutputProposal
      ) {
        const withdrawalMessage = getWithdrawalMessage(withdrawalReceipt);

        const messageBedrockOutput = {
          outputRoot: l2OutputProposal.outputRoot,
          l1Timestamp: l2OutputProposal.timestamp,
          l2BlockNumber: l2OutputProposal.l2BlockNumber,
          l2OutputIndex: withdrawalL2OutputIndex,
        };

        const hashedWithdrawal = hashWithdrawal(withdrawalMessage);

        const messageSlot = keccak256(
          encodeAbiParameters(parseAbiParameters('bytes32, uint256'), [
            hashedWithdrawal,
            BigInt(pad('0x0')),
          ]),
        );

        const stateTrieProof = await makeStateTrieProof(
          l2PublicClient,
          blockNumberOfLatestL2OutputProposal,
          publicRuntimeConfig.l2L1MessagePasserAddress,
          messageSlot,
        );

        const block = await l2PublicClient.getBlock({
          blockNumber: messageBedrockOutput.l2BlockNumber,
        });

        const bedrockProof: BedrockCrossChainMessageProof = {
          outputRootProof: {
            version: pad('0x0'),
            stateRoot: block.stateRoot,
            messagePasserStorageRoot: stateTrieProof.storageRoot,
            latestBlockhash: block.hash,
          },
          withdrawalProof: stateTrieProof.storageProof,
          l2OutputIndex: messageBedrockOutput.l2OutputIndex,
        };

        setWithdrawalForTx(withdrawalMessage);
        setProofForTx(bedrockProof);
      }
    })();
  }, [
    withdrawalReceipt,
    withdrawalL2OutputIndex,
    l2OutputProposal,
    blockNumberOfLatestL2OutputProposal,
    l2PublicClient,
  ]);

  return config;
}
