'use client';

import { Dispatch, SetStateAction, useCallback } from 'react';

type Props = {
  tag: string;
  isSelected: boolean;
  setSelectedTag: Dispatch<SetStateAction<string>>;
};

export function TagChip({ tag, isSelected, setSelectedTag }: Props) {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setSelectedTag(tag);
    },
    [setSelectedTag, tag],
  );

  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex h-10 shrink-0 cursor-pointer flex-col justify-center rounded-[100px] border border-gray-muted px-8 hover:border-white ${
        isSelected ? 'bg-gray-muted' : ''
      }`}
    >
      <span className="text-center font-mono text-base uppercase text-white">{tag}</span>
    </button>
  );
}
