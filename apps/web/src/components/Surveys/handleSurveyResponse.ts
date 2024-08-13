'use server';

import { postUserResponse } from '../../../src/apis/frameSurveys';

export default async function handleSurveyResponse(
  questionId: number,
  answerId: number,
  userAddress: string,
  userId: string,
) {
  const { status, message, userResponse } = await postUserResponse(
    questionId,
    answerId,
    userAddress,
    userId,
  );
  return { status, message, userResponse };
}
