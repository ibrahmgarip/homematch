'use server';
/**
 * @fileOverview A multilingual chat translation AI agent.
 *
 * - translateChatMessage - A function that translates chat messages between different languages.
 * - TranslateChatMessageInput - The input type for the translateChatMessage function.
 * - TranslateChatMessageOutput - The return type for the translateChatMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return translateChatMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateChatMessagePrompt',
  input: {schema: TranslateChatMessageInputSchema},
  output: {schema: TranslateChatMessageOutputSchema},
  prompt: `You are a multilingual translator specializing in chat messages.

Translate the following chat message from {{sourceLanguage}} to {{targetLanguage}}:

{{text}}`,
});

const translateChatMessageFlow = ai.defineFlow(
  {
    name: 'translateChatMessageFlow',
    inputSchema: TranslateChatMessageInputSchema,
    outputSchema: TranslateChatMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
