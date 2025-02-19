'use client';

import { ReactNode } from 'react';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import classNames from 'classnames';

type CtaBannerProps = {
  title: string;
  description: string;
  cta?: ReactNode;
  sectionClassName?: string;
};

export function CtaBanner({ title, description, cta, sectionClassName }: CtaBannerProps) {
  return (
    <section className={classNames('w-full bg-black', sectionClassName)}>
      <div className="flex flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate py-16 text-center">
        <div className="px-9 md:hidden">
          <Title level={TitleLevel.Title3} as="h2">
            {title}
          </Title>
          <Title level={TitleLevel.Headline} as="p" className="mt-2 font-normal">
            {description}
          </Title>
        </div>
        <div className="hidden md:block">
          <Title level={TitleLevel.Title1} as="h2">
            {title}
          </Title>
          <Title level={TitleLevel.Title4} as="p" className="mt-2">
            {description}
          </Title>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">{cta}</div>
      </div>
    </section>
  );
}
