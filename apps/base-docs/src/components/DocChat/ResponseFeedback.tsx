import React, { useCallback } from 'react';
import { ConversationMessage } from './docChat';

import Icon from '../Icon';

import styles from './styles.module.css';

const logResponseFeedback = (messageId: number | undefined, isHelpful: boolean) => {
  const url = 'https://api.mendable.ai/v1/rateMessage';

  const data = {
    api_key: 'MENDALE_API_KEY', // UPDATE WITH KEY
    message_id: messageId,
    rating_value: isHelpful ? 1 : -1,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((error) => console.error(error));
};

type ResponseFeedbackProps = {
  responseIndex: number;
  messageId: number | undefined;
  conversation: ConversationMessage[];
  setConversation: (
    conversation: (prevState: ConversationMessage[]) => ConversationMessage[],
  ) => void;
};

export default function ResponseFeedback({
  responseIndex,
  messageId,
  conversation,
  setConversation,
}: ResponseFeedbackProps) {
  const helpful = conversation[responseIndex].helpful;
  const feedbackSubmitted = conversation[responseIndex].helpful !== null;

  const handleClick = useCallback(
    (isHelpful: boolean) => {
      setConversation((prevState: ConversationMessage[]) => {
        const newState = prevState.map((message, i) => {
          if (i === responseIndex) {
            return {
              ...message,
              helpful: isHelpful,
            };
          }
          return message;
        });

        return newState;
      });

      logResponseFeedback(messageId, isHelpful);
    },
    [conversation],
  );

  const handleHelpfulClick = useCallback(() => handleClick(true), []);

  const handleNotHelpfulClick = useCallback(() => handleClick(false), []);

  return (
    <>
      <div className={styles.responseRatingPrompt}>
        {feedbackSubmitted ? 'Thank you for your feedback!' : 'Was this reponse helpful?'}
      </div>

      <div className={styles.responseRatingButtonContainer}>
        <button
          type="button"
          disabled={feedbackSubmitted}
          onClick={handleHelpfulClick}
          className={`${styles.helpfulButton} ${feedbackSubmitted && styles.disabledButton}`}
        >
          {helpful !== true && <Icon name="thumbs-up" width="16" height="16" />}
          {helpful === true && <Icon name="thumbs-up-filled" width="16" height="16" />}
        </button>

        <button
          type="button"
          disabled={feedbackSubmitted}
          onClick={handleNotHelpfulClick}
          className={`${styles.notHelpfulButton} ${feedbackSubmitted && styles.disabledButton}`}
        >
          {helpful !== false && <Icon name="thumbs-down" width="16" height="16" />}
          {helpful === false && <Icon name="thumbs-down-filled" width="16" height="16" />}
        </button>
      </div>
    </>
  );
}
