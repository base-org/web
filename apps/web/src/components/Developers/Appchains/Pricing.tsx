import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function Pricing() {
  return (
    <div className="flex gap-10">
      <div className="flex shrink flex-col">
        <Title level={TitleLevel.Title1}>
          Best-in-class pricing,{' '}
          <Title level={TitleLevel.Title1} as="span" className="text-dark-palette-foregroundMuted">
            built for developers.
          </Title>
        </Title>
        <Title level={TitleLevel.Display2}>
          You keep 100% of your sequencer fees 100% of the time.
        </Title>
      </div>

      <div className="flex w-[355px] flex-col gap-4 rounded-lg border p-6">
        <Title level={TitleLevel.Title3}>Appchain plan</Title>
        <div className="flex  w-full items-center justify-between gap-4">
          <Title level={TitleLevel.Headline}>Testnet</Title>
          <Text variant={TextVariant.Body}>$1 per month</Text>
        </div>
        <div className="flex  w-full items-center justify-between gap-4">
          <Title level={TitleLevel.Headline}>Mainnet</Title>
          <Text variant={TextVariant.Body}>$3k per month</Text>
        </div>
      </div>
    </div>
  );
}
