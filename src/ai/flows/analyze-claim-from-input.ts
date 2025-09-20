'use server';
/**
 * @fileOverview Flow for analyzing a claim from various input types (link, text, image).
 *
 * - analyzeClaimFromInput - Analyzes the claim and assesses its validity.
 * - AnalyzeClaimFromInputInput - The input type for the analyzeClaimFromInput function.
 * - AnalyzeClaimFromInputOutput - The return type for the analyzeClaimFromInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeClaimFromInputInputSchema = z.object({
  input: z.string().describe('The input text, link, or data URI of the image.'),
  inputType: z
    .enum(['text', 'link', 'image'])
    .describe('The type of the input: text, link, or image.'),
});
export type AnalyzeClaimFromInputInput = z.infer<
  typeof AnalyzeClaimFromInputInputSchema
>;

const AnalyzeClaimFromInputOutputSchema = z.object({
  analysis: z.string().describe('The analysis of the claim.'),
  isLikelyValid: z.boolean().describe('Whether the claim is likely valid.'),
  reasoning: z.string().describe('The reasoning behind the analysis.'),
  educationalTips: z.string().describe('Educational tips for identifying similar misleading claims.'),
});
export type AnalyzeClaimFromInputOutput = z.infer<
  typeof AnalyzeClaimFromInputOutputSchema
>;

export async function analyzeClaimFromInput(
  input: AnalyzeClaimFromInputInput
): Promise<AnalyzeClaimFromInputOutput> {
  return analyzeClaimFromInputFlow(input);
}

const analyzeClaimPrompt = ai.definePrompt({
  name: 'analyzeClaimPrompt',
  input: {schema: AnalyzeClaimFromInputInputSchema},
  output: {schema: AnalyzeClaimFromInputOutputSchema},
  prompt: `You are an expert fact-checker. Analyze the following claim and assess its validity.

Input Type: {{{inputType}}}
Input: {{{input}}}

Analyze the claim, cross-check it with reliable sources, and provide a simple, human-friendly explanation of its validity.
Also, provide educational tips on how to spot similar misleading claims in the future.

Output the analysis in the following JSON format:
{
  "analysis": "The analysis of the claim.",
  "isLikelyValid": true or false,
  "reasoning": "The reasoning behind the analysis.",
  "educationalTips": "Educational tips for identifying similar misleading claims."
}
`,
});

const analyzeClaimFromInputFlow = ai.defineFlow(
  {
    name: 'analyzeClaimFromInputFlow',
    inputSchema: AnalyzeClaimFromInputInputSchema,
    outputSchema: AnalyzeClaimFromInputOutputSchema,
  },
  async input => {
    const {output} = await analyzeClaimPrompt(input);
    return output!;
  }
);
