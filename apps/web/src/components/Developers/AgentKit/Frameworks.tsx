import framework from 'apps/web/src/components/Developers/AgentKit/framework.svg';
import eliza from 'apps/web/src/components/Developers/AgentKit/eliza.svg';
import robot from 'apps/web/src/components/Developers/AgentKit/robot.svg';
import cImage from 'apps/web/src/components/Developers/AgentKit/c.png';
import Image, { StaticImageData } from 'next/image';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function Frameworks() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="p-4">
        <Title level={TitleLevel.Title1}>
          Works with any framework.{' '}
          <Title level={TitleLevel.Title1} as="span" className="text-dark-palette-foregroundMuted">
            Langchain, Crew AI, ElizaOS, and more.
          </Title>
        </Title>
      </div>
      <div className="flex w-full items-center gap-6 max-sm:flex-col">
        <div className="flex-0 flex aspect-square h-40 w-40 items-center justify-center rounded-xl bg-dark-palette-backgroundAlternate">
          <Image src={framework as StaticImageData} alt="framework" width={106} height={54} />
        </div>
        <div className="flex-0 flex aspect-square h-40 w-40 items-center justify-center rounded-xl bg-dark-palette-backgroundAlternate">
          <Image src={eliza as StaticImageData} alt="eliza" width={128} height={22} />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-xl bg-[#330D00]">
          <Image src={robot as StaticImageData} alt="robot" width={127} height={126} />
        </div>
        <div className="flex-0 flex aspect-square h-40 w-40 items-center justify-center rounded-xl bg-dark-palette-backgroundAlternate">
          <Image src={cImage} alt="cImage" width={70} height={70} />
        </div>
        <div className="flex-0 flex aspect-square h-40 w-40 items-center justify-center rounded-xl bg-dark-palette-backgroundAlternate">
          <Title level={TitleLevel.Title1} className="text-palette-foregroundMuted">
            GAME OS
          </Title>
        </div>
      </div>
    </div>
  );
}
