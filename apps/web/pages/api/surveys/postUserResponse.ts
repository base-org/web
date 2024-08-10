import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { postUserResponse } from '../../../src/apis/frameSurveys';

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

  let parsedBody: unknown;
  try {
    parsedBody = typeof req.body === 'string' ? JSON.parse(req.body) : null;
  } catch (e) {
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }

  if (!isValidUserResponse(parsedBody)) {
    return res.status(400).json({ message: 'Invalid user response data' });
  }

  const { questionId, answerId, userAddress, userId } = parsedBody;

  try {
    const userSubmission = await postUserResponse(questionId, answerId, userAddress, userId);
    return res.status(200).json(userSubmission);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

function isValidUserResponse(obj: unknown): obj is UserSurveyResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as UserSurveyResponse).questionId === 'number' &&
    typeof (obj as UserSurveyResponse).answerId === 'number' &&
    typeof (obj as UserSurveyResponse).userAddress === 'string' &&
    typeof (obj as UserSurveyResponse).userId === 'string'
  );
}
