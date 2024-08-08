import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

type Props = {
  tag: string;
  isSelected: boolean;
};

export async function TagChip({ tag, isSelected }: Props) {
  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const tagHref: Url = {
    pathname: '/ecosystem',
    query: { tag },
  };
  return (
    <Link href={tagHref} scroll={false}>
      <div
        className={`flex h-10 shrink-0 cursor-pointer flex-col justify-center rounded-[100px] border border-gray-muted px-8 hover:border-white ${
          isSelected ? 'bg-gray-muted' : ''
        }`}
      >
        <span className="text-center font-mono text-base uppercase text-white">{tag}</span>
      </div>
    </Link>
  );
}
