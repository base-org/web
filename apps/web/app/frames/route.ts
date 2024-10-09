import { GET as getHandler, POST as postHandler } from '@frames.js/render/next';
import { withIPCheck } from 'apps/web/app/frames/proxy-ip-check';

export const GET = withIPCheck(getHandler);
export const POST = withIPCheck(postHandler);
