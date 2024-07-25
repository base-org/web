import {
  RefObject,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';

// Context to keep track of dropdown state
export type DropdownContextValue = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  lastCopiedId: string | undefined;
  setLastCopiedId: Dispatch<SetStateAction<string | undefined>>;
  dropdownToggleRef: RefObject<HTMLSpanElement> | undefined;
};

export const DropdownContext = createContext<DropdownContextValue>({
  open: false,
  setOpen: () => undefined,
  lastCopiedId: undefined,
  setLastCopiedId: () => undefined,
  dropdownToggleRef: undefined,
});

export type DropdownProps = {
  children: ReactNode;
};

export default function Dropdown({ children }: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [lastCopiedId, setLastCopiedId] = useState<string>();
  const dropdownToggleRef = useRef<HTMLSpanElement>(null);

  const values = useMemo(() => {
    return {
      open,
      dropdownToggleRef,
      setOpen,
      lastCopiedId,
      setLastCopiedId,
    };
  }, [open, lastCopiedId]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  const openDropdown = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <DropdownContext.Provider value={values}>
      <div onMouseLeave={closeDropdown} onMouseEnter={openDropdown}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
