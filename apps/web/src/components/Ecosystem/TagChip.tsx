'use client';

import classNames from 'classnames';
import { useCallback, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useHover } from 'apps/web/src/hooks/useHover';

type Props = {
  tag: string;
  isSelected: boolean;
  selectTag: (tag: string) => void;
  subcategories?: string[];
  selectedSubcategories?: string[];
  selectSubcategory?: (subcategory: string) => void;
};

export function TagChip({
  tag,
  isSelected,
  selectTag,
  subcategories = [],
  selectedSubcategories = [],
  selectSubcategory,
}: Props) {
  const [, setOpen] = useState(false);
  const { isHovered, hoverProps } = useHover();
  console.log('isHovered:', isHovered);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      selectTag(tag);
    },
    [selectTag, tag],
  );

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectSubcategory?.(e.target.value);
  };

  const buttonClasses = classNames(
    'uppercase tracking-wider border border-white/20 h-10 whitespace-nowrap rounded-full px-4 transition-colors',
    {
      'bg-white text-black': isSelected,
      'text-white/50 hover:bg-white/20 hover:text-white': !isSelected,
    },
  );

  if (subcategories.length === 0) {
    return (
      <button onClick={onClick} type="button" className={buttonClasses}>
        {tag}
      </button>
    );
  }

  return (
    <Popover.Root open={isHovered} onOpenChange={setOpen}>
      <div {...hoverProps}>
        <Popover.Trigger asChild>
          <button type="button" className={buttonClasses} onClick={onClick}>
            {tag}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="z-50 max-h-[300px] overflow-y-auto rounded-lg bg-black/90 p-4 backdrop-blur-sm"
            sideOffset={5}
          >
            <div className="flex flex-col gap-2">
              {subcategories.map((subcategory) => (
                <label
                  key={subcategory}
                  className="flex cursor-pointer items-center gap-2 text-sm uppercase transition-colors hover:text-white"
                  htmlFor={subcategory}
                >
                  <input
                    id={subcategory}
                    value={subcategory}
                    type="checkbox"
                    checked={selectedSubcategories.includes(subcategory)}
                    onChange={handleSubcategoryChange}
                    className="h-4 w-4 rounded border-white/20 bg-transparent checked:bg-white checked:hover:bg-white/80"
                  />
                  <span
                    className={
                      selectedSubcategories.includes(subcategory) ? 'text-white' : 'text-white/50'
                    }
                  >
                    {subcategory}
                  </span>
                </label>
              ))}
            </div>
            <Popover.Arrow className="fill-black/90" />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}
