import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
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

  const { address } = useAccount();
  const { refetch: baseEnsNameRefetch } = useBaseEnsName({
    address,
  });

  // TODO: Not a big fan of this, I think ideally we'd have useRegisterNameCallback here
  const [registerNameTransactionHash, setRegisterNameTransactionHash] = useState<
    `0x${string}` | undefined
  >();

  // Wait for text record transaction to be processed
  const { isFetching: transactionIsFetching, isSuccess: transactionIsSuccess } =
    useWaitForTransactionReceipt({
      hash: registerNameTransactionHash,
      query: {
        enabled: !!registerNameTransactionHash,
      },
    });

  useEffect(() => {
    if (transactionIsFetching) {
      setRegistrationStep(RegistrationSteps.Pending);
    }
    if (transactionIsSuccess) {
      // Reload current ENS name
      baseEnsNameRefetch()
        .then(() => {
          setRegistrationStep(RegistrationSteps.Success);
        })
        .catch(() => {
          // TODO: Error
        });
    }

    // TODO: Failed transaction
  }, [baseEnsNameRefetch, setRegistrationStep, transactionIsFetching, transactionIsSuccess]);

  useEffect(() => {
    if (selectedName.length) {
      setRegistrationStep(RegistrationSteps.Claim);
    }
  }, [selectedName.length]);

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
