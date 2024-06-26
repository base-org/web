import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
  SecondaryDark = 'secondaryDark',
  SecondaryBounce = 'secondaryBounce',
  SecondaryDarkBounce = 'secondaryDarkBounce',
  Black = 'black',
}

export enum ButtonSizes {
  Small = 'small',
  Medium = 'medium',
}

const variantStyles = {
  [ButtonVariants.Primary]:
    'text-black bg-white hover:bg-translucent-900 active:bg-translucent-800',
  [ButtonVariants.Secondary]:
    'text-white bg-transparent border border-white hover:bg-translucent-100 active:bg-translucent-200',
  [ButtonVariants.SecondaryDark]:
    'text-black bg-transparent border border-black hover:bg-ocsblue hover:text-white active:bg-translucent-200',
  [ButtonVariants.SecondaryBounce]:
    'text-white bg-transparent border border-white hover:bg-translucent-100 active:bg-translucent-200 animate-bounce',
  [ButtonVariants.SecondaryDarkBounce]:
    'text-black bg-transparent border border-black hover:bg-ocsblue hover:text-white active:bg-translucent-200 animate-bounce',
  [ButtonVariants.Black]:
    'text-white bg-button-black hover:bg-button-blackHover active:bg-button-blackActive',
};

const sizeStyles = {
  [ButtonSizes.Small]: 'text-sm md:text-md px-6 py-3',
  [ButtonSizes.Medium]: 'text-sm md:text-lg px-10 py-3.5',
};

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = ButtonVariants.Primary,
  size = ButtonSizes.Medium,
  children,
  className,
  ...props
}: ButtonProps) {
  const buttonClasses = classNames(
    'font-display text-center',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  return (
    <button {...props} type="button" className={buttonClasses}>
      {children}
    </button>
  );
}
