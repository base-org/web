import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { StaticImageData } from 'next/image';

type SuggestionCardProps = {
  imgData: StaticImageData;
  title: string;
  description: string;
  onClick?: () => void;
};
export function SuggestionCard({ imgData, title, description, onClick }: SuggestionCardProps) {
  return (
    <div
      className="h-[160px] w-[220px] shrink-0 cursor-pointer rounded-[13px] border border-palette-line/20 p-4 hover:shadow-lg"
      onClick={onClick}
      onKeyDown={onClick}
      role="menuitem"
      tabIndex={0}
    >
      <ImageAdaptive alt="" src={imgData} />
      <span className="mt-4 text-sm font-medium">{title}</span>
      <p className="text-foreground-muted text-sm">{description}</p>
    </div>
  );
}
