import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import {
  Badge,
  BadgeModal,
  BadgeNames,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { useBaseGuild } from 'apps/web/src/hooks/useBaseGuild';
import { useCoinbaseVerification } from 'apps/web/src/hooks/useCoinbaseVerifications';
import { useTalentProtocol } from 'apps/web/src/hooks/useTalentProtocol';
import { useMemo } from 'react';
import BadgeContextProvider from './BadgeContext';

function BadgesLoop({
  badges,
  currentWalletIsOwner,
}: {
  badges: Partial<Record<BadgeNames, boolean | number>>;
  currentWalletIsOwner?: boolean;
}) {
  return (
    <ul className="mb-12 mt-6 flex flex-row flex-wrap gap-8">
      {Object.keys(badges).map((badge) => {
        const hasBadge = !!badges[badge as BadgeNames];
        const score =
          badge === 'TALENT_SCORE' ? (badges[badge as BadgeNames] as number) : undefined;

        return hasBadge || currentWalletIsOwner ? (
          <li key={badge} className="inline-block">
            <Badge badge={badge as BadgeNames} claimed={hasBadge} score={score} />
          </li>
        ) : null;
      })}
    </ul>
  );
}

function BadgeCount({ badges }: { badges: Partial<Record<BadgeNames, boolean | number>> }) {
  const { currentWalletIsOwner } = useUsernameProfile();
  const [claimed, total] = useMemo(() => {
    const claimedCount = Object.values(badges).filter(Boolean).length;
    const totalCount = Object.keys(badges).length;
    return [claimedCount, totalCount];
  }, [badges]);

  if (!currentWalletIsOwner) return null;

  return <span>{`${claimed}/${total}`} claimed</span>;
}

function VerificationsSection() {
  const { profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const { badges, empty } = useCoinbaseVerification(profileAddress);

  if (empty && !currentWalletIsOwner) return null;

  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <UsernameProfileSectionTitle title="Verifications" />
        <BadgeCount badges={badges} />
      </div>
      <BadgesLoop badges={badges} currentWalletIsOwner={currentWalletIsOwner} />
    </>
  );
}

function BuilderSection() {
  const { profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const { badges, empty } = useBaseGuild(profileAddress);
  const talentScore = useTalentProtocol(profileAddress);

  const combinedBadges = useMemo(
    () => ({ ...badges, TALENT_SCORE: talentScore }),
    [badges, talentScore],
  );
  const combinedEmpty = empty && !talentScore;

  if (combinedEmpty && !currentWalletIsOwner) return null;

  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <UsernameProfileSectionTitle title="Builder activity" />
        <BadgeCount badges={combinedBadges} />
      </div>
      <BadgesLoop badges={combinedBadges} currentWalletIsOwner={currentWalletIsOwner} />
    </>
  );
}

export default function UsernameProfileSectionBadges() {
  return (
    <section className="">
      <BadgeContextProvider>
        <VerificationsSection />
        <BuilderSection />
        <BadgeModal />
      </BadgeContextProvider>
    </section>
  );
}
