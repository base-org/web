'use client';

import { Button, ButtonProps } from './Button';

type ButtonWithSurveyResponseProps = ButtonProps & {
  text: string;
  clickHandler: () => void;
};

export function ButtonWithSurveyResponse({ text, clickHandler }: ButtonWithSurveyResponseProps) {
  return <Button onClick={clickHandler}>{text}</Button>;
}
