import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { formatDefaultUsername, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import type { IsNameAvailableResponse } from 'apps/web/pages/api/basenames/[name]/isNameAvailable';
import {
  retryInputSearchValueFrame,
  setYearsFrame,
} from 'apps/web/pages/api/basenames/frame/frameResponses';
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Set Years Screen — Method (${req.method}) Not Allowed` });
  }

  try {
    const body = req.body as FrameRequest;
    const { untrustedData } = body;
    const targetName: string = encodeURIComponent(untrustedData.inputText);

    const { valid, message } = validateEnsDomainName(targetName);
    if (!valid) {
      return res
        .status(200)
        .setHeader('Content-Type', 'text/html')
        .send(retryInputSearchValueFrame(message));
    }

    const isNameAvailableResponse = await fetch(
      `${DOMAIN}/api/basenames/${targetName}/isNameAvailable`,
    );
    const isNameAvailableResponseData = await isNameAvailableResponse.json();
    const { nameIsAvailable } = isNameAvailableResponseData as IsNameAvailableResponse;
    if (!nameIsAvailable) {
      return res
        .status(200)
        .setHeader('Content-Type', 'text/html')
        .send(retryInputSearchValueFrame('Name unavailable'));
    }

    const formattedTargetName = await formatDefaultUsername(targetName);
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(setYearsFrame(targetName, formattedTargetName));
  } catch (error) {
    return res.status(500).json({ error }); // TODO: figure out error state for the frame BAPP-452
  }
}
