import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  /** @default primary */
  variant?: 'primary' | 'secondary';
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const primaryStyles =
  'text-black bg-white hover:bg-translucent-900 active:bg-translucent-800 ease-in duration-200';
const secondaryStyles =
  'text-white bg-transparent border border-white hover:bg-translucent-100 active:bg-translucent-200 ease-in duration-200';

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={`rounded font-display text-sm md:text-lg ${
        variant === 'secondary' ? secondaryStyles : primaryStyles
      } px-10 py-3.5 text-center ${className ?? ''}`}
    >
      {children}
    </button>
  );
}
