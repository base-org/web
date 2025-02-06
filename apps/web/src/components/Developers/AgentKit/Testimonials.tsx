import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import { TweetCard } from 'apps/web/src/components/Developers/Shared/TweetCard';
import tweet from 'apps/web/src/components/Developers/AgentKit/tweet.png';

export function Testmonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]" pauseOnHover>
        <TweetCard
          image={tweet}
          name="Rob at Cat.town"
          username="@cattown"
          content="Just built a musician-friendly AI Agent using @base and @CoinbaseDev AgentKit! Watch how you can go from zero to shipping in less than 10 minutes—and maybe snag part of the $30k grants!"
        />
        <TweetCard
          image={tweet}
          name="Rob at Cat.town"
          username="@cattown"
          content="Just built a musician-friendly AI Agent using @base and @CoinbaseDev AgentKit! Watch how you can go from zero to shipping in less than 10 minutes—and maybe snag part of the $30k grants!"
        />
        <TweetCard
          image={tweet}
          name="Rob at Cat.town"
          username="@cattown"
          content="Just built a musician-friendly AI Agent using @base and @CoinbaseDev AgentKit! Watch how you can go from zero to shipping in less than 10 minutes—and maybe snag part of the $30k grants!"
        />
      </Marquee>
    </div>
  );
}
