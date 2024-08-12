import Image from 'next/image';
import classNames from 'classnames';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import gtcBackground from './images/gtc-background.svg';
import ocsTitle from './images/onchain-summer.svg';

export default async function Hero() {
  const backgroundStyles = {
    backgroundImage: `url('${gtcBackground.src}')`,
  };

  const textContainerClasses = classNames(
    'max-w-full lg:max-w-[450px]',
    'mr-12 sm:mr-0',
    'ml-12 sm:ml-16 lg:ml-24 2xl:ml-0',
    'mt-12 sm:mt-16 lg:mt-24',
    'mb-6',
  );

  return (
    <div
      className="mt-[-96px] flex w-full flex-col justify-center bg-[#283145] pt-8 font-display text-white sm:flex-row sm:pt-20 lg:pt-40"
      style={backgroundStyles}
    >
      <div className="flex w-full max-w-[1440px] flex-col justify-between sm:flex-row">
        <div className={textContainerClasses}>
          <h1 className="mb-6 font-display text-4xl leading-tight sm:text-5xl lg:mb-10 lg:text-[80px] lg:leading-none">
            Resources for Builders
          </h1>
          <span className="text-lg sm:text-xl lg:text-2xl">
            Get help to build and grow your project on Base with our Builder Resource Kit
          </span>
        </div>
        <div className="self-end">
          <Image src={ocsTitle as StaticImport} alt="onchain summer" />
        </div>
      </div>
    </div>
  );
}
