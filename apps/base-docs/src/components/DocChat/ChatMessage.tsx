import React from 'react';
import marked from '../../utils/marked';

import Icon from '../Icon';
import ResponseFeedback from './ResponseFeedback';
import ResponseSource from './ResponseSource';

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
          <ResponseFeedback
            responseIndex={index}
            messageId={messageId}
            conversationId={conversationId}
            conversation={conversation}
            setConversation={setConversation}
          />

          <div className={styles.chatMessageSourcesLabel}>Verified Sources:</div>
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
          </div>
        </>
      )}
    </div>
  );
}
