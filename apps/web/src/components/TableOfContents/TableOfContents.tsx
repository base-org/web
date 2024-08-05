import Link from 'apps/web/node_modules/next/link';

export default async function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <div className="flex flex-col justify-center gap-2">
      <ol className="list-none p-0">
        {sections.map((section, index) => (
          <div key={section.id} className="flex flex-col justify-end">
            <li className="flex items-center text-lg sm:text-xl lg:text-2xl">
              <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white font-bold text-black sm:h-7 sm:w-7 lg:mr-4 lg:h-8 lg:w-8">
                {index + 1}
              </span>
              <Link
                href={`#${section.id}`}
                className="hover:text-xl sm:hover:text-2xl lg:hover:text-3xl"
              >
                {section.title}
              </Link>
            </li>
            {index < sections.length - 1 && (
              <hr className="my-3 w-[300px] sm:w-[350px] lg:my-4 lg:w-[450px]" />
            )}
          </div>
        ))}
      </ol>
    </div>
  );
}

type TableOfContentsProps = {
  sections: Section[];
};

export type Section = {
  title: string;
  id: string;
};
