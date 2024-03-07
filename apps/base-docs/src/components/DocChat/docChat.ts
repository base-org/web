import { fetchEventSource } from '@microsoft/fetch-event-source';

// Log Base GPT CCA event
type GptEvent =
  | 'gpt_conversation_created'
  | 'gpt_prompt_submitted'
  | 'gpt_source_clicked'
  | 'gpt_feedback';

type GptConversationCreatedAttributes = {
  conversation_id: number;
};

type GptPromptSubmittedAttributes = {
  conversation_id: number;
  prompt: string;
};

type GptSourceClickedAttributes = {
  conversation_id: number;
  message_id: number;
  source_url: string;
};

type GptFeedbackAttributes = {
  conversation_id: number;
  message_id: number;
  response_helpful: boolean;
};

type GptEventAttributes =
  | GptConversationCreatedAttributes
  | GptPromptSubmittedAttributes
  | GptSourceClickedAttributes
  | GptFeedbackAttributes;

export const logGptEvent = (type: GptEvent, attributes: GptEventAttributes) => {
  if (window.ClientAnalytics) {
    const { logEvent, ActionType, ComponentType } = window.ClientAnalytics;

    let path: string = window.location.pathname;

    // Remove trailing slash
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    const updatedAttributes = {
      ...attributes,
      page_path: path,
      action: ActionType.click,
      component_type: ComponentType.button,
    };

    logEvent(type, updatedAttributes);
  }
};

// Get Conversation ID
export async function getConversationId(): Promise<number> {
  let id: string = sessionStorage.getItem('BASE_AI_CONVERSATION_ID') ?? '';

  if (!id) {
    const response = await fetch('https://api.mendable.ai/v1/newConversation', {
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

    if (data.conversation_id) {
      id = data.conversation_id;
      sessionStorage.setItem('BASE_AI_CONVERSATION_ID', id);

      logGptEvent('gpt_conversation_created', {
        conversation_id: parseInt(id),
      });
    }
  }

  return parseInt(id);
}

// Set and Get Session Storage Conversation
export function setSessionConversation(conversation: ConversationMessage[]) {
  const conversationString = JSON.stringify(conversation);
  sessionStorage.setItem('BASE_AI_CONVERSATION', conversationString);
}

export function getSessionConversation(): ConversationMessage[] {
  const conversationString: string = sessionStorage.getItem('BASE_AI_CONVERSATION') ?? '[]';

  const conversation: ConversationMessage[] = JSON.parse(
    conversationString,
  ) as ConversationMessage[];

  return conversation;
}

// POST Prompt and Stream Response
export type ChatHistoryMessage = {
  prompt: string;
  response: string;
};

export type ConversationMessage = {
  type: 'prompt' | 'response';
  content: string;
  sources?: string[];
  helpful?: boolean | null;
  messageId?: number;
};

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

export let controller: AbortController;

export async function streamPromptResponse(
  conversationId: number,
  prompt: string,
  setIsLoading: (isLoading: boolean) => void,
  isGenerating: boolean,
  setIsGenerating: (isGenerating: boolean) => void,
  chatHistory: ChatHistoryMessage[],
  setChatHistory: (chatHistory: (prevState: ChatHistoryMessage[]) => ChatHistoryMessage[]) => void,
  setConversation: (
    conversation: (prevState: ConversationMessage[]) => ConversationMessage[],
  ) => void,
) {
  try {
    let fullResponse = '';
    let responseSources: ResponseSource[];
    let messageId: number;

    controller = new AbortController();

    logGptEvent('gpt_prompt_submitted', {
      conversation_id: conversationId,
      prompt,
    });

    const url = 'https://api.mendable.ai/v1/mendableChat';

    const data = {
      api_key: '0ab8984e-327c-4a8b-bea3-769ca01fac35',
      question: prompt,
      history: chatHistory,
      conversation_id: conversationId,
      retriever_options: {
        num_chunks: 4,
      },
    };

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
          messageId = parsedData.metadata as number;
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
            ...currentResponse,
            content: currentResponse.content.concat(chunk),
          };

          return [...prevState.slice(0, -1), updatedResponse];
        });

        return;
      },
      onclose() {
        // Add Mendable message ID and sources to current response data
        const sourceURLs: string[] = responseSources.map((source) => source.link);

        setConversation((prevState: ConversationMessage[]) => {
          const currentResponse = prevState.slice(-1)[0];
          const updatedResponse = {
            ...currentResponse,
            sources: sourceURLs,
            helpful: null,
            messageId,
          };

          const newState = [...prevState.slice(0, -1), updatedResponse];
          setSessionConversation(newState);

          return newState;
        });

        // Update chat history for Mendable API requests
        setChatHistory((prevState: ChatHistoryMessage[]) => {
          const currentResponse = prevState.slice(-1)[0];
          const updatedResponse = {
            ...currentResponse,
            response: fullResponse,
          };

          return [...prevState.slice(0, -1), updatedResponse];
        });

        // Hide Stop Generating button
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
