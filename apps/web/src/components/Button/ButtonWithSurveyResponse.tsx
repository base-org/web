'use client';

import { Button } from './Button';

type ButtonWithSurveyResponseProps = {
  text: string;
  clickHandler: () => void;
};

export function ButtonWithSurveyResponse({ text, clickHandler }: ButtonWithSurveyResponseProps) {
  return <Button onClick={clickHandler}>{text}</Button>;
}
