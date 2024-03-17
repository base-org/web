import { useCallback, useEffect, useMemo, useState } from 'react';
import { BridgeInput } from 'apps/bridge/src/components/BridgeInput/BridgeInput';
import { BridgeToInput } from 'apps/bridge/src/components/BridgeToInput/BridgeToInput';
import { ConnectWalletButton } from 'apps/bridge/src/components/ConnectWalletButton/ConnectWalletButton';
import { FaqSidebar } from 'apps/bridge/src/components/Faq/FaqSidebar';
import { BaseButton } from 'apps/bridge/src/components/SwitchNetworkButton/SwitchNetworkButton';
import { TransactionSummary } from 'apps/bridge/src/components/TransactionSummary/TransactionSummary';
import { WithdrawModal } from 'apps/bridge/src/components/WithdrawModal/WithdrawModal';
import { Asset } from 'apps/bridge/src/types/Asset';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useDisclosure } from 'apps/bridge/src/utils/hooks/useDisclosure';
import { useGetCode } from 'apps/bridge/src/utils/hooks/useGetCode';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import { useIsWalletConnected } from 'apps/bridge/src/utils/hooks/useIsWalletConnected';
import { usePrepareERC20Withdrawal } from 'apps/bridge/src/utils/hooks/usePrepareERC20Withdrawal';
import { usePrepareERC20WithdrawalTo } from 'apps/bridge/src/utils/hooks/usePrepareERC20WithdrawalTo';
import { usePrepareETHWithdrawal } from 'apps/bridge/src/utils/hooks/usePrepareETHWithdrawal';
import { isAddress } from 'viem';
import getConfig from 'next/config';
import { useAccount, useBalance, useContractWrite, usePublicClient, useSwitchNetwork } from 'wagmi';
import { writeContract } from 'wagmi/actions';
import { useIsPermittedToBridgeTo } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridgeTo';
import { getL2NetworkForChainEnv } from 'apps/bridge/src/utils/networks/getL2NetworkForChainEnv';
import { getL1NetworkForChainEnv } from 'apps/bridge/src/utils/networks/getL1NetworkForChainEnv';
import { getWithdrawalAssetsForChainEnv } from 'apps/bridge/src/utils/assets/getWithdrawalAssetsForChainEnv';
import {
  prepareInitiateCCTPBridge,
  usePrepareInitiateCCTPBridge,
} from 'apps/bridge/src/utils/hooks/usePrepareInitiateCCTPBridge';
import { useIsContractApproved } from 'apps/bridge/src/utils/hooks/useIsContractApproved';
import { useApproveContract } from 'apps/bridge/src/utils/hooks/useApproveContract';
import { BridgeButton } from 'apps/bridge/src/components/BridgeButton/BridgeButton';
import { parseUnits } from 'viem';
import { TransactionSummaryModal } from 'apps/bridge/src/components/WithdrawContainer/TransactionSummaryModal';

const activeAssets = getWithdrawalAssetsForChainEnv();

const { publicRuntimeConfig } = getConfig();
const chainId = parseInt(publicRuntimeConfig.l2ChainID);

