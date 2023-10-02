import { useMemo } from 'react';
import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { TOSRegion, useTOSStatus } from 'apps/bridge/src/contexts/TOSContext';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

type TOSModalProps = {
  isOpen: boolean;
  tosRegion: TOSRegion;
};

export function TOSModal({ isOpen, tosRegion }: TOSModalProps) {
  const { acceptTos } = useTOSStatus();

  const tosContent = useMemo(() => {
    if (tosRegion === 'US') {
      return (
        <div className="flex flex-col items-center space-y-8">
          <p>
            Anything posted on the blockchain, including personal information collected from users
            and processed onchain, is publicly accessible and permanent. Clicking the
            &quot;Accept&quot; button means you accept the{' '}
            <a
              target="_blank"
              className="underline"
              href={`${publicRuntimeConfig.docsURL}/terms-of-service`}
              rel="noreferrer"
            >
              Base Terms
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
              href={`${publicRuntimeConfig.docsURL}/privacy-policy`}
            >
              Base Privacy Policy
            </a>
            .
          </p>
          <button
            onClick={acceptTos}
            type="button"
            className="rounded bg-white px-8 py-3.5 font-sans text-black"
          >
            Accept
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center space-y-8">
        <p>
          Anything posted on the blockchain, including personal information collected from users and
          processed onchain, is publicly accessible and permanent. Clicking the &quot;Accept&quot;
          button means you accept the{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
            href={`${publicRuntimeConfig.docsURL}/terms-of-service`}
          >
            Base Terms
          </a>
          .
        </p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={acceptTos}
            type="button"
            className="rounded bg-white px-8 py-3.5 font-sans text-black"
          >
            Accept
          </button>
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
            href={`${publicRuntimeConfig.docsURL}/privacy-policy`}
          >
            Base Privacy Policy
          </a>
        </div>
      </div>
    );
  }, [acceptTos, tosRegion]);

  return (
    <Modal isOpen={isOpen} title="WELCOME TO THE BASE BRIDGE" icon="tos" content={tosContent} />
  );
}
