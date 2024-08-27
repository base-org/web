import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import {
  formatSocialFieldForDisplay,
  formatSocialFieldUrl,
  textRecordsSocialFieldsEnabled,
  textRecordsSocialFieldsEnabledIcons,
  UsernameTextRecordKeys,
  UsernameTextRecords,
} from 'apps/web/src/utils/usernames';
import Link from 'next/link';

export default function UsernameProfileCard() {
  const { profileUsername, profileAddress } = useUsernameProfile();

  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  const textRecordDescription = existingTextRecords[UsernameTextRecordKeys.Description];

  const textRecordsSocial = textRecordsSocialFieldsEnabled.reduce(
    (previousValue, textRecordKey) => {
      previousValue[textRecordKey] = existingTextRecords[textRecordKey];
      return previousValue;
    },
    {} as UsernameTextRecords,
  );

  // TODO: Empty state / CTA to edit if owner
  const hasTextRecordsToDisplay =
    !!textRecordDescription || Object.values(textRecordsSocial).filter((v) => !!v).length > 0;

  if (!hasTextRecordsToDisplay) {
    return;
  }

  textRecordsSocialFieldsEnabled.map((textRecordKey) => (
    <li key={textRecordDescription}>{existingTextRecords[textRecordKey]}</li>
  ));

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-40/20 p-8">
      {!!textRecordDescription && (
        <p className="break-words font-bold text-illoblack">{textRecordDescription}</p>
      )}

      <ul className="flex flex-col gap-2">
        {textRecordsSocialFieldsEnabled.map(
          (textRecordKey) =>
            !!existingTextRecords[textRecordKey] && (
              <li key={textRecordKey}>
                <Link
                  href={formatSocialFieldUrl(textRecordKey, existingTextRecords[textRecordKey])}
                  target="_blank"
                  className="flex items-center gap-2 text-palette-foregroundMuted hover:text-blue-500"
                >
                  <span>
                    <Icon
                      name={textRecordsSocialFieldsEnabledIcons[textRecordKey]}
                      height="1rem"
                      width="1rem"
                      color="currentColor"
                    />
                  </span>
                  <span className="overflow-hidden text-ellipsis">
                    {formatSocialFieldForDisplay(textRecordKey, existingTextRecords[textRecordKey])}
                  </span>
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}
