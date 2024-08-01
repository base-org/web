import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

export default async function BuildWithUs() {
  return (
    <div className="bg-black px-12 pb-10 pt-6 sm:px-16 sm:pb-16 sm:pt-8 lg:px-24 lg:pb-20 lg:pt-10">
      <div className="mx-auto flex aspect-[1250/380] w-full max-w-[1250px] flex-col items-center justify-center bg-[url('../public/images/build-with-us.png')] bg-cover bg-center bg-no-repeat p-4 sm:p-8">
        <h1 className="mb-6 text-center text-3xl sm:mb-8 sm:text-4xl lg:text-6xl">
          Start building with us
        </h1>
        <div className="flex w-full flex-row justify-center gap-4 sm:w-auto sm:gap-8">
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs"
            eventName="start_building_with_us_get_started"
            eventContext="why_base"
            target="_blank"
            rel="noreferrer noopener"
            buttonClassNames="uppercase w-full sm:w-auto text-xs sm:text-sm md:text-base px-2 py-1 sm:px-8 sm:py-4"
          >
            Get Started
          </ButtonWithLinkAndEventLogging>
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs"
            eventName="start_building_with_us_view_docs"
            eventContext="why_base"
            target="_blank"
            rel="noreferrer noopener"
            variant="Secondary"
            buttonClassNames="uppercase w-full sm:w-auto text-xs sm:text-sm md:text-base px-2 py-1 sm:px-8 sm:py-4"
          >
            View Our Docs
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </div>
  );
}
