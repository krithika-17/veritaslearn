import FactCheckClient from '@/components/fact-check/fact-check-client';

export default function FactCheckPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Fact Check
        </h1>
        <p className="text-muted-foreground">
          Analyze a claim by pasting text, a link, or uploading an image. Our AI
          will cross-check it with reliable sources.
        </p>
      </div>
      <FactCheckClient />
    </div>
  );
}
