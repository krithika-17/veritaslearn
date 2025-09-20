"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Award, Star } from 'lucide-react';
import { LEVELS } from '@/lib/constants';
import { Progress } from '../ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function UserStats() {
    const [score, setScore] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const updateScore = () => {
            const storedScore = localStorage.getItem('veritaslearn_score');
            setScore(storedScore ? parseInt(storedScore, 10) : 0);
        };
        
        updateScore();

        window.addEventListener('scoreUpdated', updateScore);
        return () => window.removeEventListener('scoreUpdated', updateScore);
    }, []);

    const currentLevel = LEVELS.slice().reverse().find(l => score >= l.score) || LEVELS[0];
    const nextLevel = LEVELS.find(l => l.score > currentLevel.score);

    const progressPercentage = nextLevel 
        ? ((score - currentLevel.score) / (nextLevel.score - currentLevel.score)) * 100
        : 100;

    if (!isMounted) {
        return (
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Loading Stats...</CardTitle>
                </CardHeader>
                <CardContent className="h-[88px] animate-pulse rounded-md bg-muted" />
            </Card>
        );
    }
    
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className='pb-2'>
                <CardTitle className="text-lg font-medium">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="font-bold text-primary">{currentLevel.name}</div>
                    <div className="text-sm font-semibold">{score} PTS</div>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Progress value={progressPercentage} className="mt-2 h-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                            {nextLevel ? (
                                <p>{nextLevel.score - score} points to next level: {nextLevel.name}</p>
                            ) : (
                                <p>You've reached the highest level!</p>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}
