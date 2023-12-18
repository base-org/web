import React from 'react';
import { ConversationMessage } from './ChatModal';
import Icon from '../Icon';

import styles from './styles.module.css';

type ChatMessageProps = {
  type: ConversationMessage['type'];
  content: ConversationMessage['content'];
  sources: ConversationMessage['sources'];
};

export default function ChatMessage({ type, content, sources }: ChatMessageProps) {
  return (
    <div>
      <div className={styles.chatMessageContainer}>
        {type === 'prompt' && content !== '' && (
          <span className={styles.chatMessageIcon}>
            <Icon name="avatar" width={24} height={24} />
          </span>
        )}
        {type === 'response' && content !== '' && (
          <span className={styles.chatMessageIcon}>
            <Icon name="base-logo" width={24} height={24} />
          </span>
        )}
        <span>{content}</span>
      </div>

      {sources && sources.length > 0 && (
        <div className={styles.chatMessageSourcesContainer}>
          {sources.map((source, i) => (
            <a
              key={source}
              href={source}
              className={styles.chatMessageSource}
              target="_blank"
              rel="noreferrer"
            >
              {`${i + 1}. ${source}`}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
