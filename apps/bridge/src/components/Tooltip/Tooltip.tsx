import Image from 'next/image';

type TooltipProps = {
  children: string;
};

export function Tooltip({ children }: TooltipProps) {
  return (
    <div className="has-tooltip">
      <span className="tooltip -mt-10 ml-6 rounded-lg bg-cds-background-gray-90 p-2 text-black shadow-lg">
        {children}
      </span>
      <Image alt="tooltip" src="/icons/question-mark-circled.svg" width={16} height={16} />
    </div>
  );
}
