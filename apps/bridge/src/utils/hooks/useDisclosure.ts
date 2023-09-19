import { useCallback, useState } from 'react';

type UseDisclosureReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

export function useDisclosure(isOpenDefault = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenDefault);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((state) => !state), []);

  return { isOpen, onOpen, onClose, onToggle };
}
