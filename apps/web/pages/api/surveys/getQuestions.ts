import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import { surveyDb } from '../../../src/apis/frameSurveys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log({ surveyDb });

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const questions = await surveyDb.selectFrom('frame_survey_questions').selectAll().execute();
    return res.status(200).json(questions);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
