import React from 'react';
import marked from '../../utils/marked';

import Icon from '../Icon';

import styles from './styles.module.css';

import { ConversationMessage } from './docChat';

type ChatMessageProps = {
  type: ConversationMessage['type'];
  content: ConversationMessage['content'];
  sources: ConversationMessage['sources'];
};

export default function ChatMessage({ type, content, sources }: ChatMessageProps) {
  const parseMarkdownResponse = (markdown: string) => {
    var markup = marked.parse(markdown);
    return { __html: markup };
  };

  return (
    <div>
      <div className={styles.chatMessageContainer}>
        {type === 'prompt' && content !== '' && (
          <>
            <span className={styles.chatMessageIcon}>
              <Icon name="avatar" width="24" height="24" />
            </span>
            <span>{content}</span>
          </>
        )}

        {type === 'response' && content !== '' && (
          <>
            <span className={styles.chatMessageIcon}>
              <Icon name="base-logo" width="24" height="24" />
            </span>
            <span
              className={styles.chatMessageContent}
              dangerouslySetInnerHTML={parseMarkdownResponse(content)}
            />
          </>
        )}
      </div>

      {sources && sources.length > 0 && (
        <>
          <div className={styles.chatMessageSourcesLabel}>Verified Sources:</div>
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
        </>
      )}
    </div>
  );
}
