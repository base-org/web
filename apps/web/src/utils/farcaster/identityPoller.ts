import { AllowedValue } from 'apps/web/src/hooks/useStorage';

type SignedKeyRequest = {
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

const POLL_INTERVAL = 2000;

export class IdentityPoller {
  private controller: AbortController;

  private polling = false;

  constructor() {
    this.controller = new AbortController();
  }

  isPolling = (): boolean => {
    return this.polling;
  };

  start = async (token: string): Promise<SignedKeyRequest | false> => {
    this.controller = new AbortController();
    this.polling = true;

    while (true) {
      if (this.controller.signal.aborted) {
        this.polling = false;
        return false;
      }

      try {
        const fcSignerRequestResponse = await fetch(
          `https://api.warpcast.com/v2/signed-key-request?token=${token}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (fcSignerRequestResponse.ok) {
          const responseBody = (await fcSignerRequestResponse.json()) as {
            result: { signedKeyRequest: SignedKeyRequest };
          };

          if (responseBody.result.signedKeyRequest.state === 'completed') {
            return responseBody.result.signedKeyRequest;
          }
        } else {
          throw new Error(
            `Warpcast API returned an error response with status code: ${fcSignerRequestResponse.status}`,
          );
        }
      } catch (error) {
        console.error('Error while polling for the signer approval status', error);
      }

      await new Promise((r) => {
        setTimeout(r, POLL_INTERVAL);
      });
    }
  };

  stop = (): void => {
    if (this.controller.signal.aborted) {
      return;
    }

    this.controller.abort();
  };
}
