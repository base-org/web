import {
  KMSClient,
  KMSClientConfig,
  DecryptCommand,
  DecryptCommandInput,
} from '@aws-sdk/client-kms';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { createDecipheriv } from 'crypto';
import { KeyGrantorClient } from './keyGrantorClient';

/* eslint-disable */
export type DecryptOptions = {
  cipherText: Uint8Array;
  encryptionContext: Record<string, string>;
  encryptedDataKey: Uint8Array;
  scope: string;
};

export class SecretsClient {
  private kmsClient: KMSClient;
  private keygrantor: KeyGrantorClient;
  private region: string;
  private seenEncryptedSecretTexts = new Map<string, Uint8Array>();
  private decryptedSecretTexts = new Map<string, string>();
  constructor() {
    this.region = 'us-east-1';
    const credentials = defaultProvider();
    const config: KMSClientConfig = {
      region: this.region,
      credentials,
    };
    this.kmsClient = new KMSClient(config);
    this.keygrantor = new KeyGrantorClient();
  }

  async decrypt(options: DecryptOptions) {
    const { encryptedDataKey, cipherText, encryptionContext, scope } = options;
    // This needs to maintain the order (Because this gets stringfied)
    let ciphertextBlob = cipherText;
    const hasDataKey = encryptedDataKey.length > 0;
    if (hasDataKey) {
      ciphertextBlob = encryptedDataKey;
    }
    const ec = {
      author: encryptionContext.author,
      config_service: encryptionContext.config_service,
      environment: encryptionContext.environment,
      parameter: encryptionContext.parameter,
      scope: encryptionContext.scope,
      write_only: encryptionContext.write_only,
    };
    const cacheKey = this.generateCacheKey(
      scope,
      encryptionContext.parameter,
      encryptionContext.author,
    );
    const cached = this.cacheLoad(cacheKey, cipherText);
    if (cached) {
      return cached;
    }
    let result: Uint8Array;
    try {
      const decryptInput = {
        CiphertextBlob: ciphertextBlob,
        EncryptionContext: ec,
      };
      try {
        const command = new DecryptCommand(decryptInput);
        const { Plaintext } = await this.kmsClient.send(command);
        if (!Plaintext) {
          throw new Error(
            `error calling kms::decrypt: ${encryptionContext.scope}, parameter: ${encryptionContext.parameter} err: Plaintext missing`,
          );
        }
        result = Plaintext;
      } catch (error) {
        console.error(
          `error calling kms::decrypt", "scope": ${encryptionContext.scope}, parameter: ${encryptionContext.parameter} err: ${error}`,
        );
        if (error instanceof Error) {
          if (error.name !== 'AccessDeniedException') {
            throw error;
          }
          result = await this.getKeyGrantAndDecrypt(scope, ciphertextBlob, ec);
        } else {
          throw new Error(
            `Something went wrong while decrypting secret scope: ${scope}, parameter: ${encryptionContext.parameter}`,
          );
        }
      }
      const decoder = new TextDecoder('utf-8');
      let plainText = decoder.decode(result);
      if (hasDataKey) {
        plainText = this.decryptUsingDatakey(result, cipherText, ec);
      }
      this.cacheStore(cacheKey, cipherText, plainText);
      return plainText;
    } catch (error) {
      throw error;
    }
  }

  private async getKeyGrantAndDecrypt(
    scope: string,
    ciphertextBlob: Uint8Array,
    ec: Record<string, string>,
  ) {
    const tokens = await this.keygrantor.getKeyGrantTokens(scope);
    const decryptInput: DecryptCommandInput = {
      CiphertextBlob: ciphertextBlob,
      EncryptionContext: ec,
      GrantTokens: tokens,
    };
    const command = new DecryptCommand(decryptInput);
    const { Plaintext } = await this.kmsClient.send(command);
    if (!Plaintext) {
      throw new Error('error calling kms::decrypt: Plaintext missing');
    }
    return Plaintext;
  }
  private decryptUsingDatakey(
    plaintextDataKey: Uint8Array,
    ciphertext: Uint8Array,
    encryptionContext: Record<string, string>,
  ): string {
    const encryptionContextBuffer = Buffer.from(JSON.stringify(encryptionContext));
    const iv = ciphertext.slice(0, 12);
    const encryptedText = ciphertext.slice(12);
    const decipher = createDecipheriv('aes-256-gcm', plaintextDataKey, iv);
    decipher.setAAD(encryptionContextBuffer);
    decipher.setAuthTag(encryptedText.slice(encryptedText.length - 16));
    const decryptedText =
      decipher.update(encryptedText.slice(0, encryptedText.length - 16)) + decipher.final('utf8');
    return decryptedText;
  }

  cacheStore(cacheKey: string, ciphertext: Uint8Array, plaintext: string) {
    this.seenEncryptedSecretTexts.set(cacheKey, ciphertext);
    this.decryptedSecretTexts.set(cacheKey, plaintext);
  }

  cacheLoad(cacheKey: string, ciphertext: Uint8Array): string | undefined {
    const seen = this.seenEncryptedSecretTexts.get(cacheKey);
    if (!seen) {
      return undefined;
    }
    if (ciphertext.length !== seen.length) {
      return undefined;
    }

    for (let i = 0; i < ciphertext.length; i++) {
      if (ciphertext[i] !== seen[i]) {
        return undefined;
      }
    }
    return this.decryptedSecretTexts.get(cacheKey);
  }
  generateCacheKey(scope: string, name: string, author: string) {
    return scope + '/' + name + '/' + author;
  }
}
/* eslint-enable */
