'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';
import {
  analyzeClaimFromInput,
  AnalyzeClaimFromInputOutput,
} from '@/ai/flows/analyze-claim-from-input';
import AnalysisResult from './analysis-result';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  inputType: z.enum(['text', 'link', 'image']),
  input: z.string().min(1, 'Please enter a value.'),
});

type FormValues = z.infer<typeof formSchema>;
type InputType = FormValues['inputType'];

export default function FactCheckClient() {
  const [activeTab, setActiveTab] = useState<InputType>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeClaimFromInputOutput | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputType: 'text',
      input: '',
    },
  });

  const handleTabChange = (value: string) => {
    const newTab = value as InputType;
    setActiveTab(newTab);
    form.setValue('inputType', newTab);
    form.resetField('input');
    setResult(null);
    setImagePreview(null);
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        form.setValue('input', dataUrl, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeClaimFromInput(values);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description:
          'There was an error analyzing your claim. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const sampleImage = PlaceHolderImages.find(img => img.id === 'fact-check-sample');

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardContent className="p-4 md:p-6">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text"><FileText className="mr-2" />Text</TabsTrigger>
              <TabsTrigger value="link"><LinkIcon className="mr-2" />Link</TabsTrigger>
              <TabsTrigger value="image"><ImageIcon className="mr-2" />Image</TabsTrigger>
            </TabsList>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
                <TabsContent value="text" className="m-0">
                  <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Claim or Article Text</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., A study shows that chocolate cures all diseases..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="link" className="m-0">
                  <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Article URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/news-article"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="image" className="m-0 space-y-4">
                  <FormField
                    control={form.control}
                    name="input"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload an Image</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={handleImageChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {imagePreview && (
                     <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <Image src={imagePreview} alt="Image preview" fill className="object-contain" />
                     </div>
                  )}
                  {sampleImage && !imagePreview && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Or try with a sample image:</p>
                      <button type="button" onClick={() => {
                        setImagePreview(sampleImage.imageUrl);
                        form.setValue('input', sampleImage.imageUrl, { shouldValidate: true });
                      }} className="block w-full overflow-hidden rounded-lg border transition-transform hover:scale-[1.02]">
                        <div className="relative aspect-video w-full">
                           <Image src={sampleImage.imageUrl} alt={sampleImage.description} fill className="object-contain" data-ai-hint={sampleImage.imageHint} />
                        </div>
                      </button>
                    </div>
                  )}
                </TabsContent>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? 'Analyzing...' : 'Analyze Claim'}
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>

      <div className="min-h-[300px] rounded-lg border border-dashed border-muted-foreground/30 p-4">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h2 className="font-headline text-2xl font-semibold">Analysis Result</h2>
          {isLoading && (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Our AI is analyzing the claim... Please wait.</p>
            </div>
          )}
          {!isLoading && !result && (
            <div className="text-center text-muted-foreground">
              <p>Your analysis will appear here.</p>
            </div>
          )}
          {result && <AnalysisResult result={result} />}
        </div>
      </div>
    </div>
  );
}
