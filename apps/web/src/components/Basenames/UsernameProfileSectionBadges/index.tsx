import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Badge } from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { useBaseGuild } from 'apps/web/src/hooks/useBaseGuild';
import { useCoinbaseVerification } from 'apps/web/src/hooks/useCoinbaseVerifications';
import { useTalentProtocol } from 'apps/web/src/hooks/useTalentProtocol';

export default function UsernameProfileSectionBadges() {
  const { profileAddress } = useUsernameProfile();

  const badges = useCoinbaseVerification(profileAddress);
  const guildBadges = useBaseGuild(profileAddress);
  useTalentProtocol(profileAddress);

  if (!badges.length) return null;

  return (
    <section className="">
      <UsernameProfileSectionTitle title="Verifications" />
      <ul className="mb-12 mt-6 flex flex-row gap-8">
        {badges.map((badge) => (
          <li key={badge} className="inline-block">
            <Badge badge={badge} />
          </li>
        ))}
      </ul>
      <UsernameProfileSectionTitle title="Builder activity" />
      <ul className="mb-12 mt-6 flex flex-row gap-8">
        {guildBadges.map((badge) => (
          <li key={badge} className="inline-block">
            <Badge badge={badge} />
          </li>
        ))}
      </ul>
    </section>
  );
}
