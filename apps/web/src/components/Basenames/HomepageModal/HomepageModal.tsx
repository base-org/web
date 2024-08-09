import { Dialog, Transition } from '@headlessui/react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { Fragment, PropsWithChildren } from 'react';

export enum ModalSizes {
  Medium = 'medium',
  Large = 'large',
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
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
  modalAlign = 'center',
  size = ModalSizes.Medium,
  ...rest
}: PropsWithChildren<ModalProps>) {
  const dialogWrapperClasses = classNames(
    'items-center fixed inset-0 flex w-screen justify-center md:p-4',
    {
      'items-center': modalAlign === 'center',
      'items-start': modalAlign === 'top',
    },
  );

  const dialogClasses = classNames(
    'flex h-screen max-h-screen overflow-y-scroll md:h-full w-full flex-col gap-4 md:rounded-lg bg-white shadow-lg sm:h-auto ',
    {
      'max-w-lg': size === ModalSizes.Medium,
      'max-w-xl': size === ModalSizes.Large,
    },
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-illoblack/40" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 ">
          <div className={dialogWrapperClasses}>
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-1/4"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95 translate-y-1/4"
            >
              <Dialog.Panel className={dialogClasses} {...rest}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
