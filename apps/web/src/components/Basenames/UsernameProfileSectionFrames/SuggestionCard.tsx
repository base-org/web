import { ChevronDownIcon } from '@heroicons/react/24/solid';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { StaticImageData } from 'next/image';
import { PropsWithChildren, useCallback, useRef, useState } from 'react';

type SuggestionCardProps = PropsWithChildren<{
  imgData: StaticImageData;
  title: string;
  description: string;
  onClick?: () => void;
  hideHr?: boolean;
}>;

export function SuggestionCard({
  imgData,
  title,
  description,
  children,
  hideHr,
}: SuggestionCardProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(detailsRef.current?.open ?? false);
  }, []);

  return (
    <details ref={detailsRef} onToggle={handleToggle}>
      <summary className="flex cursor-pointer flex-col">
        <div className="flex flex-row items-start gap-2">
          <ImageAdaptive alt="menu option icon" src={imgData} />
          <p className="text-sm font-medium">{title}</p>
          <p className="text-foreground-muted flex-grow text-sm">{description}</p>
          <ChevronDownIcon
            height="1em"
            width="1em"
            className={`transform justify-end transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
        {!hideHr && <hr className="my-3 border-palette-line/20" />}
      </summary>
      {children}
    </details>
  );
}