export function WithdrawContainer() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [L2ApproveTxHash, setL2ApproveTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [L2WithdrawTxHash, setL2WithdrawTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [withdrawTo, setWithdrawTo] = useState('');
  const [isApprovalTx, setIsApprovalTx] = useState(false);
  const isWalletConnected = useIsWalletConnected();
  const [selectedAsset, setSelectedAsset] = useState<Asset>(activeAssets[0]);
  const publicClient = usePublicClient({ chainId });
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    switchNetwork?.(chainId);
  }, [switchNetwork]);

  const { address } = useAccount();
  const codeAtAddress = useGetCode(chainId, address);
  const isSmartContractWallet = !!codeAtAddress && codeAtAddress !== '0x';

  const erc20Spender = publicRuntimeConfig.l2CCTPTokenMessengerAddress;

  const { data: readERC20Approval, error: readERC20ApprovalError } = useIsContractApproved({
    contactAddress: selectedAsset.L2contract,
    address,
    spender: erc20Spender,
    bridgeDirection: 'withdraw',
  });

  const readApprovalResult = useMemo(() => {
    const withdrawAmountBN =
      withdrawAmount === '' || Number.isNaN(Number(withdrawAmount))
        ? parseUnits('0', selectedAsset.decimals)
        : parseUnits(withdrawAmount, selectedAsset.decimals);
    return Boolean(
      !readERC20ApprovalError && readERC20Approval && readERC20Approval >= withdrawAmountBN,
    );
  }, [withdrawAmount, selectedAsset.decimals, readERC20ApprovalError, readERC20Approval]);

  // approve erc20
  const approveConfig = useApproveContract({
    contractAddress: selectedAsset.L2contract,
    spender: erc20Spender,
    approveAmount: withdrawAmount,
    decimals: selectedAsset.decimals,
    bridgeDirection: 'withdraw',
  });
  const { writeAsync: approveWrite } = useContractWrite(approveConfig);

  const { data: L2Balance } = useBalance({
    address,
    token: selectedAsset.L2contract,
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
  });

  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';
  const includeTosVersionByte = isMainnet;
  const isUserPermittedToBridge = useIsPermittedToBridge();
  const isPermittedToBridgeTo = useIsPermittedToBridgeTo(withdrawTo as `0x${string}`);
  const isPermittedToBridge = isSmartContractWallet
    ? isUserPermittedToBridge && isPermittedToBridgeTo
    : isUserPermittedToBridge;

  const erc20WithdrawalConfig = usePrepareERC20Withdrawal({
    asset: selectedAsset,
    withdrawAmount,
    isPermittedToBridge,
    includeTosVersionByte,
  });
  const erc20WithdrawalToConfig = usePrepareERC20WithdrawalTo({
    asset: selectedAsset,
    to: withdrawTo as `0x${string}`,
    withdrawAmount,
    isPermittedToBridge,
    includeTosVersionByte,
  });

  const { writeAsync: withdrawERC20 } = useContractWrite(erc20WithdrawalConfig);
  const { writeAsync: withdrawERC20To } = useContractWrite(erc20WithdrawalToConfig);

  const withdrawConfig = usePrepareETHWithdrawal({
    userAddress: isSmartContractWallet ? (withdrawTo as `0x${string}`) : address,
    withdrawAmount,
    isPermittedToBridge,
    includeTosVersionByte,
  });
  const { writeAsync: withdraw } = useContractWrite(withdrawConfig);

  // withdraw using CCTP (eg USDC)
  const withdrawCCTPAssetConfig = usePrepareInitiateCCTPBridge({
    mintRecipient: (isSmartContractWallet ? withdrawTo : address) as `0x${string}`,
    asset: selectedAsset,
    amount: withdrawAmount,
    destinationDomain: parseInt(publicRuntimeConfig.l1CCTPDomain),
    isPermittedToBridge,
    includeTosVersionByte,
    bridgeDirection: 'withdraw',
  });
  const { writeAsync: withdrawCCTPAssetWrite } = useContractWrite(withdrawCCTPAssetConfig);

  const {
    isOpen: isTransactionSummaryModalOpen,
    onOpen: onOpenTransactionSummaryModal,
    onClose: onCloseTransactionSummaryModal,
  } = useDisclosure();

  const {
    isOpen: isWithdrawModalOpen,
    onOpen: onOpenWithdrawModal,
    onClose: onCloseWithdrawModal,
  } = useDisclosure();

  const handleCloseWithdrawModal = useCallback(() => {
    onCloseWithdrawModal();
    setL2WithdrawTxHash(undefined);
    setL2ApproveTxHash(undefined);
    setIsApprovalTx(false);
  }, [onCloseWithdrawModal]);

  const initiateApproval = useCallback(() => {
    void (async () => {
      setIsApprovalTx(true);
      onOpenWithdrawModal();
      try {
        const approveResult = await approveWrite?.();
        if (approveResult?.hash) {
          const approveTxHash: `0x${string}` = approveResult.hash;
          setL2ApproveTxHash(approveTxHash);

          // wait for confirmations
          await publicClient.waitForTransactionReceipt({ hash: approveResult.hash });

          // next, call the transfer function
          setIsApprovalTx(false);

          let withdrawMethod;
          if (selectedAsset.protocol === 'CCTP') {
            // because of how React works we need to use the writeContract wagmi/core action
            // here (the hook still thinks the approval has not been set)
            const config = await prepareInitiateCCTPBridge({
              mintRecipient: (isSmartContractWallet ? withdrawTo : address) as `0x${string}`,
              asset: selectedAsset,
              amount: withdrawAmount,
              destinationDomain: parseInt(publicRuntimeConfig.l1CCTPDomain),
              isPermittedToBridge,
              includeTosVersionByte,
              bridgeDirection: 'withdraw',
            });
            withdrawMethod = async () => await writeContract(config);
          } else {
            withdrawMethod = isSmartContractWallet ? withdrawERC20To : withdrawERC20;
          }
          const withdrawResult = await withdrawMethod?.();
          if (withdrawResult?.hash) {
            const withdrawTxHash = withdrawResult.hash;
            setL2WithdrawTxHash(withdrawTxHash);
            setWithdrawAmount('');
          }
        }
      } catch (error) {
        onCloseWithdrawModal();
      }
    })();
  }, [
    address,
    approveWrite,
    includeTosVersionByte,
    isPermittedToBridge,
    isSmartContractWallet,
    onCloseWithdrawModal,
    onOpenWithdrawModal,
    publicClient,
    selectedAsset,
    withdrawAmount,
    withdrawERC20,
    withdrawERC20To,
    withdrawTo,
  ]);

  const initiateWithdrawal = useCallback(() => {
    void (async () => {
      onOpenWithdrawModal();
      try {
        // Only bridge on mainnet if user has accepted ToS. Always allow bridging on testnet.
        if (isPermittedToBridge) {
          let withdrawMethod;
          if (selectedAsset.L1contract) {
            if (selectedAsset.protocol === 'CCTP') {
              withdrawMethod = withdrawCCTPAssetWrite;
            } else {
              withdrawMethod = isSmartContractWallet ? withdrawERC20To : withdrawERC20;
            }
          } else {
            withdrawMethod = withdraw;
          }
          const withdrawalResult = await withdrawMethod?.();
          if (withdrawalResult?.hash) {
            const withdrawalTxHsh = withdrawalResult.hash;
            setL2WithdrawTxHash(withdrawalTxHsh);
            setWithdrawAmount('');
          }
        } else {
          onCloseWithdrawModal();
        }
      } catch (error) {
        onCloseWithdrawModal();
      }
    })();
  }, [
    onOpenWithdrawModal,
    isPermittedToBridge,
    selectedAsset.L1contract,
    selectedAsset.protocol,
    withdrawCCTPAssetWrite,
    isSmartContractWallet,
    withdrawERC20To,
    withdrawERC20,
    withdraw,
    onCloseWithdrawModal,
  ]);

  const handleProceedToApproval = useCallback(() => {
    onCloseTransactionSummaryModal();
    initiateApproval();
  }, [initiateApproval, onCloseTransactionSummaryModal]);

  const handleProceedToWithdraw = useCallback(() => {
    onCloseTransactionSummaryModal();
    initiateWithdrawal();
  }, [initiateWithdrawal, onCloseTransactionSummaryModal]);

  let button;
  let withdrawDisabled;
  let transactionSummaryModal;

  if (!isWalletConnected) {
    button = (
      <ConnectWalletButton className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto" />
    );
  } else if (selectedAsset.protocol === 'CCTP' && !readApprovalResult) {
    withdrawDisabled =
      (isSmartContractWallet && !isAddress(withdrawTo ?? '')) || !isPermittedToBridge;

    button = (
      <BridgeButton
        onClick={onOpenTransactionSummaryModal}
        disabled={withdrawDisabled}
        className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto"
      >
        Approval
      </BridgeButton>
    );
    transactionSummaryModal = (
      <TransactionSummaryModal
        isOpen={isTransactionSummaryModalOpen}
        onClose={onCloseTransactionSummaryModal}
        onProceed={handleProceedToApproval}
        selectedAsset={selectedAsset}
        protocol={selectedAsset.protocol}
        amount={withdrawAmount}
      />
    );
  } else {
    withdrawDisabled =
      parseFloat(withdrawAmount) <= 0 ||
      parseFloat(withdrawAmount) > parseFloat(L2Balance?.formatted ?? '0') ||
      withdrawAmount === '' ||
      (isSmartContractWallet && !isAddress(withdrawTo ?? '')) ||
      !isPermittedToBridge;

    button = (
      <BaseButton
        onClick={onOpenTransactionSummaryModal}
        disabled={withdrawDisabled}
        toChainId={chainId}
        className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto"
      >
        Withdraw
      </BaseButton>
    );
    transactionSummaryModal = (
      <TransactionSummaryModal
        isOpen={isTransactionSummaryModalOpen}
        onClose={onCloseTransactionSummaryModal}
        onProceed={handleProceedToWithdraw}
        selectedAsset={selectedAsset}
        protocol={selectedAsset.protocol}
        amount={withdrawAmount}
      />
    );
  }

  return (
    <div className="flex-col lg:flex lg:h-full lg:flex-row">
      <div className="grow">
        {isTransactionSummaryModalOpen && transactionSummaryModal}
        {isWithdrawModalOpen && (
          <WithdrawModal
            isOpen={isWithdrawModalOpen}
            onClose={handleCloseWithdrawModal}
            L2ApproveTxHash={L2ApproveTxHash}
            L2WithdrawTxHash={L2WithdrawTxHash}
            isApprovalTx={isApprovalTx}
            protocol={selectedAsset.protocol}
          />
        )}
        <BridgeInput
          inputNetwork={getL2NetworkForChainEnv()}
          isWithdraw
          outputNetwork={getL1NetworkForChainEnv()}
          balance={L2Balance?.formatted ?? ''}
          amount={withdrawAmount}
          setAmount={setWithdrawAmount}
          assets={activeAssets}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
        >
          {button}
        </BridgeInput>

        {isSmartContractWallet && (
          <BridgeToInput bridgeTo={withdrawTo} setBridgeTo={setWithdrawTo} action="withdraw" />
        )}

        <div className="border-t border-sidebar-border">
          <TransactionSummary
            selectedAsset={selectedAsset}
            header="TRANSACTION SUMMARY"
            balance={parseFloat(withdrawAmount ?? '0').toFixed(6) ?? ''}
            outputNetwork={getL1NetworkForChainEnv()}
            chainId={publicRuntimeConfig.l2ChainID}
            isDeposit={false}
          />
          <div className="w-full px-6 py-12 sm:hidden">{button}</div>
        </div>
      </div>
      <FaqSidebar />
    </div>
  );
}
