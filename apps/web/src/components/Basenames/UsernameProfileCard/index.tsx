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
  const { profileUsernameFormatted, profileAddress } = useUsernameProfile();

  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsernameFormatted,
  });

  const textRecordDescription = existingTextRecords[UsernameTextRecordKeys.Description];

  const textRecordsSocial: UsernameTextRecords = textRecordsSocialFieldsEnabled.reduce(
    (previousValue, textRecordKey) => {
      previousValue[textRecordKey] = existingTextRecords[textRecordKey];
      return previousValue;
    },
    {},
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
    <div className="flex flex-col gap-4 rounded-2xl bg-[#EEF0F3] p-8 shadow-xl">
      {!!textRecordDescription && (
        <p className="text-lg font-bold text-[#5B616E]">{textRecordDescription}</p>
      )}

      <ul className="flex flex-col gap-2">
        {textRecordsSocialFieldsEnabled.map(
          (textRecordKey) =>
            !!existingTextRecords[textRecordKey] && (
              <li key={textRecordKey}>
                <Link
                  href={formatSocialFieldUrl(textRecordKey, existingTextRecords[textRecordKey])}
                  target="_blank"
                  className="flex items-center gap-2 text-gray-40 hover:text-blue-500"
                >
                  <Icon
                    name={textRecordsSocialFieldsEnabledIcons[textRecordKey]}
                    height="1rem"
                    width="1rem"
                    color="currentColor"
                  />
                  {formatSocialFieldForDisplay(textRecordKey, existingTextRecords[textRecordKey])}
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}
