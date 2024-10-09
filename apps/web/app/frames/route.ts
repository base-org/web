import { GET as getHandler, POST as postHandler } from '@frames.js/render/next';
import { withIPCheck } from './proxy-ip-check';

export const GET = withIPCheck(getHandler);
export const POST = withIPCheck(postHandler);
