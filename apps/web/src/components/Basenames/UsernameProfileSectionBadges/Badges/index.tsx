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

import talentScore from './images/talentScore.png';

type BadgeNames = CoinbaseVerifications | GuildBadges;

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
};

export const BADGE_NAMES: Record<BadgeNames, string> = {
  VERIFIED_IDENTITY: 'Coinbase Verified ID',
  VERIFIED_COUNTRY: 'Verified Country',
  VERIFIED_COINBASE_ONE: 'Coinbase One',
  BASE_BUILDER: 'Based Builder',
  BASE_GRANTEE: 'Base Grantee',
  BASE_INITIATE: 'Based Initiate',
  BASE_LEARN_NEWCOMER: 'Base Learn Newcomer',
  BUILDATHON_PARTICIPANT: 'Buildathon Participant',
  BUILDATHON_WINNER: 'Buildathon Winner',
};

export function Badge({ badge, earned }: { badge: BadgeNames; earned?: boolean }) {
  const name = BADGE_NAMES[badge];
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex h-[160px] w-[160px] items-center justify-center rounded-[24px] border border-gray-10">
        <Image
          src={(earned ? BADGE_IMGS : GRAY_BADGE_IMGS)[badge]}
          alt={name}
          height={100}
          width={100}
        />
        {!earned && (
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
