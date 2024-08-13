'use server';

import { postUserResponse } from '../../../src/apis/frameSurveys';

export default async function handleSurveyResponse(
  questionId: number,
  answerId: number,
  userAddress: string,
  userId: string,
) {
  const response = await postUserResponse(questionId, answerId, userAddress, userId);
  return response;
}
