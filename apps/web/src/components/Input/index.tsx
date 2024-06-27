import { forwardRef, InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`transition-colors hover:border-blue-600 ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
