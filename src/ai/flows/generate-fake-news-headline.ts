'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating realistic-sounding fake news headlines.
 *
 * - generateFakeNewsHeadline - A function that generates a fake news headline.
 * - GenerateFakeNewsHeadlineInput - The input type for the generateFakeNewsHeadline function.
 * - GenerateFakeNewsHeadlineOutput - The return type for the generateFakeNewsHeadline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFakeNewsHeadlineInputSchema = z.object({
  topic: z.string().describe('The topic of the fake news headline.'),
  bias: z
    .string()
    .describe(
      'The bias or slant the fake news headline should have (e.g., political, social, economic).'    ),
  style: z
    .string()
    .describe(
      'The style or tone of the fake news headline (e.g., sensational, humorous, alarming).'
    ),
});
export type GenerateFakeNewsHeadlineInput = z.infer<
  typeof GenerateFakeNewsHeadlineInputSchema
>;

const GenerateFakeNewsHeadlineOutputSchema = z.object({
  headline: z.string().describe('The generated fake news headline.'),
});
export type GenerateFakeNewsHeadlineOutput = z.infer<
  typeof GenerateFakeNewsHeadlineOutputSchema
>;

export async function generateFakeNewsHeadline(
  input: GenerateFakeNewsHeadlineInput
): Promise<GenerateFakeNewsHeadlineOutput> {
  return generateFakeNewsHeadlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFakeNewsHeadlinePrompt',
  input: {schema: GenerateFakeNewsHeadlineInputSchema},
  output: {schema: GenerateFakeNewsHeadlineOutputSchema},
  prompt: `You are an AI trained to generate realistic-sounding fake news headlines.

  Topic: {{{topic}}}
  Bias/Slant: {{{bias}}}
  Style/Tone: {{{style}}}

  Generate a single fake news headline that incorporates the specified topic, bias, and style. Make it believable but ultimately misleading.
  Headline:`,
});

const generateFakeNewsHeadlineFlow = ai.defineFlow(
  {
    name: 'generateFakeNewsHeadlineFlow',
    inputSchema: GenerateFakeNewsHeadlineInputSchema,
    outputSchema: GenerateFakeNewsHeadlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
