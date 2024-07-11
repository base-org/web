import { Transition } from '@headlessui/react';
import { PropsWithChildren, ReactNode, useCallback, useState } from 'react';

type TooltipProps = {
  content: ReactNode;
};

function Tooltip({ content, children }: PropsWithChildren<TooltipProps>) {
  const [isHovered, setIsHovered] = useState(false);
  const setHovered = useCallback(() => setIsHovered(true), []);
  const setNotHovered = useCallback(() => setIsHovered(false), []);

  return (
    <div className="relative" onMouseEnter={setHovered} onMouseLeave={setNotHovered}>
      {children}
      <Transition
        show={isHovered}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute -top-12 left-1/2 w-max -translate-x-1/2 transform">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-gray-dark ring-opacity-5">
            <div className="bg-gray-dark px-4 py-2 text-white">{content}</div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Tooltip;
