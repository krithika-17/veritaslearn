'use server';

/**
 * @fileOverview Generates educational tips on how to identify similar misleading claims in the future.
 *
 * - provideEducationalTips - A function that generates educational tips.
 * - ProvideEducationalTipsInput - The input type for the provideEducationalTips function.
 * - ProvideEducationalTipsOutput - The return type for the provideEducationalTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideEducationalTipsInputSchema = z.object({
  claim: z.string().describe('The claim that was analyzed.'),
  analysisResult: z.string().describe('The result of the claim analysis.'),
});
export type ProvideEducationalTipsInput = z.infer<typeof ProvideEducationalTipsInputSchema>;

const ProvideEducationalTipsOutputSchema = z.object({
  educationalTips: z.string().describe('Educational tips on how to identify similar misleading claims in the future.'),
});
export type ProvideEducationalTipsOutput = z.infer<typeof ProvideEducationalTipsOutputSchema>;

export async function provideEducationalTips(input: ProvideEducationalTipsInput): Promise<ProvideEducationalTipsOutput> {
  return provideEducationalTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideEducationalTipsPrompt',
  input: {schema: ProvideEducationalTipsInputSchema},
  output: {schema: ProvideEducationalTipsOutputSchema},
  prompt: `You are an AI assistant designed to provide educational tips on how to identify misleading claims.

  Based on the analyzed claim and its analysis result, provide a few concise and actionable tips that the user can use to identify similar misleading claims in the future.

  Claim: {{{claim}}}
  Analysis Result: {{{analysisResult}}}

  Educational Tips:`,
});

const provideEducationalTipsFlow = ai.defineFlow(
  {
    name: 'provideEducationalTipsFlow',
    inputSchema: ProvideEducationalTipsInputSchema,
    outputSchema: ProvideEducationalTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
