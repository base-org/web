import Text from 'apps/web/src/components/base-org/typography/Text';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';

type TestimonialItemProps = {
  title: string;
  description: string;
  username: string;
};
function TestimonialItem({ title, description, username }: TestimonialItemProps) {
  return (
    <div className="flex max-w-sm flex-col gap-2 rounded-lg bg-dark-palette-backgroundAlternate p-6">
      <div className="flex">
        <div className="flex flex-col gap-1">
          <Title level={TitleLevel.Title3}>{title}</Title>
          <Text variant={TextVariant.Label1} className="text-dark-palette-foregroundMuted">
            {username}
          </Text>
        </div>
      </div>
      <Text variant={TextVariant.Body}>{description}</Text>
    </div>
  );
}

export function Testmonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]" pauseOnHover>
        <TestimonialItem
          title="Rob at Cat.town"
          username="@cattown"
          description="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
        <TestimonialItem
          title="Rob at Cat.town"
          username="@cattown"
          description="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
        <TestimonialItem
          title="Rob at Cat.town"
          username="@cattown"
          description="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
      </Marquee>
      <Marquee className="[--duration:20s]" reverse pauseOnHover>
        <TestimonialItem
          title="Rob at Cat.town"
          username="@cattown"
          description="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
        <TestimonialItem
          title="Rob at Cat.town"
          username="@cattown"
          description="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
        <TestimonialItem
          title="Rob at Cat.town"
          username="@cattown"
          description="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
      </Marquee>
    </div>
  );
}
