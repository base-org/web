'use client';

import { useCallback, useState } from 'react';
import { SurveyQuestionWithAnswerOptions } from '../../apis/frameSurveys';
import { ButtonWithHandler } from '../Button/ButtonWithHandler';
import handleSurveyResponse from './ServerActions/handleSurveyResponse';

type SurveyContentProps = {
  surveyData: SurveyQuestionWithAnswerOptions[];
};

export default function SurveyBody({ surveyData }: SurveyContentProps) {
  const [userResponseSubmitted, setUserResponseSubmitted] = useState<boolean>(false);
  const { question, answers } = surveyData;

  const createHandleClick = useCallback(
    (questionId: number, answerId: number, userAddress: string, userId: string) => () => {
      const handleClick = async () => {
        const response = await handleSurveyResponse(questionId, answerId, userAddress, userId);
        if (response.status === 200) {
          setUserResponseSubmitted(true);
        }
      };

      handleClick().catch((error) => {
        console.error('Error in handleClick:', error);
      });
    },
    [],
  );

  return (
    <div className="mt-[-96px] bg-blue-60">
      <div className="mt-[96px] flex h-screen flex-col items-center">
        <h1 className="my-10 text-3xl text-white">Question: {question.description ?? ''}</h1>
        {userResponseSubmitted ? (
          <div className="text-white">Thank you for your response.</div>
        ) : (
          <div className="grid max-w-[450px] grid-cols-2 gap-4">
            {answers.map((answer) => (
              <div key={answer.id}>
                <ButtonWithHandler
                  clickHandler={createHandleClick(question.id, answer.id, 'useraddress', 'user_id')}
                  fullWidth
                >
                  {answer.description}
                </ButtonWithHandler>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
