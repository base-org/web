'use client';

import { Button } from './Button';

export function ButtonWithSurveyResponse({ text, surveyResponseId }) {
  const handleClick = () => {
    console.log(surveyResponseId);
  };

  return <Button onClick={handleClick}>{text}</Button>;
}
