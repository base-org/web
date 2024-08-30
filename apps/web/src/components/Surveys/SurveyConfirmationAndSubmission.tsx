'use client';

import { Dispatch, SetStateAction, useCallback } from 'react';
import {
  Survey,
  SurveyQuestionWithAnswerOptions,
  UserQuestionResponse,
} from 'apps/web/pages/api/surveys/frameSurveys';
import { ButtonWithHandler } from 'apps/web/src/components/Button/ButtonWithHandler';
import handleSurveySubmission from 'apps/web/src/components/Surveys/ServerActions/handleSurveyResponse';
import { SurveySubmissionStatus } from 'apps/web/src/components/Surveys/SurveyContent';

type SurveySubmissionProps = {
  survey: Survey;
  surveyQuestions: SurveyQuestionWithAnswerOptions[];
  surveyResponse: UserQuestionResponse[];
  surveySubmissionStatusUpdater: Dispatch<SetStateAction<SurveySubmissionStatus>>;
};

export default function SurveyConfirmationAndSubmission({
  survey,
  surveyQuestions,
  surveyResponse,
  surveySubmissionStatusUpdater,
}: SurveySubmissionProps) {
  const createHandleSurveySubmission = useCallback(async () => {
    const response = await handleSurveySubmission(survey, surveyResponse);
    if (response?.status === 200) {
      surveySubmissionStatusUpdater(SurveySubmissionStatus.Succeeded);
    }
  }, []);

  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="my-10 text-3xl">Confirm Response</h1>
      <div className="my-6">
        {surveyQuestions.map((question, index) => (
          <div key={question.question.id} className="mb-4 flex flex-col items-start justify-start">
            <div className="text-xl">{question.question.description}</div>
            <div className="text-base">{surveyResponse[index].answer}</div>
          </div>
        ))}
      </div>
      <ButtonWithHandler clickHandler={createHandleSurveySubmission}>Submit</ButtonWithHandler>
    </div>
  );
}
