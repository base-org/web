import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import minikit from 'apps/web/src/components/Developers/MiniKit/minikit.svg';
import Image, { StaticImageData } from 'next/image';

export default async function AgentKit() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
        <div className="flex flex-col items-center gap-1 pt-20">
          <div className="flex items-center gap-2 pb-6">
            <Image
              src={minikit as StaticImageData}
              alt="minikit"
              width={32}
              height={32}
              className="h-5 w-5"
            />
            <Title level={TitleLevel.Title3} className="text-[#E66020]">
              MiniKit
            </Title>
          </div>
          <Title level={TitleLevel.Display3}>All-you-need to build and grow your mini app.</Title>
          <Title level={TitleLevel.Title3} className="max-w-2xl text-center text-gray-muted">
            Feature your mini app on Warpcast and Coinbase Wallet with a few lines of code.
          </Title>

          <div className="flex gap-6 pt-6">
            <Button variant={ButtonVariants.Secondary} iconName="arrowRight">
              Get started
            </Button>
          </div>
        </div>
      </main>
    </Container>
  );
}
