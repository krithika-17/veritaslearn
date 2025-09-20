import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnalyzeClaimFromInputOutput } from '@/ai/flows/analyze-claim-from-input';
import { AlertCircle, CheckCircle, GraduationCap, Lightbulb } from 'lucide-react';

interface AnalysisResultProps {
  result: AnalyzeClaimFromInputOutput;
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  const { isLikelyValid, analysis, reasoning, educationalTips } = result;

  return (
    <Card className="w-full animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Overall Assessment</span>
          <Badge
            variant={isLikelyValid ? 'default' : 'destructive'}
            className="flex items-center gap-2 whitespace-nowrap bg-opacity-20 text-sm"
          >
            {isLikelyValid ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            <span
              className={
                isLikelyValid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
              }
            >
              {isLikelyValid ? 'Likely Valid' : 'Likely False'}
            </span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{analysis}</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="reasoning">
            <AccordionTrigger className='font-headline text-lg'>
              <Lightbulb className="mr-2 h-5 w-5 text-accent" />
              AI's Reasoning
            </AccordionTrigger>
            <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>{reasoning}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tips">
            <AccordionTrigger className='font-headline text-lg'>
              <GraduationCap className="mr-2 h-5 w-5 text-primary" />
              Educational Tips
            </AccordionTrigger>
            <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>{educationalTips}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
