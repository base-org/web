import Image from 'apps/web/node_modules/next/image';
import { StaticImport } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';
import { whyBaseSharedClassNames } from '../../../app/(base-org)/why-base/page';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import empoweredByCoinbase from './images/EmpoweredByCoinbase.png';
import section5 from '../TableOfContents/sectionNumbers/section5.svg';

export const EMPOWERED_BY_COINBASE_SECTION_ID = 'empoweredByCoinbase';

export default async function EmpoweredByCoinbase() {
  return (
    <div
      id={EMPOWERED_BY_COINBASE_SECTION_ID}
      // className="mb-6 mt-10 flex w-full max-w-[1440px] flex-col gap-8 px-12 sm:mb-8 sm:mt-8 sm:grid sm:grid-cols-[1fr_1fr] sm:gap-16 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24"
      className={`${whyBaseSharedClassNames.section} ${whyBaseSharedClassNames.sectionGrid}`}
    >
      <div className="flex w-full flex-col justify-center gap-8 lg:gap-16 xl:max-w-[550px]">
        <div className="flex flex-row">
          <span className={whyBaseSharedClassNames.sectionNumberIcon}>
            <Image src={section5 as StaticImport} alt="section five" />
          </span>
          <div className="ml-4">
            <h2 className={whyBaseSharedClassNames.title}>Empowered by Coinbase</h2>
            <div className="my-4 h-auto w-full max-w-[300px] self-center bg-contain bg-center bg-no-repeat sm:hidden">
              <Image src={empoweredByCoinbase} alt="Empowered by Coinbase" />
            </div>
            <p className={whyBaseSharedClassNames.bodyText}>
              {`Base is incubated within Coinbase and plans to progressively decentralize in the years
              ahead. Leverage Coinbase's developer tools to make building easy and to reach Coinbase
              users.`}
            </p>
            <ButtonWithLinkAndEventLogging
              href="https://www.coinbase.com/blog/introducing-base"
              eventName="empowered_coinbase_learn_more"
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames="inline-block"
              buttonClassNames={whyBaseSharedClassNames.ctaButton}
            >
              Learn More
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
      <div className="hidden h-auto w-full  bg-contain bg-center bg-no-repeat sm:block">
        <Image src={empoweredByCoinbase} alt="Empowered by Coinbase" />
      </div>
    </div>
  );
}
