import { isDevelopment } from 'apps/web/src/constants';

// export const DOMAIN = isDevelopment ? `http://localhost:3000` : 'https://www.base.org';
export const DOMAIN = isDevelopment ? `http://localhost:3000` : 'https://base-web-git-feat-frame-tx-submission-coinbase-vercel.vercel.app';
export const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
