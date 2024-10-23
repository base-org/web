import { isDevelopment } from 'apps/web/src/constants';
import { base } from 'viem/chains';

export const DOMAIN = isDevelopment ? `http://localhost:3000` : 'https://www.base.org';
export const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

export const CHAIN = base;

export const acceptedProtocols = { anonymous: 'vNext' };
