import { useCallback, useMemo, useState } from 'react';
import { BridgeButton } from 'apps/bridge/src/components/BridgeButton/BridgeButton';
import { BridgeInput } from 'apps/bridge/src/components/BridgeInput/BridgeInput';
import { ConnectWalletButton } from 'apps/bridge/src/components/ConnectWalletButton/ConnectWalletButton';
import { DepositModal } from 'apps/bridge/src/components/DepositModal/DepositModal';
import { FaqSidebar } from 'apps/bridge/src/components/Faq/FaqSidebar';
import { BaseButton } from 'apps/bridge/src/components/SwitchNetworkButton/SwitchNetworkButton';
import { TransactionSummary } from 'apps/bridge/src/components/TransactionSummary/TransactionSummary';
import { Asset } from 'apps/bridge/src/types/Asset';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import { useApproveContract } from 'apps/bridge/src/utils/hooks/useApproveContract';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useDisclosure } from 'apps/bridge/src/utils/hooks/useDisclosure';
import { useIsContractApproved } from 'apps/bridge/src/utils/hooks/useIsContractApproved';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import { useIsWalletConnected } from 'apps/bridge/src/utils/hooks/useIsWalletConnected';
import { usePrepareERC20Deposit } from 'apps/bridge/src/utils/hooks/usePrepareERC20Deposit';
import { usePrepareETHDeposit } from 'apps/bridge/src/utils/hooks/usePrepareETHDeposit';
import { parseUnits } from 'ethers/lib/utils.js';
import getConfig from 'next/config';
import { useAccount, useBalance, useContractWrite } from 'wagmi';

const assetList = getAssetListForChainEnv();

const { publicRuntimeConfig } = getConfig();
const chainId = parseInt(publicRuntimeConfig.l1ChainID);

export function DepositContainer() {
  const [depositAmount, setDepositAmount] = useState('0');
  const [L1ApproveTxHash, setL1ApproveTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [L1DepositTxHash, setL1DepositTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [isApprovalTx, setIsApprovalTx] = useState(false);
  const isWalletConnected = useIsWalletConnected();
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assetList[0]);
  const activeAssets = assetList.filter((asset) =>
    publicRuntimeConfig.assets.split(',').includes(asset.L1symbol.toLowerCase()),
  );
  const { address } = useAccount();

  const { data: L1Balance } = useBalance({
    address,
    token: selectedAsset.L1contract,
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });

  const { data: readERC20Approval, error: readERC20ApprovalError } = useIsContractApproved({
    contactAddress: selectedAsset.L1contract,
    address,
  });

  const readApprovalResult = useMemo(() => {
    const depositAmountBN =
      depositAmount === '' || Number.isNaN(Number(depositAmount))
        ? parseUnits('0', selectedAsset.decimals)
        : parseUnits(depositAmount, selectedAsset.decimals);
    return !readERC20ApprovalError && readERC20Approval?.gte(depositAmountBN);
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
    approveAmount: depositAmount,
    decimals: selectedAsset.decimals,
  });

  const { writeAsync: approveWrite } = useContractWrite(approveConfig);

  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';
  const includeTosVersionByte = isMainnet;
  const isPermittedToBridge = useIsPermittedToBridge();

  // deposit eth
  const depositETHConfig = usePrepareETHDeposit({
    userAddress: address,
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

  const { writeAsync: depositERC20Write } = useContractWrite(depositERC20Config);

  const initiateApproval = useCallback(() => {
    void (async () => {
      setIsApprovalTx(true);
      onOpenDepositModal();
      try {
        const approveResult = await approveWrite?.();
        if (approveResult?.hash) {
          const approveTxHash: `0x${string}` = approveResult.hash;
          setL1ApproveTxHash(approveTxHash);
        }

        // wait for confirmations
        await approveResult?.wait();

        // next, call the transfer function
        setIsApprovalTx(false);
        const depositResult = await depositERC20Write?.();
        if (depositResult?.hash) {
          const depositTxHash = depositResult.hash;
          setL1DepositTxHash(depositTxHash);
          setDepositAmount('0');
        }
      } catch (error) {
        onCloseDepositModal();
      }
    })();
  }, [approveWrite, depositERC20Write, onCloseDepositModal, onOpenDepositModal, setIsApprovalTx]);

  const initiateDeposit = useCallback(() => {
    void (async () => {
      onOpenDepositModal();
      try {
        // Only bridge on mainnet if user has accepted ToS. Always allow bridging on testnet.
        if (isPermittedToBridge) {
          const depositResult = await (selectedAsset.L1contract
            ? depositERC20Write?.()
            : depositETHWrite?.());
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
    depositERC20Write,
    depositETHWrite,
    onCloseDepositModal,
  ]);

  let button;
  if (!isWalletConnected) {
    button = (
      <ConnectWalletButton className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto" />
    );
  } else if (readApprovalResult || selectedAsset.L1symbol === 'ETH') {
    button = (
      <BaseButton
        onClick={initiateDeposit}
        disabled={
          parseFloat(depositAmount) <= 0 ||
          parseFloat(depositAmount) >= parseFloat(L1Balance?.formatted ?? '0') ||
          depositAmount === ''
        }
        toChainId={chainId}
        className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto"
      >
        {`Deposit ${selectedAsset.L1symbol}`}
      </BaseButton>
    );
  } else {
    button = (
      <BridgeButton
        onClick={initiateApproval}
        disabled={false}
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
          inputNetwork={isMainnet ? 'homestead' : 'goerli'}
          outputNetwork={isMainnet ? 'base' : 'base-goerli'}
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

        <div className="border-t border-sidebar-border">
          <TransactionSummary
            header="TRANSACTION SUMMARY"
            selectedAsset={selectedAsset}
            balance={parseFloat(depositAmount ?? '0').toFixed(6) ?? ''}
            outputNetwork={isMainnet ? 'base' : 'base-goerli'}
            chainId={publicRuntimeConfig.l1ChainID}
            isDeposit
          />
          <div className="w-full py-12 px-6 sm:hidden">{button}</div>
        </div>
      </div>
      <FaqSidebar />
    </div>
  );
}
