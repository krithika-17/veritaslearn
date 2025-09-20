import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ShieldCheck, GraduationCap } from "lucide-react";
import Link from "next/link";
import { VeritasLearnLogo } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";

export default function IntroductionPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center md:p-6">
        <div className="mb-8 flex items-center justify-center">
          <VeritasLearnLogo className="size-24" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to VeritasLearn
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Your AI-powered companion for navigating the complex world of information. Learn to spot misinformation, sharpen your critical thinking, and become a savvy media consumer.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="h-12 text-lg">
            <Link href="/fact-check">
              Get Started
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="bg-muted/50 p-4 py-12 md:p-6 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold">Fact-Check Claims</h3>
            <p className="text-muted-foreground">
              Submit any text, link, or image. Our AI will analyze it against reliable sources to give you an instant credibility assessment.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold">Train Your Skills</h3>
            <p className="text-muted-foreground">
              Play our interactive game. Can you distinguish between real and AI-generated fake headlines? Earn points and level up.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold">Learn & Improve</h3>
            <p className="text-muted-foreground">
              Receive personalized tips and insights to help you identify the tell-tale signs of misinformation on your own.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
