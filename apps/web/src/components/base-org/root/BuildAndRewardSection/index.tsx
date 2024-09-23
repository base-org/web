import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import illustration from './assets/illustration.png';
import Image from 'next/image';
import Text from 'apps/web/src/components/base-org/typography/Text';
import Card from 'apps/web/src/components/base-org/Card';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Link from 'next/link';

export default async function BuildAndRewardSection() {
  return (
    <section>
      <div className="mb-12 mt-8 flex w-full flex-col items-center gap-4 md:flex-row">
        <div className="relative flex w-full flex-row gap-4">
          <figure className="absolute -top-[6rem] left-1/2 z-30 w-full -translate-x-1/2">
            <Image src={illustration} alt="Build for rewards" className="-ml-[1.5rem] " />
          </figure>
          <div className="relative flex w-full flex-row gap-4">
            <Card>
              <div className="min-h-[14rem] md:min-h-[24rem]" />
            </Card>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:pl-20">
          <Title level={TitleLevel.Display2} className="text-[#E3E7E9]">
            Build and you will be rewarded
          </Title>
          <Text>
            Base supports passionate builders making apps for everyday life with grants, marketing,
            and as part of the Superchain, Base builders are eligible for consideration in
            Optimism&apos;s retroactive public goods funding.
          </Text>

          <div>
            <Link href="https://retrofunding.optimism.io/" target="_blank">
              <Button
                variant={ButtonVariants.Primary}
                iconName="baseOrgDiagonalUpArrow"
                className="md:ml-auto"
              >
                Get rewarded
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
