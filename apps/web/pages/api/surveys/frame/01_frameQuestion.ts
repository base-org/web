import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import {
  confirmationFrame,
  questionFrame,
  type QuestionFrameState,
} from 'apps/web/pages/api/surveys/frame/frameResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Set Years Screen — Method (${req.method}) Not Allowed` });
  }

  try {
    const body = req.body as FrameRequest;
    const { untrustedData } = body;
    const messageState = JSON.parse(decodeURIComponent(untrustedData.state)) as QuestionFrameState;
    const { surveyId, index, questions, responses } = messageState;

    const {
      question: previousQuestion,
      answerId: answerIdToPreviousQuestion,
      answer: answerToPreviousQuestion,
    } = req.query;
    const inputTextResponse = untrustedData.inputText;

    if (previousQuestion) {
      if (answerIdToPreviousQuestion === 'null') {
        responses.push({
          questionId: previousQuestion,
          answerId: null,
          answer: inputTextResponse,
        });
      } else {
        responses.push({
          questionId: previousQuestion,
          answerId: answerIdToPreviousQuestion,
          answer: answerToPreviousQuestion,
        });
      }
    }

    if (index <= questions.length - 1) {
      const currentQuestion = questions[index];
      return res
        .status(200)
        .setHeader('Content-Type', 'text/html')
        .send(questionFrame(surveyId, index, currentQuestion, questions, responses));
    }

    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(confirmationFrame(surveyId, responses));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
