'use server';
/**
 * @fileOverview Explains why a news headline is fake, identifying manipulated images, misleading statistics, or biased wording.
 *
 * - explainWhyHeadlineIsFake - A function that takes a news headline and a user's guess (fake or real) as input and returns an explanation of why the headline is fake, if applicable.
 * - ExplainWhyHeadlineIsFakeInput - The input type for the explainWhyHeadlineIsFake function.
 * - ExplainWhyHeadlineIsFakeOutput - The return type for the explainWhyHeadlineIsFake function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainWhyHeadlineIsFakeInputSchema = z.object({
  headline: z.string().describe('The news headline to analyze.'),
  userGuess: z.enum(['fake', 'real']).describe('The user\'s guess about whether the headline is fake or real.'),
});
export type ExplainWhyHeadlineIsFakeInput = z.infer<typeof ExplainWhyHeadlineIsFakeInputSchema>;

const ExplainWhyHeadlineIsFakeOutputSchema = z.object({
  explanation: z.string().describe('The AI explanation of why the headline is fake, including details about manipulated images, misleading statistics, or biased wording, if applicable. If the headline is real, this should explain why.'),
});
export type ExplainWhyHeadlineIsFakeOutput = z.infer<typeof ExplainWhyHeadlineIsFakeOutputSchema>;

export async function explainWhyHeadlineIsFake(input: ExplainWhyHeadlineIsFakeInput): Promise<ExplainWhyHeadlineIsFakeOutput> {
  return explainWhyHeadlineIsFakeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainWhyHeadlineIsFakePrompt',
  input: {schema: ExplainWhyHeadlineIsFakeInputSchema},
  output: {schema: ExplainWhyHeadlineIsFakeOutputSchema},
  prompt: `You are an AI assistant that explains why a news headline is fake or real.

  Headline: {{{headline}}}
  User Guess: {{{userGuess}}}

  Analyze the headline and provide a clear explanation of why it is fake, including identifying manipulated images, misleading statistics, or biased wording. If the headline is real, explain why it is likely real with supporting reasoning.
  `,
});

const explainWhyHeadlineIsFakeFlow = ai.defineFlow(
  {
    name: 'explainWhyHeadlineIsFakeFlow',
    inputSchema: ExplainWhyHeadlineIsFakeInputSchema,
    outputSchema: ExplainWhyHeadlineIsFakeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
