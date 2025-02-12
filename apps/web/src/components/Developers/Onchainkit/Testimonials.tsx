import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import { TweetCard } from 'apps/web/src/components/Developers/Shared/TweetCard';

export function Testmonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]" pauseOnHover>
        <TweetCard
          name="Rob at Cat.town"
          username="@cattown"
          content="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
        <TweetCard
          name="Rob at Cat.town"
          username="@cattown"
          content="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
        <TweetCard
          name="Rob at Cat.town"
          username="@cattown"
          content="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
      </Marquee>
      <Marquee className="[--duration:20s]" reverse pauseOnHover>
        <TweetCard
          name="Rob at Cat.town"
          username="@cattown"
          content="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
        <TweetCard
          name="Rob at Cat.town"
          username="@cattown"
          content="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
        <TweetCard
          name="Rob at Cat.town"
          username="@cattown"
          content="I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey."
        />
      </Marquee>
    </div>
  );
}
