import { sign } from 'jsonwebtoken';
import crypto from 'crypto';
import { cdpBaseUri, cdpKeyName, cdpKeySecret } from 'apps/web/src/cdp/constants';

const algorithm = 'ES256';

type APIKeyClaims = {
  iss: string;
  sub: string;
  nbf: number;
  exp: number;
  uri: string;
};

export async function generateCdpJwt(requestMethod: string, requestPath: string) {
  const uri = `${requestMethod} ${cdpBaseUri}/${requestPath}`;
  const nonce = crypto.randomBytes(16).toString('hex');
  const claims: APIKeyClaims = {
    iss: 'cdp',
    sub: cdpKeyName,
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60,
    uri: uri,
  };

  const token = sign(claims, cdpKeySecret, {
    algorithm,
    header: {
      kid: cdpKeyName,
      alg: algorithm,
      nonce,
    },
  });
  return token;
}
