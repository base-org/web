import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import {
  Badge,
  TalentBadge,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { GuildBadges, useBaseGuild } from 'apps/web/src/hooks/useBaseGuild';
import { useCoinbaseVerification } from 'apps/web/src/hooks/useCoinbaseVerifications';
import { useTalentProtocol } from 'apps/web/src/hooks/useTalentProtocol';

function VerificationsSection() {
  const { profileAddress } = useUsernameProfile();

  const badges = useCoinbaseVerification(profileAddress);

  if (!badges.length) return null;

  return (
    <>
      <UsernameProfileSectionTitle title="Verifications" />
      <ul className="mb-12 mt-6 flex flex-row gap-8">
        {badges.map((badge) => (
          <li key={badge} className="inline-block">
            <Badge badge={badge} />
          </li>
        ))}
      </ul>
    </>
  );
}

function BuilderSection() {
  const { profileAddress } = useUsernameProfile();
  const guildBadges = useBaseGuild(profileAddress);
  const talentScore = useTalentProtocol(profileAddress);

  return (
    <>
      <UsernameProfileSectionTitle title="Builder activity" />
      <ul className="mb-12 mt-6 flex flex-row gap-8">
        {Object.keys(guildBadges).map((badge) =>
          guildBadges[badge as GuildBadges] ? (
            <li key={badge} className="inline-block">
              <Badge badge={badge as GuildBadges} />
            </li>
          ) : null,
        )}
        {talentScore ? (
          <li className="inline-block">
            <TalentBadge score={talentScore} />
          </li>
        ) : null}
      </ul>
    </>
  );
}

export default function UsernameProfileSectionBadges() {
  return (
    <section className="">
      <VerificationsSection />
      <BuilderSection />
    </section>
  );
}
