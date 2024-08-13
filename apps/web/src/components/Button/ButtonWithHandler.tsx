'use client';

import { Button, ButtonProps } from './Button';

type ButtonWithHandlerProps = ButtonProps & {
  clickHandler: () => void;
};

export function ButtonWithHandler({
  children,
  clickHandler,
}: ButtonWithHandlerProps) {
  return <Button onClick={clickHandler}>{children}</Button>;
}
