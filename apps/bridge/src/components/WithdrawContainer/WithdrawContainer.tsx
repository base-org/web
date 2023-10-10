import { useCallback, useMemo, useState } from 'react';
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
import { useAccount, useBalance, useContractWrite } from 'wagmi';
import { useIsPermittedToBridgeTo } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridgeTo';
import { getL2NetworkForChainEnv } from 'apps/bridge/src/utils/networks/getL2NetworkForChainEnv';
import { getL1NetworkForChainEnv } from 'apps/bridge/src/utils/networks/getL1NetworkForChainEnv';
import { getWithdrawalAssetsForChainEnv } from 'apps/bridge/src/utils/assets/getWithdrawalAssetsForChainEnv';
import { usePrepareInitiateCCTPBridge } from 'apps/bridge/src/utils/hooks/usePrepareInitiateCCTPBridge';
import { useIsContractApproved } from 'apps/bridge/src/utils/hooks/useIsContractApproved';
import { useApproveContract } from 'apps/bridge/src/utils/hooks/useApproveContract';
import { BridgeButton } from 'apps/bridge/src/components/BridgeButton/BridgeButton';

const activeAssets = getWithdrawalAssetsForChainEnv();

const { publicRuntimeConfig } = getConfig();
const chainId = parseInt(publicRuntimeConfig.l2ChainID);

export function WithdrawContainer() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [L2ApproveTxHash, setL2ApproveTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [L2TxHash, setL2TxHash] = useState('');
  const [withdrawTo, setWithdrawTo] = useState('');
  const [isApprovalTx, setIsApprovalTx] = useState(false);
  const isWalletConnected = useIsWalletConnected();
  const [selectedAsset, setSelectedAsset] = useState<Asset>(activeAssets[0]);

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
        ? utils.parseUnits('0', selectedAsset.decimals)
        : utils.parseUnits(withdrawAmount, selectedAsset.decimals);
    return !readERC20ApprovalError && readERC20Approval?.gte(withdrawAmountBN);
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
  const includeTosVersionByte = isMainnet && withdrawTo === '';
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
    mintRecipient: isSmartContractWallet ? (withdrawTo as `0x${string}`) : address,
    asset: selectedAsset,
    amount: withdrawAmount,
    destinationDomain: parseInt(publicRuntimeConfig.l1CCTPDomain),
    isPermittedToBridge,
    includeTosVersionByte,
    bridgeDirection: 'withdraw',
  });
  const { writeAsync: withdrawCCTPAssetWrite } = useContractWrite(withdrawCCTPAssetConfig);

  const {
    isOpen: isWithdrawModalOpen,
    onOpen: onOpenWithdrawModal,
    onClose: onCloseWithdrawModal,
  } = useDisclosure();

  const handleCloseWithdrawModal = useCallback(() => {
    onCloseWithdrawModal();
    setL2TxHash('');
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
        }

        // wait for confirmations
        await approveResult?.wait();

        // next, call the transfer function
        setIsApprovalTx(false);

        let withdrawMethod;
        if (selectedAsset.protocol === 'CCTP') {
          withdrawMethod = withdrawCCTPAssetWrite;
        } else {
          withdrawMethod = isSmartContractWallet ? withdrawERC20To : withdrawERC20;
        }
        const withdrawResult = await withdrawMethod?.();
        if (withdrawResult?.hash) {
          const withdrawTxHash = withdrawResult.hash;
          setL2TxHash(withdrawTxHash);
          setWithdrawAmount('0');
        }
      } catch (error) {
        onCloseWithdrawModal();
      }
    })();
  }, [
    approveWrite,
    isSmartContractWallet,
    onCloseWithdrawModal,
    onOpenWithdrawModal,
    selectedAsset.protocol,
    withdrawCCTPAssetWrite,
    withdrawERC20,
    withdrawERC20To,
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
            setL2TxHash(withdrawalTxHsh);
            setWithdrawAmount('0');
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

  let button;
  let withdrawDisabled;

  if (!isWalletConnected) {
    button = (
      <ConnectWalletButton className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto" />
    );
  } else if (selectedAsset.protocol === 'CCTP' && !readApprovalResult) {
    withdrawDisabled =
      (isSmartContractWallet && !utils.isAddress(withdrawTo ?? '')) || !isPermittedToBridge;

    button = (
      <BridgeButton
        onClick={initiateApproval}
        disabled={withdrawDisabled}
        className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto"
      >
        Approval
      </BridgeButton>
    );
  } else {
    withdrawDisabled =
      parseFloat(withdrawAmount) <= 0 ||
      parseFloat(withdrawAmount) >= parseFloat(L2Balance?.formatted ?? '0') ||
      withdrawAmount === '' ||
      (isSmartContractWallet && !isAddress(withdrawTo ?? '')) ||
      !isPermittedToBridge;

    button = (
      <BaseButton
        onClick={initiateWithdrawal}
        disabled={withdrawDisabled}
        toChainId={chainId}
        className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto"
      >
        Withdraw
      </BaseButton>
    );
  }

  return (
    <div className="flex-col lg:flex lg:h-full lg:flex-row">
      <div className="grow">
        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={handleCloseWithdrawModal}
          L2TxHash={L2TxHash}
        />
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
