/* eslint-disable */
import axios, { AxiosInstance, AxiosError } from 'axios';
import { HttpRequest as AWSHttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import {
  GrantRequest,
  GrantReply,
  KeyGrantorDefinition,
  GrantToken,
} from './protos/keyautomation/api';
const API_URL = 'https://api.configservice.production.cbhq.net';

export class KeyGrantorClient {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
    });
  }

  private async signRequest(requestBody: Uint8Array): Promise<AWSHttpRequest> {
    const request = new AWSHttpRequest({
      headers: {
        'Content-Type': 'application/protobuf',
        Host: new URL(API_URL).hostname,
      },
      hostname: new URL(API_URL).hostname,
      path: `keygrantorapi/${KeyGrantorDefinition.fullName}/${KeyGrantorDefinition.methods.grantKey.name}`,
      body: requestBody,
      method: 'POST',
      protocol: 'https:',
    });

    const signer = new SignatureV4({
      service: 'execute-api',
      region: 'us-east-1',
      credentials: defaultProvider(),
      sha256: Sha256,
    });

    return signer.sign(request) as unknown as AWSHttpRequest;
  }
  async getKeyGrantTokens(scope: string): Promise<string[]> {
    const request = GrantRequest.fromPartial({
      scope,
      region: 'us-east-1',
    });
    const requestBody = GrantRequest.encode(request).finish();
    const signedRequest = await this.signRequest(requestBody);
    try {
      const { data } = await this.axios.post(signedRequest.path, signedRequest.body, {
        headers: signedRequest.headers,
      });
      const buffer = Buffer.from(data, 'base64');
      const reply = GrantReply.decode(buffer);
      return this.grantTokens(reply, request.scope);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          const decodedError = Buffer.from(error.response.data, 'base64').toString('utf8');
          throw new Error(decodedError);
        } else if (error.message) {
          throw error;
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      throw error;
    }
  }
  private grantTokens(reply: GrantReply, scope: string): string[] {
    const tokenSet = new Set<string>();
    if (reply.grantToken) {
      tokenSet.add(reply.grantToken);
    }
    reply.tokenSet.forEach((t: GrantToken) => {
      if (t && t.scope === scope && t.grantToken) {
        tokenSet.add(t.grantToken);
      }
    });
    const tokens: string[] = Array.from(tokenSet);
    return tokens;
  }
}
/* eslint-enable */
