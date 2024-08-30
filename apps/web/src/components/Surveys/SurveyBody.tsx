'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { SurveyQuestionWithAnswerOptions, UserQuestionResponse } from '../../apis/frameSurveys';
import { ButtonWithHandler } from '../Button/ButtonWithHandler';
import { Button } from 'apps/web/src/components/Button/Button';

type SurveyContentProps = {
  surveyData: SurveyQuestionWithAnswerOptions[];
  surveyResponseUpdater: Dispatch<SetStateAction<UserQuestionResponse[]>>;
};

export default function SurveyBody({ surveyData, surveyResponseUpdater }: SurveyContentProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const createHandleButtonClick = useCallback(
    (answer: number | string) => () => {
      surveyResponseUpdater((prev) => [
        ...prev,
        {
          question_id: surveyData[questionIndex].question.id,
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
