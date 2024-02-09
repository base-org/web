import { ReactNode } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();

const challengeWindow = publicRuntimeConfig.l1ChainID === '1' ? '7 days' : '12 seconds';

type BadgeStatus = 'NOT_STARTED' | 'STARTED' | 'DONE';

type StepBadgeProps = {
  num: string;
  label: string;
  status: BadgeStatus;
};

const BadgeClassNames = {
  NOT_STARTED: '',
  STARTED: 'border-white text-white',
  DONE: 'border-white bg-white text-black font-bold',
};
const LabelClassNames = {
  NOT_STARTED: '',
  STARTED: 'text-white',
  DONE: 'text-white',
};

function StepBadge({ num, label, status }: StepBadgeProps) {
  const badgeClassNames = BadgeClassNames[status];
  const labelClassNames = LabelClassNames[status];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`h-6 w-6 rounded-full border-2 leading-6 ${badgeClassNames}`}>
        <span className="align-super text-sm">{status === 'DONE' ? '✓' : num}</span>
      </div>
      <span className={`font-sans text-base font-medium ${labelClassNames}`}>{label}</span>
    </div>
  );
}

type BarStatus = 'REQUEST_SENT' | 'VERIFYING' | 'VERIFIED';
type WithdrawProgressBarProps = {
  status: BarStatus;
};

const BarStatusToBadgeStatuses: Record<BarStatus, BadgeStatus[]> = {
  REQUEST_SENT: ['STARTED', 'NOT_STARTED', 'NOT_STARTED'],
  VERIFYING: ['DONE', 'STARTED', 'NOT_STARTED'],
  VERIFIED: ['DONE', 'DONE', 'STARTED'],
};

const DisclaimerContent: Record<BarStatus, ReactNode> = {
  REQUEST_SENT: (
    <div className="flex flex-col">
      <p>
        In order to minimize security risk, withdrawals using the official Base Bridge take up to{' '}
        {challengeWindow}. After your withdrawal request is proposed onchain (within an hour) you
        must verify and complete the transaction in order to access your funds, on{' '}
        <Link href="/transactions" className="underline">
          the transactions page
        </Link>
        .
      </p>
      <Link href="/transactions" className="mt-4 rounded-md bg-white p-4 text-black">
        Go to Transactions
      </Link>
    </div>
  ),
  VERIFYING: (
    <>
      In order to keep attackers from withdrawing your funds, there is a {challengeWindow} waiting
      period until you can complete your withdrawal. Check back on{' '}
      <Link href="/transactions" className="underline">
        the transactions page
      </Link>{' '}
      to complete your withdrawal.
    </>
  ),
  VERIFIED:
    'It takes up to 1 hour for the transaction to complete onchain. After this period, you can access your funds.',
};

export function WithdrawProgressBar({ status }: WithdrawProgressBarProps) {
  const badgeStatuses = BarStatusToBadgeStatuses[status];
  return (
    <div className="flex flex-col gap-10">
      <div className="mt-8 flex flex-row justify-around gap-8">
        <div className="flex flex-col items-center">
          <StepBadge num="1" status={badgeStatuses[0]} label="Send request" />
          <span>Takes up to 1 hr</span>
        </div>
        <div className="flex flex-col items-center">
          <StepBadge num="2" status={badgeStatuses[1]} label="Verify" />
          <span>Takes {challengeWindow}</span>
        </div>
        <div className="flex flex-col items-center">
          <StepBadge num="3" status={badgeStatuses[2]} label="Complete" />
          <span>Takes up to 1 hr</span>
        </div>
      </div>
      <div className="font-base">{DisclaimerContent[status]}</div>
      <span className="text-white underline">
        <Link href="https://docs.base.org/tools/bridge-faq">Learn more</Link>
      </span>
    </div>
  );
}
