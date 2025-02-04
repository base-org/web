import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Components } from 'apps/web/src/components/Developers/Onchainkit/Components';
import { InfoCards } from 'apps/web/src/components/Developers/Onchainkit/InfoCards';
import { Templates } from 'apps/web/src/components/Developers/Onchainkit/Templates';
import { CtaBanner } from 'apps/web/src/components/Developers/Shared/CtaBanner';

export default async function OnchainKit() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black pt-20">
        {/* Header  */}
        <div className="flex flex-col items-center pt-20">
          <Title level={TitleLevel.Display3}>Full-stack onchain components</Title>
          <Title level={TitleLevel.Title3} className="text-gray-muted">
            All-you-need to build an onchain app in 10 minutes.
          </Title>

          <div className="flex gap-6 pt-6">
            <Button variant={ButtonVariants.Secondary}>npm create onchain</Button>
            <Button variant={ButtonVariants.SecondaryOutline}>Documentation</Button>
          </div>
        </div>

        <Components />
        <InfoCards />
        <Templates />
        <CtaBanner
          title="What do you want to build?"
          description="Start building with a starter template or see documentation."
        />
      </main>
    </Container>
  );
}
