'use client';

import { useCallback } from 'react';
import { Survey } from 'apps/web/src/apis/frameSurveys';
import { ButtonWithSurveyResponse } from 'apps/web/src/components/Button/ButtonWithSurveyResponse';

type SurveyContentProps = {
  surveyData: Survey;
};

export default function SurveyContent({ surveyData }: SurveyContentProps) {
  const { question, answers } = surveyData;

  const createHandleClick = useCallback(
    (questionId: number, answerId: number, userAddress: string, userId: string) => () => {
      const handleClick = async () => {
        const userResponseData = {
          questionId,
          answerId,
          userAddress,
          userId,
        };

        const fetchConfig = {
          method: 'POST',
          body: JSON.stringify(userResponseData),
        };
        await fetch('/api/surveys/postUserResponse', fetchConfig);
      };

      handleClick().catch((error) => {
        console.error('Error in handleClick:', error);
      });
    },
    [],
  );

  return (
    <div className="mt-[-96px] bg-blue-60">
      <div className="mt-[96px]">
        <p>Question: {question.description ?? ''}</p>
        <ol>
          {answers.map((answer) => (
            <li key={answer.id}>
              <ButtonWithSurveyResponse
                text={answer.description}
                clickHandler={createHandleClick(question.id, answer.id, 'useraddress', 'user_id')}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
