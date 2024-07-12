import { CoinbaseVerifications } from 'apps/web/src/hooks/useCoinbaseVerifications';
import verifiedIdentity from './verifiedIdentity.png';
import verifiedCountry from './verifiedCountry.png';
import verifiedCoinbaseOne from './verifiedCoinbaseOne.png';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

export const BADGE_SVGS: Record<CoinbaseVerifications, StaticImport> = {
  VERIFIED_IDENTITY: verifiedIdentity as StaticImport,
  VERIFIED_COUNTRY: verifiedCountry as StaticImport,
  VERIFIED_COINBASE_ONE: verifiedCoinbaseOne as StaticImport,
};

export const BADGE_NAMES = {
  VERIFIED_IDENTITY: 'Coinbase Verified ID',
  VERIFIED_COUNTRY: 'Verified Country',
  VERIFIED_COINBASE_ONE: 'Coinbase One',
};

export function CoinbaseVerificationBadge({ badge }: { badge: CoinbaseVerifications }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[160px] w-[160px] items-center justify-center rounded-[24px] border border-palette-line">
        <Image src={BADGE_SVGS[badge]} alt={badge} height={100} width={100} />
      </div>
      <span className="text-sm font-medium">{BADGE_NAMES[badge]}</span>
    </div>
  );
}
