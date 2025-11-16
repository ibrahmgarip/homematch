// Roommate Matching Genkit Flow

'use server';

/**
 * @fileOverview Matches students with potential roommates based on habits, preferences, and interests.
 *
 * - findRoommateMatches - A function that handles the roommate matching process.
 * - RoommateMatchingInput - The input type for the findRoommateMatches function.
 * - RoommateMatchingOutput - The return type for the findRoommateMatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoommateProfileSchema = z.object({
  userId: z.string().describe('The user ID of the student.'),
  age: z.number().describe('The age of the student'),
  occupation: z.string().describe('The occupation of the student.'),
  budgetMin: z.number().describe('The minimum budget the student is comfortable with.'),
  budgetMax: z.number().describe('The maximum budget the student is comfortable with.'),
  arrivalDate: z.string().describe('The arrival date of the student (YYYY-MM-DD).'),
  departureDate: z.string().describe('The departure date of the student (YYYY-MM-DD).'),
  cleanlinessPreference: z.enum(['very clean', 'clean', 'neutral', 'messy', 'very messy']).describe('The cleanliness preference of the student.'),
  noisePreference: z.enum(['very quiet', 'quiet', 'neutral', 'loud', 'very loud']).describe('The noise preference of the student.'),
  petsPreference: z.boolean().describe('Whether the student is comfortable living with pets.'),
  smokingPreference: z.boolean().describe('Whether the student is comfortable living with smokers.'),
  visitorPreference: z.enum(['frequent', 'occasional', 'rare', 'never']).describe('How often the student has visitors.'),
  sleepingHabits: z.enum(['early bird', 'night owl', 'flexible']).describe('The sleeping habits of the student.'),
  interests: z.array(z.string()).describe('A list of the student\'s interests.'),
  matchVisibility: z.boolean().describe('Whether the profile is visible for matching.'),
});

export type RoommateProfile = z.infer<typeof RoommateProfileSchema>;

const RoommateMatchingInputSchema = z.object({
  userProfile: RoommateProfileSchema.describe('The user profile of the student looking for a roommate.'),
  otherProfiles: z.array(RoommateProfileSchema).describe('A list of other student profiles to match against.'),
});

export type RoommateMatchingInput = z.infer<typeof RoommateMatchingInputSchema>;

const MatchResultSchema = z.object({
  userId: z.string().describe('The user ID of the matched student.'),
  compatibilityScore: z.number().describe('A score indicating the compatibility between the two students.'),
  explanation: z.string().describe('An explanation of why the two students are a good match.'),
});

const RoommateMatchingOutputSchema = z.array(MatchResultSchema);

export type RoommateMatchingOutput = z.infer<typeof RoommateMatchingOutputSchema>;

export async function findRoommateMatches(input: RoommateMatchingInput): Promise<RoommateMatchingOutput> {
  return roommateMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'roommateMatchingPrompt',
  input: {schema: RoommateMatchingInputSchema},
  output: {schema: RoommateMatchingOutputSchema},
  prompt: `You are an AI assistant designed to match students with potential roommates.

Given a user profile and a list of other student profiles, determine the compatibility between the user and each of the other students.

Consider the following factors when determining compatibility:

- Budget: Students with similar budget ranges are more compatible.
- Arrival and Departure Dates: Students with overlapping stay dates are more compatible.
- Cleanliness Preference: Students with similar cleanliness preferences are more compatible.
- Noise Preference: Students with similar noise preferences are more compatible.
- Pets Preference: Students with the same pet preferences are more compatible.
- Smoking Preference: Students with the same smoking preferences are more compatible.
- Visitor Preference: Students with similar visitor preferences are more compatible.
- Sleeping Habits: Students with similar sleeping habits are more compatible.
- Interests: Students with shared interests are more compatible.

For each potential roommate, calculate a compatibility score between 0 and 100.
Also create an explanation that describes why each student would be a good roommate, focusing on the factors listed above.

User Profile:
{{{json userProfile}}}

Other Profiles:
{{#each otherProfiles}}
{{{json this}}}
{{/each}}`,
});

const roommateMatchingFlow = ai.defineFlow(
  {
    name: 'roommateMatchingFlow',
    inputSchema: RoommateMatchingInputSchema,
    outputSchema: RoommateMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
