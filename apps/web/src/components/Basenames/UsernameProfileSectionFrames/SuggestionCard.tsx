import { ChevronDownIcon } from '@heroicons/react/24/solid';
import * as Accordion from '@radix-ui/react-accordion';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { StaticImageData } from 'next/image';
import { PropsWithChildren } from 'react';

type SuggestionCardProps = PropsWithChildren<{
  imgData?: StaticImageData;
  icon?: JSX.Element;
  title: string;
  description: string;
  handleTriggerClick?: () => void;
}>;

export function SuggestionCard({
  imgData,
  icon,
  title,
  description,
  children,
  handleTriggerClick,
}: SuggestionCardProps) {
  return (
    <Accordion.Item
      value={title}
      className="border-b border-palette-line/20 last-of-type:border-transparent last-of-type:pb-0"
    >
      <Accordion.Header>
        <Accordion.Trigger
          className="flex w-full cursor-pointer items-center justify-start gap-2 pb-3 pt-4 text-palette-foreground"
          onClick={handleTriggerClick}
        >
          {icon ? icon : imgData ? <ImageAdaptive alt="menu option icon" src={imgData} /> : null}
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm text-palette-foregroundMuted">{description}</p>
          <div className="flex flex-grow items-center justify-end">
            <ChevronDownIcon
              className="transition-transform ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
              aria-hidden
              width="20px"
            />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pb-4 pl-4 md:pl-8">{children}</Accordion.Content>
    </Accordion.Item>
  );
}
