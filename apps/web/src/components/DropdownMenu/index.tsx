import { DropdownContext } from 'apps/web/src/components/Dropdown';
import classNames from 'classnames';
import { CSSProperties, ReactNode, useContext } from 'react';
import { createPortal } from 'react-dom';

export type DropdownMenuProps = {
  children: ReactNode;
};

export default function DropdownMenu({ children }: DropdownMenuProps) {
  const { open, dropdownToggleRef } = useContext(DropdownContext);

  const dropdownMenuWrapper = classNames('mt-2', {
    hidden: !open,
    'inline-block': open,
  });

  const dropdownMenuClasses = classNames('bg-white text-black w-full py-4 rounded-xl shadow-md');

  let dropdownStyle: CSSProperties = {};
  if (dropdownToggleRef?.current) {
    const { top, height, right } = dropdownToggleRef.current.getBoundingClientRect();
    dropdownStyle.top = top + height + 'px';
    dropdownStyle.left = `${right}px`;
    dropdownStyle.transform = `translateX(-100%)`;
  }

  // Arrow positioned center of the toggle element
  const arrowClasses = classNames(
    'absolute z-50 w-2 h-2 bg-white transform translate-y-1/2 -translate-x-1/2 rotate-[45deg] shadow-md',
  );

  let arrowStyle: CSSProperties = {};
  if (dropdownToggleRef?.current) {
    const { top, height, left, width } = dropdownToggleRef.current.getBoundingClientRect();
    arrowStyle.top = top + height + 'px';
    arrowStyle.left = `${left + width / 2}px`;
  }

  return createPortal(
    <div className={dropdownMenuWrapper}>
      <i className={arrowClasses} style={arrowStyle} />
      <div
        className="absolute z-50 w-full max-w-[80vw] -translate-x-full pt-2  md:max-w-xs"
        style={dropdownStyle}
      >
        <ul className={dropdownMenuClasses}>{children}</ul>
      </div>
    </div>,
    document.body,
  );
}
