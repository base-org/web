import { CoinbaseVerifications } from 'apps/web/src/hooks/useCoinbaseVerifications';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { GuildBadges } from 'apps/web/src/hooks/useBaseGuild';

// image imports
import verifiedIdentity from './images/verifiedIdentity.png';
import verifiedCountry from './images/verifiedCountry.png';
import verifiedCoinbaseOne from './images/verifiedCoinbaseOne.png';
import baseBuilder from './images/baseBuilder.png';
import baseGrantee from './images/baseGrantee.png';
import baseInitiate from './images/baseInitiate.png';
import baseLearnNewcomer from './images/baseLearnNewcomer.png';
import buildathonParticipant from './images/buildathonParticipant.png';
import buildathonWinner from './images/buildathonWinner.png';
import talentScore from './images/talentScore.png';

// gray image imports
import verifiedIdentityGray from './images/verifiedIdentityGray.png';
import verifiedCountryGray from './images/verifiedCountryGray.png';
import verifiedCoinbaseOneGray from './images/verifiedCoinbaseOneGray.png';
import baseBuilderGray from './images/baseBuilderGray.png';
import baseGranteeGray from './images/baseGranteeGray.png';
import baseInitiateGray from './images/baseInitiateGray.png';
import baseLearnNewcomerGray from './images/baseLearnNewcomerGray.png';
import buildathonParticipantGray from './images/buildathonParticipantGray.png';
import buildathonWinnerGray from './images/buildathonWinnerGray.png';
import talentScoreGray from './images/talentScoreGray.png';
import { useBadgeContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/BadgeContext';
import Modal from 'apps/web/src/components/Modal';
import { useCallback } from 'react';
import { Button } from 'apps/web/src/components/Button/Button';
import Link from 'next/link';

export type BadgeNames = CoinbaseVerifications | GuildBadges | 'TALENT_SCORE';

export const BADGE_IMGS: Record<BadgeNames, StaticImport> = {
  VERIFIED_IDENTITY: verifiedIdentity as StaticImport,
  VERIFIED_COUNTRY: verifiedCountry as StaticImport,
  VERIFIED_COINBASE_ONE: verifiedCoinbaseOne as StaticImport,
  BASE_BUILDER: baseBuilder as StaticImport,
  BASE_GRANTEE: baseGrantee as StaticImport,
  BASE_INITIATE: baseInitiate as StaticImport,
  BASE_LEARN_NEWCOMER: baseLearnNewcomer as StaticImport,
  BUILDATHON_PARTICIPANT: buildathonParticipant as StaticImport,
  BUILDATHON_WINNER: buildathonWinner as StaticImport,
  TALENT_SCORE: talentScore as StaticImport,
};

export const GRAY_BADGE_IMGS: Record<BadgeNames, StaticImport> = {
  VERIFIED_IDENTITY: verifiedIdentityGray as StaticImport,
  VERIFIED_COUNTRY: verifiedCountryGray as StaticImport,
  VERIFIED_COINBASE_ONE: verifiedCoinbaseOneGray as StaticImport,
  BASE_BUILDER: baseBuilderGray as StaticImport,
  BASE_GRANTEE: baseGranteeGray as StaticImport,
  BASE_INITIATE: baseInitiateGray as StaticImport,
  BASE_LEARN_NEWCOMER: baseLearnNewcomerGray as StaticImport,
  BUILDATHON_PARTICIPANT: buildathonParticipantGray as StaticImport,
  BUILDATHON_WINNER: buildathonWinnerGray as StaticImport,
  TALENT_SCORE: talentScoreGray as StaticImport,
};

export const BADGE_INFO: Record<
  BadgeNames,
  {
    name: string;
    title: string;
    description: string;
    cta: string;
    ctaLink: string;
  }
> = {
  VERIFIED_IDENTITY: {
    name: 'Coinbase Verified ID',
    title: 'Coinbase Verified ID',
    description:
      "You've got a Coinbase account and you verified your ID. Thanks for being our customer.",
    cta: 'Get verified',
    ctaLink: 'https://coinbase.com/onchain-verify',
  },
  VERIFIED_COUNTRY: {
    name: 'Verified Country',
    title: 'Verified Country',
    description: "You've verified what country you live in. It's a beautiful country, no doubt.",
    cta: 'Get verified',
    ctaLink: 'https://coinbase.com/onchain-verify',
  },
  VERIFIED_COINBASE_ONE: {
    name: 'Coinbase One',
    title: 'Coinbase One',
    description: "You've got an active Coinbase One membership. Hope you enjoy the perks!",
    cta: 'Get Coinbase One',
    ctaLink: 'https://coinbase.com/onchain-verify',
  },
  BASE_BUILDER: {
    name: 'Based Builder',
    title: 'Base Builder',
    description: "You've deployed 5 or more smart contracts on Base. Impressive!",
    cta: 'Deploy a smart contract',
    ctaLink: 'https://guild.xyz/base/based-developers',
  },
  BASE_GRANTEE: {
    name: 'Base Grant',
    title: 'Base Grant',
    description: 'You were the recipient of a Base Grant. Congrats!',
    cta: 'Learn more',
    ctaLink: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders',
  },
  BASE_INITIATE: {
    name: 'Based Initiate',
    title: 'Base Initiate',
    description: "You've deployed a smart contract on Base. Thanks for building with us!",
    cta: 'Deploy a smart contract',
    ctaLink: 'https://guild.xyz/base/based-developers',
  },
  BASE_LEARN_NEWCOMER: {
    name: 'Base Learn Newcomer',
    title: 'Base Learn Newcomer',
    description:
      'You completed these Base Learn Modules: Basic Contracts, Storage, Control Structures, Arrays, Inheritance, Mappings, Structs, Error Triags, New Keyword, and Imports.',
    cta: 'Go to Base Learn',
    ctaLink: 'https://guild.xyz/base/base-learn',
  },
  BUILDATHON_PARTICIPANT: {
    name: 'Buildathon Participant',
    title: 'Buildathon Participant',
    description:
      'You were a participant in our 2024 Onchain Summer Buildathon. Thanks for building with us!',
    cta: 'Learn more',
    ctaLink: 'https://www.base.org/onchainsummer',
  },
  BUILDATHON_WINNER: {
    name: 'Buildathon Winner',
    title: 'Buildathon Winner',
    description: 'You submitted a winning project in the Onchain Summer 2024 Buildathon. Congrats!',
    cta: 'Learn more',
    ctaLink: 'https://www.base.org/onchainsummer',
  },
  TALENT_SCORE: {
    name: 'Talent Passport Score',
    title: 'Talent Passport Builder Score',
    description: "Your builder score as a Talent passport holder. You're legit!",
    cta: 'Get your talent passport',
    ctaLink: 'https://passport.talentprotocol.com/',
  },
};

export function Badge({
  badge,
  claimed,
  score,
}: {
  badge: BadgeNames;
  claimed?: boolean;
  score?: number;
}) {
  const { selectBadge } = useBadgeContext();
  const onClick = useCallback(() => {
    selectBadge({ badge, claimed: !!claimed });
  }, [selectBadge, badge, claimed]);

  const name = BADGE_INFO[badge].name;
  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative flex h-[160px] w-[160px] items-center justify-center rounded-[24px] border border-gray-10"
        onClick={onClick}
        onKeyDown={onClick}
        aria-label={`See details for ${name}`}
        role="button"
        tabIndex={0}
      >
        <Image
          src={(claimed ? BADGE_IMGS : GRAY_BADGE_IMGS)[badge]}
          alt={name}
          height={100}
          width={100}
        />
        {claimed && score && badge === 'TALENT_SCORE' && (
          <span className="absolute font-sans text-3xl font-bold text-white">{score}</span>
        )}
        {!claimed && (
          <span className="absolute left-[13px] top-[13px] rounded-[99px] bg-white p-1 px-2 text-sm font-medium uppercase text-palette-primary shadow-pill-glow">
            See criteria
          </span>
        )}
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

export function TalentBadge({ score }: { score: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[160px] w-[160px] items-center justify-center rounded-[24px] border border-gray-10">
        <Image src={talentScore} alt="Talent Passport score" height={100} width={100} />
        <span className="absolute font-sans text-3xl font-bold text-white">{score}</span>
      </div>
      <span className="text-sm font-medium">Talent Passport score</span>
    </div>
  );
}

export function BadgeModal() {
  const { modalOpen, closeModal, selectedClaim } = useBadgeContext();

  if (!modalOpen || !selectedClaim) return null;

  const badge = selectedClaim.badge;
  const name = BADGE_INFO[badge]?.name;

  return (
    <Modal isOpen={modalOpen} onClose={closeModal} title="">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={BADGE_IMGS[badge]}
          alt={name}
          height={100}
          width={100}
          className="rounded-[24px]"
        />
        <div className="mb-8 flex flex-col items-center gap-6">
          <span className="text-2xl font-medium">{name}</span>
          <p className="text-center">{BADGE_INFO[badge].description}</p>
          <span className="text-l font-bold uppercase">
            status: {selectedClaim.claimed ? 'claimed' : 'unclaimed'}
          </span>
        </div>
        <Link href={BADGE_INFO[badge].ctaLink} target="_blank">
          <Button variant="black" rounded>
            {BADGE_INFO[badge].cta}
          </Button>
        </Link>
      </div>
    </Modal>
  );
}
