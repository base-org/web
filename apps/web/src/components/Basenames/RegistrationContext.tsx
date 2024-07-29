'use client';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import {
  DiscountData,
  findFirstValidDiscount,
  useAggregatedDiscountValidators,
} from 'apps/web/src/hooks/useAggregatedDiscountValidators';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { Discount, isValidDiscount } from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Address, TransactionReceipt } from 'viem';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useCallsStatus } from 'wagmi/experimental';

export enum RegistrationSteps {
  Search = 'search',
  Claim = 'claim',
  Pending = 'pending',
  Success = 'success',
  Profile = 'profile',
}

export type RegistrationContextProps = {
  searchInputFocused: boolean;
  setSearchInputFocused: Dispatch<SetStateAction<boolean>>;
  searchInputHovered: boolean;
  setSearchInputHovered: Dispatch<SetStateAction<boolean>>;
  registrationStep: RegistrationSteps;
  setRegistrationStep: Dispatch<SetStateAction<RegistrationSteps>>;
  selectedName: string;
  setSelectedName: Dispatch<SetStateAction<string>>;
  registerNameTransactionHash: `0x${string}` | undefined;
  setRegisterNameTransactionHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  registerNameCallsBatchId: string;
  setRegisterNameCallsBatchId: Dispatch<SetStateAction<string>>;
  loadingDiscounts: boolean;
  discount: DiscountData | undefined;
  allActiveDiscounts: Set<Discount>;
  transactionData: TransactionReceipt | undefined;
  transactionError: unknown | null;
};

export const RegistrationContext = createContext<RegistrationContextProps>({
  searchInputFocused: false,
  searchInputHovered: false,
  registrationStep: RegistrationSteps.Search,
  selectedName: '',
  setSearchInputFocused: function () {
    return undefined;
  },
  setSearchInputHovered: function () {
    return undefined;
  },
  setRegistrationStep: function () {
    return undefined;
  },
  setSelectedName: function () {
    return undefined;
  },
  registerNameTransactionHash: '0x',
  setRegisterNameTransactionHash: function () {
    return undefined;
  },
  registerNameCallsBatchId: '',
  setRegisterNameCallsBatchId: function () {
    return undefined;
  },
  loadingDiscounts: true,
  discount: undefined,
  allActiveDiscounts: new Set(),
  transactionData: undefined,
  transactionError: null,
});

type RegistrationProviderProps = {
  children?: ReactNode;
};

// Maybe not the best place for this
export const registrationTransitionDuration = 'duration-700';

export default function RegistrationProvider({ children }: RegistrationProviderProps) {
  // UI state
  const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);
  const [searchInputHovered, setSearchInputHovered] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string>('');
  const [registrationStep, setRegistrationStep] = useState<RegistrationSteps>(
    RegistrationSteps.Search,
  );

  const { basenameChain } = useBasenameChain();

  // Analytics
  const { logEventWithContext } = useAnalytics();

  // Web3 data
  const { address } = useAccount();
  const { refetch: baseEnsNameRefetch } = useBaseEnsName({
    address,
  });

  // Username discount states
  const { data: discounts, loading: loadingDiscounts } = useAggregatedDiscountValidators();
  const discount = findFirstValidDiscount(discounts);

  const allActiveDiscounts = useMemo(
    () =>
      new Set(
        Object.keys(discounts)
          .filter(isValidDiscount)
          .map((key) => Discount[key]),
      ),
    [discounts],
  );

  // TODO: Not a big fan of this, I think ideally we'd have useRegisterNameCallback here
  const [registerNameTransactionHash, setRegisterNameTransactionHash] = useState<
    Address | undefined
  >();

  // Wait for text record transaction to be processed
  const {
    data: transactionData,
    isFetching: transactionIsFetching,
    isSuccess: transactionIsSuccess,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: registerNameTransactionHash,
    chainId: basenameChain.id,
    query: {
      enabled: !!registerNameTransactionHash,
    },
  });
  const [registerNameCallsBatchId, setRegisterNameCallsBatchId] = useState<string>('');

  const {
    data: callsData,
    isFetching: callsIsFetching,
    isSuccess: callsIsSuccess,
    error: callsError,
  } = useCallsStatus({
    id: registerNameCallsBatchId,
    query: {
      enabled: !!registerNameCallsBatchId,
    },
  });

  useEffect(() => {
    if (transactionIsFetching || callsIsFetching) {
      logEventWithContext('register_name_transaction_processing', ActionType.change);

      setRegistrationStep(RegistrationSteps.Pending);
    }

    if (transactionIsSuccess) {
      if (transactionData.status === 'success') {
        logEventWithContext('register_name_transaction_success', ActionType.change);
        // Reload current ENS name
        baseEnsNameRefetch()
          .then(() => setRegistrationStep(RegistrationSteps.Success))
          .catch(() => {});
      }

      if (transactionData.status === 'reverted') {
        logEventWithContext('register_name_transaction_reverted', ActionType.change, {
          error: `Transaction reverted: ${transactionData.transactionHash}`,
        });
      }
    }
    if (callsIsSuccess && callsData) {
      const successCall = callsData.receipts?.find((receipt) => receipt.status === 'success');
      if (successCall) {
        logEventWithContext('register_name_transaction_success', ActionType.change);
        baseEnsNameRefetch()
          .then(() => setRegistrationStep(RegistrationSteps.Success))
          .catch(() => {});
      } else {
        const failCall = callsData.receipts?.find((receipt) => receipt.status !== 'success');
        logEventWithContext('register_name_transaction_reverted', ActionType.change, {
          error: `Smart wallet transaction reverted: ${failCall?.transactionHash}`,
        });
      }
    }
  }, [
    baseEnsNameRefetch,
    callsData,
    callsIsFetching,
    callsIsSuccess,
    logEventWithContext,
    setRegistrationStep,
    transactionData,
    transactionIsFetching,
    transactionIsSuccess,
  ]);

  useEffect(() => {
    if (selectedName.length) {
      setRegistrationStep(RegistrationSteps.Claim);
    }
  }, [selectedName.length]);

  // Log user moving through the flow
  useEffect(() => {
    logEventWithContext(`step_${registrationStep}`, ActionType.change);
  }, [logEventWithContext, registrationStep]);

  // Log user selecting a name
  useEffect(() => {
    if (!selectedName) return;
    logEventWithContext('selected_name', ActionType.change);
  }, [logEventWithContext, selectedName]);

  const values = useMemo(() => {
    return {
      searchInputFocused,
      searchInputHovered,
      setSearchInputFocused,
      setSearchInputHovered,
      selectedName,
      setSelectedName,
      registrationStep,
      setRegistrationStep,
      registerNameTransactionHash,
      setRegisterNameTransactionHash,
      registerNameCallsBatchId,
      setRegisterNameCallsBatchId,
      loadingDiscounts,
      discount,
      allActiveDiscounts,
      transactionData,
      transactionError: transactionError ?? callsError,
    };
  }, [
    allActiveDiscounts,
    callsError,
    discount,
    loadingDiscounts,
    registerNameCallsBatchId,
    registerNameTransactionHash,
    registrationStep,
    searchInputFocused,
    searchInputHovered,
    selectedName,
    transactionData,
    transactionError,
  ]);

  return <RegistrationContext.Provider value={values}>{children}</RegistrationContext.Provider>;
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
