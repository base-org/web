'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { SurveyQuestionWithAnswerOptions, Question } from '../../apis/frameSurveys';
import { ButtonWithHandler } from '../Button/ButtonWithHandler';
import handleSurveyResponse from './ServerActions/handleSurveyResponse';
import { SurveyStatus } from 'apps/web/src/components/Surveys/SurveyContent';

type SurveyContentProps = {
  surveyData: SurveyQuestionWithAnswerOptions[];
  surveyStatusUpdater: Dispatch<SetStateAction<SurveyStatus>>;
};

/**
    {
      questions: [
        {
          questionId: 1,
          questionType: 'Multiple Choice',
          answer: 1
        },
        {
          questionId: 2,
          questionType: 'Text Input',
          answer: 'Blah Blah'
        }
      ]
    }
  */

export default function SurveyBody({ surveyData, surveyStatusUpdater }: SurveyContentProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [surveyResponse, setSurveyResponse] = useState([]);

  const createHandleClick = useCallback(
    (question: Question, answer: number | string) => () => {
      setSurveyResponse(...surveyResponse, {
        question_id: question.id,
        question_type: question.question_type,
        answer,
      });
      if (questionIndex < surveyData.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        console.log('submit the form');
      }
    },
    [],
  );

  console.log({ surveyResponse });

  return (
    <div>
      {
        <h1 className="my-10 text-3xl">
          Question 1: <br /> {surveyData[questionIndex].question.description}
        </h1>
      }
      <div className="flex flex-row justify-center gap-10 ">
        {surveyData[questionIndex].answers.map((answer) => (
          <ButtonWithHandler
            key={answer.answer_choice}
            clickHandler={createHandleClick(surveyData[questionIndex].question, answer.id)}
          >
            {answer.answer_choice}
          </ButtonWithHandler>
        ))}
      </div>
    </div>
  );

  // const [userResponseSubmitted, setUserResponseSubmitted] = useState<boolean>(false);
  // const { question, answers } = surveyData;

  // const createHandleClick = useCallback(
  //   (questionId: number, answerId: number, userAddress: string, userId: string) => () => {
  //     const handleClick = async () => {
  //       const response = await handleSurveyResponse(questionId, answerId, userAddress, userId);
  //       if (response.status === 200) {
  //         setUserResponseSubmitted(true);
  //       }
  //     };

  //     handleClick().catch((error) => {
  //       console.error('Error in handleClick:', error);
  //     });
  //   },
  //   [],
  // );

  // return (
  //   <div className="mt-[-96px] bg-blue-60">
  //     <div className="mt-[96px] flex h-screen flex-col items-center">
  //       <h1 className="my-10 text-3xl text-white">Question: {question.description ?? ''}</h1>
  //       {userResponseSubmitted ? (
  //         <div className="text-white">Thank you for your response.</div>
  //       ) : (
  //         <div className="grid max-w-[450px] grid-cols-2 gap-4">
  //           {answers.map((answer) => (
  //             <div key={answer.id}>
  //               <ButtonWithHandler
  //                 clickHandler={createHandleClick(question.id, answer.id, 'useraddress', 'user_id')}
  //                 fullWidth
  //               >
  //                 {answer.description}
  //               </ButtonWithHandler>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
