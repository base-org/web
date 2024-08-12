import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import gtcBackground from './images/gtc-background.svg';
import ocsTitle from './images/onchain-summer.svg';

export default async function Hero() {
  const backgroundStyles = {
    backgroundImage: `url('${gtcBackground.src}')`,
  };
  return (
    <div
      className="mt-[-96px] flex flex-col justify-center bg-[#283145] pt-8 font-display text-white sm:flex-row sm:pt-20 lg:pt-40"
      style={backgroundStyles}
    >
      <div className="mx-12 mb-8 mt-12 flex flex-col justify-start sm:mx-16 sm:mb-12 sm:mt-16 lg:mx-24 max-w-[1440px]">
        <div className="max-w-full lg:max-w-[450px]">
          <h1 className="mb-6 font-display text-4xl leading-tight sm:text-5xl lg:mb-10 lg:text-[80px] lg:leading-none">
            Resources for Builders
          </h1>
          <span className="text-lg sm:text-xl lg:text-2xl">
            Get help to build and grow your project on Base with our Go-to-Community Kit
          </span>
        </div>
      </div>
      <div className="self-end">
        <Image src={ocsTitle as StaticImport} alt="onchain summer" />
      </div>
    </div>
  );
}
