import { useCallback, useRef, useState } from 'react';
import SearchIcon from 'apps/web/src/components/Icon/SearchIcon';

type Props = {
  setSearchText: (val: string) => void;
};

function XIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="m-2"
    >
      <path
        d="M1.76773 1L0.353516 2.41422L6.35352 8.41422L0.353516 14.4142L1.76773 15.8284L7.76773 9.82843L13.7677 15.8284L15.1819 14.4142L9.18194 8.41421L15.1819 2.41422L13.7677 1L7.76773 7L1.76773 1Z"
        fill="white"
      />
    </svg>
  );
}

const DEBOUNCE_LENGTH_MS = 300;

export function SearchBar({ setSearchText }: Props) {
  const [text, setText] = useState('');
  const debounced = useRef<number>();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(debounced.current);

      const val = e.target.value;
      setText(val);

      debounced.current = window.setTimeout(() => {
        setSearchText(val);
      }, DEBOUNCE_LENGTH_MS);
    },
    [setText, setSearchText],
  );

  const clearInput = useCallback(() => {
    setText('');
    setSearchText('');
  }, [setSearchText]);

  return (
    <div className="flex h-10 flex-row items-center gap-2 rounded-[56px] border border-muted p-2 md:w-full lg:w-80">
      <SearchIcon />

      <input
        type="text"
        id="appsSearchBar"
        value={text}
        onChange={onChange}
        className="w-full bg-black font-sans text-base text-white placeholder:text-muted focus:outline-none"
        placeholder="Search"
        aria-label="Search for apps and integrations in the Base ecosystem"
      />
      {text && (
        <button type="button" onClick={clearInput}>
          <XIcon />
        </button>
      )}
    </div>
  );
}
