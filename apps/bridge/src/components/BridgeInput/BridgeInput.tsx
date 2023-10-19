import { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { AssetList } from 'apps/bridge/src/components/AssetList/AssetList';
import { Asset, CustomChain } from 'apps/bridge/src/types/Asset';
import { Network } from 'apps/bridge/src/types/Network';
import { formatCryptoBalance, usdFormatter } from 'apps/bridge/src/utils/formatter/balance';
import { useConversionRate } from 'apps/bridge/src/utils/hooks/useConversionRate';
import { useDisclosure } from 'apps/bridge/src/utils/hooks/useDisclosure';
import { useFindChainByNetwork } from 'apps/bridge/src/utils/hooks/useFindNetwork';
import useMediaQuery from 'apps/bridge/src/utils/hooks/useMediaQuery';
import { networkToLayer } from 'apps/bridge/src/utils/networks/networkToLayer';
import { parseUnits } from 'viem';
import Image from 'next/image';

type BridgeInputProps = {
  inputNetwork: Network;
  outputNetwork: Network;
  balance: string;
  amount: string;
  assets: Asset[];
  selectedAsset: Asset;
  setAmount: Dispatch<SetStateAction<string>>;
  setSelectedAsset: Dispatch<SetStateAction<Asset>>;
  isWithdraw: boolean;
  children?: JSX.Element;
};

export function BridgeInput({
  inputNetwork,
  outputNetwork,
  balance,
  amount,
  setAmount,
  assets,
  selectedAsset,
  setSelectedAsset,
  isWithdraw,
  children,
}: BridgeInputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const input = useRef<HTMLInputElement>(null);
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const inputChain = useFindChainByNetwork({ network: inputNetwork }) as CustomChain;
  const outputChain = useFindChainByNetwork({ network: outputNetwork }) as CustomChain;
  const conversionRateData = useConversionRate({
    asset: selectedAsset.apiId,
  });
  const conversionRate =
    conversionRateData && amount ? usdFormatter(conversionRateData * +amount) : '$0.00';

  function handleChangeAmount(e: { target: { value: SetStateAction<string> } }) {
    const value = parseFloat(e.target.value.toString());
    const digits = [...(e.target.value.toString() || '0')];
    // only allow the following `-`,`0,`1`.....`9`
    const allowedChars = new Set([
      '46',
      '48',
      '49',
      '50',
      '51',
      '52',
      '53',
      '54',
      '55',
      '56',
      '57',
    ]);
    const filteredNonDigits = digits.find((d) => {
      const code = d.charCodeAt(0);
      if (!allowedChars.has(code.toString())) return false;
      return true;
    });
    // the input contains any not allowed ch
    if (!filteredNonDigits) return;
    // contains double `.`
    if (e.target.value.toString().split('.').length > 2) return;
    // less than 0
    if (value < 0) return;
    // long text
    if (e.target.value.length > 12) return;

    setAmount(e.target.value);
  }

  const handleChangeAsset = useCallback(
    (asset: Asset) => {
      return () => {
        onClose();
        setSelectedAsset(asset);
        setAmount('');
      };
    },
    [onClose, setAmount, setSelectedAsset],
  );

  function setMaxBalance() {
    setAmount((parseFloat(balance) * 0.99).toFixed(6).toString());
  }

  const error =
    amount !== '' &&
    balance !== '' &&
    parseUnits(amount, 18) > parseUnits(balance, 18) &&
    'Insufficient balance';

  function handleFocus() {
    if (amount === '0') setAmount('');
    input.current?.focus();
  }

  const networkLayer = networkToLayer(inputNetwork);
  const selectedAssetSymbol =
    networkLayer === 'L1' ? selectedAsset.L1symbol : selectedAsset.L2symbol;

  return (
    <div className="flex w-full max-w-xl flex-col p-6">
      <span className="mb-4 font-mono text-sm font-medium text-white">NETWORK</span>
      <div className="mb-4 flex flex-row items-center">
        <div className="flex flex-row items-center justify-center text-white">
          <div>
            <Image src={inputChain?.svg} width={32} height={32} alt={inputChain?.name} />
          </div>
          <div className="ml-3 flex flex-col font-sans">
            <div className="text-md text-white">From</div>
            <div className="text-sm text-stone-400">{inputChain?.name}</div>
          </div>
        </div>
        <ArrowRightIcon className="ml-3 mr-3 h-4 w-4 text-white" />
        <div className="flex flex-row items-center justify-center text-white">
          <div>
            <Image src={outputChain?.svg} width={32} height={32} alt={outputChain?.name} />
          </div>
          <div className="ml-3 flex flex-col font-sans">
            <div className="text-md text-white">To</div>
            <div className="text-sm text-stone-400">{outputChain?.name}</div>
          </div>
        </div>
      </div>
      <span className="mt-8 font-mono text-sm font-medium text-white">AMOUNT</span>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="flex max-w-[100vw] cursor-text flex-row items-center justify-between"
        onClick={handleFocus}
      >
        <input
          className="bg-transparent font-sans text-4xl text-white outline-none max-[640px]:grow sm:text-6xl"
          maxLength={9}
          type="number"
          key="amountInput"
          ref={input}
          pattern="[0-9]*"
          inputMode="decimal"
          style={
            isDesktop
              ? {
                  minWidth: 40,
                  width: amount.length * 37 + 20,
                  maxWidth: 16 * 31,
                }
              : {
                  maxWidth: 'calc(100vw - 120px)',
                }
          }
          placeholder="0"
          min="0"
          value={amount}
          onChange={handleChangeAmount}
        />
        <div className="relative flex flex-row">
          <AssetList
            isOpen={isOpen}
            onClose={onClose}
            isWithdraw={isWithdraw}
            onOpen={onOpen}
            assets={assets}
            selectedAsset={selectedAsset}
            network={inputNetwork}
            handleChangeAsset={handleChangeAsset}
          />
        </div>
      </div>
      {error && (
        <div className="flex flex-row space-x-0.5 text-sm text-stone-600">
          <span className="text-md font-sans text-red-600">{error}</span>
        </div>
      )}
      <div className="mt-6 flex flex-row items-center justify-between">
        <div className="flex flex-col space-x-0.5">
          <span className="text-md font-sans text-white">{conversionRate} USD</span>
          <span className="text-md font-sans text-stone-600">
            {formatCryptoBalance(balance)} {selectedAssetSymbol} available
          </span>
        </div>
        <div>
          <button
            onClick={setMaxBalance}
            className="border-gray-400 flex flex-row items-center justify-center rounded border px-8 py-2 font-sans text-sm text-white "
            type="button"
          >
            MAX
          </button>
        </div>
      </div>
      <div className="hidden w-64 flex-row pt-9 sm:block">{children}</div>
    </div>
  );
}
