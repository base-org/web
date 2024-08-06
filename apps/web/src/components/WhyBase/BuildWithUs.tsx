import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from 'apps/web/src/components/Button/Button';

import buildWithUs from './BuildWithUs.png';

const imageBackgroundStyles = {
  backgroundImage: `url('${buildWithUs.src}')`,
};

export default async function BuildWithUs() {
  return (
    <div className="mb-10 mt-6 w-full max-w-[1440px] px-12 sm:mb-16 sm:mt-8 sm:px-16 lg:mb-20 lg:mt-10 lg:px-24">
      <div
        className="mx-auto flex aspect-[1250/380] w-full max-w-[1440px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-8"
        style={imageBackgroundStyles}
      >
        <h1 className="mb-6 text-center text-3xl sm:mb-8 sm:text-4xl lg:text-6xl">
          Start building with us
        </h1>
        <div className="flex w-full flex-row justify-center gap-4 sm:w-auto sm:gap-8">
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs"
            eventName="start_building_with_us_get_started"
            target="_blank"
            rel="noreferrer noopener"
            buttonClassNames="uppercase font-mono font-medium w-full sm:w-auto text-xs sm:text-sm md:text-base px-2 py-1 sm:px-8 sm:py-4"
          >
            Get Started
          </ButtonWithLinkAndEventLogging>
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs"
            eventName="start_building_with_us_view_docs"
            target="_blank"
            rel="noreferrer noopener"
            variant={ButtonVariants.Secondary}
            buttonClassNames="uppercase font-mono font-medium w-full sm:w-auto text-xs sm:text-sm md:text-base px-2 py-1 sm:px-8 sm:py-4"
          >
            View Our Docs
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </div>
  );
}
