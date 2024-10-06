import Image from 'apps/web/node_modules/next/image';
import { StaticImport } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';
import { whyBaseSharedClassNames } from '../../../app/(base-org)/why-base/page';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import evmCompatibleChains from './images/EVM-compatibility-chains.png';
import section3 from '../TableOfContents/sectionNumbers/section3.svg';

export const EVM_COMPATIBILITY_SECTION_ID = 'evmCompatibility';

export default async function EvmEquivalent() {
  return (
    <div
      id={EVM_COMPATIBILITY_SECTION_ID}
      className={`${whyBaseSharedClassNames.section} ${whyBaseSharedClassNames.sectionGrid}`}
    >
      <div className="mb-8 h-[235px] w-[250px] self-center bg-contain bg-center bg-no-repeat sm:my-[-25px] sm:h-auto sm:w-full lg:my-[-40px]">
        <Image src={evmCompatibleChains} alt="EVM compatible chains" />
      </div>
      <div className="flex w-full flex-row">
        <div className="flex flex-row">
          <span className={whyBaseSharedClassNames.sectionNumberIcon}>
            <Image src={section3 as StaticImport} alt="section three" />
          </span>
          <div className="ml-4">
            <h2 className={whyBaseSharedClassNames.title}>
              EVM Compatible for effortless migration
            </h2>
            <p className={whyBaseSharedClassNames.bodyText}>
              Move your project to Base in minutes from any other EVM-compatible chain and unlock
              the full potential of the Superchain and OP stack
            </p>
            <ButtonWithLinkAndEventLogging
              href="https://docs.base.org/docs"
              eventName="evm_compatible_start_migrating"
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames="inline-block"
              buttonClassNames={whyBaseSharedClassNames.ctaButton}
            >
              Start Migrating
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
    </div>
  );
}
