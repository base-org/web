import React, { useState, useCallback } from 'react';
import FloatingChatButton from './FloatingChatButton';
import ChatModal from './ChatModal';

export default function DocFeedback() {
  const [visible, setVisible] = useState(false);

  const handleModalOpen = useCallback(() => {
    setVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setVisible(false);
  }, []);

  console.log('DocChat Rendered');

  return (
    <>
      <FloatingChatButton onClick={handleModalOpen} />
      <ChatModal visible={visible} onRequestClose={handleModalClose} />
    </>
  );
}
