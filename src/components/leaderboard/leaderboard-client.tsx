'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award } from 'lucide-react';
import { LEVELS } from '@/lib/constants';
import UserStats from '../training/user-stats';
import { cn } from '@/lib/utils';

const FAKE_USERS = [
  { name: 'Alex', score: 2500, avatar: 'https://i.pravatar.cc/150?u=alex' },
  { name: 'Maria', score: 2250, avatar: 'https://i.pravatar.cc/150?u=maria' },
  { name: 'David', score: 1800, avatar: 'https://i.pravatar.cc/150?u=david' },
  { name: 'Sophia', score: 1550, avatar: 'https://i.pravatar.cc/150?u=sophia' },
  { name: 'Daniel', score: 1100, avatar: 'https://i.pravatar.cc/150?u=daniel' },
  { name: 'Olivia', score: 850, avatar: 'https://i.pravatar.cc/150?u=olivia' },
  { name: 'James', score: 600, avatar: 'https://i.pravatar.cc/150?u=james' },
  { name: 'Emma', score: 450, avatar: 'https://i.pravatar.cc/150?u=emma' },
  { name: 'Liam', score: 250, avatar: 'https://i.pravatar.cc/150?u=liam' },
];

function getLevelForScore(score: number) {
  return LEVELS.slice().reverse().find((l) => score >= l.score) || LEVELS[0];
}

function UserRankCard({ rank, score }: { rank: number; score: number }) {
  const level = getLevelForScore(score);
  const nextLevel = LEVELS.find((l) => l.score > score);
  const pointsToNext = nextLevel ? nextLevel.score - score : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Current Rank</CardTitle>
        <CardDescription>Keep it up, truth-seeker!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center rounded-lg bg-muted p-6">
          <div className="text-center">
            <p className="font-headline text-6xl font-bold text-primary">#{rank}</p>
            <p className="text-sm text-muted-foreground">{score} PTS</p>
          </div>
        </div>
        <div className='text-center'>
        {nextLevel ? (
            <p className="text-sm text-muted-foreground">
              You are <span className="font-bold text-primary">{pointsToNext}</span> points away from reaching the <span className="font-bold">{nextLevel.name}</span> level.
            </p>
          ) : (
            <p className="text-sm font-bold text-accent">
              You've reached the highest level!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function LeaderboardClient() {
  const [currentUserScore, setCurrentUserScore] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedScore = localStorage.getItem('veritaslearn_score');
    setCurrentUserScore(storedScore ? parseInt(storedScore, 10) : 0);
  }, []);

  const leaderboardData = [
    ...FAKE_USERS,
    { name: 'You', score: currentUserScore, avatar: '' },
  ].sort((a, b) => b.score - a.score);

  const currentUserRank = leaderboardData.findIndex(u => u.name === 'You') + 1;

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full animate-pulse rounded-md bg-muted" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Loading Stats...</CardTitle>
                </CardHeader>
                <CardContent className="h-[88px] animate-pulse rounded-md bg-muted" />
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Loading Rank...</CardTitle>
                </CardHeader>
                <CardContent className="h-[180px] animate-pulse rounded-md bg-muted" />
            </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Players</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user, index) => {
                  const level = getLevelForScore(user.score);
                  const isCurrentUser = user.name === 'You';
                  return (
                    <TableRow key={index} className={cn(isCurrentUser && 'bg-accent/20')}>
                      <TableCell className="font-bold">
                        <div className="flex items-center justify-center">
                            {index < 3 ? (
                                <Award
                                className={cn(
                                    'h-6 w-6',
                                    index === 0 && 'text-yellow-500',
                                    index === 1 && 'text-slate-400',
                                    index === 2 && 'text-orange-600'
                                )}
                                />
                            ) : (
                                index + 1
                            )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className='h-8 w-8'>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className={cn('font-medium', isCurrentUser && 'text-primary')}>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{level.name}</TableCell>
                      <TableCell className="text-right font-mono">
                        {user.score}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        <UserStats />
        <UserRankCard rank={currentUserRank} score={currentUserScore} />
      </div>
    </div>
  );
}
