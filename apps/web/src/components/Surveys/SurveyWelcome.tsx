'use client';

import { Dispatch, SetStateAction } from 'react';
import { ButtonWithHandler } from 'apps/web/src/components/Button/ButtonWithHandler';
import type { Survey } from 'apps/web/src/apis/frameSurveys';
import { SurveyStatus } from 'apps/web/src/components/Surveys/SurveyContent';

type SurveyWelcomeProps = {
  survey: Survey;
  statusUpdater: Dispatch<SetStateAction<SurveyStatus>>;
}

export default function SurveyWelcome({ survey, statusUpdater }: SurveyWelcomeProps) {
  return (
    <div className='flex flex-col items-center p-10'>
      <h1 className="my-10 text-3xl">Survey: {survey.description}</h1>
      <ButtonWithHandler clickHandler={() => statusUpdater(SurveyStatus.Started)} fullWidth>
        Start Survey
      </ButtonWithHandler>
    </div>
  );
}
