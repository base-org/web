import { LabelHTMLAttributes, forwardRef } from 'react';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ children, htmlFor, className }, ref) => {
  return (
    <label ref={ref} htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
});

Label.displayName = 'Label';

export default Label;
