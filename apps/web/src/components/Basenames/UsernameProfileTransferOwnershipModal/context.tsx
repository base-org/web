'use client';

import { useErrors } from 'apps/web/contexts/Errors';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useWriteContractWithReceipt, {
  WriteTransactionWithReceiptStatus,
} from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { getTokenIdFromBasename } from 'apps/web/src/utils/usernames';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { isAddress, namehash } from 'viem';
import { useAccount } from 'wagmi';
import L2Resolver from 'apps/web/src/abis/L2Resolver';
import BaseRegistrarAbi from 'apps/web/src/abis/BaseRegistrarAbi';
import ReverseRegistrarAbi from 'apps/web/src/abis/ReverseRegistrarAbi';
import {
  USERNAME_BASE_REGISTRAR_ADDRESSES,
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REVERSE_REGISTRAR_ADDRESSES,
} from 'apps/web/src/addresses/usernames';

type ProfileTransferOwnershipProviderProps = {
  children?: ReactNode;
};

export enum OwnershipSteps {
  Search = 'search',
  OwnershipOverview = 'ownership-overview',
  WalletRequests = 'wallet-requests',
  Success = 'success',
}

export type OwnershipSettings = {
  id: 'setAddr' | 'reclaim' | 'setName' | 'safeTransferFrom';
  name: string;
  description: string;
  status: WriteTransactionWithReceiptStatus;
  contractFunction: () => Promise<void>;
};

export type ProfileTransferOwnershipContextProps = {
  ownershipSettings: OwnershipSettings[];
  isSuccess: boolean;
  currentOwnershipStep: OwnershipSteps;
  setCurrentOwnershipStep: Dispatch<SetStateAction<OwnershipSteps>>;
  recipientAddress: string;
  setRecipientAddress: Dispatch<SetStateAction<string>>;
};

export const ProfileTransferOwnershipContext = createContext<ProfileTransferOwnershipContextProps>({
  ownershipSettings: [],
  isSuccess: false,
  currentOwnershipStep: OwnershipSteps.Search,
  setCurrentOwnershipStep: () => undefined,
  recipientAddress: '',
  setRecipientAddress: () => undefined,
});

