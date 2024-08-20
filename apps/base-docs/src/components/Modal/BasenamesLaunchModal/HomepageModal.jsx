import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styles from './styles.module.css';

export default function Modal({
  children,
  isOpen,
  title,
  onClose,
  modalAlign = 'center',
  ...rest
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.outerDialog} onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.dialogBackground} aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 ">
          <div className={styles.dialogWrapper}>
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-1/4"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95 translate-y-1/4"
            >
              <Dialog.Panel className={styles.dialog} {...rest}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
