'use client';

import { useEffect, useState } from 'react';
import { Survey, SurveyQuestionWithAnswerOptions } from 'apps/web/src/apis/frameSurveys';
import getSurveyQuestionsAndAnswerOptions from 'apps/web/src/components/Surveys/ServerActions/getSurveyQuestionsAndAnswerOptions';
import SurveyWelcome from 'apps/web/src/components/Surveys/SurveyWelcome';
import SurveyBody from 'apps/web/src/components/Surveys/SurveyBody';
import SurveySubmission from 'apps/web/src/components/Surveys/SurveySubmission';

type SurveyContentProps = {
  survey: Survey;
};

export enum SurveyStatus {
  Unloaded = 'unloaded',
  Started = 'started',
  Completed = 'completed',
}

export default function SurveyContent({ survey }: SurveyContentProps) {
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus>(SurveyStatus.Unloaded);
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestionWithAnswerOptions[]>([]);
  const [surveyResponse, setSurveyResponse] = useState<unknown[]>([]);

  useEffect(() => {
    async function getSurveyData() {
      const surveyData = await getSurveyQuestionsAndAnswerOptions(survey.id);
      setSurveyQuestions(surveyData);
    }

    if (surveyStatus === SurveyStatus.Unloaded) {
      getSurveyData();
    }
  }, [surveyStatus]);

  useEffect(() => {
    if (
      surveyStatus !== SurveyStatus.Unloaded &&
      surveyResponse.length === surveyQuestions.length
    ) {
      setSurveyStatus(SurveyStatus.Completed);
    }
  }, [surveyResponse]);

  console.log({ surveyResponse });

  return (
    <div className="flex flex-col items-center p-10">
      {surveyStatus === SurveyStatus.Unloaded ? (
        <SurveyWelcome survey={survey} statusUpdater={setSurveyStatus} />
      ) : null}
      {surveyStatus === SurveyStatus.Started ? (
        <SurveyBody
          surveyData={surveyQuestions}
          surveyStatusUpdater={setSurveyStatus}
          surveyResponseUpdater={setSurveyResponse}
        />
      ) : null}
      {surveyStatus === SurveyStatus.Completed ? <SurveySubmission /> : null}
    </div>
  );
}
