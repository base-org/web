import { CoinbaseVerifications } from 'apps/web/src/hooks/useCoinbaseVerifications';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { GuildBadges } from 'apps/web/src/hooks/useBaseGuild';

// image imports
import verifiedIdentity from './verifiedIdentity.png';
import verifiedCountry from './verifiedCountry.png';
import verifiedCoinbaseOne from './verifiedCoinbaseOne.png';
import baseBuilder from './baseBuilder.png';
import baseGrantee from './baseGrantee.png';
import baseInitiate from './baseInitiate.png';
import baseLearnNewcomer from './baseLearnNewcomer.png';
import buildathonParticipant from './buildathonParticipant.png';
import buildathonWinner from './buildathonWinner.png';

import talentScore from './talentScore.png';

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

export const BADGE_NAMES: Record<BadgeNames, string> = {
  VERIFIED_IDENTITY: 'Coinbase Verified ID',
  VERIFIED_COUNTRY: 'Verified Country',
  VERIFIED_COINBASE_ONE: 'Coinbase One',
  BASE_BUILDER: 'Base Builder',
  BASE_GRANTEE: 'Base Grantee',
  BASE_INITIATE: 'Base Initiate',
  BASE_LEARN_NEWCOMER: 'Base Learn Newcomer',
  BUILDATHON_PARTICIPANT: 'Buildathon Participant',
  BUILDATHON_WINNER: 'Buildathon Winner',
};

export function Badge({ badge }: { badge: BadgeNames }) {
  const name = BADGE_NAMES[badge];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[160px] w-[160px] items-center justify-center rounded-[24px] border border-gray-10">
        <Image src={BADGE_IMGS[badge]} alt={name} height={100} width={100} />
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
