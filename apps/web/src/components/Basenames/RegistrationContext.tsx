import { useAnalytics } from 'apps/web/contexts/Analytics';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
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
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';

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
  registerNameTransactionHash: string;
  setRegisterNameTransactionHash: Dispatch<SetStateAction<string>>;
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
  registerNameTransactionHash: 'string',
  setRegisterNameTransactionHash: function () {
    return undefined;
  },
});

type RegistrationProviderProps = {
  children?: ReactNode;
};

// Maybe not the best place for this
export const registrationTransitionDuration = 'duration-700';

export default function RegistrationProvider({ children }: RegistrationProviderProps) {
  const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);
  const [searchInputHovered, setSearchInputHovered] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string>('');
  const [registrationStep, setRegistrationStep] = useState<RegistrationSteps>(
    RegistrationSteps.Search,
  );

  const { logEventWithContext } = useAnalytics();
  const { address } = useAccount();
  const { refetch: baseEnsNameRefetch } = useBaseEnsName({
    address,
  });

  // TODO: Not a big fan of this, I think ideally we'd have useRegisterNameCallback here
  const [registerNameTransactionHash, setRegisterNameTransactionHash] = useState<
    `0x${string}` | undefined
  >();

  // Wait for text record transaction to be processed
  const {
    data: transactionData,
    isFetching: transactionIsFetching,
    isSuccess: transactionIsSuccess,
  } = useWaitForTransactionReceipt({
    hash: registerNameTransactionHash,
    query: {
      enabled: !!registerNameTransactionHash,
    },
  });

  useEffect(() => {
    if (transactionIsFetching) {
      logEventWithContext('register_name_transaction_processing', ActionType.change);

      setRegistrationStep(RegistrationSteps.Pending);
    }

    if (transactionIsSuccess) {
      // TODO: This can be a failed transaction
      if (transactionData.status === 'success') {
        // TODO: What about failed transaction?
        logEventWithContext('register_name_transaction_success', ActionType.change);
        // Reload current ENS name
        baseEnsNameRefetch()
          .then(() => {
            setRegistrationStep(RegistrationSteps.Success);
          })
          .catch(() => {
            // TODO: Show an error to the user
          });
      }

      if (transactionData.status === 'reverted') {
        logEventWithContext('register_name_transaction_reverted', ActionType.change);

        // TODO: Show an error to the user
      }
    }

    // TODO: Failed transaction
  }, [
    baseEnsNameRefetch,
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

    setSearchInputFocused(false);
  }, [logEventWithContext, selectedName]);

  // TODO: RegisterName function callback

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
    };
  }, [
    registerNameTransactionHash,
    registrationStep,
    searchInputFocused,
    searchInputHovered,
    selectedName,
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
