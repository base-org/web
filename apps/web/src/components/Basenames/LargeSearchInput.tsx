import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Input from 'apps/web/src/components/Input';
import { formatBaseEthDomain } from 'apps/web/src/utils/basenames';
import { useIsNameAvailable } from 'apps/web/src/utils/hooks/useIsNameAvailable';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

type LargeSearchInputProps = {
  selectedName: string;
  selectName: (name: string) => () => void;
  inputFocused: boolean;
  setInputFocused: Dispatch<SetStateAction<boolean>>;
};

export function LargeSearchInput({
  selectedName,
  selectName,
  inputFocused,
  setInputFocused,
}: LargeSearchInputProps) {
  const [inputIsHovered, setInputIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setInputIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setInputIsHovered(false), []);

  const handleOnBlur = () => setInputFocused(false);
  const handleOnFocus = () => setInputFocused(true);

  const [searchString, setSearchString] = useState<string>('');
  const [debouncedSearchString] = useDebounceValue(searchString, 200);
  const {
    isLoading: loadingBaseName,
    data: available,
    error: errorFetchingNameAvailability,
  } = useIsNameAvailable(debouncedSearchString);

  const suggestions = Boolean(debouncedSearchString && !available && !loadingBaseName)
    ? [debouncedSearchString + 'asdf', debouncedSearchString + '1234']
    : [];

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchString(value);
      setInputFocused(true);
    },
    [setInputFocused],
  );

  const hasSelectedName = selectedName.length !== 0;

  const showDropdown = !hasSelectedName && debouncedSearchString.length > 3;

  // TODO: This font-size/design *will* overflow on mobile devices
  const pillNameClasses = classNames(
    'bg-blue-500 w-full py-4 px-6 rounded-[5rem] text-5xl text-white absolute top-0 -translate-x-1/2	left-1/2 z-20',
    'transition-all mx-auto',
    {
      'max-w-[5rem] opacity-0 pointer-events-none': !hasSelectedName,
      'max-w-full opacity-1': hasSelectedName,
    },
  );

  const dropdownWrapperClasses = classNames('relative z-10 transition-all w-full mx-auto', {
    'opacity-1 max-w-full': !hasSelectedName,
    'pointer-events-none opacity-0 max-w-[5rem]': hasSelectedName,
  });

  const inputClasses = classNames(
    'relative w-full border-2 border-line/20 py-6 pl-6 pr-10 outline-0 text-xl placeholder:uppercase',
    {
      'rounded-t-xl border-b-0': showDropdown,
      'rounded-xl': !showDropdown,
      'border-ocsblue': inputFocused,
    },
  );

  const dropdownClasses = classNames(
    'flex flex-col items-start rounded-b-xl border-2 bg-white  ',
    {
      'border-ocsblue': inputIsHovered,
    },
    inputFocused ? 'border-ocsblue' : 'border-line/20',
    'border-t-0 pb-4',
  );

  return (
    <div className="relative z-10 w-screen max-w-[587px] ">
      {/* The big Blue pill */}
      <div className={pillNameClasses}>{formatBaseEthDomain(selectedName)}</div>

      {/* Input + Dropdown */}
      <fieldset className={dropdownWrapperClasses}>
        <Input
          type="text"
          value={searchString}
          onChange={handleSearchChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          placeholder="Search for a name"
          className={inputClasses}
          id="searchInput"
        />{' '}
        <span className="pointer-events-none absolute right-0 right-3 top-1/2 flex -translate-y-1/2 items-center">
          <MagnifyingGlassIcon width={24} height={24} className="z-20" />
        </span>
        {showDropdown && (
          <div className="absolute left-0 right-0 top-full z-10 ">
            <div className={dropdownClasses}>
              <div className="mb-4 w-full px-6">
                <div className="w-full border-t border-line/20 " />
              </div>
              {!loadingBaseName && !available && (
                <div className="flex w-full flex-row items-center justify-between disabled:text-line">
                  {formatBaseEthDomain(debouncedSearchString)} is unavailable
                </div>
              )}
              <p className="mb-2 w-full px-6 text-sm uppercase text-line">
                {available
                  ? 'Available'
                  : errorFetchingNameAvailability
                  ? 'Error fetching name availability'
                  : 'Suggested'}
              </p>
              {Boolean(available) && (
                <button
                  className="flex w-full flex-row items-center justify-between px-6 py-4 transition-colors hover:bg-[#F9F9F9] active:bg-[#EAEAEB]"
                  type="button"
                  onClick={selectName(debouncedSearchString)}
                >
                  {formatBaseEthDomain(debouncedSearchString)}{' '}
                  <ChevronRightIcon width={24} height={24} />
                </button>
              )}
              {suggestions?.map((suggestion) => (
                <button
                  className="flex w-full flex-row items-center justify-between px-6 py-4 transition-colors hover:bg-[#F9F9F9] active:bg-[#EAEAEB]"
                  type="button"
                  key={suggestion}
                  onClick={selectName(suggestion)}
                >
                  {formatBaseEthDomain(suggestion)} <ChevronRightIcon width={24} height={24} />
                </button>
              ))}
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
}
