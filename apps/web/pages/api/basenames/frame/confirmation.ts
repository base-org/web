import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import {
  confirmationFrame,
  buttonIndexToYears,
  DOMAIN,
} from 'apps/web/pages/api/basenames/frame/frameResponses';

type ButtonIndex = 1 | 2 | 3 | 4;
const validButtonIndexes: readonly ButtonIndex[] = [1, 2, 3, 4] as const;

type GetBasenameRegistrationPriceResponseType = {
  registrationPriceInWei: string;
  registrationPriceInEth: string;
};

type ConfirmationFrameStateType = {
  targetName: string;
  formattedTargetName: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Confirm Screen — Method (${req.method}) Not Allowed` });
  }

  const body = req.body as FrameRequest;
  const { untrustedData } = body;
  console.log('confirmation.....', { untrustedData });

  const messageState: ConfirmationFrameStateType = JSON.parse(
    decodeURIComponent(untrustedData.state),
  );
  const targetName = encodeURIComponent(messageState.targetName);
  const formattedTargetName = messageState.formattedTargetName;

  if (!validButtonIndexes.includes(untrustedData.buttonIndex)) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  const buttonIndex: ButtonIndex = untrustedData.buttonIndex;
  const targetYears: number = buttonIndexToYears[buttonIndex];

  const getRegistrationPriceResponse = await fetch(
    `${DOMAIN}/api/basenames/${targetName}/getBasenameRegistrationPrice?years=${targetYears}`,
  );
  const {
    registrationPriceInWei,
    registrationPriceInEth,
  }: GetBasenameRegistrationPriceResponseType = await getRegistrationPriceResponse.json();

  try {
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(
        confirmationFrame(
          targetName,
          formattedTargetName,
          targetYears,
          registrationPriceInWei,
          registrationPriceInEth,
        ),
      );
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
