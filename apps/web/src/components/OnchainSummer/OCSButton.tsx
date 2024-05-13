import { ButtonHTMLAttributes, ReactNode } from 'react';

const variantStyles = {
  primary:
    'text-ocsblue bg-white hover:bg-translucent-900 active:bg-translucent-800 ease-in duration-200 uppercase font-bold',
  secondary:
    'text-white bg-transparent border-2 border-white hover:bg-translucent-100 active:bg-translucent-200 ease-in duration-200 uppercase font-bold',
  secondaryDark:
    'text-black bg-transparent border border-black hover:bg-translucent-100 active:bg-translucent-200 ease-in duration-200',
};

type ButtonProps = {
  /** @default primary */
  variant?: keyof typeof variantStyles;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function OCSButton({ variant = 'primary', children, className, ...props }: ButtonProps) {
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
