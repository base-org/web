'use client';

import { useEffect, useState } from 'react';
import {
  Survey,
  SurveyQuestionWithAnswerOptions,
  UserQuestionResponse,
} from 'apps/web/pages/api/surveys/frameSurveys';
import getSurveyQuestionsAndAnswerOptions from 'apps/web/src/components/Surveys/ServerActions/getSurveyQuestionsAndAnswerOptions';
import SurveyWelcome from 'apps/web/src/components/Surveys/SurveyWelcome';
import SurveyBody from 'apps/web/src/components/Surveys/SurveyBody';
import SurveyConfirmationAndSubmission from 'apps/web/src/components/Surveys/SurveyConfirmationAndSubmission';

type SurveyContentProps = {
  survey: Survey;
};

export enum SurveyStatus {
  Unloaded = 'unloaded',
  Started = 'started',
  Completed = 'completed',
  Submitted = 'submitted',
  Succeeded = 'succeeded',
}

export enum SurveySubmissionStatus {
  NotStarted = 'not started',
  Succeeded = 'succeeded',
}

export default function SurveyContent({ survey }: SurveyContentProps) {
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus>(SurveyStatus.Unloaded);
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestionWithAnswerOptions[]>([]);
  const [surveyResponse, setSurveyResponse] = useState<UserQuestionResponse[]>([]);
  const [surveySubmissionStatus, setSurveySubmissionStatus] = useState<SurveySubmissionStatus>(
    SurveySubmissionStatus.NotStarted,
  );

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

  useEffect(() => {
    if (surveySubmissionStatus === SurveySubmissionStatus.Succeeded) {
      setSurveyStatus(SurveyStatus.Succeeded);
    }
  }, [surveySubmissionStatus]);

  return (
    <div className="flex flex-col items-center p-10">
      {surveyStatus === SurveyStatus.Unloaded ? (
        <SurveyWelcome survey={survey} statusUpdater={setSurveyStatus} />
      ) : null}
      {surveyStatus === SurveyStatus.Started ? (
        <SurveyBody surveyData={surveyQuestions} surveyResponseUpdater={setSurveyResponse} />
      ) : null}
      {surveyStatus === SurveyStatus.Completed ? (
        <SurveyConfirmationAndSubmission
          survey={survey}
          surveyQuestions={surveyQuestions}
          surveyResponse={surveyResponse}
          surveySubmissionStatusUpdater={setSurveySubmissionStatus}
        />
      ) : null}
      {surveyStatus === SurveyStatus.Succeeded ? <div>Hoooray!!</div> : null}
    </div>
  );
}
