import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useCallback, useState } from 'react';

const chainEnvToBridgeTime = {
  mainnet: 'Takes about 7 days',
  testnet: 'Takes about 20 minutes',
};

type BridgeProviderDropdownProps = {
  bridgeProvider: 'native' | 'thirdParty';
  setBridgeProvider: (bridgeProvider: 'native' | 'thirdParty') => void;
};

export function BridgeProviderDropdown({
  bridgeProvider,
  setBridgeProvider,
}: BridgeProviderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const chainEnv = useChainEnv();

  const handleToggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSelectNative = useCallback(() => {
    setBridgeProvider('native');
    setIsOpen(false);
  }, [setBridgeProvider]);

  const handleSelectThirdParty = useCallback(() => {
    setBridgeProvider('thirdParty');
    setIsOpen(false);
  }, [setBridgeProvider]);

  return (
    <div className="flex w-full flex-col space-y-2 px-4 pt-4">
      <span className="pb-4 font-mono uppercase text-white">Method</span>
      <div className="relative w-full">
        <div>
          <button
            type="button"
            onClick={handleToggleDropdown}
            className={`flex w-full flex-row items-center justify-between rounded border border-stone-400 bg-black p-4 text-lg text-stone-400 ${
              isOpen ? 'rounded-b-none' : ''
            }`}
          >
            {bridgeProvider === 'native' ? 'Official Base bridge' : 'Third-party bridge'}
            <svg className="text-gray-400 -mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="absolute z-10 flex w-full self-center">
            <div className="flex w-full flex-col items-start divide-y divide-stone-400 rounded rounded-t-none border border-t-0 border-stone-400 bg-black">
              <button
                onClick={handleSelectThirdParty}
                type="button"
                className={`block w-full p-4 text-left ${
                  bridgeProvider === 'thirdParty'
                    ? 'bg-cds-background-gray-5 text-stone-400'
                    : 'text-white'
                }`}
              >
                Third-party bridge
              </button>
              <button
                onClick={handleSelectNative}
                type="button"
                className={`block w-full p-4 text-left ${
                  bridgeProvider === 'native'
                    ? 'bg-cds-background-gray-5 text-stone-400'
                    : 'text-white'
                }`}
              >
                Official Base bridge
              </button>
            </div>
          </div>
        )}
      </div>
      <span className="text-stone-600">
        {bridgeProvider === 'native' ? chainEnvToBridgeTime[chainEnv] : 'Takes about 20 minutes'}
      </span>
    </div>
  );
}
