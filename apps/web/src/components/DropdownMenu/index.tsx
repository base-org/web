import { DropdownContext } from 'apps/web/src/components/Dropdown';
import classNames from 'classnames';
import { CSSProperties, ReactNode, useContext } from 'react';
import { createPortal } from 'react-dom';

export type DropdownMenuProps = {
  children: ReactNode;
};

export default function DropdownMenu({ children }: DropdownMenuProps) {
  const { open, dropdownToggleRef } = useContext(DropdownContext);

  const dropdownMenuClasses = classNames(
    'bg-white text-black  w-full py-4 rounded-xl shadow-md border border-gray-90 ',
    {
      hidden: !open,
      'inline-block': open,
    },
  );

  let dropdownStyle: CSSProperties = {};
  if (dropdownToggleRef?.current) {
    const { top, height, right } = dropdownToggleRef.current.getBoundingClientRect();
    dropdownStyle.top = top + height + 'px';
    dropdownStyle.left = `${right}px`;
    dropdownStyle.transform = `translateX(-100%)`;
  }

  return createPortal(
    <div className="absolute z-50 w-full max-w-xs pt-4" style={dropdownStyle}>
      <ul className={dropdownMenuClasses}>{children}</ul>
    </div>,
    document.body,
  );
}
