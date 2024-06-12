import { ButtonHTMLAttributes, ReactNode } from 'react';

const sharedStyles =
  'active:bg-button group relative h-12 w-40 overflow-hidden rounded-[3px] text-black shadow-light-button-3d transition-all text-xl';

const variantStyles = {
  white: `${sharedStyles} bg-button-white hover:bg-button-whiteHover active:bg-button-whiteActive text-black`,
  black: `${sharedStyles} bg-button-black hover:bg-button-blackHover active:bg-button-blackActive text-white`,
};

type ShinyButtonProps = {
  /** @default primary */
  variant?: keyof typeof variantStyles;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ShinyButton({
  variant = 'white',
  children,
  className,
  ...props
}: ShinyButtonProps) {
  return (
    <button {...props} type="button" className={variantStyles[variant]}>
      <div className="absolute right-0 top-0 h-12 w-6 animate-slide bg-white opacity-10 duration-700" />
      {children}
    </button>
  );
}
