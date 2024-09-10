import Title from 'apps/web/src/components/base-org/typography/Title';

import CardLink from 'apps/web/src/components/base-org/CardLink';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export default async function BuildExploreSection() {
  return (
    <section>
      <Title level={TitleLevel.Title1}>Build</Title>
      <div className="mb-12 mt-8 flex w-full flex-col gap-4 md:flex-row">
        <CardLink href="https://docs.base.org/">
          <div className="flex flex-col gap-16">
            <i className="placeholder inline-block h-[4rem] w-[4rem] rounded-full bg-[#282828]" />
            <div>
              <Text className="mr-2 inline-block">Docs</Text>{' '}
              <Text className="inline-block opacity-50">
                Get started building on Base by reading our docs.
              </Text>
            </div>
          </div>
        </CardLink>
        <CardLink href="/getstarted">
          <div className="flex flex-col gap-16">
            <i className="placeholder inline-block h-[4rem] w-[4rem] rounded-full bg-[#282828]" />
            <div>
              <Text className="mr-2 inline-block">Resources</Text>{' '}
              <Text className="inline-block opacity-50">
                Resources for builders to build, fund and grow your apps.
              </Text>
            </div>
          </div>
        </CardLink>
      </div>

      <Title level={TitleLevel.Title1}>Explore</Title>
      <div className="mt-8 flex w-full flex-col gap-4 md:flex-row">
        <CardLink href="/ecosystem">
          <div className="flex flex-col gap-16">
            <i className="placeholder inline-block h-[4rem] w-[4rem] rounded-full bg-[#282828]" />
            <div>
              <Text className="mr-2 inline-block">Apps</Text>{' '}
              <Text className="inline-block opacity-50">
                Explore the apps in the Base ecosystem.
              </Text>
            </div>
          </div>
        </CardLink>
        <CardLink href="https://bridge.base.org/">
          <div className="flex flex-col gap-16">
            <i className="placeholder inline-block h-[4rem] w-[4rem] rounded-full bg-[#282828]" />
            <div>
              <Text className="mr-2 inline-block">Bridge</Text>{' '}
              <Text className="inline-block opacity-50">Bring your assets to Base.</Text>
            </div>
          </div>
        </CardLink>
      </div>
    </section>
  );
}
