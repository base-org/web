import { queryCbGpt } from 'apps/web/src/cdp/api/cb-gpt';
import { NextApiRequest, NextApiResponse } from 'next';

export type NameSuggestionResponseData = {
  suggestion: string[];
};

type ErrorResponseData = {
  error: string;
};

type ApiResponse = NameSuggestionResponseData | ErrorResponseData;

const NAME_COUNT = 3;
const SYSTEM_PROMPT = `You are an AI assistant tasked with providing alternative username recommendations 
for the Ethereum Name Service (ENS). Users come to you when their desired ENS name is unavailable, 
and you need to suggest alternative names that are both desirable and likely to be available.
You will be given one input. This is the name that the user originally wanted but is unavailable.
Follow these guidelines when generating alternative names:
1. Create names that are similar in style or 
meaning to the unavailable name.
2. Suggestions should be very unlikely to already be taken.
3. You may use emoji in your suggestions.
4. Do not include any suffixes (i.e., .ens) in your suggestions.
5. Keep the names short and memorable.
6. Be creative and think of unique variations that the user might find appealing.
Your output should be a JSON array containing exactly ${NAME_COUNT} alternative name suggestions. Do not 
include any explanation or additional text outside of the JSON array.
Remember, the goal is to provide alternatives that users will find desirable and that are likely to be available on ENS. 
Focus on quality and creativity in your suggestions.`;
const chatLlm = 'claude-3-5-sonnet@20240620';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { alreadyClaimedName } = req.query;
  if (typeof alreadyClaimedName !== 'string') {
    res.status(400).json({ error: 'name must be a string' });
    return;
  }
  if (alreadyClaimedName.length > 50) {
    res.status(400).json({ error: 'name too long to fetch recommendations' });
    return;
  }
  try {
    const suggestion = await queryCbGpt({
      taskConfig: {
        actionLlm: {
          chatLlm: chatLlm,
        },
        action_prompt_template: {
          init_llm_chain: SYSTEM_PROMPT,
        },
      },
      query: alreadyClaimedName,
    });
    res.status(200).json({ suggestion: JSON.parse(suggestion.response) as string[] });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      res.status(500).json({ error: `failed to generate suggestions ${e.message}` });
    }
  }
}
