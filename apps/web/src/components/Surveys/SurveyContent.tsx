'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import {
  Survey,
  SurveyQuestionWithAnswerOptions,
  UserQuestionResponse,
} from 'apps/web/pages/api/surveys/surveys';
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

  const { status: walletConnectedStatus, address } = useAccount();

  useEffect(() => {
    async function getSurveyData() {
      const surveyData = await getSurveyQuestionsAndAnswerOptions(survey.id);
      setSurveyQuestions(surveyData);
    }

    if (surveyStatus === SurveyStatus.Unloaded) {
      void getSurveyData();
    }
  }, [survey.id, surveyStatus]);

  useEffect(() => {
    if (
      surveyStatus !== SurveyStatus.Unloaded &&
      surveyStatus !== SurveyStatus.Succeeded &&
      surveyResponse.length === surveyQuestions.length
    ) {
      setSurveyStatus(SurveyStatus.Completed);
    }
  }, [surveyQuestions.length, surveyResponse, surveyStatus]);

  useEffect(() => {
    if (surveySubmissionStatus === SurveySubmissionStatus.Succeeded) {
      setSurveyStatus(SurveyStatus.Succeeded);
    }
  }, [surveySubmissionStatus]);

  if (walletConnectedStatus !== 'connected') {
    return (
      <div className="flex flex-col items-center p-10">
        <h1 className="my-10 text-3xl">Please connect a wallet to continue.</h1>
      </div>
    );
  }

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
          userAddress={address}
          survey={survey}
          surveyQuestions={surveyQuestions}
          surveyResponse={surveyResponse}
          surveySubmissionStatusUpdater={setSurveySubmissionStatus}
        />
      ) : null}
      {surveyStatus === SurveyStatus.Succeeded ? (
        <div className="flex flex-col items-center p-10">
          <h1 className="my-10 text-3xl">Thank you for your response.</h1>
        </div>
      ) : null}
    </div>
  );
}
