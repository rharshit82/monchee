"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

interface XPProgressProps {
  xp: number;
}

export default function XPProgress({ xp }: XPProgressProps) {
  const currentLevel = Math.floor(xp / 100) + 1;
  const xpInCurrentLevel = xp % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;
  const nextLevel = currentLevel + 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          XP Progress
        </CardTitle>
        <CardDescription>
          Level {currentLevel} • {xp} total XP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Level {currentLevel}</span>
            <span>{xpInCurrentLevel}/100 XP</span>
          </div>
          <Progress value={(xpInCurrentLevel / 100) * 100} className="h-2" />
          <div className="text-center text-sm text-gray-500">
            {xpToNextLevel} XP to Level {nextLevel}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
