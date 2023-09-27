import { Modal } from 'apps/bridge/src/components/Modal/Modal';

type OFACModalProps = {
  isOpen: boolean;
};

export function OFACModal({ isOpen }: OFACModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="THIS SERVICE IS NOT AVAILABLE IN YOUR REGION"
      content={(
        <div>
          <p className="text-white mt-4">Alternatively, you can use these <a href="https://base.org/ecosystem?tag=bridge" className="underline">approved third-party bridges</a>.</p>
        </div>
  )}
    />
  );
}
