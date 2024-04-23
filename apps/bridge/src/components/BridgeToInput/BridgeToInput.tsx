import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

type BridgeToInputProps = {
  bridgeTo: string;
  setBridgeTo: Dispatch<SetStateAction<string>>;
  action: 'deposit' | 'withdraw';
};

export function BridgeToInput({ bridgeTo, setBridgeTo, action }: BridgeToInputProps) {
  function handleChangeBridgeTo(e: { target: { value: SetStateAction<string> } }) {
    setBridgeTo(e.target.value);
  }

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-row items-center space-x-2 mb-1">
        <span className="font-sans text-sm font-medium text-white">{action === 'deposit' ? 'Deposit to' : 'Withdraw to'}</span>
        <div className="has-tooltip">
          <span className="tooltip -mt-10 ml-6 rounded-lg bg-cds-background-gray-90 p-2 text-black shadow-lg">
            Only send funds on networks supported by your wallet provider if it is a smart contract
            wallet or there may be permanent loss of funds.
          </span>
          <Image alt="tooltip" src="/icons/question-mark-circled.svg" width={16} height={16} />
        </div>
      </div>
      <input
        className="bg-transparent font-sans text-md text-white outline-none max-[640px]:grow sm:text-xl border border-cds-background-gray-60 p-4 rounded min-[640px]:w-96"
        placeholder="Wallet address"
        value={bridgeTo}
        onChange={handleChangeBridgeTo}
        aria-label="Wallet address"
      />
    </div>
  );
}