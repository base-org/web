import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

export default async function BuildWithUs() {
  return (
    <div className="flex flex-row gap-32 bg-black px-20 pb-20 pt-10">
      <div className="flex h-[380px] w-[1250px] flex-col items-center justify-center bg-[url('../public/images/build-with-us.png')]">
        <h1 className="text-6xl">Start building with us</h1>
        <div className="mt-8 flex flex-row justify-center gap-8">
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs"
            eventName="start_building_with_us_get_started"
            eventContext="why_base"
            target="_blank"
            rel="noreferrer noopener"
            buttonClassNames="uppercase"
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
            buttonClassNames="uppercase"
          >
            View Our Docs
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </div>
  );
}
