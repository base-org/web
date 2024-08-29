'use server';

import { getAllSurveyQuestionsAndAnswerOptions } from 'apps/web/src/apis/frameSurveys';

export default async function getSurveyQuestionsAndAnswerOptions(surveyId: number) {
  try {
    const surveyData = await getAllSurveyQuestionsAndAnswerOptions(surveyId);
    return surveyData;
  } catch (error) {
    console.error('Could not get survey questions and answer options:', error);
    return [];
  }
}
