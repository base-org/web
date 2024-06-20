import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Input from 'apps/web/src/components/Input';
import { USERNAME_MIN_CHARACTER_LENGTH, formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { FocusEventHandler, useCallback, useId, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { useIsNameAvailable } from 'apps/web/src/utils/hooks/useIsNameAvailable';

export enum UsernameSearchInputVariant {
  Small,
  Large,
}

type UsernameSearchInputProps = {
  selectName: (name: string) => void;
  variant: UsernameSearchInputVariant;
  placeholder: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function UsernameSearchInput({
  selectName,
  variant,
  placeholder,
  onFocus,
  onBlur,
}: UsernameSearchInputProps) {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounceValue(search, 200);

  const { isLoading, data, isError, isFetched, isFetching } = useIsNameAvailable(debouncedSearch);
  const hasMinimumSearchLength = debouncedSearch.length >= USERNAME_MIN_CHARACTER_LENGTH;

  // AFAIK this can be true, false or undefined (loading)
  const isAvailable =
    hasMinimumSearchLength && !isLoading && !isError && !isFetching && isFetched && data === true;

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  }, []);

  const usernamesearchInputClasses = classNames(
    'relative z-10 transition-all duration-500 w-full mx-auto group text-black',
  );

  // This will change/animate the border when hovering the whole component
  const groupBorderClasses =
    'border-2 border-line/20 group-hover:border-blue-600 transition-colors';

  const inputClasses = classNames(
    'w-full outline-0 placeholder:uppercase peer focus:border-blue-600',
    groupBorderClasses,
    // Padding & Font sizes
    {
      'py-7 pl-6 pr-6 text-3xl': variant === UsernameSearchInputVariant.Large,
      'py-2 pl-3 pr-6': variant === UsernameSearchInputVariant.Small,
    },
    // Borders
    {
      'rounded-3xl': variant === UsernameSearchInputVariant.Large,
      'rounded-xl': variant === UsernameSearchInputVariant.Small,
      'rounded-b-none border-b-none border-b-0': hasMinimumSearchLength,
    },
  );

  const dropdownClasses = classNames(
    'flex flex-col items-start  border-2 bg-white peer-focus:border-blue-600',
    'absolute left-0 right-0 top-full z-10 border-t-0 overflow-hidden ',
    groupBorderClasses,
    // radius, Padding & Font sizes
    {
      'pb-4 rounded-b-3xl': variant === UsernameSearchInputVariant.Large,
      'pb-2 rounded-b-xl': variant === UsernameSearchInputVariant.Small,
    },
    // Visible or not
    {
      'opacity-0': !hasMinimumSearchLength,
      'opacity-1': hasMinimumSearchLength,
    },
  );

  const dropdownLabelClasses = classNames(' w-full uppercase text-line', {
    'px-6 text-sm mb-4 mt-4': variant === UsernameSearchInputVariant.Large,
    'px-3 text-xs mb-2 mt-2': variant === UsernameSearchInputVariant.Small,
  });

  const buttonClasses = classNames(
    'flex w-full flex-row items-center justify-between transition-colors hover:bg-[#F9F9F9] active:bg-[#EAEAEB]',
    {
      'px-6 py-4 text': variant === UsernameSearchInputVariant.Large,
      'px-3 py-2 text-sm': variant === UsernameSearchInputVariant.Small,
    },
  );

  const searchIconClasses = classNames(
    'pointer-events-none absolute top-1/2 z-20 flex -translate-y-1/2 items-center',
    {
      'right-8': variant === UsernameSearchInputVariant.Large,
      'right-3': variant === UsernameSearchInputVariant.Small,
    },
  );

  const lineClasses = classNames('w-full', {
    'px-6': variant === UsernameSearchInputVariant.Large,
    'px-3': variant === UsernameSearchInputVariant.Small,
  });

  const iconSize = variant === UsernameSearchInputVariant.Large ? 24 : 18;

  const isUnavailable = hasMinimumSearchLength && !isLoading && !isAvailable;
  const inputId = useId();

  function handleSelectName() {
    selectName(debouncedSearch);
  }
  return (
    <fieldset className={usernamesearchInputClasses}>
      <Input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className={inputClasses}
        onFocus={onFocus}
        onBlur={onBlur}
        id={inputId}
      />
      <div className={dropdownClasses}>
        <div className={lineClasses}>
          <div className="w-full border-t border-line/20 " />
        </div>
        {isUnavailable && (
          <div className="flex w-full flex-row items-center justify-between disabled:text-line">
            {formatBaseEthDomain(debouncedSearch)} is unavailable
          </div>
        )}
        <p className={dropdownLabelClasses}>
          {isAvailable ? 'Available' : isError ? 'Error fetching name availability' : 'Suggested'}
        </p>
        {isAvailable && (
          <button className={buttonClasses} type="button" onClick={handleSelectName}>
            {formatBaseEthDomain(debouncedSearch)}
            <ChevronRightIcon width={iconSize} height={iconSize} />
          </button>
        )}
      </div>
      <MagnifyingGlassIcon width={iconSize} height={iconSize} className={searchIconClasses} />
    </fieldset>
  );
}
