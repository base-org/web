import { ReactElement, useEffect } from 'react';
import { OFACModal } from 'apps/bridge/src/components/OFACModal/OFACModal';
import { TOSModal } from 'apps/bridge/src/components/TOSModal/TOSModal';
import { DeprecationModal } from 'apps/bridge/src/components/DeprecationModal/DeprecationModal';
import { useOFACStatus } from 'apps/bridge/src/contexts/OFACContext';
import { useTOSStatus } from 'apps/bridge/src/contexts/TOSContext';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useDisclosure } from 'apps/bridge/src/utils/hooks/useDisclosure';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

type LayoutProps = { children: ReactElement };

export function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const { isConnected } = useAccount();

  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';

  const { isOFACAllowed, isOFACAllowedLoading } = useOFACStatus();

  const { isTosAccepted, tosRegion, isTosRegionLoading } = useTOSStatus();
  const { isOpen: isTosModalOpen, onOpen: onOpenTosModal } = useDisclosure();

  useEffect(() => {
    if (!isTosAccepted && isMainnet) {
      onOpenTosModal();
    }
  }, [isTosAccepted, onOpenTosModal, isMainnet]);

  const tosRequiredPath =
    pathname === '/deposit' || pathname === '/withdraw' || pathname === '/transactions';
  const isOFACRequiredPath = pathname !== '/transactions';

  return (
    <>
      <DeprecationModal />
      {isMainnet && !isOFACAllowed && !isOFACAllowedLoading && isOFACRequiredPath && (
        <OFACModal isOpen />
      )}
      {tosRequiredPath &&
        isTosModalOpen &&
        isMainnet &&
        !isTosAccepted &&
        isOFACAllowed &&
        !isTosRegionLoading &&
        isConnected && <TOSModal isOpen={isTosModalOpen} tosRegion={tosRegion} />}
      {children}
    </>
  );
}
