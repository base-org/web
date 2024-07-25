import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import {
  Badge,
  TalentBadge,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { GuildBadges, useBaseGuild } from 'apps/web/src/hooks/useBaseGuild';
import {
  CoinbaseVerifications,
  useCoinbaseVerification,
} from 'apps/web/src/hooks/useCoinbaseVerifications';
import { useTalentProtocol } from 'apps/web/src/hooks/useTalentProtocol';

function VerificationsSection() {
  const { profileAddress, currentWalletIsOwner } = useUsernameProfile();

  const { badges, empty } = useCoinbaseVerification(profileAddress);

  if (empty && !currentWalletIsOwner) return null;

  return (
    <>
      <UsernameProfileSectionTitle title="Verifications" />
      <ul className="mb-12 mt-6 flex flex-row flex-wrap gap-8">
        {Object.keys(badges).map((badge) => {
          const hasBadge = badges[badge as CoinbaseVerifications];

          return hasBadge || currentWalletIsOwner ? (
            <li key={badge} className="inline-block">
              <Badge badge={badge as CoinbaseVerifications} earned={hasBadge} />
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
}

function BuilderSection() {
  const { profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const badges = useBaseGuild(profileAddress);
  const talentScore = useTalentProtocol(profileAddress);

  return (
    <>
      <UsernameProfileSectionTitle title="Builder activity" />
      <ul className="mb-12 mt-6 flex flex-row flex-wrap gap-8">
        {Object.keys(badges).map((badge) => {
          const hasBadge = badges[badge as GuildBadges];

          return hasBadge || currentWalletIsOwner ? (
            <li key={badge} className="inline-block">
              <Badge badge={badge as GuildBadges} earned={hasBadge} />
            </li>
          ) : null;
        })}
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
