import { ElementType, ReactNode } from 'react';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import classNames from 'classnames';

const defaultTags: Record<TitleLevel, ElementType> = {
  [TitleLevel.Display1]: 'h1',
  [TitleLevel.Display2]: 'h2',
  [TitleLevel.Display3]: 'h3',
  [TitleLevel.Display4]: 'h4',
  [TitleLevel.Title1]: 'h1',
  [TitleLevel.Title2]: 'h2',
  [TitleLevel.Title3]: 'h3',
  [TitleLevel.Title4]: 'h4',
};

// TODO: Probably scale down for mobile?
//       check that leading change is intentional
//       check why we have 4 levels (vs 6 in HTML semantic tags)
//       check the swap between display/sans is intentional

export const levelStyles: Record<TitleLevel, string> = {
  [TitleLevel.Display1]: 'font-display text-[4.8125rem] leading-[1.1em]',
  [TitleLevel.Display2]: 'font-display text-[3.75rem] leading-[1.1em]',
  [TitleLevel.Display3]: 'font-display text-[2.625rem] leading-[1em]',
  [TitleLevel.Display4]: 'font-sans text-[2rem] leading-[1.1em]',
  [TitleLevel.Title1]: 'font-display text-[1.75rem] leading-[1.2em] font-bold',
  [TitleLevel.Title2]: 'font-sans text-[1.625rem] leading-[2.375rem]',
  [TitleLevel.Title3]: 'font-display text-[1.25rem] leading-[1.75rem]',
  [TitleLevel.Title4]: 'font-display text-[1.125rem] leading-[1.625rem]',
};

// Note: We don't pass className here to accidental font size override
//       padding, margin and other tweaks should be done in a
//       wrapper around the Title
type TitleProps = {
  children: ReactNode;
  level: TitleLevel;
  as?: ElementType;
};

export default function Title({ level = TitleLevel.Title1, children, as }: TitleProps) {
  const Tag = as ?? defaultTags[level];

  const titleClasses = classNames('text-currentColor', levelStyles[level]);
  return <Tag className={titleClasses}>{children}</Tag>;
}
