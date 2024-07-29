import { EnsAvatarMapping } from 'apps/web/src/components/CoreContributors/EnsAvatarMapping';
import Image from 'next/image';
import Blockies from './Blockies';
import contributorList from 'apps/web/src/components/CoreContributors/CoreContributors.json';

const owners = contributorList as unknown as EnsAvatarMapping[];

const AVATAR_SIZE = 48;
const avatarCssStyle = {
  borderRadius: `${AVATAR_SIZE}px`,
  maxHeight: `${AVATAR_SIZE}px`,
  maxWidth: `${AVATAR_SIZE}px`,
};

export default async function CoreContributors() {
  return (
    <div className="flex flex-row flex-wrap items-start gap-3 bg-black pt-12">
      {owners?.length > 0 &&
        owners.map((owner) => {
          const filename = owner.filename ?? '';
          const title = owner.ensName ?? owner.address;

          return (
            <div key={`avatar_${owner.address}`}>
              <a
                href={`https://etherscan.io/address/${owner.address}`}
                title={owner.ensName ?? owner.address}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {filename ? (
                  <Image
                    alt={title}
                    src={`/images/avatars/${filename}`}
                    width={AVATAR_SIZE}
                    height={AVATAR_SIZE}
                    style={avatarCssStyle}
                  />
                ) : (
                  <Blockies address={owner.address} size={AVATAR_SIZE} />
                )}
              </a>
            </div>
          );
        })}
    </div>
  );
}
