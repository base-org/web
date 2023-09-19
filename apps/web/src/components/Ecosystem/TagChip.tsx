import { useCallback } from 'react';

type Props = {
  tag: string;
  isSelected: boolean;
  setSelectedTag: (val: string) => void;
};

export function TagChip({ tag, isSelected, setSelectedTag }: Props) {
  const select = useCallback(() => {
    setSelectedTag(tag);
  }, [tag, setSelectedTag]);

  return (
    <button type="button" onClick={select}>
      <div
        className={`flex h-10 shrink-0 cursor-pointer flex-col justify-center rounded-[100px] border border-muted px-8 hover:border-white ${
          isSelected ? 'bg-muted' : ''
        }`}
      >
        <span className="text-center font-mono text-base uppercase text-white">{tag}</span>
      </div>
    </button>
  );
}
