'use client';

import { useCallback } from 'react';
import { Survey } from '../../apis/frameSurveys';
import { ButtonWithSurveyResponse } from '../Button/ButtonWithSurveyResponse';

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
      <div className="mt-[96px] h-screen flex flex-col items-center">
        <h1 className='text-3xl text-white my-10'>Question: {question.description ?? ''}</h1>
        <div className='grid grid-cols-2 max-w-[450px] gap-4'>
          {answers.map((answer) => (
            <div key={answer.id}>
              <ButtonWithSurveyResponse
                text={answer.description}
                clickHandler={createHandleClick(question.id, answer.id, 'useraddress', 'user_id')}
                fullWidth
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
