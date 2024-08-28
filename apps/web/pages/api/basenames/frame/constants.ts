import { isDevelopment } from 'apps/web/src/constants';
import { base, baseSepolia } from 'viem/chains';

// export const DOMAIN = isDevelopment ? `http://localhost:3000` : 'https://www.base.org';
export const DOMAIN = isDevelopment
  ? `http://localhost:3000`
  : 'https://base-web-git-feat-frame-tx-submission-coinbase-vercel.vercel.app';

export const NEYNAR_API_KEY = isDevelopment
  ? 'BF56615F-9028-4774-9E8C-2745308382C1'
  : process.env.NEXT_PUBLIC_NEYNAR_API_KEY;

export const CHAIN = baseSepolia;
