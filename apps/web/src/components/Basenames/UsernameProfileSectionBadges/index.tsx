import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { CoinbaseVerificationBadge } from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { useCoinbaseVerification } from 'apps/web/src/hooks/useCoinbaseVerifications';

export default function UsernameProfileSectionBadges() {
  const { profileAddress } = useUsernameProfile();

  const badges = useCoinbaseVerification(profileAddress);

  if (!badges.length) return null;

  return (
    <section className="">
      <UsernameProfileSectionTitle title="Verifications" />
      <ul className="mt-6 flex flex-row gap-8">
        {badges.map((badge) => (
          <li key={badge} className="inline-block">
            <CoinbaseVerificationBadge badge={badge} />
          </li>
        ))}
      </ul>
    </section>
  );
}
