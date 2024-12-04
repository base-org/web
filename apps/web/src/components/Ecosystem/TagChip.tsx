'use client';

import classNames from 'classnames';
import { useCallback } from 'react';

type Props = {
  tag: string;
  isSelected: boolean;
  selectTag: (tag: string) => void;
  className?: string;
};

export function TagChip({ tag, isSelected, selectTag, className }: Props) {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      selectTag(tag);
    },
    [selectTag, tag],
  );

  const buttonClasses = classNames(
    'uppercase tracking-wider border border-white/20 h-10 whitespace-nowrap rounded-full px-4 transition-colors',
    className,
    {
      'bg-white text-black': isSelected,
      'text-white/50 hover:bg-white/20 hover:text-white': !isSelected,
    },
  );

  return (
    <button onClick={onClick} type="button" className={buttonClasses}>
      {tag}
    </button>
  );
}
