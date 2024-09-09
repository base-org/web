'use client';

import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { Icon, IconProps } from 'apps/web/src/components/Icon/Icon';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  connectWallet?: boolean;
  variant?: ButtonVariants;
  iconName?: IconProps['name'];
  roundedFull?: boolean;
};

const variantStyles: Record<ButtonVariants, string> = {
  // Blue button
  [ButtonVariants.Primary]: 'bg-blue text-white hover:bg-blue-80 active:bg-[#06318E]',

  // White buton
  [ButtonVariants.Secondary]: 'bg-white text-palette-foreground hover:bg-gray-15 active:bg-gray-30',

  // White outlined
  [ButtonVariants.Outlined]:
    'bg-transparent text-white border border-white hover:bg-white hover:text-black active:bg-[#E3E7E9]',
};

export default function Button({
  children,
  onClick,
  disabled,
  variant = ButtonVariants.Primary,
  iconName,
  roundedFull = false,
}: ButtonProps) {
  const buttonClasses = classNames(
    // Shared - base
    'text-md px-4 py-2 ',

    // Shared - layout
    'flex gap-3 items-center justify-center',

    // Shared - Disabled
    'disabled:opacity-40 disabled:pointer-events-none',

    // Shared - transition
    'transition-all',

    // Variants
    variantStyles[variant],

    // Rounded, mostly for connect wallet
    roundedFull ? 'rounded-full' : 'rounded-lg',
  );
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={buttonClasses}>
      <span>{children}</span>
      {iconName && <Icon name={iconName} width="0.75rem" height="0.75rem" color="currentColor" />}
    </button>
  );
}
