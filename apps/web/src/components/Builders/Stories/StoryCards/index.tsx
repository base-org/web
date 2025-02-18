import Image, { StaticImageData } from 'next/image';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import classNames from 'classnames';

import mtsumi from 'apps/web/src/components/Builders/Stories/StoryCards/assets/mtsumi.webp';

export function StoryCards() {
  return (
    <div className="z-1 flex flex-col gap-9 md:gap-[72px]">
      <StoryCard
        title="David Johansson of BLOCKLORDS"
        description="Building a medieval grand strategy game with a player-driven onchain economy."
        location="Stockholm, Sweden"
        date="January 19, 2025"
        href="/builders/stories/blocklords"
        color="text-dark-green-60"
        image={mtsumi}
      />
      <StoryCard
        title="Tara of Cat Town"
        description="Building a cozy onchain life sim game, combining gaming with DeFi to create a thriving community."
        location="United Kingdom"
        date="January 19, 2025"
        href="/builders/stories/cat-town"
        color="text-dark-pink-60"
        image={mtsumi}
      />
      <StoryCard
        title="AchillesHodl of Byte"
        description="Pioneering the future of food ordering with AI and crypto, transforming human language into the ultimate user interface."
        location="United States of America"
        date="January 19, 2025"
        href="/builders/stories/byte"
        color="text-dark-pink-60"
        image={mtsumi}
      />
      <StoryCard
        title="Merlin Egalite of Morpho"
        description="Building the largest and most secure lending protocol on Base, leveraging the power of the Superchain ecosystem."
        location="Paris, France"
        date="January 19, 2025"
        href="/builders/stories/morpho"
        color="text-dark-pink-60"
        image={mtsumi}
      />
      <StoryCard
        title="Dhawal Shah of HeyElsa AI"
        description="Revolutionizing crypto trading with AI-driven intelligence, pushing boundaries in portfolio management."
        location="India"
        date="January 19, 2025"
        href="/builders/stories/hey-elsa"
        color="text-dark-pink-60"
        image={mtsumi}
      />
      <StoryCard
        title="Alexander of Aerodrome Finance"
        description="Serving as the essential trading and liquidity marketplace on Base, driving the future of decentralized exchanges."
        location="United States of America"
        date="January 19, 2025"
        href="/builders/stories/aerodrome"
        color="text-dark-pink-60"
        image={mtsumi}
      />
    </div>
  );
}

function StoryCard({
  title,
  description,
  location,
  date,
  href,
  color,
  image,
}: {
  title: string;
  description: string;
  location: string;
  date: string;
  href: string;
  color: string;
  image: StaticImageData;
}) {
  return (
    <div className="z-1 flex w-full flex-col gap-8">
      <Image src={image} alt={title} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="hidden flex-col gap-2 md:flex">
            <Title level={TitleLevel.Title1}>{title}</Title>
            <Title level={TitleLevel.Title2} className="text-dark-palette-foregroundMuted">
              {description}
            </Title>
          </div>
          <div className="flex flex-col gap-2 md:hidden">
            <Title level={TitleLevel.Title3} className="font-medium">
              {title}
            </Title>
            <Title level={TitleLevel.Title4} className="text-dark-palette-foregroundMuted">
              {description}
            </Title>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex gap-1">
              <div className={classNames(color, 'hidden md:block')}>
                <Icon name="locationPin" color="currentColor" />
              </div>
              <div className={classNames(color, 'md:hidden')}>
                <Icon name="locationPin" color="currentColor" width={20} height={20} />
              </div>
              <Title level={TitleLevel.Headline} className={classNames(color, 'font-normal')}>
                {location}
              </Title>
            </div>
            <Title
              level={TitleLevel.Headline}
              className="font-normal text-dark-palette-foregroundMuted"
            >
              {date}
            </Title>
          </div>
        </div>
        <ButtonWithLinkAndEventLogging
          variant={ButtonVariants.SecondaryOutline}
          buttonClassNames="flex items-center justify-between px-4 py-3 group"
          href={href}
          eventName={`developers_stories_${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <div className="flex items-center gap-4">
            <span>Read</span>
            <div className="transition-transform duration-200 group-hover:translate-x-1">
              <Icon name="arrowRight" width={20} height={20} color="white" />
            </div>
          </div>
        </ButtonWithLinkAndEventLogging>
      </div>
    </div>
  );
}
