import LeaderboardClient from '@/components/leaderboard/leaderboard-client';

export default function LeaderboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-14 z-10 flex h-auto flex-col gap-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:top-16 md:h-auto md:flex-row md:items-center md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            See how you rank against other fact-checkers.
          </p>
        </div>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <LeaderboardClient />
      </div>
    </div>
  );
}
