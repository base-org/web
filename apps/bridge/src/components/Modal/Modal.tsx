import { ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type ModalProps = {
  children?: JSX.Element;
  isOpen: boolean;
  onClose?: () => void;
  icon?: string;
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
};

function emptyOnClose() {}

export function Modal({ children, isOpen, title, content, icon, footer, onClose }: ModalProps) {
  return (
    <Transition appear show={isOpen}>
      <Dialog open={isOpen} onClose={onClose ?? emptyOnClose}>
        <Dialog.Backdrop className="fixed inset-0 bg-stone-900 bg-opacity-75" />

        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Panel className="flex h-full w-full flex-col rounded-md border border-[#8a919e33] bg-gray sm:h-auto sm:max-w-xl">
            <div className="flex p-4">
              {!!onClose && (
                <button type="button" className="ml-auto text-xl text-white" onClick={onClose}>
                  <XMarkIcon width={24} height={24} />
                </button>
              )}
            </div>

            <div className="flex flex-1 flex-col">
              <div className="grid flex-1 place-content-center place-items-center gap-2 p-4 pb-16">
                {icon && (
                  <Image src={`/icons/${icon}.svg`} alt={icon || ''} width={96} height={96} />
                )}

                {Boolean(title) && (
                  <Dialog.Title as="h2" className="text-center font-mono text-xl text-white">
                    {title}
                  </Dialog.Title>
                )}

                {Boolean(content) && (
                  <Dialog.Panel className="text-center font-sans text-[#8A919E]">
                    {content}
                  </Dialog.Panel>
                )}
                {children}
              </div>
              {Boolean(footer) && (
                <footer className="-mt-8 border-t border-t-[#D9D9D9] border-opacity-20 px-6 py-4">
                  {footer}
                </footer>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
