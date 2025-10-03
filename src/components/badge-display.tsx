"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

interface BadgeDisplayProps {
  badges: BadgeData[];
}

export default function BadgeDisplay({ badges }: BadgeDisplayProps) {
  const groupedBadges = badges.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = [];
    }
    acc[badge.category].push(badge);
    return acc;
  }, {} as Record<string, BadgeData[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Badges ({badges.length})
        </CardTitle>
        <CardDescription>
          Achievements and milestones you've earned
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedBadges).map(([category, categoryBadges]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                {category} ({categoryBadges.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {badge.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {badge.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {badges.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Award className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium mb-2">No badges yet</p>
              <p className="text-sm">
                Complete learning activities to earn your first badge!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
