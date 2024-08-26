'use client';

import type { FarcasterSigner } from '@frames.js/render/identity/farcaster';
import { EllipsisHorizontalIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';
import { FarcasterCreateSignerResult } from 'apps/web/src/hooks/useFarcasterIdentity';
import QRCode from 'qrcode.react';
import { useCallback } from 'react';

type FarcasterAccountModalProps = {
  farcasterUser: FarcasterSigner | null;
  loading: boolean;
  startFarcasterSignerProcess: () => Promise<FarcasterCreateSignerResult>;
  isOpen: boolean;
  onClose: () => void;
};

export default function FarcasterAccountModal({
  farcasterUser,
  loading,
  startFarcasterSignerProcess,
  isOpen,
  onClose,
}: FarcasterAccountModalProps) {
  const handleButtonClick = useCallback(() => {
    startFarcasterSignerProcess().catch(console.error).finally(onClose);
  }, [onClose, startFarcasterSignerProcess]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <div>
            <IdentityState user={farcasterUser} />
            {!!farcasterUser && <SelectedIdentity user={farcasterUser} />}
          </div>
        )}
      </div>
    </Modal>
  );
}

function IdentityState({ user }: { user: FarcasterSigner }) {
  if (user.status === 'pending_approval') {
    return (
      <div>
        <EllipsisHorizontalIcon className="mr-2 h-4 w-4" /> Pending approval on Warpcast
      </div>
    );
  }
  if (user.status === 'approved') {
    return (
      <div className="space-y-2">
        <UserIcon className="mr-2 h-4 w-4" /> Signed in as fid {user.fid}
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
