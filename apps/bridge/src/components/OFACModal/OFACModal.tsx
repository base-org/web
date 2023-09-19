import { Modal } from 'apps/bridge/src/components/Modal/Modal';

type OFACModalProps = {
  isOpen: boolean;
};

export function OFACModal({ isOpen }: OFACModalProps) {
  return <Modal isOpen={isOpen} title="THIS SITE IS RESTRICTED IN YOUR REGION" icon="alert" />;
}