export default function ProfileTransferOwnershipProvider({
  children,
}: ProfileTransferOwnershipProviderProps) {
  // Hooks
  const { address } = useAccount();
  const { profileUsername } = useUsernameProfile();
  const { basenameChain } = useBasenameChain(profileUsername);
  const { logError } = useErrors();

  // States
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [currentOwnershipStep, setCurrentOwnershipStep] = useState<OwnershipSteps>(
    OwnershipSteps.Search,
  );

  // Values
  // TODO: VAlidate that it's not a contract
  const isValidRecipientAddress = isAddress(recipientAddress);
  const tokenId = getTokenIdFromBasename(profileUsername);

  // The 4 transactions we got to track
  const {
    initiateTransaction: initiateSafeTransferFrom,
    transactionStatus: safeTransferFromStatus,
  } = useWriteContractWithReceipt({
    chain: basenameChain,
    eventName: 'basename_safe_transfer_from',
  });

  const { initiateTransaction: initiateReclaim, transactionStatus: reclaimStatus } =
    useWriteContractWithReceipt({
      chain: basenameChain,
      eventName: 'basename_reclaim',
    });

  const { initiateTransaction: initiateSetAddr, transactionStatus: setAddrStatus } =
    useWriteContractWithReceipt({
      chain: basenameChain,
      eventName: 'basename_set_addr',
    });

  const { initiateTransaction: initiateSetName, transactionStatus: setNameStatus } =
    useWriteContractWithReceipt({
      chain: basenameChain,
      eventName: 'basename_set_name',
    });

  // The 4 Function with safety checks
  const updateSetAddr = useCallback(async () => {
    if (!isValidRecipientAddress) return Promise.reject('Invalid target address');

    await initiateSetAddr({
      abi: L2Resolver,
      address: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
      args: [namehash(profileUsername), recipientAddress],
      functionName: 'setAddr',
    });
  }, [
    basenameChain.id,
    initiateSetAddr,
    isValidRecipientAddress,
    profileUsername,
    recipientAddress,
  ]);

  const updateReclaim = useCallback(async () => {
    if (!isValidRecipientAddress) return Promise.reject('Invalid target address');

    await initiateReclaim({
      abi: BaseRegistrarAbi,
      address: USERNAME_BASE_REGISTRAR_ADDRESSES[basenameChain.id],
      args: [tokenId, recipientAddress],
      functionName: 'reclaim',
    });
  }, [basenameChain.id, initiateReclaim, isValidRecipientAddress, recipientAddress, tokenId]);

  const updateSafeTransferFrom = useCallback(async () => {
    if (!isValidRecipientAddress) return Promise.reject('Invalid target address');
    if (!address) return;

    await initiateSafeTransferFrom({
      abi: BaseRegistrarAbi,
      address: USERNAME_BASE_REGISTRAR_ADDRESSES[basenameChain.id],
      args: [address, recipientAddress, tokenId],
      functionName: 'safeTransferFrom',
    });
  }, [
    address,
    basenameChain.id,
    initiateSafeTransferFrom,
    isValidRecipientAddress,
    recipientAddress,
    tokenId,
  ]);

  const updateSetName = useCallback(async () => {
    if (!isValidRecipientAddress) return Promise.reject('Invalid target address');

    await initiateSetName({
      abi: ReverseRegistrarAbi,
      address: USERNAME_REVERSE_REGISTRAR_ADDRESSES[basenameChain.id],
      args: [''],
      functionName: 'setName',
    });
  }, [basenameChain.id, initiateSetName, isValidRecipientAddress]);

  // Function & status we can track and display the edit rec
  const ownershipSettings: OwnershipSettings[] = useMemo(() => {
    return [
      {
        id: 'setAddr',
        name: 'Address record',
        description: 'This Basename will resolve to the new address.',
        status: setAddrStatus,
        contractFunction: updateSetAddr,
      },
      {
        id: 'setName',
        name: 'Name record',
        description: 'This Basename will no longer be displayed with your current address.',
        status: setNameStatus,
        contractFunction: updateSetName,
      },
      {
        id: 'reclaim',
        name: 'Profile editing',
        description: 'Transfers profile editing rights for this Basename to the new address.',
        status: reclaimStatus,
        contractFunction: updateReclaim,
      },
      {
        id: 'safeTransferFrom',
        name: 'Token ownership',
        description: 'Transfers the token for this Basename to the new address.',
        status: safeTransferFromStatus,
        contractFunction: updateSafeTransferFrom,
      },
    ];
  }, [
    updateSetAddr,
    updateSetName,
    updateReclaim,
    updateSafeTransferFrom,
    reclaimStatus,
    safeTransferFromStatus,
    setAddrStatus,
    setNameStatus,
  ]);

  useEffect(() => {
    // Only when the wallet request steps is displaying
    if (currentOwnershipStep !== OwnershipSteps.WalletRequests) return;

    // Some transactions are loading / failed: return early
    if (
      !ownershipSettings.every((ownershipSetting) => {
        return [
          WriteTransactionWithReceiptStatus.Idle,
          WriteTransactionWithReceiptStatus.Success,
        ].includes(ownershipSetting.status);
      })
    )
      return;

    // [Play: Johnny Cash - Hurt]

    // For each ownership setting / wallet transaction
    for (const ownershipSetting of ownershipSettings) {
      // Get the current index & previous ownership setting (if any)
      const currentIndex = ownershipSettings.indexOf(ownershipSetting);
      const previousOwnershipSetting = ownershipSettings[currentIndex - 1];

      // If the setting transaction is Idle and either
      // - Is the first transaction
      // - Previous transaction is successfull
      const canCallfunction =
        ownershipSetting.status === WriteTransactionWithReceiptStatus.Idle &&
        (currentIndex === 0 ||
          previousOwnershipSetting.status === WriteTransactionWithReceiptStatus.Success);

      // then call the wallet request function
      if (canCallfunction) {
        ownershipSetting
          .contractFunction()
          .then()
          .catch((error) => {
            logError(error, `Failed contractFunction for ${ownershipSetting.id}`);
          });
        break;
      }
    }
  }, [currentOwnershipStep, logError, ownershipSettings]);

  const isSuccess = useMemo(
    () =>
      ownershipSettings.every(
        (ownershipSetting) => ownershipSetting.status === WriteTransactionWithReceiptStatus.Success,
      ),
    [ownershipSettings],
  );

  useEffect(() => {
    if (isSuccess) {
      setCurrentOwnershipStep(OwnershipSteps.Success);
    }
  }, [isSuccess]);

  const value = useMemo(() => {
    return {
      ownershipSettings,
      isSuccess,
      currentOwnershipStep,
      setCurrentOwnershipStep,
      recipientAddress,
      setRecipientAddress,
    };
  }, [currentOwnershipStep, isSuccess, ownershipSettings, recipientAddress]);

  return (
    <ProfileTransferOwnershipContext.Provider value={value}>
      {children}
    </ProfileTransferOwnershipContext.Provider>
  );
}

export function useProfileTransferOwnership() {
  const context = useContext(ProfileTransferOwnershipContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
