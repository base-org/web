import React, { useState, useCallback, useEffect, useRef } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import Modal from '../Modal';
import ChatMessage from './ChatMessage';
import Icon from '../Icon';

import styles from './styles.module.css';

// --- Get Conversation ID --- //
async function getConversationId() {
  let id: string | null = sessionStorage.getItem('BASE_AI_CONVERSATION_ID');

  if (!id) {
    const response = await fetch('https://api.mendable.ai/v0/newConversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: '0ab8984e-327c-4a8b-bea3-769ca01fac35',
      }),
    });

    const data: { conversation_id: string } = (await response.json()) as {
      conversation_id: string;
    };

    sessionStorage.setItem('BASE_AI_CONVERSATION_ID', data.conversation_id);
    id = data.conversation_id;
  }

  return id;
}

// --- Submit Prompt and Stream Response --- //
type ResponseSource = {
  content: string;
  data_id: string;
  date_added: string;
  id: number;
  link: string;
  manual_add: boolean;
  relevance_score: number;
  text: number;
};

let controller: AbortController;

async function streamPromptResponse(
  conversationId: string,
  prompt: string,
  setIsLoading: (isLoading: boolean) => void,
  isGenerating: boolean,
  setIsGenerating: (isGenerating: boolean) => void,
  chatHistory: ChatHistoryMessage[],
  setChatHistory: (chatHistory: ChatHistoryMessage[]) => void,
  setConversation: (conversation: ConversationMessage[]) => void,
  conversationContainerRef: React.RefObject<HTMLDivElement>,
) {
  try {
    controller = new AbortController();

    const url = 'https://api.mendable.ai/v0/mendableChat';

    const data = {
      api_key: '0ab8984e-327c-4a8b-bea3-769ca01fac35',
      question: prompt,
      history: chatHistory,
      conversation_id: conversationId,
      retriever_options: {
        num_chunks: 4,
      },
    };

    let responseSources: ResponseSource[];
    let responseMessageId: unknown;
    let fullResponse = '';

    await fetchEventSource(url, {
      method: 'POST',
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
      },
      openWhenHidden: true,
      body: JSON.stringify(data),
      signal: controller.signal,
      onmessage(event: unknown) {
        const parsedData = JSON.parse(event.data);
        const chunk: string = parsedData.chunk;
        if (chunk === '<|source|>') {
          responseSources = parsedData.metadata as ResponseSource[];
          return;
        } else if (chunk === '<|message_id|>') {
          responseMessageId = parsedData.metadata;
          return;
        }

        // End loading spinner and show Stop Generating button
        if (!isGenerating) {
          setIsLoading(false);
          setIsGenerating(true);
        }

        // Update full response string
        fullResponse = fullResponse.concat(chunk);

        // Update rendered conversation data for current response
        setConversation((prevState: ConversationMessage[]) => {
          const currentResponse = prevState.slice(-1)[0];
          const updatedResponse = {
            type: 'response',
            content: currentResponse.content.concat(chunk),
          };

          const newState = [...prevState.slice(0, -1), updatedResponse];
          return newState;
        });

        // Scroll to bottom of conversation container while generating
        conversationContainerRef.current?.scrollBy(
          0,
          conversationContainerRef.current.scrollHeight,
        );

        return;
      },
      onclose() {
        // Add sources to current response object
        const sourceURLs: string[] = responseSources.map((source) => source.link);

        setConversation((prevState: ConversationMessage[]) => {
          const currentResponse = prevState.slice(-1)[0];
          const updatedResponse = {
            ...currentResponse,
            sources: sourceURLs,
          };

          const newState = [...prevState.slice(0, -1), updatedResponse];
          return newState;
        });

        // Update chat history for Mendable API
        setChatHistory((prevState: ChatHistoryMessage[]) => {
          const currentResponse = prevState.slice(-1)[0];
          const updatedResponse = {
            ...currentResponse,
            response: fullResponse,
          };

          const newState = [...prevState.slice(0, -1), updatedResponse];
          return newState;
        });

        setIsGenerating(false);
        return;
      },
      onerror(err: unknown) {
        console.error(err);
        return;
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export type ConversationMessage = {
  type: 'prompt' | 'response';
  content: string;
  sources?: string[];
};

type ChatHistoryMessage = {
  prompt: string;
  response: string;
};

type ChatModalProps = {
  visible: boolean;
  onRequestClose: () => void;
};

export default function ChatModal({ visible, onRequestClose }: ChatModalProps) {
  const [conversationId, setConversationId] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryMessage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const conversationContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value),
    [prompt],
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (!prompt) return;

      setChatHistory((prevState: ChatHistoryMessage[]) => {
        const newState = [...prevState];
        newState.push({ prompt, response: '' });
        return newState;
      });

      setConversation((prevState: ConversationMessage[]) => {
        const newState = [...prevState];
        newState.push({ type: 'prompt', content: prompt });
        newState.push({ type: 'response', content: '' });
        return newState;
      });

      setIsLoading(true);

      streamPromptResponse(
        conversationId,
        prompt,
        setIsLoading,
        isGenerating,
        setIsGenerating,
        chatHistory,
        setChatHistory,
        setConversation,
        conversationContainerRef,
      ).catch((err) => console.error(err));

      setPrompt('');
    },
    [conversationId, prompt, isLoading, isGenerating, chatHistory, conversation],
  );

  const handleReset = useCallback(() => {
    setPrompt('');
    setChatHistory([]);
    setConversation([]);
    setIsLoading(false);
    setIsGenerating(false);

    if (controller) {
      controller.abort();
    }
  }, [controller]);

  const handleStopGenerating = useCallback(() => {
    setIsGenerating(false);

    if (controller) {
      controller.abort();
    }
  }, [controller]);

  useEffect(() => {
    getConversationId()
      .then((id) => {
        setConversationId(id);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <div className={styles.chatModalBody}>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          <Icon name="undo" height={12} width={12} />
          Reset
        </button>

        <div ref={conversationContainerRef} className={styles.conversationContainer}>
          <ChatMessage type="response" content="Hi, how can I help you?" />

          {conversation.map((message) => (
            <React.Fragment key={crypto.randomUUID()}>
              <div className={styles.chatMessageDivider} />
              <ChatMessage
                type={message.type}
                content={message.content}
                sources={message.sources}
              />
            </React.Fragment>
          ))}

          {isLoading && (
            <div className={styles.searchingDocsMessage}>
              <span className={styles.loadingSpinner}>
                <Icon name="loading-spinner" width={20} height={20} />
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
              <Icon name="stop" height={10} width={10} />
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
                <Icon name="loading-spinner" height={24} width={24} />
              </span>
            ) : (
              <button type="button" onClick={handleSubmit} className={styles.submitPromptButton}>
                <Icon name="paper-airplane" />
              </button>
            )}
          </div>
        </form>

        <div className={styles.disclaimerText}>
          This tool uses AI to generate results. Please verify the output with the provided sources.
          Do not enter any sensitive information.
        </div>
      </div>

      {/* <button
        onClick={() => {
          console.log(prompt);
          console.log(chatHistory);
          console.log(conversation);
          console.log(isGenerating);
        }}
      >
        Print states
      </button> */}
    </Modal>
  );
}
