import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-claim-from-input.ts';
import '@/ai/flows/generate-fake-news-headline.ts';
import '@/ai/flows/cross-reference-with-reliable-sources.ts';
import '@/ai/flows/explain-why-headline-is-fake.ts';
import '@/ai/flows/provide-educational-tips.ts';