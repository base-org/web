import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { formatDefaultUsername, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import {
  DOMAIN,
  retryInputSearchValueFrame,
  setYearsFrame,
} from 'apps/web/pages/api/basenames/frame/frameResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Set Years Screen — Method (${req.method}) Not Allowed` });
  }

  try {
    const body: FrameRequest = req.body;
    const { untrustedData } = body;
    const targetName: string = encodeURIComponent(untrustedData.inputText);

    const { valid, message } = validateEnsDomainName(targetName);
    if (!valid) {
      throw new Error(message);
    }

    const isNameAvailableResponse = await fetch(
      `${DOMAIN}/api/basenames/${targetName}/isNameAvailable`,
    );
    const { nameIsAvailable } = await isNameAvailableResponse.json();
    if (!nameIsAvailable) {
      throw new Error('Name unavailable');
    }

    const formattedTargetName = await formatDefaultUsername(targetName);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(setYearsFrame(targetName, formattedTargetName));
  } catch (error) {
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(retryInputSearchValueFrame(String(error)));
  }
}
