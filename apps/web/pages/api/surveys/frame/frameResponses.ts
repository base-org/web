import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { type FrameMetadataResponse } from '@coinbase/onchainkit/frame/types';
import { DOMAIN } from 'apps/web/src/constants';
import {
  Survey,
  SurveyQuestionWithAnswerOptions,
  UserQuestionResponse,
} from 'apps/web/pages/api/surveys/surveys';

export type QuestionFrameState = {
  surveyId: number;
  index: number;
  questions: SurveyQuestionWithAnswerOptions[];
  responses: UserQuestionResponse[];
};

export type ConfirmationFrameState = {
  surveyId: number;
  responses: UserQuestionResponse[];
};

export const initialFrame = (
  survey: Survey,
  questionsWithAnswerOptions: SurveyQuestionWithAnswerOptions[],
): FrameMetadataResponse =>
  getFrameMetadata({
    buttons: [
      {
        label: 'Begin Survey',
      },
    ],
    image: {
      src: `${DOMAIN}/api/surveys/assets/questionFrameImage.png?survey=${survey?.description}`,
    },
    postUrl: `http://localhost:3000/api/surveys/frame/01_frameQuestion`,
    state: {
      survey: survey.id,
      index: 0,
      questions: questionsWithAnswerOptions,
      responses: [],
    },
  });

export const questionFrame = (
  surveyId: number,
  index: number,
  currentQuestion: SurveyQuestionWithAnswerOptions,
  questions: SurveyQuestionWithAnswerOptions[],
  responses: UserQuestionResponse[],
): string => {
  const frameAnswerOptions =
    currentQuestion.question.question_type === 'Multiple Choice'
      ? {
          buttons: currentQuestion.answers.map((answer) => ({
            action: 'post',
            label: answer.answer_choice,
            postUrl: `http://localhost:3000/api/surveys/frame/01_frameQuestion?question=${currentQuestion.question.id}&answerId=${answer.id}&answer=${answer.answer_choice}`,
          })),
        }
      : {
          input: {
            text: '...',
          },
          buttons: [
            {
              action: 'post',
              label: 'Continue',
              postUrl: `http://localhost:3000/api/surveys/frame/01_frameQuestion?question=${currentQuestion.question.id}&answerId=null`,
            },
          ],
        };

  return getFrameHtmlResponse({
    ...frameAnswerOptions,
    image: {
      src: `${DOMAIN}/api/surveys/assets/questionFrameImage.png?survey=${currentQuestion.question.description}`,
    },
    postUrl: `http://localhost:3000/api/surveys/frame/01_frameQuestion`,
    state: {
      surveyId,
      index: index + 1,
      questions: questions,
      responses: responses,
    },
  });
};

export const confirmationFrame = (surveyId: number, responses: UserQuestionResponse[]): string => {
  const formattedResponses = encodeURIComponent(JSON.stringify(responses));

  return getFrameHtmlResponse({
    buttons: [{ action: 'post', label: 'Submit' }],
    image: {
      src: `${DOMAIN}/api/surveys/assets/confirmationFrameImage.png?responses=${formattedResponses}`,
    },
    postUrl: `http://localhost:3000/api/surveys/frame/02_frameSubmission`,
    state: {
      surveyId,
      responses: responses,
    },
  });
};

export const successFrame = (): string => {
  const thankYou = 'Thank you for your submission!'

  return getFrameHtmlResponse({
    buttons: [
      {
        action: 'link',
        label: 'Build On Base',
        target: 'https://base.org/getstarted',
      },
    ],
    image: {
      src: `${DOMAIN}/api/surveys/assets/questionFrameImage.png?survey=${thankYou}`,
    },
  });
};
