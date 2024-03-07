import React, { useState, useCallback, useEffect, useRef } from 'react';
import Modal from '../Modal';
import ChatMessage from './ChatMessage';
import Icon from '../Icon';

import styles from './styles.module.css';

import {
  ConversationMessage,
  ChatHistoryMessage,
  getConversationId,
  setSessionConversation,
  getSessionConversation,
  streamPromptResponse,
  controller,
} from './docChat';

type ChatModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatModal({ visible, setVisible }: ChatModalProps) {
  const [conversationId, setConversationId] = useState(0);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryMessage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const conversationContainerRef = useRef<HTMLDivElement>(null);
  const currentMessage: ConversationMessage = conversation[conversation.length - 1];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value),
    [prompt],
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (!conversationId || !prompt || isLoading || isGenerating) return;

      setIsLoading(true);
      setIsAutoScrolling(true);

      setChatHistory((prevState: ChatHistoryMessage[]) => [...prevState, { prompt, response: '' }]);

      setConversation((prevState: ConversationMessage[]) => [
        ...prevState,
        { type: 'prompt', content: prompt },
        { type: 'response', content: '' },
      ]);

      streamPromptResponse(
        conversationId,
        prompt,
        setIsLoading,
        isGenerating,
        setIsGenerating,
        chatHistory,
        setChatHistory,
        setConversation,
      ).catch((err) => console.error(err));

      setPrompt('');
    },
    [conversationId, prompt, isLoading, isGenerating, chatHistory, conversation],
  );

  const handleReset = useCallback(() => {
    setPrompt('');
    setChatHistory([]);
    setConversation([]);
    setSessionConversation([]);
    setIsLoading(false);
    setIsGenerating(false);
    setIsAutoScrolling(true);
    if (controller) controller.abort();
  }, [controller]);

  const handleModalClose = useCallback(() => {
    setVisible(false);

    // perform soft reset when modal is closed
    setPrompt('');
    setIsLoading(false);
    setIsGenerating(false);
    setIsAutoScrolling(true);
    if (controller) controller.abort();
  }, [controller]);

  const handleStopGenerating = useCallback(() => {
    setIsGenerating(false);
    if (controller) controller.abort();
  }, [controller]);

  const handleConversationScroll = useCallback(() => {
    // When user scrolls conversation, stop programmatically scrolling to bottom
    if (isAutoScrolling) setIsAutoScrolling(false);
  }, [isAutoScrolling]);

  useEffect(() => {
    // Only get conversation ID if modal is opened
    if (visible) {
      getConversationId()
        .then((id) => {
          setConversationId(id);
          setConversation(getSessionConversation());
        })
        .catch((err) => console.error(err));
    }
  }, [visible]);

  useEffect(() => {
    if (isAutoScrolling) {
      conversationContainerRef.current?.scrollBy(0, conversationContainerRef.current.scrollHeight);
    }
    // Scroll to bottom of conversation container when:
    // - Message is added to conversation
    // - Response content is generated
    // - Response sources are added
  }, [conversation.length, currentMessage?.content, currentMessage?.sources]);

  return (
    <Modal visible={visible} onRequestClose={handleModalClose}>
      <div className={styles.chatModalBody}>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          <Icon name="undo" height="12" width="12" />
          Reset
        </button>

        <div
          ref={conversationContainerRef}
          className={styles.conversationContainer}
          onWheel={handleConversationScroll}
        >
          <ChatMessage type="response" content="Hi, how can I help you?" />

          {conversation.map((message, i) => (
            <React.Fragment key={crypto.randomUUID()}>
              <div className={styles.chatMessageDivider} />
              <ChatMessage
                index={i}
                type={message.type}
                content={message.content}
                sources={message.sources}
                messageId={message.messageId}
                conversationId={conversationId}
                conversation={conversation}
                setConversation={setConversation}
              />
            </React.Fragment>
          ))}

          {isLoading && (
            <div className={styles.searchingDocsMessage}>
              <span className={styles.loadingSpinner}>
                <Icon name="loading-spinner" width="20" height="20" />
              </span>
              Searching...
            </div>
          )}

          {isGenerating && (
            <button
              type="button"
              className={styles.stopGeneratingButton}
              onClick={handleStopGenerating}
            >
              <Icon name="stop" height="10" width="10" />
              Stop Generating
            </button>
          )}
        </div>
      </div>

      <div className={styles.chatModalFooter}>
        <form className={styles.promptForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="prompt"
            value={prompt}
            onChange={handleInputChange}
            className={styles.promptInput}
            placeholder="Message Base AI..."
          />

          <div className={styles.promptInputIcon}>
            {isLoading || isGenerating ? (
              <span className={styles.loadingSpinner}>
                <Icon name="loading-spinner" height="24" width="24" />
              </span>
            ) : (
              <button type="button" onClick={handleSubmit} className={styles.submitPromptButton}>
                <Icon name="paper-airplane" />
              </button>
            )}
          </div>
        </form>

        <div className={styles.disclaimerText}>
          This tool uses AI to generate results. Please do not enter any sensitive information.
        </div>
      </div>
    </Modal>
  );
}
