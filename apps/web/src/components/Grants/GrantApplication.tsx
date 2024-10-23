'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { FormStates } from 'apps/web/src/components/Grants/grantApplicationTypes';
import GrantApplicationWelcome from 'apps/web/src/components/Grants/GrantApplicationWelcome';
import GrantApplicationForm from 'apps/web/src/components/Grants/GrantApplicationForm';
import GrantApplicationSubmitted from 'apps/web/src/components/Grants/GrantApplicationSubmitted';
import getApplicationsByBasename from 'apps/web/src/utils/googleApi/readFromGoogleSheet';
import GrantApplicationStatusTable from 'apps/web/src/components/Grants/GrantApplicationStatusTable';

export default function GrantApplication() {
  const [textRecordsLoading, setTextRecordsLoading] = useState(true);
  const [formState, setFormState] = useState<FormStates>(FormStates.Welcome);
  const [applications, setApplications] = useState<string[][]>([]);
  const [showExistingApplications, setShowExistingApplications] = useState(false);
  const { address } = useAccount();
  const { data: basename, isLoading: isBasenameLoading } = useBaseEnsName({ address });
  const textRecords = useReadBaseEnsTextRecords({ address, username: basename });
  const memoizedTextRecords = useMemo(
    () => ({
      nomineeTwitter: textRecords.existingTextRecords['com.twitter'],
      nomineeFarcaster: textRecords.existingTextRecords['xyz.farcaster'],
    }),
    [textRecords.existingTextRecords],
  );

  useEffect(() => {
    if (!address || !basename) {
      setFormState(FormStates.Welcome);
    } else if (address && basename) {
      setFormState(FormStates.Started);
    }
  }, [address, basename]);

  useEffect(() => {
    if (!textRecords.existingTextRecordsIsLoading) {
      setTextRecordsLoading(false);
    }
  }, [textRecords.existingTextRecordsIsLoading]);

  useEffect(() => {
    if (!basename) {
      setApplications([]);
      return;
    }

    const getApplications = async () => {
      const userApplications = await getApplicationsByBasename(basename);
      if (userApplications.length > 0) {
        setApplications(userApplications);
      }
    };
    void getApplications();
  }, [basename]);

  const handleSeeExistingApplications = useCallback(() => {
    setShowExistingApplications(!showExistingApplications);
  }, [showExistingApplications]);

  let applicationStep: React.ReactNode;
  switch (formState) {
    case FormStates.Welcome:
      if (!isBasenameLoading) {
        applicationStep = (
          <GrantApplicationWelcome addressCheck={!!address} basenameCheck={!!basename} />
        );
      }
      break;
    case FormStates.Started:
      if (!textRecordsLoading) {
        applicationStep = (
          <GrantApplicationForm
            basename={basename ?? ''}
            basenameRecords={memoizedTextRecords}
            formSetter={setFormState}
          />
        );
      }
      break;
    case FormStates.Submitted:
      applicationStep = <GrantApplicationSubmitted />;
      break;
    default:
      applicationStep = null;
  }

  return (
    <div>
      <button type="button" onClick={handleSeeExistingApplications}>
        See Existing Applications
      </button>
      {showExistingApplications && <GrantApplicationStatusTable applications={applications} />}
      {applicationStep}
    </div>
  );
}
