import clsx from 'clsx';

const variants = {
  primary: 'bg-white text-black disabled:bg-stone-500',
  secondary: 'bg-[#32353D] border-gray-400 text-white',
};

export type BridgeButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: string;
  variant?: 'primary' | 'secondary';
};

export function BridgeButton({
  onClick,
  disabled,
  children,
  className,
  variant = 'primary',
}: BridgeButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        className ??
          'text-md flex items-center justify-center rounded-md p-4 font-sans font-bold uppercase',
        variants[variant],
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
