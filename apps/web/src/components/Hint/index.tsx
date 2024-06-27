import { HTMLAttributes, forwardRef } from 'react';

export type HintProps = HTMLAttributes<HTMLSpanElement>;

const Hint = forwardRef<HTMLSpanElement, HintProps>(({ children }, ref) => {
  return (
    <span ref={ref} className="text-sm text-muted">
      {children}
    </span>
  );
});

Hint.displayName = 'Hint';

export default Hint;
