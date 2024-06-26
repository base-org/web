import { Dialog, Transition } from '@headlessui/react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  title?: JSX.Element | string;
  titleAlign?: 'left' | 'center' | 'right';
};

export default function Modal({
  children,
  isOpen,
  title,
  onClose,
  onBack,
  titleAlign = 'center',
  ...rest
}: PropsWithChildren<ModalProps>) {
  const mainClasses = classNames('font-mono text-3xl text-illoblack w-full font-bold', {
    'text-center': titleAlign === 'center',
    'text-left': titleAlign === 'left',
    'text-right': titleAlign === 'right',
  });

  return (
    <Transition appear show={isOpen}>
      <Dialog open={isOpen} onClose={onClose}>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-illoblack/40" aria-hidden="true" />
        {/* Container to center the panel */}
        <div className="fixed inset-0 z-50 flex min-h-full w-screen items-center justify-center bg-illoblack/40 p-4 backdrop-blur-sm">
          <Dialog.Panel
            className="flex h-full w-[459px] flex-col rounded-3xl border border-[#8A919E33] bg-white sm:h-auto sm:max-w-xl"
            {...rest}
          >
            <div className="flex px-8 py-6">
              {onBack && (
                <button type="button" className="mr-auto text-xl text-[#0A0B0D]" onClick={onBack}>
                  <Icon name="backArrow" width={14} height={14} color="currentColor" />
                </button>
              )}
              {!!onClose && (
                <button type="button" className="ml-auto text-xl text-[#0A0B0D]" onClick={onClose}>
                  <Icon name="close" width={14} height={14} color="currentColor" />
                </button>
              )}
            </div>

            <div className="mx-8 mb-8 flex max-w-prose flex-1 flex-col place-content-center place-items-center gap-2">
              {Boolean(title) && (
                <Dialog.Title as="h2" className={mainClasses}>
                  {title}
                </Dialog.Title>
              )}
              {children}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
