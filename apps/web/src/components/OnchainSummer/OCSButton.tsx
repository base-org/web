import { ButtonHTMLAttributes, ReactNode } from 'react';

const variantStyles = {
  primary:
    'text-ocsblue bg-white hover:bg-ocspink hover:text-black active:bg-translucent-800 ease-in duration-200 uppercase font-bold',
  secondary:
    'text-white bg-transparent border-dotted border-2 border-white hover:bg-black hover:border-black active:bg-translucent-200 ease-in duration-200 uppercase font-bold',
  primaryDark:
    'text-white bg-black hover:bg-white hover:text-black active:bg-translucent-800 ease-in duration-200 uppercase font-bold',
  secondaryDark:
    'text-black bg-transparent border border-black hover:bg-translucent-100 active:bg-translucent-200 ease-in duration-200',
  primaryBlue:
    'text-ocsblue bg-white hover:bg-ocsblue border-2 border-white hover:text-white active:bg-translucent-800 ease-in duration-200 uppercase font-bold',
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
