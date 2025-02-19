import { StaticImageData } from 'next/image';

type Tweet = {
  image?: StaticImageData | string;
  name: string;
  username: string;
  content: string;
};

export const TWEETS: Tweet[] = [
  {
    image: 'https://pbs.twimg.com/profile_images/1716422866940342272/AQuohZpy_400x400.jpg',
    name: 'Astronauthi',
    username: '@astronau_thi',
    content: `Super impressed with how easy it is to create and deploy an AI agent using the Coinbase CDP Agent Toolkit. Looking forward to building some amazing stuff with it!

@kleffew94 @coinbasedev`,
  },
  {
    image: 'https://pbs.twimg.com/profile_images/1613734854260330499/6kQZUDsJ_400x400.jpg',
    name: 'Anderson',
    username: '@MrAndersonChen',
    content: `How powerful is an AI agent paired with a crypto wallet?

I ran an AI agent using Coinbase AgentKit, and it’s amazing. I can query my ETH balance and send transactions just by asking my agent—the best wallet experience I’ve ever had.

Shout out to @CoinbaseDev and @kleffew94
!`,
  },
  {
    image: 'https://pbs.twimg.com/profile_images/1872344217596383232/CmKCD70j_400x400.jpg',
    name: 'Derek Brown',
    username: '@derekbrown',
    content: `Stay tuned to @base and @coinbasedev over the next couple of weeks.

Just got done meeting with some of their team and they're cooking.

Exciting roadmap, which overlaps with Native quite well. 

Shout out to @MurrLincoln and @johnp2879 for spending some time with a dev today.`,
  },
  {
    image: 'https://pbs.twimg.com/profile_images/1875329474348089344/1V9wnQtI_400x400.jpg',
    name: 'jacky (:',
    username: '@Jhuang0804',
    content: `@CoinbaseDev agentkit — makes it super easy to create a AI agent + have them utilize the blockchain! cc: @MurrLincoln & @nemild`,
  },
  {
    image: 'https://pbs.twimg.com/profile_images/1096466935980539905/1NJctf2o_400x400.png',
    name: 'Julian Gay',
    username: '@juliangay',
    content: `Had fun coding an AI agent with access to wallet, funding and trading via @CoinbaseDev tx to @MurrLincoln and @kleffew94 for making it so easy 🔥 a few keys and you're gtg!`,
  },
];
