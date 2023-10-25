import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import Link from 'next/link';

type OFACModalProps = {
  isOpen: boolean;
};

export function OFACModal({ isOpen }: OFACModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="THIS SERVICE IS NOT AVAILABLE IN YOUR REGION"
      content={
        <div className="mt-4 text-white">
          <p>
            <Link href="/transactions" className="underline">
              View your existing transaction history.
            </Link>
          </p>
          <p>
            Alternatively, you can use these{' '}
            <a href="https://base.org/ecosystem?tag=bridge" className="underline">
              approved third-party bridges
            </a>
            .
          </p>
        </div>
      }
    />
  );
}
