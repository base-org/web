import React, { useCallback } from 'react';
import { logGptEvent } from './docChat';

import styles from './styles.module.css';

type ResponseSourceProps = {
  conversationId: number;
  messageId?: number;
  source: string;
  index: number;
};

export default function ResponseSource({
  conversationId,
  messageId,
  source,
  index,
}: ResponseSourceProps) {
  const handleSourceClick = useCallback(() => {
    logGptEvent('gpt_source_clicked', {
      conversation_id: conversationId,
      message_id: messageId,
      source_url: source,
    });
  }, []);

  return (
    <a
      href={source}
      target="_blank"
      rel="noreferrer"
      className={styles.chatMessageSource}
      onClick={handleSourceClick}
    >
      {`${index + 1}. ${source}`}
    </a>
  );
}
