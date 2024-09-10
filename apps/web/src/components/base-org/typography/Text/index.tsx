import { ElementType, ReactNode } from 'react';
import classNames from 'classnames';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';

const defaultTags: Record<TextVariant, ElementType> = {
  [TextVariant.Body]: 'p',
  [TextVariant.Label1]: 'p',
  [TextVariant.Label2]: 'p',
};

export const variantStyles: Record<TextVariant, string> = {
  [TextVariant.Body]: 'font-sans text-[1rem] leading-[1.2em]',
  [TextVariant.Label1]: 'font-display text-[0.875rem] leading-[1.1em]',
  [TextVariant.Label2]: 'font-sans text-[0.75rem] leading-[1.0625rem]',
};

// Note: We don't pass className here to accidental font size override
//       padding, margin and other tweaks should be done in a
//       wrapper around the Text
type TextProps = {
  children: ReactNode;
  variant?: TextVariant;
  as?: ElementType;
};

export default function Text({ variant = TextVariant.Body, children, as }: TextProps) {
  const Tag = as ?? defaultTags[variant];

  const textClasses = classNames('text-currentColor', variantStyles[variant]);
  return <Tag className={textClasses}>{children}</Tag>;
}
