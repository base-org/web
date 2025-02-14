import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import { TweetCard } from 'apps/web/src/components/Developers/Shared/TweetCard';
import tweetImage from 'apps/web/src/components/Developers/AgentKit/tweet.png';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TWEETS } from 'apps/web/src/components/Developers/AgentKit/tweets';

export function Testmonials() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>Powering the most creative onchain agents.</Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          {TWEETS?.map((tweet) => {

            return (
              <TweetCard
                key={tweet.username}
                image={tweetImage}
                name={tweet.name}
                username={tweet.username}
                content={tweet.content}
              />
            );
          })}
          {/* <TweetCard
            key={tweet.username}
            image={tweet.image}
            name={tweet.name}
            username={tweet.username}
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
          /> */}
        </Marquee>
      </div>
    </div>
  );
}
