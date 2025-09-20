"use client";

import { generateFakeNewsHeadline } from "@/ai/flows/generate-fake-news-headline";
import { explainWhyHeadlineIsFake } from "@/ai/flows/explain-why-headline-is-fake";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FAKE_NEWS_BIASES, FAKE_NEWS_STYLES, FAKE_NEWS_TOPICS, REAL_HEADLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Loader2, PartyPopper, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

type GameState = {
  headline: string;
  isFake: boolean;
};

type Guess = "real" | "fake";

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function TrainingClient() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showFeedback, setShowFeedback] = useState(false);
  const [guessResult, setGuessResult] = useState<{ correct: boolean; explanation: string; } | null>(null);
  const [score, setScore] = useState(0);

  const { toast } = useToast();

  const fetchNextHeadline = useCallback(() => {
    startTransition(async () => {
      setGameState(null);
      setGuessResult(null);
      try {
        const shouldBeFake = Math.random() > 0.5;
        if (shouldBeFake) {
          const { headline } = await generateFakeNewsHeadline({
            topic: getRandomItem(FAKE_NEWS_TOPICS),
            bias: getRandomItem(FAKE_NEWS_BIASES),
            style: getRandomItem(FAKE_NEWS_STYLES),
          });
          setGameState({ headline, isFake: true });
        } else {
          setGameState({ headline: getRandomItem(REAL_HEADLINES), isFake: false });
        }
      } catch (error) {
        console.error("Failed to generate headline:", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch the next headline. Please try again.'
        });
      }
    });
  }, [toast]);

  useEffect(() => {
    const storedScore = localStorage.getItem('veritaslearn_score');
    if (storedScore) {
      setScore(parseInt(storedScore, 10));
    }
    fetchNextHeadline();
  }, [fetchNextHeadline]);

  useEffect(() => {
    localStorage.setItem('veritaslearn_score', score.toString());
    // This custom event allows other components (like UserStats) to update reactively.
    window.dispatchEvent(new CustomEvent('scoreUpdated'));
  }, [score]);

  const handleGuess = (guess: Guess) => {
    if (!gameState) return;
    
    startTransition(async () => {
        const correct = (guess === 'fake' && gameState.isFake) || (guess === 'real' && !gameState.isFake);
        
        if (correct) {
            setScore(prev => prev + 10);
        } else {
            setScore(prev => Math.max(0, prev - 5));
        }

        try {
            const { explanation } = await explainWhyHeadlineIsFake({
                headline: gameState.headline,
                userGuess: guess,
            });
            setGuessResult({ correct, explanation });
        } catch (error) {
            console.error("Failed to get explanation:", error);
            setGuessResult({ correct, explanation: 'Could not retrieve explanation at this time.' });
        } finally {
            setShowFeedback(true);
        }
    });
  };

  const handleNext = () => {
    setShowFeedback(false);
    // A short delay to allow the dialog to close before fetching the new content
    setTimeout(() => {
      fetchNextHeadline();
    }, 200);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-center text-2xl">Is this headline Real or Fake?</CardTitle>
          <CardDescription className="text-center">Read the headline below and make your call.</CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-[120px] items-center justify-center rounded-lg bg-muted/50 p-6 text-center">
          {isPending && !gameState ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Generating next challenge...</span>
            </div>
          ) : (
            <p className="text-xl font-medium">{gameState?.headline}</p>
          )}
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 pt-6">
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-lg"
            onClick={() => handleGuess('real')}
            disabled={isPending || !gameState}
          >
            <ThumbsUp className="mr-2 text-green-500" /> Real
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-lg"
            onClick={() => handleGuess('fake')}
            disabled={isPending || !gameState}
          >
            <ThumbsDown className="mr-2 text-red-500" /> Fake
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={cn("flex items-center gap-2 font-headline text-2xl",
              guessResult?.correct ? 'text-green-600' : 'text-red-600'
            )}>
              {guessResult?.correct ? <CheckCircle /> : <AlertCircle />}
              {guessResult?.correct ? "You're Right!" : "Not Quite!"}
            </DialogTitle>
            <DialogDescription className="pt-2">
              {guessResult?.correct ? `You've earned 10 points! Here's the breakdown:` : `You lost 5 points. Here's why:`}
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {isPending && !guessResult ? (
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing...</span>
                </div>
            ) : (
                <p>{guessResult?.explanation}</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleNext} className="w-full">
                Next Headline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
