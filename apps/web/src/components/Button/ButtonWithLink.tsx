import Link, { LinkProps } from 'apps/web/node_modules/next/link';

import { Button, ButtonProps, ButtonVariants, ButtonSizes } from './Button';

export async function ButtonWithLink({
  href,
  target,
  rel,
  linkProps,
  variant = 'Primary',
  size = 'Medium',
  children,
  className,
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
      className={disabled ? 'pointer-events-none' : ''}
      {...linkProps}
    >
      <Button
        variant={ButtonVariants[variant]}
        size={ButtonSizes[size]}
        className={className}
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

export type ButtonWithLinkProps = Omit<ButtonProps, 'href' | 'variant' | 'size'> & {
  href: string;
  linkProps?: Omit<LinkProps, 'href' | 'passHref'>;
  target?: string;
  rel?: string;
  variant?: ButtonVariantString;
  size?: ButtonSizeString;
};

type ButtonVariantString = keyof typeof ButtonVariants;
type ButtonSizeString = keyof typeof ButtonSizes;
