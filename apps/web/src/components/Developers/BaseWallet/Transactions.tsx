import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import fund from './fund.png';
import faceID from './faceID.png';
import onboarding from './onboarding.png';
import Image from 'next/image';
import { cn } from 'libs/base-ui/utils/cn';

const TRANSACTIONS = [
  {
    label: 'Onboard',
    title: 'Connect with Coinbase Wallet',
    description: 'The easiest way to sign in to new and existing onchain apps.',
    content: <Image src={onboarding} alt="Onboarding" width={276} />,
  },
  {
    label: 'Fund',
    title: 'Coinbase onramp and balances',
    description: 'Users can use their Coinbase balances onchain or fund with debit card.',
    content: <Image src={fund} alt="Fund" width={436} />,
  },
  {
    label: 'Transact',
    title: 'Sponsored transactions and Spend Permissions passkey.',
    description:
      'Make transactions painless with sponsored gas. Use Spend Permissions to transact with no user interaction required. ',
    content: <Image src={faceID} alt="Face ID" width={276} />,
  },
];

export function Transactions() {
  return (
    <div className="flex w-full w-full flex-col gap-10">
      {TRANSACTIONS.map((transaction, i) => {
        return (
          <div
            key={transaction.label}
            className={cn(
              'flex w-full items-center justify-between gap-10',
              i === 1 ? 'flex-row-reverse' : 'flex',
            )}
          >
            <div className="flex max-w-xl flex-col">
              <div className="text-[#578BFA]">
                <Title level={TitleLevel.Title3} className="pb-3">
                  {transaction.label}
                </Title>
              </div>
              <Title level={TitleLevel.Title1}>{transaction.title}</Title>
              <Title level={TitleLevel.Title2} className="pt-1 text-dark-palette-foregroundMuted">
                {transaction.description}
              </Title>
            </div>
            <div className="flex max-w-lg grow flex-col items-center justify-center rounded-lg bg-dark-palette-backgroundAlternate p-12">
              {transaction.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
