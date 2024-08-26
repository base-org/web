import {
  FarcasterSignerApproved as BaseFarcasterSignerApproved,
  FarcasterSignerPendingApproval as BaseFarcasterSignerPendingApproval,
  FarcasterSignerState,
  signFrameAction,
} from '@frames.js/render';
import { WebStorage } from '@frames.js/render/identity/storage';
import { AllowedValue, useStorage } from 'apps/web/src/hooks/useStorage';
import { useVisibilityDetection } from 'apps/web/src/hooks/useVisibilityDetection';
import { convertKeypairToHex, createKeypairEDDSA } from 'apps/web/src/utils/farcaster/crypto';
import { IdentityPoller } from 'apps/web/src/utils/farcaster/identityPoller';
import { type Reducer, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type FarcasterSignerApproved = BaseFarcasterSignerApproved & {
  _id: number | string;
  signedKeyRequest: FarcasterSignedKeyRequest;
};
type FarcasterSignerPendingApproval = BaseFarcasterSignerPendingApproval & {
  _id: number | string;
};
type FarcasterSigner = FarcasterSignerApproved | FarcasterSignerPendingApproval;
type SignerState = FarcasterSigner | { status: 'init' };
export type FarcasterCreateSignerResult = {
  token: string;
  signerApprovalUrl: string;
};
type FarcasterSignedKeyRequest = {
  deeplinkUrl: string;
  isSponsored: boolean;
  key: string;
  requestFid: number;
  state: string;
  token: string;
  userFid: number;
  signerUser?: Record<string, AllowedValue>;
  signerUserMetadata?: Record<string, AllowedValue>;
};
type Action =
  | { type: 'LOGOUT' }
  | {
      type: 'LOGIN_START';
      id: string | number;
      publicKey: string;
      privateKey: string;
      deadline: number;
      token: string;
      signerApprovalUrl: string;
      requestFid: number;
      requestSigner: string;
      signature: string;
    }
  | {
      type: 'LOGIN_SUCCESS';
      signedKeyRequest: FarcasterSignedKeyRequest;
    };

const identityReducer: Reducer<SignerState, Action> = (state, action) => {
  switch (action.type) {
    case 'LOGOUT': {
      return { status: 'init' };
    }
    case 'LOGIN_START': {
      const identity: FarcasterSigner = {
        _id: action.id,
        status: 'pending_approval',
        privateKey: action.privateKey,
        publicKey: action.publicKey,
        token: action.token,
        deadline: action.deadline,
        signerApprovalUrl: action.signerApprovalUrl,
        requestFid: action.requestFid,
        requestSigner: action.requestSigner,
        signature: action.signature,
      };

      return identity;
    }
    case 'LOGIN_SUCCESS': {
      if (state.status !== 'pending_approval') {
        console.warn(
          'Active identity must be selected and be in pending_approval status to be approved',
        );

        return state;
      }

      const updatedIdentity: FarcasterSigner = {
        ...state,
        status: 'approved',
        fid: action.signedKeyRequest.userFid,
        signedKeyRequest: action.signedKeyRequest,
      };

      return updatedIdentity;
    }
    default:
      return state;
  }
};

type UseFarcasterIdentityOptions = {
  /**
   * Called when it is required to create a new signer in order to proceed
   */
  onMissingIdentity: () => void;
  /**
   * Allows you to disable the polling of the signer approval status
   * when user starts signin in
   *
   * @defaultValue true
   */
  enableIdentityPolling?: boolean;
  /**
   * @defaultValue WebStorage
   */
  storage?: WebStorage;
  /**
   * @defaultValue 'farcasterIdentity'
   */
  storageKey?: string;
  generateUserId?: () => string | number;
  /**
   * Used to detect if the current context is visible, this affects the polling of the signer approval status.
   */
  visibilityChangeDetectionHook?: typeof useVisibilityDetection;
  onLogIn?: (identity: FarcasterSignerApproved) => void;
  onLogInStart?: (identity: FarcasterSignerPendingApproval) => void;
  onLogOut?: (identity: FarcasterSigner) => void;
};

export type FarcasterSignerInstance = FarcasterSignerState<FarcasterSigner | null> & {
  createSigner: () => Promise<FarcasterCreateSignerResult>;
  identityPoller: IdentityPoller;
};

const defaultStorage = new WebStorage();
const defaultGenerateUserId = (): number => {
  return Date.now();
};

export function useFarcasterIdentity({
  onMissingIdentity,
  enableIdentityPolling = true,
  storage = defaultStorage,
  storageKey = 'farcasterIdentity',
  onLogIn,
  onLogInStart,
  onLogOut,
  generateUserId = defaultGenerateUserId,
}: UseFarcasterIdentityOptions): FarcasterSignerInstance {
  const storageRef = useRef(storage);
  const identityPoller = useRef(new IdentityPoller()).current;
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useStorage<SignerState>({
    key: storageKey,
    storage: storageRef.current,
    initialValue: { status: 'init' },
    preprocessValue(value) {
      if (value.status === 'pending_approval' && value.deadline < Math.floor(Date.now() / 1000)) {
        return { status: 'init' };
      }

      return value;
    },
  });
  const onLogInRef = useRef(onLogIn);
  onLogInRef.current = onLogIn;
  const onLogInStartRef = useRef(onLogInStart);
  onLogInStartRef.current = onLogInStart;
  const onLogOutRef = useRef(onLogOut);
  onLogOutRef.current = onLogOut;
  const generateUserIdRef = useRef(generateUserId);
  generateUserIdRef.current = generateUserId;

  const createFarcasterSigner = useCallback(async (): Promise<FarcasterCreateSignerResult> => {
    try {
      const keypair = await createKeypairEDDSA();
      const keypairString = convertKeypairToHex(keypair);
      const authorizationResponse = await fetch('/frames/signer', {
        method: 'POST',
        body: JSON.stringify({
          publicKey: keypairString.publicKey,
        }),
      });
      const authorizationBody = (await authorizationResponse.json()) as
        | {
            signature: string;
            requestFid: string;
            deadline: number;
            requestSigner: string;
          }
        | { code: number; message: string };

      if (authorizationResponse.status === 200) {
        const { signature, requestFid, deadline, requestSigner } = authorizationBody as {
          signature: string;
          requestFid: string;
          deadline: number;
          requestSigner: string;
        };

        const {
          result: { signedKeyRequest },
        } = (await (
          await fetch(`https://api.warpcast.com/v2/signed-key-requests`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              key: keypairString.publicKey,
              signature,
              requestFid,
              deadline,
            }),
          })
        ).json()) as {
          result: {
            signedKeyRequest: { token: string; deeplinkUrl: string };
          };
        };

        // this deeplink works only on iOS
        const deepLinkUrl = new URL(signedKeyRequest.deeplinkUrl);
        const signedKeyRequestToken = deepLinkUrl.searchParams.get('token');
        const signerApprovalUrl = new URL(
          'https://client.warpcast.com/deeplinks/signed-key-request',
        );

        if (!signedKeyRequestToken) {
          throw new Error('No token found in the deep link URL');
        }

        signerApprovalUrl.searchParams.set('token', signedKeyRequestToken);

        await setState((currentState) => {
          const newState = identityReducer(currentState, {
            type: 'LOGIN_START',
            id: generateUserIdRef.current(),
            publicKey: keypairString.publicKey,
            privateKey: keypairString.privateKey,
            deadline,
            token: signedKeyRequestToken,
            signerApprovalUrl: signerApprovalUrl.toString(),
            requestFid: parseInt(requestFid, 10),
            requestSigner,
            signature,
          });

          if (newState.status === 'pending_approval') {
            onLogInStartRef.current?.(newState);
          }

          return newState;
        });

        return {
          token: signedKeyRequestToken,
          signerApprovalUrl: signerApprovalUrl.toString(),
        };
      } else if ('message' in authorizationBody) {
        throw new Error(authorizationBody.message);
      }

      throw new Error('Could not request signer approval');
    } catch (error) {
      console.error('@frames.js/render: API Call failed', error);
      throw error;
    }
  }, [setState]);

  const onSignerlessFramePress = useCallback(async (): Promise<void> => {
    onMissingIdentity();
    return Promise.resolve();
  }, [onMissingIdentity]);

  const createSigner = useCallback(async () => {
    setIsLoading(true);
    const result = await createFarcasterSigner();
    setIsLoading(false);

    return result;
  }, [createFarcasterSigner]);

  const logout = useCallback(async () => {
    await setState((currentState) => {
      if (currentState.status !== 'init') {
        onLogOutRef.current?.(currentState);
      }

      return identityReducer(currentState, { type: 'LOGOUT' });
    });
  }, [setState]);

  const farcasterUser = state.status === 'init' ? null : state;

  const visibilityDetector = useVisibilityDetection();

  useEffect(() => {
    if (farcasterUser && farcasterUser.status === 'pending_approval' && enableIdentityPolling) {
      const startPolling = (): void => {
        identityPoller
          .start(farcasterUser.token)
          .then(async (signedKeyRequest) => {
            if (signedKeyRequest) {
              return setState((currentState) => {
                const newState = identityReducer(currentState, {
                  type: 'LOGIN_SUCCESS',
                  signedKeyRequest,
                });

                if (newState.status === 'approved') {
                  onLogInRef.current?.(newState);
                }

                return newState;
              });
            }
          })
          .catch((e) => {
            console.error('Error while polling for the signer approval status', e);
          });
      };

      const unregisterVisibilityChangeListener = visibilityDetector.register((visible) => {
        if (visible) {
          startPolling();
        } else {
          identityPoller.stop();
        }
      });

      startPolling();

      return () => {
        identityPoller.stop();
        unregisterVisibilityChangeListener();
      };
    }
  }, [farcasterUser, identityPoller, visibilityDetector, setState, enableIdentityPolling]);

  return useMemo(
    () => ({
      signer: farcasterUser,
      hasSigner: farcasterUser?.status === 'approved',
      signFrameAction,
      isLoadingSigner: isLoading,
      onSignerlessFramePress,
      createSigner,
      logout,
      identityPoller,
    }),
    [farcasterUser, identityPoller, isLoading, logout, createSigner, onSignerlessFramePress],
  );
}
