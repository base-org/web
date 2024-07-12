import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';

export type NameSuggestionResponseData = {
  suggestion: string[];
};

type ErrorResponseData = {
  error: string;
};

type ApiResponse = NameSuggestionResponseData | ErrorResponseData;

const apiKey = process.env.ANTHROPIC_API_KEY ?? '';
const anthropic = new Anthropic({
  apiKey,
});

const NAME_COUNT = 3;
const SYSTEM_PROMPT = `You are an AI assistant tasked with providing alternative username recommendations for the Ethereum Name Service (ENS). Users come to you when their desired ENS name is unavailable, and you need to suggest alternative names that are both desirable and likely to be available.\n\nYou will be given one input. This is the name that the user originally wanted but is unavailable.\n\nFollow these guidelines when generating alternative names:\n1. Create names that are similar in style or meaning to the unavailable name.\n2. Suggestions should be very unlikely to already be taken.\n3. You may use emoji in your suggestions.\n4. Do not include any suffixes (i.e., .ens) in your suggestions.\n5. Keep the names short and memorable.\n6. Be creative and think of unique variations that the user might find appealing.\n\nYour output should be a JSON array containing exactly ${NAME_COUNT} alternative name suggestions. Do not include any explanation or additional text outside of the JSON array.\n\nHere's an example of how your output should look:\n\n[\"crypto🚀\", \"ethDreamer\", \"blockchainWizard\", \"nftCollector\", \"defiMaster\"]\n\nRemember, the goal is to provide alternatives that users will find desirable and that are likely to be available on ENS. Focus on quality and creativity in your suggestions.`;

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
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: [{ type: 'text', text: alreadyClaimedName }] },
        { role: 'assistant', content: '[' },
      ],
    });
    const content = message.content[0];
    if (content?.type !== 'text') {
      throw new Error('Anthropic suggestion did not include the expected content.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(200).json({ suggestion: JSON.parse(`[${content.text}`) });
  } catch (e) {
    res.status(500).json({ error: 'failed to generate suggestions' });
  }
}
