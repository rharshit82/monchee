"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle } from "lucide-react";

interface DailyGoalsProps {
  dailyGoalCompleted: boolean;
  streak: number;
}

export default function DailyGoals({ dailyGoalCompleted, streak }: DailyGoalsProps) {
  const progress = dailyGoalCompleted ? 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Daily Goals
        </CardTitle>
        <CardDescription>
          Complete 1 learning activity today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Today's Goal</span>
              {dailyGoalCompleted ? (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Completed!
                </span>
              ) : (
                <span>Not completed</span>
              )}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Current Streak:</span>
            <span className="flex items-center gap-1">
              🔥 {streak} days
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
