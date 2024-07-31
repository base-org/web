import Link, { LinkProps } from 'apps/web/node_modules/next/link';

import { Button, ButtonProps, ButtonVariants, ButtonSizes } from './Button';

export async function ButtonWithLink({
  href,
  target,
  rel,
  linkClassNames,
  linkProps,
  variant = 'Primary',
  size = 'Medium',
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
        variant={ButtonVariants[variant]}
        size={ButtonSizes[size]}
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

export type ButtonWithLinkProps = Omit<ButtonProps, 'href' | 'variant' | 'size' | 'className'> & {
  href: string;
  linkClassNames?: string;
  linkProps?: Omit<LinkProps, 'href' | 'passHref'>;
  target?: string;
  rel?: string;
  variant?: ButtonVariantString;
  size?: ButtonSizeString;
  buttonClassNames?: string;
};

type ButtonVariantString = keyof typeof ButtonVariants;
type ButtonSizeString = keyof typeof ButtonSizes;
