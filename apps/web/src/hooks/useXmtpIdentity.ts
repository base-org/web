import { useConnectModal } from '@rainbow-me/rainbowkit';
import { type FramePostPayload, FramesClient } from '@xmtp/frames-client';
import { Client, type Signer } from '@xmtp/xmtp-js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { zeroAddress } from 'viem';
import { useAccount, useConfig } from 'wagmi';
import { getAccount, signMessage } from 'wagmi/actions';
import type {
  SignerStateActionContext,
  SignerStateInstance,
  SignFrameActionFunction,
} from '@frames.js/render';
import type { XmtpFrameContext } from './useXmtpFrameContext';
import { WebStorage } from '@frames.js/render/identity/storage';

type StorageSetterFunction<TValue> = (value: TValue | undefined) => TValue;
type StorageValueWatcher<TValue> = (value: TValue | undefined) => void;
type Storage = {
  get: <T>(key: string) => Promise<T | undefined>;
  set: <T>(key: string, setter: StorageSetterFunction<T>) => Promise<void>;
  delete: (key: string) => Promise<void>;
  watch: <T>(key: string, listener: StorageValueWatcher<T>) => () => void;
};

type XmtpSigner = {
  walletAddress: string;
  keys: Uint8Array;
};

type XmtpStoredSigner = {
  walletAddress: string;
  keys: string;
};

type XmtpSignerInstance = SignerStateInstance<XmtpSigner, FramePostPayload, XmtpFrameContext>;

type XmtpIdentityOptions = {
  /**
   * @defaultValue WebStorage
   */
  storage?: Storage;
  /**
   * @defaultValue "xmtpSigner"
   */
  storageKey?: string;
};

const defaultStorage = new WebStorage();

export function useXmtpIdentity({
  storage = defaultStorage,
  storageKey = 'xmtpSigner',
}: XmtpIdentityOptions = {}): XmtpSignerInstance {
  const storageRef = useRef(storage);
  const [isLoading, setIsLoading] = useState(false);
  const [xmtpSigner, setXmtpSigner] = useState<XmtpSigner | null>(null);
  const [xmtpClient, setXmtpClient] = useState<Client | null>(null);
  const config = useConfig();
  const connect = useConnectModal();
  const { address } = useAccount();

  const walletSigner: Signer | null = useMemo(
    () =>
      address
        ? {
            async getAddress() {
              return Promise.resolve(address);
            },
            async signMessage(message) {
              return signMessage(config, {
                message: {
                  raw:
                    typeof message === 'string'
                      ? Buffer.from(message)
                      : Buffer.from(message as Uint8Array),
                },
              });
            },
          }
        : null,
    [address, config],
  );

  useEffect(() => {
    async function instantiateXmtpSignerAndClient(): Promise<void> {
      const storedSigner = await storageRef.current.get<XmtpStoredSigner>(storageKey);

      if (!storedSigner) {
        return;
      }

      const signer: XmtpSigner = {
        walletAddress: storedSigner.walletAddress,
        keys: Buffer.from(storedSigner.keys, 'hex'),
      };

      const client = await Client.create(null, {
        privateKeyOverride: signer.keys,
      });

      setXmtpSigner(signer);
      setXmtpClient(client);
    }

    instantiateXmtpSignerAndClient().catch((e) => {
      console.error('@frames.js/render: Could not instantiate the XMTP signer and client', e);
    });
  }, [storageKey]);

  const logout = useCallback(async () => {
    await storageRef.current.delete(storageKey);

    setXmtpClient(null);
    setXmtpSigner(null);
  }, [storageKey]);

  const onSignerlessFramePress = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      if (!xmtpSigner) {
        if (!walletSigner) {
          connect.openConnectModal?.();
          return;
        }

        const keys = await Client.getKeys(walletSigner, {
          env: 'dev',
          skipContactPublishing: true,
          persistConversations: false,
        });
        const client = await Client.create(null, {
          privateKeyOverride: keys,
        });

        const walletAddress = getAccount(config).address ?? zeroAddress;

        await storageRef.current.set<XmtpStoredSigner>(storageKey, () => ({
          walletAddress,
          keys: Buffer.from(keys).toString('hex'),
        }));

        setXmtpSigner({
          keys,
          walletAddress,
        });
        setXmtpClient(client);
      }
    } catch (error) {
      console.error('@frames.js/render: API Call failed', error);
    } finally {
      setIsLoading(false);
    }
  }, [config, walletSigner, xmtpSigner, connect, storageKey]);

  const signFrameAction: SignFrameActionFunction<
    SignerStateActionContext<XmtpSigner, XmtpFrameContext>,
    FramePostPayload
  > = useCallback(
    async (actionContext) => {
      if (!xmtpClient) {
        throw new Error('No xmtp client');
      }

      if (!address) {
        throw new Error('No address');
      }

      const framesClient = new FramesClient(xmtpClient);
      const payload = await framesClient.signFrameAction({
        frameUrl: actionContext.url,
        inputText: actionContext.inputText,
        state: actionContext.state,
        buttonIndex: actionContext.buttonIndex,
        conversationTopic: actionContext.frameContext.conversationTopic,
        participantAccountAddresses: actionContext.frameContext.participantAccountAddresses,
        ...(actionContext.frameContext.groupId
          ? { groupId: actionContext.frameContext.groupId }
          : {}),
        ...(actionContext.frameContext.groupSecret
          ? { groupSecret: actionContext.frameContext.groupSecret }
          : {}),
        ...(actionContext.type === 'tx-data' || actionContext.type === 'tx-post'
          ? { address: actionContext.address }
          : {}),
        ...(actionContext.type === 'tx-post' ? { transactionId: actionContext.transactionId } : {}),
      });

      const searchParams = new URLSearchParams({
        postType: actionContext.type === 'tx-post' ? 'post' : actionContext.frameButton.action,
        postUrl: actionContext.target ?? '',
        specification: 'openframes',
      });

      return {
        body: payload,
        searchParams,
      };
    },
    [address, xmtpClient],
  );

  return useMemo(
    () => ({
      signer: xmtpSigner,
      hasSigner: !!xmtpSigner?.keys,
      signFrameAction,
      isLoadingSigner: isLoading,
      onSignerlessFramePress,
      logout,
    }),
    [isLoading, logout, onSignerlessFramePress, signFrameAction, xmtpSigner],
  );
}
