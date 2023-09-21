import { useCallback, useState } from 'react';
import { BridgeInput } from 'apps/bridge/src/components/BridgeInput/BridgeInput';
import { BridgeToInput } from 'apps/bridge/src/components/BridgeToInput/BridgeToInput';
import { ConnectWalletButton } from 'apps/bridge/src/components/ConnectWalletButton/ConnectWalletButton';
import { FaqSidebar } from 'apps/bridge/src/components/Faq/FaqSidebar';
import { BaseButton } from 'apps/bridge/src/components/SwitchNetworkButton/SwitchNetworkButton';
import { TransactionSummary } from 'apps/bridge/src/components/TransactionSummary/TransactionSummary';
import { WithdrawModal } from 'apps/bridge/src/components/WithdrawModal/WithdrawModal';
import { Asset } from 'apps/bridge/src/types/Asset';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useDisclosure } from 'apps/bridge/src/utils/hooks/useDisclosure';
import { useGetCode } from 'apps/bridge/src/utils/hooks/useGetCode';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import { useIsWalletConnected } from 'apps/bridge/src/utils/hooks/useIsWalletConnected';
import { usePrepareERC20Withdrawal } from 'apps/bridge/src/utils/hooks/usePrepareERC20Withdrawal';
import { usePrepareERC20WithdrawalTo } from 'apps/bridge/src/utils/hooks/usePrepareERC20WithdrawalTo';
import { usePrepareETHWithdrawal } from 'apps/bridge/src/utils/hooks/usePrepareETHWithdrawal';
import { utils } from 'ethers';
import getConfig from 'next/config';
import { useAccount, useBalance, useContractWrite } from 'wagmi';
import { useIsPermittedToBridgeTo } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridgeTo';

const assetList = getAssetListForChainEnv();

const { publicRuntimeConfig } = getConfig();
const chainId = parseInt(publicRuntimeConfig.l2ChainID);

export function WithdrawContainer() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [L2TxHash, setL2TxHash] = useState('');
  const [withdrawTo, setWithdrawTo] = useState('');
  const isWalletConnected = useIsWalletConnected();
  const activeAssets = assetList.filter((asset) =>
    publicRuntimeConfig.assets.split(',').includes(asset.L1symbol.toLowerCase()),
  );
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assetList[0]);

  const { address } = useAccount();
  const codeAtAddress = useGetCode(address);
  const isSmartContractWallet = !!codeAtAddress && codeAtAddress !== '0x';

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
  const isPermittedToBridge = isSmartContractWallet ? isUserPermittedToBridge && isPermittedToBridgeTo : isUserPermittedToBridge;

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

  const {
    isOpen: isWithdrawModalOpen,
    onOpen: onOpenWithdrawModal,
    onClose: onCloseWithdrawModal,
  } = useDisclosure();

  const handleCloseWithdrawModal = useCallback(() => {
    onCloseWithdrawModal();
    setL2TxHash('');
  }, [onCloseWithdrawModal]);

  const initiateWithdrawal = useCallback(() => {
    void (async () => {
      onOpenWithdrawModal();
      try {
        // Only bridge on mainnet if user has accepted ToS. Always allow bridging on testnet.
        if (isPermittedToBridge) {
          let withdrawMethod;
          if (selectedAsset.L1contract) {
            if (isSmartContractWallet) {
              withdrawMethod = withdrawERC20To;
            } else {
              withdrawMethod = withdrawERC20;
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
    isSmartContractWallet,
    withdrawERC20To,
    withdrawERC20,
    withdraw,
    onCloseWithdrawModal,
  ]);

  let button;
  if (!isWalletConnected) {
    button = (
      <ConnectWalletButton className="text-md flex w-full items-center justify-center rounded-md p-4 font-sans font-bold uppercase sm:w-auto" />
    );
  } else {
    button = (
      <BaseButton
        onClick={initiateWithdrawal}
        disabled={
          (parseFloat(withdrawAmount) <= 0 ||
          parseFloat(withdrawAmount) >= parseFloat(L2Balance?.formatted ?? '0') ||
          withdrawAmount === '' ||
          (isSmartContractWallet && !utils.isAddress(withdrawTo ?? ''))) || !isPermittedToBridge
        }
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
          inputNetwork={isMainnet ? 'base' : 'base-goerli'}
          isWithdraw
          outputNetwork={isMainnet ? 'homestead' : 'goerli'}
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
            outputNetwork={isMainnet ? 'homestead' : 'goerli'}
            chainId={publicRuntimeConfig.l2ChainID}
            isDeposit={false}
          />
          <div className="w-full py-12 px-6 sm:hidden">{button}</div>
        </div>
      </div>
      <FaqSidebar />
    </div>
  );
}