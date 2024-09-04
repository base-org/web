import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { type FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import {
  successFrame,
  type ConfirmationFrameState,
} from 'apps/web/pages/api/surveys/frame/frameResponses';
import { NEYNAR_API_KEY } from 'apps/web/src/constants';
import { postUserResponse } from 'apps/web/pages/api/surveys/surveys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Set Years Screen — Method (${req.method}) Not Allowed` });
  }

  try {
    const body = req.body as FrameRequest;
    const { isValid, message } = await getFrameMessage(body, {
      allowFramegear: true,
      neynarApiKey: NEYNAR_API_KEY,
    });
    if (!isValid) {
      throw new Error('Message is not valid');
    }
    if (!message) {
      throw new Error('No message received');
    }
    const userAddress = message.address;
    const userId = message.interactor.fid;

    const messageState = JSON.parse(decodeURIComponent(message.state?.serialized));
    if (!messageState) {
      throw new Error('No message state received');
    }
    const { surveyId, responses } = messageState as ConfirmationFrameState;
    if (!responses || responses.length === 0) {
      throw new Error('Invalid responses received');
    }
    console.log('confirmation of responses:', { responses });

    const userSubmission = await postUserResponse(
      surveyId,
      { response: responses },
      userAddress,
      userId,
    );

    if (userSubmission.status !== 200) {
      throw new Error('Could not record user response');
    }

    return res.status(200).setHeader('Content-Type', 'text/html').send(successFrame());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
