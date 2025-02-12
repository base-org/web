import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

export function Hero({
  date,
  title,
  description,
  region,
  project,
  onBaseSince,
  image,
}: {
  date: string;
  title: string;
  description: string;
  region: string;
  project: string;
  onBaseSince: string;
  image: StaticImageData;
}) {
  return (
    <div className="my-32 flex w-full flex-col items-start gap-12">
      <div className="flex flex-col gap-6">
        <Title level={TitleLevel.Title4} className="text-dark-palette-foregroundMuted">
          {date}
        </Title>
        <div className="flex flex-col gap-3">
          <Title level={TitleLevel.Display3}>{title}</Title>
          <Title level={TitleLevel.Title2} className="text-dark-palette-foregroundMuted">
            {description}
          </Title>
        </div>
      </div>
      <div className="grid grid-cols-[245px_245px_245px] gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-sm uppercase text-dark-palette-foregroundMuted">Region</span>
          <Title level={TitleLevel.Title3}>{region}</Title>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm uppercase text-dark-palette-foregroundMuted">Project</span>
          <Link href="/">
            <div className="flex flex-row items-center gap-2">
              <Title level={TitleLevel.Title3}>{project}</Title>
              <div className="text-dark-palette-foregroundMuted">
                <Icon name="diagonalUpArrow" width={16} height={16} color="currentColor" />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm uppercase text-dark-palette-foregroundMuted">On Base Since</span>
          <Title level={TitleLevel.Title3}>{onBaseSince}</Title>
        </div>
      </div>
      <Image src={image} alt={title} />
    </div>
  );
}
