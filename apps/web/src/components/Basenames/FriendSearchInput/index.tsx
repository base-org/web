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
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { FriendSearchInputProps, FriendSearchInputVariant } from './types';

export default function FriendSearchInput({ variant, placeholder }: FriendSearchInputProps) {
  const { ref, focused } = useFocusWithin<HTMLFieldSetElement>();
  const { logEventWithContext } = useAnalytics();
  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [headerBackground, setHeaderBackground] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [debouncedSearch] = useDebounceValue(search, 400);
  const [debouncedScroll] = useDebounceValue(headerBackground, 200);
  const { basenameChain } = useBasenameChain();
  const {
    isLoading: isLoadingNameAvailability,
    data: isNameAvailable,
    isError: errorCheckingNameAvailability,
    isFetching,
  } = useIsNameAvailable(debouncedSearch);
  const isLoading = isLoadingNameAvailability;

  const { valid, message } = validateEnsDomainName(debouncedSearch);
  const invalidWithMessage = !valid && !!message;
  const resetBackground = focused && debouncedScroll;

  const { setSearchInputFocused, setSearchInputHovered, setSelectedName } = useRegistration();

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value.replace(/[\s\.]+/g, ''));
  }, []);

  useEffect(() => {
    setDropdownOpen(valid || invalidWithMessage);
  }, [debouncedSearch, invalidWithMessage, valid]);

  const FriendSearchInputClasses = classNames(
    'relative z-9 transition-all duration-500 w-full mx-auto group text-black',
  );

  // This will change/animate the border when hovering the whole component
  const groupBorderClasses = classNames('transition-colors', {
    'border-2 border-gray-40/20 group-hover:border-blue-600 ':
      variant === FriendSearchInputVariant.Large,
    'border border-transparent group-hover:border-gray-40/20 ':
      variant === FriendSearchInputVariant.Small,

    'shadow-lg': variant === FriendSearchInputVariant.Large,
  });

  const inputClasses = classNames(
    'w-full outline-0 placeholder:uppercase peer ',
    // Padding & Font sizes
    {
      'py-5 md:py-7 pl-6 pr-16 text-md md:text-2xl': variant === FriendSearchInputVariant.Large,
      'py-2 pl-3 pr-6': variant === FriendSearchInputVariant.Small,
    },
    // Background
    {
      'bg-white': variant === FriendSearchInputVariant.Large,
      'bg-transparent focus:bg-white': variant === FriendSearchInputVariant.Small,
    },
    // border colors
    {
      'border-gray-40/20 focus:border-blue-600 ': variant === FriendSearchInputVariant.Large,
      'focus:border-gray-40/20 hover:border-gray-40/20': variant === FriendSearchInputVariant.Small,
    },
    // Borders Radius
    {
      'rounded-3xl': variant === FriendSearchInputVariant.Large,
      'rounded-xl': variant === FriendSearchInputVariant.Small,
      'rounded-b-none border-b-none border-b-0': dropdownOpen,
    },
    groupBorderClasses,
  );

  const dropdownClasses = classNames(
    'flex flex-col items-start bg-white text-black',
    'absolute left-0 right-0 top-full z-9 border-t-0 ',
    groupBorderClasses,
    // radius, Padding & Font sizes
    {
      'pb-4 rounded-b-3xl': variant === FriendSearchInputVariant.Large,
      'pb-2 rounded-b-xl': variant === FriendSearchInputVariant.Small,
    },
    // border colors
    {
      'border-2 peer-focus:border-blue-600': variant === FriendSearchInputVariant.Large,
      'border peer-focus:border-gray-40/20': variant === FriendSearchInputVariant.Small,
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

  const dropdownLabelClasses = classNames(
    'w-full uppercase text-gray-60 font-bold pointer-events-none',
    {
      'text-sm ml-6 mb-4 mt-4': variant === FriendSearchInputVariant.Large,
      'text-xs ml-3 mb-2 mt-2': variant === FriendSearchInputVariant.Small,
    },
  );

  const buttonClasses = classNames(
    'flex w-full flex-row items-center justify-between transition-colors hover:bg-[#F9F9F9] active:bg-[#EAEAEB] text-ellipsis',
    {
      'px-6 py-3 text': variant === FriendSearchInputVariant.Large,
      'px-3 py-2 text-sm': variant === FriendSearchInputVariant.Small,
    },
  );

  const inputIconClasses = classNames(
    'absolute top-1/2 z-9 flex -translate-y-1/2 items-center scale-75 md:scale-100',
    {
      'right-8': variant === FriendSearchInputVariant.Large,
      'right-3': variant === FriendSearchInputVariant.Small,
    },
  );

  const lineClasses = classNames('w-full', {
    'px-6': variant === FriendSearchInputVariant.Large,
    'px-3': variant === FriendSearchInputVariant.Small,
  });

  const mutedMessage = classNames('text-gray-60', {
    'px-6 py-4 text': variant === FriendSearchInputVariant.Large,
    'px-3 py-2 text-sm': variant === FriendSearchInputVariant.Small,
  });

  const spinnerWrapperClasses = classNames('flex w-full items-center justify-center', {
    // Equivalent to the dropdown when one name is available
    'h-[6.75rem]': variant === FriendSearchInputVariant.Large,
    'h-[4.25rem]': variant === FriendSearchInputVariant.Small,
  });

  const iconSize = variant === FriendSearchInputVariant.Large ? 24 : 16;

  const inputId = useId();

  useEffect(() => {
    if (!focused) {
      setDropdownOpen(false);
      return;
    }

    if (focused && valid) {
      setDropdownOpen(true);
    }
  }, [focused, valid]);

  const handleSelectFriend = useCallback(
    (name: string) => {
      setDropdownOpen(false);
      setSelectedName(name.trim());
    },
    [setSelectedName],
  );

  const resetSearch = useCallback(() => {
    setSearch('');
  }, []);

  const onMouseEnterFieldset = useCallback(
    () => setSearchInputHovered(true),
    [setSearchInputHovered],
  );
  const onMouseLeaveFieldset = useCallback(
    () => setSearchInputHovered(false),
    [setSearchInputHovered],
  );

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBackground(window.scrollY <= 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setSearchInputFocused(resetBackground);
  }, [resetBackground, setSearchInputFocused]);

  useEffect(() => {
    if (!invalidWithMessage) return;

    // Log invalid
    logEventWithContext('search_available_name_invalid', ActionType.error, { error: message });
  }, [invalidWithMessage, logEventWithContext, message, setSearchInputFocused]);

  const selectName = useCallback(() => {
    handleSelectFriend(debouncedSearch);
  }, [debouncedSearch, handleSelectFriend]);

  return (
    <fieldset
      className={FriendSearchInputClasses}
      onMouseEnter={onMouseEnterFieldset}
      onMouseLeave={onMouseLeaveFieldset}
      ref={ref}
    >
      <Input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className={inputClasses}
        id={inputId}
        ref={inputRef}
        autoCapitalize="none"
      />
      <div className={dropdownClasses}>
        <div className={lineClasses}>
          <div className="w-full border-t border-gray-40/20" />
        </div>
        {invalidWithMessage ? (
          <p className={mutedMessage}>{message}</p>
        ) : isNameAvailable === true ? (
          <>
            <p className={`${dropdownLabelClasses} hidden md:block`}>Available</p>
            <button className={buttonClasses} type="button" onClick={selectName}>
              <span className="truncate">
                {formatBaseEthDomain(debouncedSearch, basenameChain.id)}
              </span>
              <ChevronRightIcon width={iconSize} height={iconSize} />
            </button>
          </>
        ) : isLoading || isFetching ? (
          <div className={spinnerWrapperClasses}>
            <Icon name="spinner" color="currentColor" />
          </div>
        ) : errorCheckingNameAvailability ? (
          <p className={mutedMessage}>
            There was an error checking if your desired name is available
          </p>
        ) : (
          <p className={mutedMessage}>
            {formatBaseEthDomain(debouncedSearch, basenameChain.id)} is already registered
          </p>
        )}
      </div>
      <span className={inputIconClasses}>
        {search.length > 0 ? (
          <button onClick={resetSearch} type="button" aria-label="Reset search">
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
