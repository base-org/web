'use client';
import { Dispatch, SetStateAction, useCallback, useRef } from 'react';

function SearchIcon() {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="m-2"
    >
      <path
        d="M16 14.5597L11.89 10.4497C12.59 9.41971 13 8.16971 13 6.82971C13 3.23971 10.09 0.329712 6.5 0.329712C2.91 0.329712 0 3.23971 0 6.82971C0 10.4197 2.91 13.3297 6.5 13.3297C7.84 13.3297 9.09 12.9197 10.13 12.2197L14.23 16.3297L16 14.5597ZM6.5 10.8297C4.29 10.8297 2.5 9.03971 2.5 6.82971C2.5 4.61971 4.29 2.82971 6.5 2.82971C8.71 2.82971 10.5 4.61971 10.5 6.82971C10.5 9.03971 8.71 10.8297 6.5 10.8297Z"
        fill="white"
      />
    </svg>
  );
}

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

export function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const debounced = useRef<number>();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(debounced.current);

      const value = e.target.value;
      setSearch(value);
    },
    [setSearch],
  );

  const clearInput = useCallback(() => {
    setSearch('');
  }, [setSearch]);

  return (
    <div className="flex h-10 flex-row items-center gap-2 rounded-[56px] border border-gray-60 p-2 md:w-full lg:w-80">
      <SearchIcon />

      <input
        type="text"
        id="appsSearchBar"
        value={search}
        onChange={onChange}
        className="w-full bg-black font-sans text-base text-white placeholder:text-gray-muted focus:outline-none"
        placeholder="Search"
        aria-label="Search for apps and integrations in the Base ecosystem"
      />
      {search && (
        <button type="button" onClick={clearInput} aria-label="clear input">
          <XIcon />
        </button>
      )}
    </div>
  );
}
