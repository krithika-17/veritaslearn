import TrainingClient from "@/components/training/training-client";
import UserStats from "@/components/training/user-stats";
import { Suspense } from "react";

export default function TrainingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-14 z-10 flex h-auto flex-col gap-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:top-16 md:h-auto md:flex-row md:items-center md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Training Ground
          </h1>
          <p className="text-muted-foreground">
            Test your skills. Can you tell which headlines are real and which are fake?
          </p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Suspense fallback={<div>Loading stats...</div>}>
            <UserStats />
          </Suspense>
        </div>
      </div>
      
      <div className="flex-1 p-4 md:p-6">
        <TrainingClient />
      </div>
    </div>
  );
}
