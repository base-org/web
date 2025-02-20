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
        <div className="px-9">
          <Title level={TitleLevel.Title1} as="h2" className="max-w-2xl">
            {title}
          </Title>
          <Title level={TitleLevel.Title4} as="p" className="mt-2 sm:text-center ">
            {description}
          </Title>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">{cta}</div>
      </div>
    </section>
  );
}
