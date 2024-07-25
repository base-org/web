import { Arrow, Content, Portal, Root, Trigger } from '@radix-ui/react-tooltip';
import { PropsWithChildren, ReactNode } from 'react';

type TooltipProps = {
  content: ReactNode;
};

export default function Tooltip({ content, children }: PropsWithChildren<TooltipProps>) {
  return (
    <Root>
      <Trigger>{children}</Trigger>
      <Portal>
        <Content className="z-50 shadow-lg ring-1 ring-gray-dark ring-opacity-5">
          <Arrow />
          <div className="max-w-sm rounded-lg bg-gray-dark px-4 py-2 text-white">{content}</div>
        </Content>
      </Portal>
    </Root>
  );
}
