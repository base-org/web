import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Input from 'apps/web/src/components/Input';
import { useFocusWithin } from 'apps/web/src/hooks/useFocusWithin';
import { useIsNameAvailable } from 'apps/web/src/hooks/useIsNameAvailable';
import { formatBaseEthDomain, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export enum RegistrationSearchInputVariant {
  Small,
  Large,
}

type RegistrationSearchInputProps = {
  variant: RegistrationSearchInputVariant;
  placeholder: string;
};

export default function RegistrationSearchInput({
  variant,
  placeholder,
}: RegistrationSearchInputProps) {
  const { ref, focused } = useFocusWithin();
  const { logEventWithContext } = useAnalytics();
  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [debouncedSearch] = useDebounceValue(search, 200);
  const { isLoading, data, isError, isFetching } = useIsNameAvailable(debouncedSearch);
  const { valid, message } = validateEnsDomainName(debouncedSearch);
  const invalidWithMessage = !valid && !!message;

  const { setSearchInputFocused, setSearchInputHovered, setSelectedName } = useRegistration();

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value.replace(/\s/g, ''));
  }, []);

  useEffect(() => {
    setDropdownOpen(valid || invalidWithMessage);
  }, [debouncedSearch, invalidWithMessage, valid]);

  const RegistrationSearchInputClasses = classNames(
    'relative z-10 transition-all duration-500 w-full mx-auto group text-black',
  );

  // This will change/animate the border when hovering the whole component
  const groupBorderClasses = classNames('transition-colors', {
    'border-2 border-gray-40/20 group-hover:border-blue-600 ':
      variant === RegistrationSearchInputVariant.Large,
    'border border-transparent group-hover:border-gray-40/20 ':
      variant === RegistrationSearchInputVariant.Small,

    'shadow-lg': variant === RegistrationSearchInputVariant.Large,
  });

  const inputClasses = classNames(
    'w-full outline-0 placeholder:uppercase peer ',
    // Padding & Font sizes
    {
      'py-7 pl-6 pr-16 text-2xl': variant === RegistrationSearchInputVariant.Large,
      'py-2 pl-3 pr-6': variant === RegistrationSearchInputVariant.Small,
    },
    // Background
    {
      'bg-white': variant === RegistrationSearchInputVariant.Large,
      'bg-transparent focus:bg-white': variant === RegistrationSearchInputVariant.Small,
    },
    // border colors
    {
      'border-gray-40/20 focus:border-blue-600 ': variant === RegistrationSearchInputVariant.Large,
      'focus:border-gray-40/20 hover:border-gray-40/20':
        variant === RegistrationSearchInputVariant.Small,
    },
    // Borders Radius
    {
      'rounded-3xl': variant === RegistrationSearchInputVariant.Large,
      'rounded-xl': variant === RegistrationSearchInputVariant.Small,
      'rounded-b-none border-b-none border-b-0': dropdownOpen,
    },
    groupBorderClasses,
  );

  const dropdownClasses = classNames(
    'flex flex-col items-start bg-white text-black',
    'absolute left-0 right-0 top-full z-10 border-t-0 ',
    groupBorderClasses,
    // radius, Padding & Font sizes
    {
      'pb-4 rounded-b-3xl': variant === RegistrationSearchInputVariant.Large,
      'pb-2 rounded-b-xl': variant === RegistrationSearchInputVariant.Small,
    },
    // border colors
    {
      'border-2 peer-focus:border-blue-600': variant === RegistrationSearchInputVariant.Large,
      'border peer-focus:border-gray-40/20': variant === RegistrationSearchInputVariant.Small,
    },
    // Visible or not
    {
      'opacity-0': !dropdownOpen,
      'opacity-1': dropdownOpen,
    },

    // // Animation
    'transition-all overflow-scroll ',
    {
      'max-h-[20rem]': dropdownOpen,
      'max-h-0 p-0 overflow-hidden border-none': !dropdownOpen,
    },
  );

  const dropdownLabelClasses = classNames('w-full uppercase text-gray-60 font-bold', {
    'px-6 text-sm mb-4 mt-4': variant === RegistrationSearchInputVariant.Large,
    'px-3 text-xs mb-2 mt-2': variant === RegistrationSearchInputVariant.Small,
  });

  const buttonClasses = classNames(
    'flex w-full flex-row items-center justify-between transition-colors hover:bg-[#F9F9F9] active:bg-[#EAEAEB] text-ellipsis',
    {
      'px-6 py-4 text': variant === RegistrationSearchInputVariant.Large,
      'px-3 py-2 text-sm': variant === RegistrationSearchInputVariant.Small,
    },
  );

  const inputIconClasses = classNames('absolute top-1/2 z-20 flex -translate-y-1/2 items-center', {
    'right-8': variant === RegistrationSearchInputVariant.Large,
    'right-3': variant === RegistrationSearchInputVariant.Small,
  });

  const lineClasses = classNames('w-full', {
    'px-6': variant === RegistrationSearchInputVariant.Large,
    'px-3': variant === RegistrationSearchInputVariant.Small,
  });

  const mutedMessage = classNames('text-gray-60', {
    'px-6 py-4 text': variant === RegistrationSearchInputVariant.Large,
    'px-3 py-2 text-sm': variant === RegistrationSearchInputVariant.Small,
  });

  const spinnerWrapperClasses = classNames('flex w-full items-center justify-center', {
    // Equivalent to the dropdown when one name is available
    'h-[6.75rem]': variant === RegistrationSearchInputVariant.Large,
    'h-[4.25rem]': variant === RegistrationSearchInputVariant.Small,
  });

  const iconSize = variant === RegistrationSearchInputVariant.Large ? 24 : 16;

  const inputId = useId();

  function handleSelectName(name: string) {
    setDropdownOpen(false);
    setSelectedName(name.trim());
  }

  useEffect(() => {
    if (!focused) {
      setDropdownOpen(false);
      return;
    }

    if (focused && valid) {
      setDropdownOpen(true);
    }
  }, [focused, valid]);

  // Right now david.base.eth is taken, it'll suggest david1.base.eth but
  // ultimately that might also be taken.
  const suggestions: string[] = useMemo(() => {
    return [`${debouncedSearch}1`, `${debouncedSearch}2`, `${debouncedSearch}3`];
  }, [debouncedSearch]);

  const setSearchFromSuggestion = useCallback(
    (suggestion: string) => {
      // Log: suggestion
      logEventWithContext('search_input_use_suggestion', ActionType.keyPress);

      setSearch(suggestion);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [logEventWithContext],
  );

  const resetSearch = useCallback(() => {
    setSearch('');
  }, []);

  const inputOnFocus = useCallback(() => {
    // Log focus
    logEventWithContext('search_input_focused', ActionType.focus);
    setSearchInputFocused(true);
  }, [logEventWithContext, setSearchInputFocused]);

  const inputOnBlur = useCallback(() => {
    // Log blur
    logEventWithContext('search_input_blur', ActionType.blur);
    setSearchInputFocused(false);
  }, [logEventWithContext, setSearchInputFocused]);

  useEffect(() => {
    // Log changes
    logEventWithContext('search_input_key_press', ActionType.keyPress);
    setSearchInputFocused(false);
  }, [debouncedSearch, logEventWithContext, setSearchInputFocused]);

  useEffect(() => {
    if (!invalidWithMessage) return;

    // Log invalid
    logEventWithContext('search_input_invalid', ActionType.error, { error: message });

    setSearchInputFocused(false);
  }, [invalidWithMessage, logEventWithContext, message, setSearchInputFocused]);

  useEffect(() => {
    if (!isError) return;

    setSearchInputFocused(false);
  }, [isError, logEventWithContext, setSearchInputFocused]);

  return (
    <fieldset
      className={RegistrationSearchInputClasses}
      onMouseEnter={() => setSearchInputHovered(true)}
      onMouseLeave={() => setSearchInputHovered(false)}
      ref={ref}
    >
      <Input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className={inputClasses}
        onFocus={inputOnFocus}
        onBlur={inputOnBlur}
        id={inputId}
        ref={inputRef}
      />
      <div className={dropdownClasses}>
        <div className={lineClasses}>
          <div className="w-full border-t border-gray-40/20 " />
        </div>
        {invalidWithMessage ? (
          <p className={mutedMessage}>Invalid name: {message}</p>
        ) : data === true ? (
          <>
            <p className={dropdownLabelClasses}>Available</p>
            <button
              className={buttonClasses}
              type="button"
              onClick={() => handleSelectName(debouncedSearch)}
            >
              <span className="truncate">{formatBaseEthDomain(debouncedSearch)}</span>
              <ChevronRightIcon width={iconSize} height={iconSize} />
            </button>
          </>
        ) : isLoading || isFetching ? (
          <div className={spinnerWrapperClasses}>
            <Icon name="spinner" color="currentColor" />
          </div>
        ) : isError ? (
          <p className={mutedMessage}>There was an error fetching the data</p>
        ) : (
          <>
            <p className={mutedMessage}>{formatBaseEthDomain(debouncedSearch)} is not available</p>
            <p className={dropdownLabelClasses}>Suggestion</p>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className={buttonClasses}
                type="button"
                onClick={() => setSearchFromSuggestion(suggestion)}
              >
                <span className="truncate">{formatBaseEthDomain(suggestion)}</span>
                <Icon name="chevronRight" width={iconSize} height={iconSize} />
              </button>
            ))}
          </>
        )}
      </div>
      <span className={inputIconClasses}>
        {search.length > 0 ? (
          <button onClick={resetSearch} type="button">
            <Icon name="cross" color="currentColor" height={iconSize} width={iconSize} />
          </button>
        ) : (
          <span className="pointer-events-none">
            <Icon name="search" color="currentColor" height={iconSize} width={iconSize} />
          </span>
        )}
      </span>
    </fieldset>
  );
}
