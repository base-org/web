import { useCallback, useMemo, useState } from 'react';
import { BridgeButton } from 'apps/bridge/src/components/BridgeButton/BridgeButton';
import { BridgeInput } from 'apps/bridge/src/components/BridgeInput/BridgeInput';
import { BridgeToInput } from 'apps/bridge/src/components/BridgeToInput/BridgeToInput';
import { ConnectWalletButton } from 'apps/bridge/src/components/ConnectWalletButton/ConnectWalletButton';
import { DepositModal } from 'apps/bridge/src/components/DepositModal/DepositModal';
import { FaqSidebar } from 'apps/bridge/src/components/Faq/FaqSidebar';
import { BaseButton } from 'apps/bridge/src/components/SwitchNetworkButton/SwitchNetworkButton';
import { TransactionSummary } from 'apps/bridge/src/components/TransactionSummary/TransactionSummary';
import { Asset } from 'apps/bridge/src/types/Asset';
import { useApproveContract } from 'apps/bridge/src/utils/hooks/useApproveContract';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useDisclosure } from 'apps/bridge/src/utils/hooks/useDisclosure';
import { useGetCode } from 'apps/bridge/src/utils/hooks/useGetCode';
import { useIsContractApproved } from 'apps/bridge/src/utils/hooks/useIsContractApproved';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import { useIsWalletConnected } from 'apps/bridge/src/utils/hooks/useIsWalletConnected';
import { usePrepareERC20Deposit } from 'apps/bridge/src/utils/hooks/usePrepareERC20Deposit';
import { usePrepareERC20DepositTo } from 'apps/bridge/src/utils/hooks/usePrepareERC20DepositTo';
import { usePrepareETHDeposit } from 'apps/bridge/src/utils/hooks/usePrepareETHDeposit';
import { isAddress, parseUnits } from 'viem';
import { waitForTransaction } from 'wagmi/actions';
import getConfig from 'next/config';
import { useAccount, useBalance, useContractWrite } from 'wagmi';
import { useIsPermittedToBridgeTo } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridgeTo';
import { getL1NetworkForChainEnv } from 'apps/bridge/src/utils/networks/getL1NetworkForChainEnv';
import { getL2NetworkForChainEnv } from 'apps/bridge/src/utils/networks/getL2NetworkForChainEnv';
import { getDepositAssets } from 'apps/bridge/src/utils/assets/getDepositAssets';
import { usePrepareInitiateCCTPBridge } from 'apps/bridge/src/utils/hooks/usePrepareInitiateCCTPBridge';

const { publicRuntimeConfig } = getConfig();

const activeAssets = getDepositAssets();

const chainId = parseInt(publicRuntimeConfig.l1ChainID);

