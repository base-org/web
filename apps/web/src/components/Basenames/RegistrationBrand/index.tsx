import { Transition } from '@headlessui/react';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

const SEARCH_LABEL_COPY_STRINGS = ['Build your Based profile', 'Connect with Based builders'];

const useRotatingText = (strings: string[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
  }, 3000);
  return strings[currentIndex];
};

export default function RegistrationBrand() {
  const rotatingText = useRotatingText(SEARCH_LABEL_COPY_STRINGS);
  const { searchInputFocused } = useRegistration();
  return (
    <div className="relative flex w-full flex-row">
      <div className="flex items-center gap-1">
        <span
          className={classNames('pt-[1px]', {
            'text-blue-600': !searchInputFocused,
            'text-white': searchInputFocused,
          })}
        >
          <Icon name="blueCircle" color="currentColor" width={15} height={15} />
        </span>
        <h1 className="text-md font-bold md:text-xl">Basenames</h1>
      </div>
      {SEARCH_LABEL_COPY_STRINGS.map((string) => (
        <Transition
          key={string}
          show={rotatingText === string}
          className="transition-opacity"
          enter="delay-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <p className="text-md absolute right-0 md:text-xl">{string}</p>
        </Transition>
      ))}
    </div>
  );
}
