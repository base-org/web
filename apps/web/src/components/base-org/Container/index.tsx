import { ElementType, ReactNode } from 'react';

type ContainerProps = { children: ReactNode; as?: ElementType };

export default function Container({ children, as }: ContainerProps) {
  const Tag = as ?? 'div';
  return (
    <Tag className="mx-auto w-full max-w-[80rem] px-[1rem] md:px-[1.5rem] lg:px-[2rem]">
      {children}
    </Tag>
  );
}
