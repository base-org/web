import Image from 'next/image';

type BannerContainerProps = {
  content: string;
};

export function WarningBanner({ content }: BannerContainerProps) {
  return (
    <div className="flex-col border-t border-sidebar-border bg-[#0A0B0D] px-0 font-sans text-white ">
      <div className="flex items-center bg-warning-banner-red p-3">
        <Image alt="tooltip" src="/icons/alert.svg" width={16} height={16} />
        <span className="ml-2">{content}</span>
      </div>
    </div>
  );
}
