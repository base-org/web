'use client';

import { type FarcasterSigner } from '@frames.js/render/identity/farcaster';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';
import { useFIDQuery } from 'apps/web/src/hooks/useFarcasterUserByFID';
import QRCode from 'qrcode.react';
import { useCallback, useMemo } from 'react';

export default function FarcasterAccountModal() {
  const { farcasterSignerState, showFarcasterQRModal, setShowFarcasterQRModal } = useFrameContext();
  const farcasterUser = useMemo(
    () => farcasterSignerState.signer ?? null,
    [farcasterSignerState.signer],
  );
  const loading = useMemo(
    () => !!farcasterSignerState.isLoadingSigner ?? false,
    [farcasterSignerState.isLoadingSigner],
  );
  const handleButtonClick = useCallback(() => {
    farcasterSignerState
      .createSigner()
      .catch(console.error)
      .finally(() => setShowFarcasterQRModal(false));
  }, [farcasterSignerState, setShowFarcasterQRModal]);

  const handleModalClose = useCallback(() => {
    setShowFarcasterQRModal(false);
  }, [setShowFarcasterQRModal]);

  return (
    <Modal isOpen={showFarcasterQRModal} onClose={handleModalClose}>
      <div className="space-y-2">
        {!farcasterUser && (
          <div className="mt-4 flex flex-col gap-2">
            <div>
              <h1>Sign in with Farcaster</h1>
              <div>
                <p className="mb-2 block">
                  Uses real signer. Works with remote frames and other libraries.
                </p>
                <p className="text-orange-400">Be careful this action costs warps.</p>
              </div>

              <Button disabled={loading} type="button" onClick={handleButtonClick}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </div>
        )}
        {farcasterUser && (
          <>
            <IdentityState user={farcasterUser} onLogout={handleModalClose} />
            {!!farcasterUser && <SelectedIdentity user={farcasterUser} />}
          </>
        )}
      </div>
    </Modal>
  );
}

function IdentityState({ user, onLogout }: { user: FarcasterSigner; onLogout: () => void }) {
  const { data } = useFIDQuery(user.status === 'approved' ? user.fid : undefined);
  const { farcasterSignerState } = useFrameContext();
  const handleLogoutClick = useCallback(() => {
    farcasterSignerState.logout().catch(console.warn).finally(onLogout);
  }, [farcasterSignerState, onLogout]);
  if (user.status === 'pending_approval') {
    return (
      <div>
        <EllipsisHorizontalIcon className="mr-2 h-4 w-4" /> Pending approval on Warpcast
      </div>
    );
  }
  if (user.status === 'approved') {
    const farcasterIdentity = data?.users[0];
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        {farcasterIdentity ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={farcasterIdentity.pfp_url} alt="pfp" className="h-12 w-auto object-contain" />
            Signed in as {farcasterIdentity.display_name}
          </>
        ) : (
          <>
            <UserCircleIcon className="h-12" /> Signed in as fid: {user.fid}
          </>
        )}
        <Button
          variant={ButtonVariants.Gray}
          size={ButtonSizes.Small}
          className="rounded-full"
          onClick={handleLogoutClick}
        >
          logout
        </Button>
        <p className="text-sm text-palette-foregroundMuted">
          warning: logging back in will require paying warps
        </p>
      </div>
    );
  }
  return null;
}

function SelectedIdentity({ user }: { user: FarcasterSigner }) {
  if (user.status === 'pending_approval') {
    return (
      <div className="mt-4 flex flex-col items-center gap-2 border-t pt-4">
        Scan with your camera app
        <QRCode value={user.signerApprovalUrl} size={128} />
        <div className="or-divider text-muted-foreground">OR</div>
        <a
          href={user.signerApprovalUrl}
          target="_blank"
          className="w-full"
          rel="noopener noreferrer"
        >
          Open URL
        </a>
      </div>
    );
  }
}
