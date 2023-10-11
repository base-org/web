import { useEffect, useState } from 'react';
import {
  BedrockCrossChainMessageProof,
  hashWithdrawal,
  toRpcHexString,
} from '@eth-optimism/core-utils';
import OptimismPortal from 'apps/bridge/src/contract-abis/OptimismPortal';
import { WithdrawalMessage } from 'apps/bridge/src/types/WithdrawalMessage';
import { useL2OutputProposal } from 'apps/bridge/src/utils/hooks/useL2OutputProposal';
import { useWithdrawalL2OutputIndex } from 'apps/bridge/src/utils/hooks/useWithdrawalL2OutputIndex';
import { getWithdrawalMessage } from 'apps/bridge/src/utils/transactions/getWithdrawalMessage';
import { BigNumber, constants, providers, utils } from 'ethers';
import getConfig from 'next/config';
import { usePrepareContractWrite, useProvider, useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

const makeStateTrieProof = async (
  provider: providers.JsonRpcProvider,
  address: string,
  slot: string,
): Promise<{
  accountProof: string[];
  storageProof: string[];
  storageValue: BigNumber;
  storageRoot: string;
}> => {
  const proof = (await provider.send('eth_getProof', [address, [slot], 'latest'])) as {
    accountProof: string[];
    storageProof: { proof: string[]; value: BigNumber }[];
    storageHash: string;
  };

  return {
    accountProof: proof.accountProof,
    storageProof: proof.storageProof[0].proof,
    storageValue: BigNumber.from(proof.storageProof[0].value),
    storageRoot: proof.storageHash,
  };
};

export function usePrepareProveWithdrawal(withdrawalTx: `0x${string}`, isERC20Withdrawal = false) {
  const [withdrawalForTx, setWithdrawalForTx] = useState<WithdrawalMessage | null>(null);
  const [proofForTx, setProofForTx] = useState<BedrockCrossChainMessageProof | null>(null);

  const { data: withdrawalReceipt } = useWaitForTransaction({
    hash: withdrawalTx,
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
  });
  const withdrawalL2OutputIndex = useWithdrawalL2OutputIndex(withdrawalReceipt?.blockNumber);
  const l2OutputProposal = useL2OutputProposal(withdrawalL2OutputIndex);
  const l2Provider = useProvider({ chainId: parseInt(publicRuntimeConfig.l2ChainID) });

  const { config } = usePrepareContractWrite({
    address:
      withdrawalForTx && proofForTx ? publicRuntimeConfig.l1OptimismPortalProxyAddress : undefined,
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
            BigNumber.from(proofForTx.l2OutputIndex),
            {
              version: proofForTx.outputRootProof.version as `0x${string}`,
              stateRoot: proofForTx.outputRootProof.stateRoot as `0x${string}`,
              messagePasserStorageRoot: proofForTx.outputRootProof
                .messagePasserStorageRoot as `0x${string}`,
              latestBlockhash: proofForTx.outputRootProof.latestBlockhash as `0x${string}`,
            },
            proofForTx.withdrawalProof as `0x${string}`[],
          ]
        : undefined,
  });

  useEffect(() => {
    void (async () => {
      if (withdrawalReceipt && withdrawalL2OutputIndex && l2OutputProposal) {
        const withdrawalMessage = getWithdrawalMessage(withdrawalReceipt, isERC20Withdrawal);

        const messageBedrockOutput = {
          outputRoot: l2OutputProposal.outputRoot,
          l1Timestamp: l2OutputProposal.timestamp.toNumber(),
          l2BlockNumber: l2OutputProposal.l2BlockNumber.toNumber(),
          l2OutputIndex: withdrawalL2OutputIndex.toNumber(),
        };

        const hashedWithdrawal = hashWithdrawal(
          withdrawalMessage.nonce,
          withdrawalMessage.sender,
          withdrawalMessage.target,
          withdrawalMessage.value,
          withdrawalMessage.gasLimit,
          withdrawalMessage.data,
        );

        const messageSlot = utils.keccak256(
          utils.defaultAbiCoder.encode(
            ['bytes32', 'uint256'],
            [hashedWithdrawal, constants.HashZero],
          ),
        );

        const stateTrieProof = await makeStateTrieProof(
          l2Provider as providers.JsonRpcProvider,
          publicRuntimeConfig.l2L1MessagePasserAddress,
          messageSlot,
        );

        const block = (await (l2Provider as providers.JsonRpcProvider).send(
          'eth_getBlockByNumber',
          [toRpcHexString(messageBedrockOutput.l2BlockNumber), false],
        )) as { stateRoot: string; hash: string };

        const bedrockProof: BedrockCrossChainMessageProof = {
          outputRootProof: {
            version: constants.HashZero,
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
  }, [withdrawalReceipt, withdrawalL2OutputIndex, l2OutputProposal, l2Provider, isERC20Withdrawal]);

  return config;
}
