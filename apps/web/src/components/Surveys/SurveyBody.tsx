'use client';

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { SurveyQuestionWithAnswerOptions, Question } from '../../apis/frameSurveys';
import { ButtonWithHandler } from '../Button/ButtonWithHandler';
import { Button } from 'apps/web/src/components/Button/Button';
import handleSurveyResponse from './ServerActions/handleSurveyResponse';
import { SurveyStatus } from 'apps/web/src/components/Surveys/SurveyContent';

type SurveyContentProps = {
  surveyData: SurveyQuestionWithAnswerOptions[];
  surveyStatusUpdater: Dispatch<SetStateAction<SurveyStatus>>;
  surveyResponseUpdater: Dispatch<SetStateAction<unknown[]>>;
};

/**
    {
      response: [
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

export default function SurveyBody({
  surveyData,
  surveyStatusUpdater,
  surveyResponseUpdater,
}: SurveyContentProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const createHandleButtonClick = useCallback(
    (answer: number | string) => () => {
      surveyResponseUpdater((prev) => [
        ...prev,
        {
          question_id: surveyData[questionIndex].question.id,
          question_type: surveyData[questionIndex].question.question_type,
          answer,
        },
      ]);
      if (questionIndex + 1 < surveyData.length) {
        setQuestionIndex(questionIndex + 1);
      }
    },
    [surveyData, questionIndex],
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      surveyResponseUpdater((prev) => [
        ...prev,
        {
          question_id: surveyData[questionIndex].question.id,
          question_type: surveyData[questionIndex].question.question_type,
          answer: inputValue,
        },
      ]);
      if (questionIndex + 1 < surveyData.length) {
        setQuestionIndex(questionIndex + 1);
      }
    },
    [surveyData, questionIndex, inputValue],
  );

  return (
    <div className="flex flex-col">
      <h1 className="my-10 text-3xl">
        {`Question ${questionIndex + 1}:`} <br /> {surveyData[questionIndex].question.description}
      </h1>
      <div className="flex flex-row justify-center gap-10 ">
        {surveyData[questionIndex].question.question_type === 'Multiple Choice' ? (
          surveyData[questionIndex].answers.map((answer) => (
            <ButtonWithHandler
              key={answer.answer_choice}
              clickHandler={createHandleButtonClick(answer.id)}
            >
              {answer.answer_choice}
            </ButtonWithHandler>
          ))
        ) : (
          <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
            <label htmlFor="inputValue">
              <textarea
                onChange={(e) => setInputValue(e.target.value)}
                id="inputValue"
                name="inputValue"
                placeholder="..."
                className="mb-4 h-[100px] w-[400px] resize-none px-4 py-2 text-xl text-black"
                value={inputValue}
              />
            </label>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </div>
    </div>
  );
}

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
