/**
 * @fileOverview Enhances property descriptions using AI to attract more student renters.
 *
 * - enhancePropertyDescription - A function that enhances a property description.
 * - EnhancePropertyDescriptionInput - The input type for the enhancePropertyDescription function.
 * - EnhancePropertyDescriptionOutput - The return type for the enhancePropertyDescription function.
 */

// Note: Server Actions removed for static export compatibility
// Using zod directly instead of genkit's z to avoid server-side dependencies
import {z} from 'zod';

// Mock AI import for static builds
// Note: Genkit AI features require server-side execution
let ai: any = null;

const EnhancePropertyDescriptionInputSchema = z.object({
  description: z.string().describe('The original property description.'),
  propertyType: z.string().describe('The type of property (e.g., apartment, house, studio).'),
  targetStudentProfile: z.string().describe('Description of the target student profile (e.g., Erasmus student, Masters student).'),
  desiredTone: z.string().describe('The desired tone of the enhanced description (e.g., friendly, professional, exciting).'),
});
export type EnhancePropertyDescriptionInput = z.infer<typeof EnhancePropertyDescriptionInputSchema>;

const EnhancePropertyDescriptionOutputSchema = z.object({
  enhancedDescription: z.string().describe('The enhanced property description.'),
});
export type EnhancePropertyDescriptionOutput = z.infer<typeof EnhancePropertyDescriptionOutputSchema>;

export async function enhancePropertyDescription(input: EnhancePropertyDescriptionInput): Promise<EnhancePropertyDescriptionOutput> {
  if (!ai) {
    // Fallback for static builds
    return {
      enhancedDescription: input.description + ' (Enhanced description - AI features require backend API)'
    };
  }
  return enhancePropertyDescriptionFlow(input);
}

// AI prompt and flow definitions (only used when AI is available)
let prompt: any = null;
let enhancePropertyDescriptionFlow: any = null;

if (ai?.definePrompt && ai?.defineFlow) {
  prompt = ai.definePrompt({
    name: 'enhancePropertyDescriptionPrompt',
    input: {schema: EnhancePropertyDescriptionInputSchema},
    output: {schema: EnhancePropertyDescriptionOutputSchema},
    prompt: `You are a real estate marketing expert specializing in student rentals. Enhance the following property description to make it more appealing to the specified target student profile, using the desired tone.  Maintain the original length and structure.

Original Description: {{{description}}}
Property Type: {{{propertyType}}}
Target Student Profile: {{{targetStudentProfile}}}
Desired Tone: {{{desiredTone}}}

Enhanced Description:`,    
  });

  enhancePropertyDescriptionFlow = ai.defineFlow(
    {
      name: 'enhancePropertyDescriptionFlow',
      inputSchema: EnhancePropertyDescriptionInputSchema,
      outputSchema: EnhancePropertyDescriptionOutputSchema,
    },
    async (input: EnhancePropertyDescriptionInput) => {
      const {output} = await prompt(input);
      return output!;
    }
  );
}
