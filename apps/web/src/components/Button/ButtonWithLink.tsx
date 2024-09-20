'use client';

import Link, { LinkProps } from 'apps/web/node_modules/next/link';
import { Button, ButtonProps } from './Button';

export type ButtonWithLinkProps = Omit<ButtonProps, 'href' | 'className'> & {
  href: string;
  linkClassNames?: string;
  linkProps?: Omit<LinkProps, 'href' | 'passHref'>;
  target?: string;
  rel?: string;
  buttonClassNames?: string;
};

export function ButtonWithLink({
  href,
  target,
  rel,
  linkClassNames,
  linkProps,
  variant,
  size,
  children,
  buttonClassNames,
  rounded = false,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  ...buttonProps
}: ButtonWithLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`${linkClassNames}${disabled ? ' pointer-events-none' : ''}`}
      {...linkProps}
    >
      <Button
        variant={variant}
        size={size}
        className={buttonClassNames}
        rounded={rounded}
        fullWidth={fullWidth}
        disabled={disabled}
        isLoading={isLoading}
        {...buttonProps}
      >
        {children}
      </Button>
    </Link>
  );
}
