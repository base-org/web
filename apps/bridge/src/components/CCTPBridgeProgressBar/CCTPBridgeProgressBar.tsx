import { ReactNode } from 'react';
import Link from 'next/link';

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

type BarStatus = 'REQUEST_SENT' | 'VERIFIED';
type CCTPBridgeProgressBarProps = {
  status: BarStatus;
};

const BarStatusToBadgeStatuses: Record<BarStatus, BadgeStatus[]> = {
  REQUEST_SENT: ['STARTED', 'NOT_STARTED'],
  VERIFIED: ['DONE', 'STARTED'],
};

const DisclaimerContent: Record<BarStatus, ReactNode> = {
  REQUEST_SENT: (
    <>
      USDC deposits and withdrawals use Circle&apos;s CCTP. After you initiate a deposit or
      withdrawal, you must complete the bridge in order to access your funds, on{' '}
      <Link href="/transactions" className="underline">
        the transactions page
      </Link>
      .
    </>
  ),
  VERIFIED:
    'It takes a few minutes for the transaction to complete onchain. After this period, you can access your funds.',
};

export function CCTPBridgeProgressBar({ status }: CCTPBridgeProgressBarProps) {
  const badgeStatuses = BarStatusToBadgeStatuses[status];
  return (
    <div className="flex flex-col gap-10">
      <div className="mt-8 flex flex-row justify-around gap-8">
        <div className="flex flex-col items-center">
          <StepBadge num="1" status={badgeStatuses[0]} label="Send request" />
          <span>Takes a few minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <StepBadge num="2" status={badgeStatuses[1]} label="Complete" />
          <span>Takes a few minutes</span>
        </div>
      </div>
      <span className="font-base">{DisclaimerContent[status]}</span>
      <span className="text-white underline">
        <Link href="https://developers.circle.com/stablecoin/docs/cctp-getting-started">
          Learn more
        </Link>
      </span>
    </div>
  );
}
