import { type BadgeNames } from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type BadgeContextProps = {
  modalOpen: boolean;
  // setSearchInputFocused: Dispatch<SetStateAction<boolean>>;
  selectedBadge: BadgeNames | undefined;
  setSelectedBadge: Dispatch<SetStateAction<BadgeNames | undefined>>;
  closeModal: () => void;
  selectBadge: (badge: BadgeNames) => void;
};

export const BadgeContext = createContext<BadgeContextProps>({
  modalOpen: false,
  selectedBadge: undefined,
  setSelectedBadge: () => {},
  closeModal: () => {},
  selectBadge: () => {},
});

type BadgeProviderProps = {
  children?: ReactNode;
};

export default function BadgeProvider({ children }: BadgeProviderProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedBadge, setSelectedBadge] = useState<BadgeNames | undefined>(undefined);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedBadge(undefined);
  }, [setModalOpen, setSelectedBadge]);
  const selectBadge = useCallback(
    (badge: BadgeNames) => {
      setSelectedBadge(badge);
      setModalOpen(true);
    },
    [setModalOpen, setSelectedBadge],
  );

  const values = useMemo(() => {
    return {
      modalOpen,

      selectedBadge,
      setSelectedBadge,
      closeModal,
      selectBadge,
    };
  }, [closeModal, modalOpen, selectBadge, selectedBadge]);

  return <BadgeContext.Provider value={values}>{children}</BadgeContext.Provider>;
}

export function useBadgeContext() {
  const context = useContext(BadgeContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
