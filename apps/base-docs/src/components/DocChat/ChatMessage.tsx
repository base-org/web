import React, { useRef, useLayoutEffect } from 'react';
import { parseMarkdown } from '../../utils/marked';

import Icon from '../Icon';
import ResponseFeedback from './ResponseFeedback';
// import ResponseSource from './ResponseSource';

import styles from './styles.module.css';

import { ConversationMessage } from './docChat';

type ChatMessageProps = {
  index: number;
  type: ConversationMessage['type'];
  content: ConversationMessage['content'];
  sources?: ConversationMessage['sources'];
  messageId?: number;
  conversationId: number;
  conversation: ConversationMessage[];
  setConversation: (
    conversation: (prevState: ConversationMessage[]) => ConversationMessage[],
  ) => void;
};

export default function ChatMessage({
  index,
  messageId,
  conversationId,
  conversation,
  setConversation,
  type,
  content,
  sources,
}: ChatMessageProps) {
  const responseContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (responseContentRef.current) {
      responseContentRef.current.innerHTML = parseMarkdown(content);
    }
  }, [content]);

  return (
    <div className={styles.chatMessageContainer}>
      <div className={styles.chatMessage}>
        {type === 'prompt' && content !== '' && (
          <>
            <div className={styles.chatMessageIcon}>
              <Icon name="avatar" width="24" height="24" />
            </div>
            <div>{content}</div>
          </>
        )}

        {type === 'response' && content !== '' && (
          <>
            <div className={styles.chatMessageIcon}>
              <Icon name="base-logo" width="24" height="24" />
            </div>
            <div ref={responseContentRef} className={styles.chatMessageContent} />
          </>
        )}
      </div>

      {sources && sources.length > 0 && (
        <>
          <ResponseFeedback
            responseIndex={index}
            messageId={messageId}
            conversationId={conversationId}
            conversation={conversation}
            setConversation={setConversation}
          />

          {/* Source data provided by the Mendable API needs more tuning but will be supported in a future release */}
          {/* <div className={styles.chatMessageSourcesLabel}>Verified Sources:</div>
          <div className={styles.chatMessageSourcesContainer}>
            {sources.map((source, i) => (
              <ResponseSource
                key={source}
                index={i}
                conversationId={conversationId}
                messageId={messageId}
                source={source}
              />
            ))}
          </div> */}
        </>
      )}
    </div>
  );
}
