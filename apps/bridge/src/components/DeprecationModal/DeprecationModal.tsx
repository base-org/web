import { useCallback, useMemo } from 'react';
import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { useLocalStorage } from 'usehooks-ts';

export function DeprecationModal() {
  const [deprecationSeen, setDeprecationSeen] = useLocalStorage('deprecationSeen', false, {
    // make SSR compatible
    initializeWithValue: false,
  });

  const onClose = useCallback(() => {
    setDeprecationSeen(true);
  }, [setDeprecationSeen]);

  const content = useMemo(() => {
    return (
      <div className="flex flex-col items-center space-y-8">
        <p>
          As Base continues to decentralize, later this month{' '}
          <a href="https://bridge.base.org" className="underline">
            bridge.base.org
          </a>{' '}
          will redirect to{' '}
          <a
            href="https://superbridge.app/base"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Superbridge
          </a>{' '}
          and other bridges (collectively, “Superchain bridges”). Superchain bridges are available
          to initiate and complete deposits and withdrawals to and from Base. Please see our FAQs
          for additional info.
        </p>
        <div className="flex flex-col space-y-2">
          <button
            type="button"
            className="rounded bg-white px-8 py-3.5 font-sans text-black"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }, [onClose]);

  return (
    <Modal
      isOpen={!deprecationSeen}
      title="THIS BRIDGE IS BEING REPLACED SOON"
      icon="deprecation"
      content={content}
      onClose={onClose}
    />
  );
}
