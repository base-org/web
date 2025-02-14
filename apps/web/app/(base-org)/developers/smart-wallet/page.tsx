import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { InfoCards } from 'apps/web/src/components/Developers/SmartWallet/InfoCards';
import { Transactions } from 'apps/web/src/components/Developers/SmartWallet/Transactions';
import { Customers } from 'apps/web/src/components/Developers/SmartWallet/Customers';
import wallet from 'apps/web/src/components/Developers/SmartWallet/svg/wallet.svg';
import headerImage from 'apps/web/src/components/Developers/SmartWallet/header.png';
import { CtaBanner } from 'apps/web/src/components/Developers/Shared/CtaBanner';
import Image, { StaticImageData } from 'next/image';
import { Demo } from 'apps/web/src/components/Developers/SmartWallet/Demo';
import { Icon } from 'apps/web/src/components/Icon/Icon';

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
            <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
              Connect to onchain users
            </Title>
            <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
              Connect to onchain users
            </Title>
            <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted">
              Build faster with Smart Wallet – a universal account for the onchain world.
            </Title>
            <div className="flex gap-6 pt-5">
              <ButtonWithLinkAndEventLogging
                href=""
                target="_blank"
                variant={ButtonVariants.Secondary}
                buttonClassNames="flex items-center justify-between px-4 py-3 group"
                eventName="wallet-start-building"
              >
                <div className="flex items-center gap-4">
                  <span>Start building</span>
                  <div className="transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="arrowRight" width={16} height={16} color="black" />
                  </div>
                </div>
              </ButtonWithLinkAndEventLogging>
            </div>
          </div>

          <Image src={headerImage} alt="header-image" width={400} className="max-sm:hidden" />
        </div>

        <InfoCards />

        <Transactions />
        <Customers />
        <Demo />

        <CtaBanner
          title="Update your wallet provider of choice to bring Smart Wallets to your app today "
          cta={
            <div className="flex w-full gap-4 max-sm:flex-col max-sm:items-center">
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.Secondary}
                iconName="fork"
                href=""
                target="_blank"
                eventName="wallet-fork-template"
                buttonClassNames="flex items-center justify-between px-4 py-3"
              >
                Fork a template
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                href=""
                target="_blank"
                variant={ButtonVariants.SecondaryOutline}
                buttonClassNames="flex items-center justify-between px-4 py-3 group"
                eventName="wallet-docs"
              >
                <div className="flex items-center gap-4">
                  <span>Documentation</span>
                  <div className="transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="arrowRight" width={16} height={16} color="white" />
                  </div>
                </div>
              </ButtonWithLinkAndEventLogging>
            </div>
          }
        />
      </main>
    </Container>
  );
}
