import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { InfoCards } from 'apps/web/src/components/Developers/BaseWallet/InfoCards';
import { Transactions } from 'apps/web/src/components/Developers/BaseWallet/Transactions';
import { Customers } from 'apps/web/src/components/Developers/BaseWallet/Customers';
import wallet from 'apps/web/src/components/Developers/BaseWallet/wallet.svg';
import headerImage from 'apps/web/src/components/Developers/BaseWallet/header.png';
import { CtaBanner } from 'apps/web/src/components/Developers/Shared/CtaBanner';
import Image, { StaticImageData } from 'next/image';

export default async function BaseWallet() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
        <div className="flex w-full items-center justify-between gap-1 pt-20 max-sm:flex-col">
          <div className="flex max-w-xl flex-col gap-2">
            <div className="flex items-center gap-2 pb-6 text-[#578BFA]">
              <Image
                src={wallet as StaticImageData}
                alt="wallet"
                width={32}
                height={32}
                className="h-5 w-5"
              />
              <Title level={TitleLevel.Title3} className="font-bold">
                Smart Wallet
              </Title>
            </div>
            <Title level={TitleLevel.Display3} className="font-bold">
              Connect to onchain users
            </Title>
            <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted">
              Build faster with Smart Wallet – a universal account for the onchain world.
            </Title>
            <div className="flex gap-6 pt-5">
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.Secondary}
                iconName="arrowRight"
                buttonClassNames="rounded-xl"
                href=""
                target="_blank"
                eventName="minikit-get-started"
              >
                Start building
              </ButtonWithLinkAndEventLogging>
            </div>
          </div>

          <Image src={headerImage} alt="header-image" width={400} className="max-sm:hidden" />
        </div>

        <InfoCards />
        <Title level={TitleLevel.Display3} className="max-sm:hidden">
          Onchain transactions without distractions
        </Title>
        <Title level={TitleLevel.Title3} className="sm:hidden">
          Onchain transactions without distractions
        </Title>
        <Transactions />
        <Customers />

        <CtaBanner
          title="Update your wallet provider of choice to bring Smart Wallets to your app today. "
          cta={
            <div className="flex gap-2 max-sm:flex-col">
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.Secondary}
                iconName="fork"
                href=""
                target="_blank"
                eventName="wallet-fork-template"
                buttonClassNames="rounded-xl"
              >
                Fork a template
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                href=""
                iconName="arrowRight"
                target="_blank"
                variant={ButtonVariants.Outlined}
                eventName="wallet-docs"
                buttonClassNames="rounded-xl"
              >
                Documentation
              </ButtonWithLinkAndEventLogging>
            </div>
          }
        />
      </main>
    </Container>
  );
}
