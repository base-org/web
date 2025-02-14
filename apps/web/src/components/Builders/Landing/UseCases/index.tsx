import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { UseCaseBlock } from 'apps/web/src/components/Builders/Landing/UseCases/UseCaseBlock';
import { AnimatedOnboarding } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Onboarding';
import { AnimatedPayment } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Payments';
import { AnimatedBaseAgent } from 'apps/web/src/components/Builders/Shared/assets/UseCases/BaseAgent';
import { AnimatedSocial } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Social';
import { AnimatedDefi } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Defi';
import { AnimatedGasless } from 'apps/web/src/components/Builders/Shared/assets/UseCases/Gasless';

export function UseCases() {
  return (
    <section className="h-full w-full">
      <div className="hidden flex-col gap-2 md:flex ">
        <Title level={TitleLevel.Title1} as="h2">
          Build. Scale. Monetize.{' '}
          <span className="text-gray-50">Everything you need to launch onchain products.</span>
        </Title>
      </div>
      <div className="flex flex-col gap-2 font-medium md:hidden">
        <Title level={TitleLevel.Title3}>
          Build. Scale. Monetize.{' '}
          <span className="text-gray-50">Everything you need to launch onchain products.</span>
        </Title>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-9 md:mt-9 md:grid-cols-2">
        <UseCaseBlock
          title="Onboard your users"
          description="Create seamless onboarding experiences with smart wallerts and social authentication."
          href="https://vocs-migration-mvp-one.vercel.app/dev-tools/identity/smart-wallet/quick-start"
        >
          <div className="flex h-[320px] w-[285px] flex-col items-center justify-center md:w-1/2">
            <AnimatedOnboarding />
          </div>
        </UseCaseBlock>
        <UseCaseBlock
          title="Accept crypto payments"
          description="Integrate secure and efficient crypto payment solutions for your applications."
          href="https://vocs-migration-mvp-one.vercel.app/dev-tools/kits/onchainkit/checkout/checkout"
        >
          <AnimatedPayment />
        </UseCaseBlock>
        <UseCaseBlock
          title="Launch AI agents"
          description="Build and deploy AI agents that can interact with onchain data and smart contracts."
          href="https://docs.cdp.coinbase.com/agentkit/docs/welcome"
        >
          <AnimatedBaseAgent />
        </UseCaseBlock>
        <UseCaseBlock
          title="Onchain social"
          description="Create engaging social experiences with decentralized identity and content."
          href="https://vocs-migration-mvp-one.vercel.app/dev-tools/kits/onchainkit/mint/nft-mint-card"
        >
          <AnimatedSocial />
        </UseCaseBlock>
        <UseCaseBlock
          title="In-app defi"
          description="Add powerful DeFi protocols and services directly into your applications."
          href="https://vocs-migration-mvp-one.vercel.app/dev-tools/kits/onchainkit/swap/swap"
        >
          <AnimatedDefi />
        </UseCaseBlock>
        <UseCaseBlock
          title="Gasless experience"
          description="Provide frictionless transactions with gasless and account abstraction solutions."
          href="https://vocs-migration-mvp-one.vercel.app/dev-tools/identity/smart-wallet/base-gasless-campaign"
        >
          <AnimatedGasless />
        </UseCaseBlock>
      </div>
    </section>
  );
}
