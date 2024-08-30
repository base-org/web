import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { postUserResponse } from '../surveys';

export type UserSurveyResponse = {
  userId: string;
  userAddress: string;
  questionId: number;
  answerId: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { questionId, answerId } = req.query;

  const body: FrameRequest = req.body;
  console.log({ body });
  const { isValid, message } = await getFrameMessage(body, {
    allowFramegear: true,
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
  });
  console.log('frame message...', { isValid, message });

  if (!isValid) {
    return res.status(500).json({ message: 'Message not valid' });
  }

  const userAddress: string = message.address ?? '0xbrendan_test';
  const userId = String(body.untrustedData.fid);

  try {
    const userSubmission = await postUserResponse(
      Number(questionId),
      Number(answerId),
      userAddress,
      userId,
    );

    if (userSubmission.status !== 200) {
      // TODO — WHAT IF USERSUBMISSION FAILED?
    }

    const frameResponse = getFrameHtmlResponse({
      buttons: [
        {
          action: 'link',
          label: 'Build On Base',
          target: 'https://base.org/getstarted',
        },
      ],
      image: {
        src: 'https://base.org/images/base-open-graph.png',
      },
    });

    return res.status(200).setHeader('Content-Type', 'text/html').send(frameResponse);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// function isValidUserResponse(obj: unknown): obj is UserSurveyResponse {
//   return (
//     typeof obj === 'object' &&
//     obj !== null &&
//     typeof (obj as UserSurveyResponse).questionId === 'number' &&
//     typeof (obj as UserSurveyResponse).answerId === 'number' &&
//     typeof (obj as UserSurveyResponse).userAddress === 'string' &&
//     typeof (obj as UserSurveyResponse).userId === 'string'
//   );
// }
