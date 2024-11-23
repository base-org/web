import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { ActionType, ComponentType } from 'libs/base-ui/utils/logEvent';
import logServerSideEvent, { generateDeviceId } from 'apps/web/src/utils/logServerSideEvent';
import { logger } from 'apps/web/src/utils/logger';
import { inputSearchValueFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Search Screen — Method (${req.method}) Not Allowed` });
  }

  try {
    const eventName = 'claim_initiated';
    const deviceId = generateDeviceId(req);
    const eventProperties = {
      action: ActionType.click,
      context: 'basenames_claim_frame',
      componentType: ComponentType.button,
    };
    logServerSideEvent(eventName, deviceId, eventProperties);
  } catch (error) {
    logger.error('Could not log event:', error);
  }

  try {
    return res.status(200).setHeader('Content-Type', 'text/html').send(inputSearchValueFrame);
  } catch (error) {
    logger.error('Could not process request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
