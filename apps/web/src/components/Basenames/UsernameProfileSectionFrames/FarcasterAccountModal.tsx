'use client';

import { type FarcasterSigner } from '@frames.js/render/identity/farcaster';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useErrors } from 'apps/web/contexts/Errors';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';
import { useFIDQuery } from 'apps/web/src/hooks/useFarcasterUserByFID';
import QRCode from 'qrcode.react';
import { useCallback, useMemo } from 'react';
import FarcasterIcon from './white-purple-farcaster-icon.svg';

export default function FarcasterAccountModal() {
  const { farcasterSignerState, showFarcasterQRModal, setShowFarcasterQRModal } = useFrameContext();
  const { logError } = useErrors();
  const farcasterUser = useMemo(
    () => farcasterSignerState.signer ?? null,
    [farcasterSignerState.signer],
  );
  const loading = useMemo(
    () => !!farcasterSignerState.isLoadingSigner ?? false,
    [farcasterSignerState.isLoadingSigner],
  );
  const handleButtonClick = useCallback(() => {
    farcasterSignerState.createSigner().catch((e) => logError(e, 'error'));
  }, [farcasterSignerState, logError]);

  const handleModalClose = useCallback(() => {
    setShowFarcasterQRModal(false);
  }, [setShowFarcasterQRModal]);

  return (
    <Modal isOpen={showFarcasterQRModal} onClose={handleModalClose}>
      <div className="max-w-72 rounded-lg bg-white">
        {/* Sign-in section when the user is not signed in */}
        {!farcasterUser && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold text-gray-80">Sign in with Farcaster</h1>
              <p className="mt-2 text-sm text-gray-50">Use your Farcaster account to sign in.</p>
              <p className="mt-1 text-xs text-red-50">Be careful! This action costs warps.</p>
            </div>

            <Button
              disabled={loading}
              variant={ButtonVariants.Black}
              type="button"
              className="mt-4 w-full"
              onClick={handleButtonClick}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        )}

        {/* Displays user state after signing in */}
        {farcasterUser && (
          <>
            <IdentityState user={farcasterUser} onLogout={handleModalClose} />
            <SelectedIdentity user={farcasterUser} />
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
      <p className="mb-2 flex items-center justify-center text-2xl text-illoblack">
        Sign in with Warpcast
      </p>
    );
  }
  if (user.status === 'approved') {
    const farcasterIdentity = data?.users[0];
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        {farcasterIdentity ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={farcasterIdentity.pfp_url}
              alt="pfp"
              className="h-16 w-16 rounded-full object-cover shadow-sm"
            />
            Signed in as {farcasterIdentity.display_name}
          </>
        ) : (
          <>
            <UserCircleIcon className="h-16 w-16 rounded-full object-cover shadow-sm" /> Signed in
            as fid: {user.fid}
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

const imageSettings = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  src: FarcasterIcon.src,
  x: undefined,
  y: undefined,
  height: 60,
  width: 60,
  opacity: 1,
  excavate: true,
};
function SelectedIdentity({ user }: { user: FarcasterSigner }) {
  if (user.status === 'pending_approval') {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="mb-3 text-palette-foregroundMuted">
          Scan this QR code to sign in. You may need to use warps to connect
        </p>
        <QRCode value={user.signerApprovalUrl} size={276} level="H" imageSettings={imageSettings} />
        <div className="text-muted-foreground lg:hidden">OR</div>
        <a
          href={user.signerApprovalUrl}
          target="_blank"
          className="underline lg:hidden"
          rel="noopener noreferrer"
        >
          Open URL on mobile
        </a>
      </div>
    );
  }
}
