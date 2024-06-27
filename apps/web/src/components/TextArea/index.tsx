import { TextareaHTMLAttributes, forwardRef } from 'react';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`rounded-md border border-line/20 p-4 text-black transition-colors hover:border-blue-600 ${className}`}
        {...props}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
