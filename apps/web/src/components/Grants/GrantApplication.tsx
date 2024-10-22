'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { FormStates } from 'apps/web/src/components/Grants/grantApplicationTypes';
import GrantApplicationWelcome from 'apps/web/src/components/Grants/GrantApplicationWelcome';
import GrantApplicationForm from 'apps/web/src/components/Grants/GrantApplicationForm';
import GrantApplicationSubmitted from 'apps/web/src/components/Grants/GrantApplicationSubmitted';

export default function GrantApplication() {
  const [textRecordsLoading, setTextRecordsLoading] = useState(true);
  const [formState, setFormState] = useState<FormStates>(FormStates.Welcome);

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

  if (formState === FormStates.Welcome) {
    if (isBasenameLoading) {
      return;
    }
    return <GrantApplicationWelcome addressCheck={!!address} basenameCheck={!!basename} />;
  }

  if (formState === FormStates.Started) {
    if (textRecordsLoading) {
      return;
    }
    return (
      <GrantApplicationForm
        basename={basename ?? ''}
        basenameRecords={memoizedTextRecords}
        formSetter={setFormState}
      />
    );
  }

  if (formState === FormStates.Submitted) {
    return <GrantApplicationSubmitted />;
  }
}
