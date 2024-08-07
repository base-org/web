import Link from 'apps/web/node_modules/next/link';
import Image, { StaticImageData } from 'apps/web/node_modules/next/image';
import section1 from '../TableOfContents/sectionNumbers/section1.svg';
import section2 from '../TableOfContents/sectionNumbers/section2.svg';
import section3 from '../TableOfContents/sectionNumbers/section3.svg';
import section4 from '../TableOfContents/sectionNumbers/section4.svg';
import section5 from '../TableOfContents/sectionNumbers/section5.svg';

type SectionNumbers = Record<number, StaticImageData>;

const sectionNumbers: SectionNumbers = {
  1: section1 as StaticImageData,
  2: section2 as StaticImageData,
  3: section3 as StaticImageData,
  4: section4 as StaticImageData,
  5: section5 as StaticImageData,
};

export default async function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <div className="flex flex-col justify-center gap-2">
      <ol className="list-none p-0">
        {sections.map((section, index) => (
          <div key={section.id} className="flex flex-col justify-end">
            <li className="flex items-center text-lg sm:text-xl lg:text-2xl">
              <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white font-bold text-black sm:h-7 sm:w-7 lg:mr-4 lg:h-8 lg:w-8">
                {sectionNumbers[index + 1] ? (
                  <Image src={sectionNumbers[index + 1]} alt={`section ${index + 1}`} />
                ) : (
                  index + 1
                )}
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
