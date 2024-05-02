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
          Starting next week, users will be redirected to the Superchain Bridges. See FAQs for
          details.
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
