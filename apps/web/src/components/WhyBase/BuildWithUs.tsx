import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ActionType, AnalyticsEventData, AnalyticsEventImportance, ComponentType } from 'libs/base-ui/utils/logEvent';

export default async function BuildWithUs() {
  return (
    <div className="flex flex-row gap-32 bg-black px-20 pb-20 pt-10">
      <div className="flex h-[380px] w-[1250px] flex-col items-center justify-center bg-[url('../public/images/build-with-us.png')]">
        <h1 className="text-6xl">Start building with us</h1>
        <div className="mt-8 flex flex-row justify-center gap-8">
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs"
            event={primaryEvent}
            target="_blank"
            rel="noreferrer noopener"
            className="uppercase"
          >
            Get Started
          </ButtonWithLinkAndEventLogging>
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs"
            event={secondaryEvent}
            target="_blank"
            rel="noreferrer noopener"
            variant="Secondary"
            className="uppercase"
          >
            View Our Docs
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </div>
  );
}

const primaryEvent: AnalyticsEventData = {
  name: 'start_building_with_us_get_started',
  event: {
    action: ActionType.click,
    componentType: ComponentType.button,
    context: 'why_base',
  },
  importance: AnalyticsEventImportance.high,
};

const secondaryEvent: AnalyticsEventData = {
  name: 'start_building_with_us_view_docs',
  event: {
    action: ActionType.click,
    componentType: ComponentType.button,
    context: 'why_base',
  },
  importance: AnalyticsEventImportance.high,
};
