'use server';
/**
 * @fileOverview A flow that cross-references claims with trusted sources to assess their validity.
 *
 * - crossReferenceClaim - A function that handles the cross-referencing process.
 * - CrossReferenceInput - The input type for the crossReferenceClaim function.
 * - CrossReferenceOutput - The return type for the crossReferenceClaim function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CrossReferenceInputSchema = z.object({
  claim: z.string().describe('The claim to be cross-referenced.'),
});
export type CrossReferenceInput = z.infer<typeof CrossReferenceInputSchema>;

const CrossReferenceOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the claim is valid based on trusted sources.'),
  explanation: z.string().describe('Explanation of the claim validity based on trusted sources.'),
  sources: z.array(z.string()).describe('List of trusted sources used for cross-referencing.'),
});
export type CrossReferenceOutput = z.infer<typeof CrossReferenceOutputSchema>;

export async function crossReferenceClaim(input: CrossReferenceInput): Promise<CrossReferenceOutput> {
  return crossReferenceFlow(input);
}

const crossReferencePrompt = ai.definePrompt({
  name: 'crossReferencePrompt',
  input: {schema: CrossReferenceInputSchema},
  output: {schema: CrossReferenceOutputSchema},
  prompt: `You are an AI assistant that cross-references claims with trusted sources to assess their validity.
  Based on reliable sources, determine if the following claim is valid and provide an explanation.

  Claim: {{{claim}}}
  `,
});

const crossReferenceFlow = ai.defineFlow(
  {
    name: 'crossReferenceFlow',
    inputSchema: CrossReferenceInputSchema,
    outputSchema: CrossReferenceOutputSchema,
  },
  async input => {
    const {output} = await crossReferencePrompt(input);
    return output!;
  }
);
