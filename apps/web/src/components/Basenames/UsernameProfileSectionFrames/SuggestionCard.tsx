import { ChevronDownIcon } from '@heroicons/react/24/solid';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import classNames from 'classnames';
import { StaticImageData } from 'next/image';
import { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type SuggestionCardProps = PropsWithChildren<{
  imgData?: StaticImageData;
  icon?: JSX.Element;
  title: string;
  description: string;
  onClick?: () => void;
}>;

export function SuggestionCard({
  imgData,
  icon,
  title,
  description,
  children,
}: SuggestionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    if (!detailsRef.current) return;
    detailsRef.current.open = false;
  }, []);
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  useOnClickOutside(detailsRef, handleClickOutside);

  return (
    <details
      ref={detailsRef}
      onToggle={handleToggle}
      className="max-w-md border-b border-palette-line/20 last-of-type:border-transparent last-of-type:pb-0"
    >
      <summary className="flex cursor-pointer flex-col pb-3 pt-4">
        <div className="flex flex-row items-center gap-2">
          {icon ? icon : imgData ? <ImageAdaptive alt="menu option icon" src={imgData} /> : null}
          <p className="text-sm font-medium">{title}</p>
          <p className="text-foreground-muted flex-grow text-sm">{description}</p>
          <ChevronDownIcon
            height="1em"
            width="1em"
            className={classNames(
              'rotate-0 transform justify-end transition-transform duration-200',
              {
                'rotate-180': isOpen,
              },
            )}
          />
        </div>
      </summary>
      <div className="mb-4">{children}</div>
    </details>
  );
}
