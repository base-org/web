/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Asset } from 'apps/bridge/src/types/Asset';
import { Network } from 'apps/bridge/src/types/Network';
import { networkToLayer } from 'apps/bridge/src/utils/networks/networkToLayer';
import Image from 'next/image';

type AssetListProps = {
  isOpen: boolean;
  isWithdraw: boolean;
  onClose: () => void;
  onOpen: () => void;
  assets: Asset[];
  selectedAsset: Asset;
  network: Network;
  handleChangeAsset: (asset: Asset) => () => void;
};

export function AssetList({
  isOpen,
  onClose,
  onOpen,
  assets,
  selectedAsset,
  network,
  handleChangeAsset,
}: AssetListProps) {
  const onAssetListClick = useCallback(() => {
    isOpen && onClose();
    !isOpen && onOpen();
  }, [isOpen, onClose, onOpen]);

  const networkLayer = networkToLayer(network);
  const selectedAssetSymbol =
    networkLayer === 'L1' ? selectedAsset.L1symbol : selectedAsset.L2symbol;

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer flex-row items-center font-sans"
        onClick={onAssetListClick}
      >
        <div className="align-center justify-center font-sans text-4xl text-stone-400 sm:text-6xl">
          {selectedAssetSymbol}
        </div>
        {isOpen ? (
          <ChevronUpIcon className="ml-2 h-4 text-white" />
        ) : (
          <ChevronDownIcon className="ml-2 h-4 text-white" />
        )}
      </div>

      <div
        className={`${
          !isOpen ? 'hidden' : ''
        } modal absolute left-0 z-50 mt-2 max-h-96 w-56 origin-top-right cursor-pointer overflow-y-auto rounded-md bg-cds-background-gray-5 text-white focus:outline-none`}
      >
        {assets.map((asset: Asset) => {
          const assetSymbol = networkLayer === 'L1' ? asset.L1symbol : asset.L2symbol;
          const assetIcon = networkLayer === 'L1' ? asset.L1icon : asset.L2icon;
          return (
            <div
              onClick={handleChangeAsset(asset)}
              className={`flex flex-row justify-between px-4 py-2 ${
                selectedAssetSymbol === assetSymbol ? 'bg-cds-background-level-2' : ''
              }`}
              key={`asset-${assetSymbol}`}
            >
              <div className="flex flex-row items-center justify-center">
                <Image src={assetIcon} width={32} height={32} alt="selected" className="mr-2" />
                {assetSymbol}{' '}
              </div>
              {selectedAssetSymbol === assetSymbol && (
                <Image src="/icons/check.svg" width={15} height={11} alt="selected" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
