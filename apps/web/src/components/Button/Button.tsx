import { ButtonHTMLAttributes, ReactNode } from 'react';

const variantStyles = {
  primary: 'text-black bg-white hover:bg-translucent-900 active:bg-translucent-800',
  secondary:
    'text-white bg-transparent border border-white hover:bg-translucent-100 active:bg-translucent-200',
  secondaryDark:
    'text-black bg-transparent border border-black hover:bg-ocsblue hover:text-white active:bg-translucent-200',
  secondaryBounce:
    'text-white bg-transparent border border-white hover:bg-translucent-100 active:bg-translucent-200 animate-bounce',
  secondaryDarkBounce:
    'text-black bg-transparent border border-black hover:bg-ocsblue hover:text-white active:bg-translucent-200 animate-bounce',
  black: 'text-white bg-button-black hover:bg-button-blackHover active:bg-button-blackActive',
};

type ButtonProps = {
  /** @default primary */
  variant?: keyof typeof variantStyles;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={`rounded font-display text-sm md:text-lg ${
        variantStyles[variant]
      } px-10 py-3.5 text-center ${className ?? ''}`}
    >
      {children}
    </button>
  );
}
