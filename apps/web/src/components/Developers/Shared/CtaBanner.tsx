'use client';

import { ReactNode } from 'react';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Text from 'apps/web/src/components/base-org/typography/Text';

type CtaBannerProps = {
  title: string;
  description?: string;
  cta?: ReactNode;
};

export function CtaBanner({ title, description, cta }: CtaBannerProps) {
  return (
    <section className="w-full bg-black">
      <div className="flex flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate py-16">
        <Title level={TitleLevel.Title1} as="h2" className="max-w-2xl text-center max-sm:hidden">
          {title}
        </Title>
        <Title level={TitleLevel.Title3} as="h2" className="max-w-2xl text-center sm:hidden">
          {title}
        </Title>
        {description && (
          <Title level={TitleLevel.Title4} as="p" className="mt-2 max-sm:hidden">
            {description}
          </Title>
        )}
        {description && (
          <Text variant={TextVariant.Body} as="p" className="mt-2 sm:hidden">
            {description}
          </Text>
        )}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">{cta}</div>
      </div>
    </section>
  );
}