export function DepositContainer() {
  const [depositAmount, setDepositAmount] = useState('0');
  const [L1ApproveTxHash, setL1ApproveTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [L1DepositTxHash, setL1DepositTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [depositTo, setDepositTo] = useState('');
  const [isApprovalTx, setIsApprovalTx] = useState(false);
  const isWalletConnected = useIsWalletConnected();
  const [selectedAsset, setSelectedAsset] = useState<Asset>(activeAssets[0]);

  const { address } = useAccount();
  const codeAtAddress = useGetCode(chainId, address);
  const isSmartContractWallet = !!codeAtAddress && codeAtAddress !== '0x';

  const { data: L1Balance } = useBalance({
    address,
    token: selectedAsset.L1contract,
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });

  const { data: readERC20Approval, error: readERC20ApprovalError } = useIsContractApproved({
    contactAddress: selectedAsset.L1contract,
    address,
    spender:
      selectedAsset.protocol === 'CCTP'
        ? publicRuntimeConfig.l1CCTPTokenMessengerAddress
        : publicRuntimeConfig.l1BridgeProxyAddress,
  });

  const readApprovalResult = useMemo(() => {
    const depositAmountBN =
      depositAmount === '' || Number.isNaN(Number(depositAmount))
        ? parseUnits('0', selectedAsset.decimals)
        : parseUnits(depositAmount, selectedAsset.decimals);
    return !!(!readERC20ApprovalError && readERC20Approval && readERC20Approval >= depositAmountBN);
  }, [depositAmount, selectedAsset.decimals, readERC20ApprovalError, readERC20Approval]);

  const {
    isOpen: isDepositModalOpen,
    onOpen: onOpenDepositModal,
    onClose: onCloseDepositModal,
  } = useDisclosure();

  const handleCloseDepositModal = useCallback(() => {
    onCloseDepositModal();
    setL1DepositTxHash(undefined);
  }, [onCloseDepositModal]);

  // approve erc20
  const approveConfig = useApproveContract({
    contractAddress: selectedAsset.L1contract,
    spender:
      selectedAsset.protocol === 'CCTP'
        ? publicRuntimeConfig.l1CCTPTokenMessengerAddress
        : publicRuntimeConfig.l1BridgeProxyAddress,
    approveAmount: depositAmount,
    decimals: selectedAsset.decimals,
  });
  const { writeAsync: approveWrite } = useContractWrite(approveConfig);

  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';
  const includeTosVersionByte = isMainnet && depositTo === '';
  const isUserPermittedToBridge = useIsPermittedToBridge();
  const isPermittedToBridgeTo = useIsPermittedToBridgeTo(depositTo as `0x${string}`);
  const isPermittedToBridge = isSmartContractWallet
    ? isUserPermittedToBridge && isPermittedToBridgeTo
    : isUserPermittedToBridge;

  // deposit eth
  const depositETHConfig = usePrepareETHDeposit({
    userAddress: isSmartContractWallet ? (depositTo as `0x${string}`) : address,
    depositAmount,
    isPermittedToBridge,
    includeTosVersionByte,
  });
  const { writeAsync: depositETHWrite } = useContractWrite(depositETHConfig);

  // deposit erc20
  const depositERC20Config = usePrepareERC20Deposit({
    asset: selectedAsset,
    depositAmount,
    readApprovalResult,
    isPermittedToBridge,
    includeTosVersionByte,
  });
  const depositERC20ToConfig = usePrepareERC20DepositTo({
    asset: selectedAsset,
    to: depositTo as `0x${string}`,
    depositAmount,
    readApprovalResult,
    isPermittedToBridge,
    includeTosVersionByte,
  });
  const { writeAsync: depositERC20Write } = useContractWrite(depositERC20Config);
  const { writeAsync: depositERC20ToWrite } = useContractWrite(depositERC20ToConfig);

  // deposit using CCTP (eg USDC)
  const depositCCTPAssetConfig = usePrepareInitiateCCTPBridge({
    mintRecipient: isSmartContractWallet ? (depositTo as `0x${string}`) : address,
    asset: selectedAsset,
    depositAmount,
    destinationDomain: parseInt(publicRuntimeConfig.l2CCTPDomain),
    isPermittedToBridge,
    includeTosVersionByte,
  });
  const { writeAsync: depositCCTPAssetWrite } = useContractWrite(depositCCTPAssetConfig);

  const initiateApproval = useCallback(() => {
    void (async () => {
      setIsApprovalTx(true);
      onOpenDepositModal();
      try {
        const approveResult = await approveWrite?.();
        if (approveResult?.hash) {
          const approveTxHash: `0x${string}` = approveResult.hash;
          setL1ApproveTxHash(approveTxHash);
          // wait for confirmations
          await waitForTransaction({ hash: approveResult?.hash });
        }

        // next, call the transfer function
        setIsApprovalTx(false);

        let depositMethod;
        if (selectedAsset.protocol === 'CCTP') {
          depositMethod = depositCCTPAssetWrite;
        } else {
          depositMethod = isSmartContractWallet ? depositERC20ToWrite : depositERC20Write;
        }
        const depositResult = await depositMethod?.();
        if (depositResult?.hash) {
          const depositTxHash = depositResult.hash;
          setL1DepositTxHash(depositTxHash);
          setDepositAmount('0');
        }
      } catch (error) {
        onCloseDepositModal();
      }
    })();
  }, [
    approveWrite,
    depositCCTPAssetWrite,
    depositERC20ToWrite,
    depositERC20Write,
    isSmartContractWallet,
    onCloseDepositModal,
    onOpenDepositModal,
    selectedAsset.protocol,
  ]);

  const initiateDeposit = useCallback(() => {
    void (async () => {
      onOpenDepositModal();
      try {
        // Only bridge on mainnet if user has accepted ToS. Always allow bridging on testnet.
        if (isPermittedToBridge) {
          let depositMethod;
          if (selectedAsset.L1contract) {
            if (selectedAsset.protocol === 'CCTP') {
              depositMethod = depositCCTPAssetWrite;
            } else {
              depositMethod = isSmartContractWallet ? depositERC20ToWrite : depositERC20Write;
            }
          } else {
            depositMethod = depositETHWrite;
          }
          const depositResult = await depositMethod?.();
          if (depositResult?.hash) {
            const depositTxHash = depositResult.hash;
            setL1DepositTxHash(depositTxHash);
            setDepositAmount('0');
          }
        } else {
          onCloseDepositModal();
        }
      } catch (error) {
        onCloseDepositModal();
      }
    })();
  }, [
    onOpenDepositModal,
    isPermittedToBridge,
    selectedAsset.L1contract,
    selectedAsset.protocol,
    depositCCTPAssetWrite,
    isSmartContractWallet,
    depositERC20ToWrite,
    depositERC20Write,
    depositETHWrite,
    onCloseDepositModal,
  ]);

  let button;
  let depositDisabled;
  if (!isWalletConnected) {
    button = (
      <ConnectWalletButton className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto" />
    );
  } else if (readApprovalResult || selectedAsset.L1symbol === 'ETH') {
    depositDisabled =
      parseFloat(depositAmount) <= 0 ||
      parseFloat(depositAmount) >= parseFloat(L1Balance?.formatted ?? '0') ||
      depositAmount === '' ||
      (isSmartContractWallet && !isAddress(depositTo ?? '')) ||
      !isPermittedToBridge;

    button = (
      <BaseButton
        onClick={initiateDeposit}
        disabled={depositDisabled}
        toChainId={chainId}
        className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto"
      >
        {`Deposit ${selectedAsset.L1symbol}`}
      </BaseButton>
    );
  } else {
    depositDisabled =
      (isSmartContractWallet && !isAddress(depositTo ?? '')) || !isPermittedToBridge;

    button = (
      <BridgeButton
        onClick={initiateApproval}
        disabled={depositDisabled}
        className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto"
      >
        Approval
      </BridgeButton>
    );
  }

  return (
    <div className="flex-col lg:flex lg:h-full lg:flex-row">
      <div className="grow">
        <DepositModal
          isOpen={isDepositModalOpen}
          onClose={handleCloseDepositModal}
          L1ApproveTxHash={L1ApproveTxHash}
          L1DepositTxHash={L1DepositTxHash}
          isApprovalTx={isApprovalTx}
        />
        <BridgeInput
          inputNetwork={getL1NetworkForChainEnv()}
          outputNetwork={getL2NetworkForChainEnv()}
          balance={parseFloat(L1Balance?.formatted ?? '0').toFixed(6) ?? ''}
          amount={depositAmount}
          setAmount={setDepositAmount}
          assets={activeAssets}
          isWithdraw={false}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
        >
          {button}
        </BridgeInput>

        {isSmartContractWallet && (
          <BridgeToInput bridgeTo={depositTo} setBridgeTo={setDepositTo} action="deposit" />
        )}

        <div className="border-t border-sidebar-border">
          <TransactionSummary
            header="TRANSACTION SUMMARY"
            selectedAsset={selectedAsset}
            balance={parseFloat(depositAmount ?? '0').toFixed(6) ?? ''}
            outputNetwork={getL2NetworkForChainEnv()}
            chainId={publicRuntimeConfig.l1ChainID}
            isDeposit
          />
          <div className="w-full px-6 py-12 sm:hidden">{button}</div>
        </div>
      </div>
      <FaqSidebar />
    </div>
  );
}
