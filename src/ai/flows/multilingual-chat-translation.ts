/**
 * @fileOverview A multilingual chat translation AI agent.
 *
 * - translateChatMessage - A function that translates chat messages between different languages.
 * - TranslateChatMessageInput - The input type for the translateChatMessage function.
 * - TranslateChatMessageOutput - The return type for the translateChatMessage function.
 */

// Note: Server Actions removed for static export compatibility
// Using zod directly instead of genkit's z to avoid server-side dependencies
import {z} from 'zod';

// Mock AI import for static builds
// Note: Genkit AI features require server-side execution
let ai: any = null;

const TranslateChatMessageInputSchema = z.object({
  text: z.string().describe('The chat message to translate.'),
  sourceLanguage: z.string().describe('The language of the chat message.'),
  targetLanguage: z.string().describe('The language to translate the chat message to.'),
});
export type TranslateChatMessageInput = z.infer<typeof TranslateChatMessageInputSchema>;

const TranslateChatMessageOutputSchema = z.object({
  translatedText: z.string().describe('The translated chat message.'),
});
export type TranslateChatMessageOutput = z.infer<typeof TranslateChatMessageOutputSchema>;

export async function translateChatMessage(input: TranslateChatMessageInput): Promise<TranslateChatMessageOutput> {
  if (!ai) {
    // Fallback for static builds
    return {
      translatedText: `[Translation: ${input.text}] (AI translation requires backend API)`
    };
  }
  return translateChatMessageFlow(input);
}

// AI prompt and flow definitions (only used when AI is available)
let prompt: any = null;
let translateChatMessageFlow: any = null;

if (ai?.definePrompt && ai?.defineFlow) {
  prompt = ai.definePrompt({
    name: 'translateChatMessagePrompt',
    input: {schema: TranslateChatMessageInputSchema},
    output: {schema: TranslateChatMessageOutputSchema},
    prompt: `You are a multilingual translator specializing in chat messages.

Translate the following chat message from {{sourceLanguage}} to {{targetLanguage}}:

{{text}}`,
  });

  translateChatMessageFlow = ai.defineFlow(
    {
      name: 'translateChatMessageFlow',
      inputSchema: TranslateChatMessageInputSchema,
      outputSchema: TranslateChatMessageOutputSchema,
    },
    async (input: TranslateChatMessageInput) => {
      const {output} = await prompt(input);
      return output!;
    }
  );
}
