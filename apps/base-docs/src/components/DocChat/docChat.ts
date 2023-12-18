import { fetchEventSource } from '@microsoft/fetch-event-source';

// Get Conversation ID
export async function getConversationId() {
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

// POST Prompt and Stream Response
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

export type ConversationMessage = {
  type: 'prompt' | 'response';
  content: string;
  sources?: string[];
};

export type ChatHistoryMessage = {
  prompt: string;
  response: string;
};

export let controller: AbortController;

export async function streamPromptResponse(
  conversationId: string,
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

          const newState = [...prevState.slice(0, -1), updatedResponse];
          return newState;
        });

        return;
      },
      onclose() {
        // Add sources to current response data
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

        // Update chat history for Mendable API requests
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
