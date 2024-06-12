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

/*
    <button class="before:ease relative h-12 w-40 overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40">
      <span relative="relative z-10">Shine</span>
    </button>
*/

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
