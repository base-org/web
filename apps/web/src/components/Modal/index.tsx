import { Dialog, Transition } from '@headlessui/react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export enum ModalSizes {
  Medium = 'medium',
  Large = 'large',
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  title?: JSX.Element | string;
  titleAlign?: 'left' | 'center' | 'right';
  modalAlign?: 'top' | 'center';
  size?: ModalSizes;
};

export default function Modal({
  children,
  isOpen,
  title,
  onClose,
  onBack,
  titleAlign = 'center',
  modalAlign = 'center',
  size = ModalSizes.Medium,
  ...rest
}: PropsWithChildren<ModalProps>) {
  const mainClasses = classNames('font-mono text-3xl text-illoblack w-full font-bold', {
    'text-center': titleAlign === 'center',
    'text-left': titleAlign === 'left',
    'text-right': titleAlign === 'right',
  });

  const dialogWrapperClasses = classNames(
    'fixed inset-0 flex w-screen justify-center overflow-y-scroll p-4',
    {
      'items-center': modalAlign === 'center',
      'items-start': modalAlign === 'top',
    },
  );

  const dialogClasses = classNames(
    'border-gray-40/20 flex h-full w-full flex-col gap-4 rounded-3xl border bg-white p-10 shadow-lg sm:h-auto ',
    {
      'max-w-lg': size === ModalSizes.Medium,
      'max-w-xl': size === ModalSizes.Large,
      'mt-20': modalAlign === 'top',
    },
  );

  return (
    <Transition appear show={isOpen}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}

        <div
          className="fixed inset-0 transform-gpu bg-illoblack/40 backdrop-blur"
          aria-hidden="true"
        />

        <div className={dialogWrapperClasses}>
          <Dialog.Panel className={dialogClasses} {...rest}>
            <div className="flex">
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

            <div className="flex max-w-prose flex-1 flex-col place-content-center place-items-center gap-2">
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
