import { memo } from 'react';

type Props = {
  children: string;
};

export const Title = memo(function Title({ children }: Props) {
  return <div className="text-xl font-bold">{children}</div>;
});
