'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Modal, { ModalSizes } from '../../Modal';
import { Button } from '../../Button/Button';
import modalImage from './basenames-modal.svg';

export default function BasenamesHomepageModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="flex flex-col justify-center font-display">
        <div className="h-[258px]">
          <Image src={modalImage} alt="claim your basename today" className='w-full h-full object-cover'/>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-90 py-8 text-center text-white">
          <h1 className="text-5xl font-normal leading-[56px]">{`Basenames are here!`}</h1>
          <span className="mt-3 w-[384px] font-sans leading-6">
            Connect with other Based builders and start building your unique onchain identity on
            Base with a .base.eth username.
          </span>
          <Button className="mt-8 mb-2 flex w-[378px] flex-col items-center rounded-[3px] text-center font-medium leading-7">
            Get your basename
          </Button>
        </div>
      </div>
    </Modal>
  );
}
