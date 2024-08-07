import Image from 'apps/web/node_modules/next/image';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import empoweredByCoinbase from './images/EmpoweredByCoinbase.png';

const EMPOWERED_BY_COINBASE_SECTION_ID = 'empoweredByCoinbase';

export default async function EmpoweredByCoinbase() {
  return (
    <div
      id={EMPOWERED_BY_COINBASE_SECTION_ID}
      className="mb-6 mt-6 flex w-full max-w-[1440px] flex-col gap-8 px-12 sm:mb-8 sm:mt-8 sm:grid sm:grid-cols-[1fr_1fr] sm:gap-16 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24"
    >
      <div className="flex w-full flex-col justify-center gap-8 lg:gap-16 xl:max-w-[550px]">
        <h2 className="flex flex-row font-display text-3xl sm:text-4xl lg:text-6xl">
          <span>5.</span>
          <span className="ml-4">Empowered by Coinbase</span>
        </h2>
        <div className="h-[235px] w-[300px] self-center bg-contain bg-center bg-no-repeat sm:hidden">
          <Image src={empoweredByCoinbase} alt="Empowered by Coinbase" />
        </div>
        <div>
          <span className="text-base sm:text-lg">
            {`Base is incubated within Coinbase and plans to progressively decentralize in the years
            ahead. Leverage Coinbase's developer tools to make building easy and to reach Coinbase
            users.`}
          </span>
          <div>
            <ButtonWithLinkAndEventLogging
              href="https://www.coinbase.com/blog/introducing-base"
              eventName="empowered_coinbase_learn_more"
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames="inline-block"
              buttonClassNames="mt-4 uppercase font-mono font-medium w-full sm:w-auto"
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
