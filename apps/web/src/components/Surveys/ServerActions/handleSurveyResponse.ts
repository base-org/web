'use server';

import {
  getAllSurveyQuestionsAndAnswerOptions,
  postUserResponse,
  Survey,
  UserQuestionResponse,
  UserSurveyResponseForDb,
} from '../../../apis/frameSurveys';

/*
  survey_id, answer, user_address, user_id
*/

export default async function handleSurveySubmission(
  survey: Survey,
  surveyResponse: UserQuestionResponse[],
) {
  try {
    const isValid = validateSurveyResonse(survey, surveyResponse);
    if (!isValid) {
      throw new Error('Invalid response.');
    }

    const surveyResponseForSubmission: UserSurveyResponseForDb = {
      response: surveyResponse,
    };

    const response = await postUserResponse(survey.id, surveyResponseForSubmission, '0xBrendanRocks', null);
    return response;
  } catch (error) {
    // TODO: handle errors
  }
}

async function validateSurveyResonse(
  survey: Survey,
  surveyResponse: UserQuestionResponse[],
): Promise<boolean> {
  const surveyQuestionsWithAnswerOptions = await getAllSurveyQuestionsAndAnswerOptions(survey.id);

  const surveyQuestionIds = surveyQuestionsWithAnswerOptions
    .map((question) => question.question.id)
    .sort((a, b) => a - b);
  const questionIdsInResponse = surveyResponse
    .map((response) => response.questionId)
    .sort((a, b) => a - b);

  if (surveyQuestionIds.length !== questionIdsInResponse.length) {
    return false;
  }

  for (let i = 0; i < surveyQuestionIds.length; i++) {
    if (surveyQuestionIds[i] !== questionIdsInResponse[i]) {
      return false;
    }

    // TODO: need to check if the answer types are okay
  }

  return true;
}
