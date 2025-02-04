import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ReactNode } from 'react';

type CardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  iconClassName: string;
};
export function Card({ icon, title, description, iconClassName = 'text-white' }: CardProps) {
  return (
    <div className="flex  flex-col gap-1">
      <div className={iconClassName}>{icon}</div>
      <Title level={TitleLevel.Title3} className="pt-1">
        {title}
      </Title>
      <Title className="text-dark-palette-foregroundMuted" level={TitleLevel.Title4}>
        {description}
      </Title>
    </div>
  );
}
