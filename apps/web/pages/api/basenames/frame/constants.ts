import { isDevelopment } from 'apps/web/src/constants';
import { base } from 'viem/chains';

export const DOMAIN = isDevelopment ? `http://localhost:3000` : 'https://www.base.org';
export const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;

/* FOR VERCEL PREVIEW TESTING
export const DOMAIN = isDevelopment
  ? `http://localhost:3000`
  : 'VERCEL PREVIEW LINK';
export const NEYNAR_API_KEY = 'BF56615F-9028-4774-9E8C-2745308382C1';
*/

export const CHAIN = base;
