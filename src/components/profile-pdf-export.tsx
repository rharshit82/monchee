"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePDFExport } from "@/hooks/use-pdf-export";
import { shareToLinkedIn, getShareContent } from "@/lib/social-share";
import { Download, Share2 } from "lucide-react";

interface ProfilePDFExportProps {
  profileData: {
    username: string;
    avatarUrl?: string;
    level: number;
    xp: number;
    streak: number;
    points: number;
    badges: Array<{
      name: string;
      icon?: string;
      description?: string;
    }>;
    completedActivities: {
      quizzes: number;
      labs: number;
      deepDives: number;
      tracks: number;
    };
    completedTracks: Array<{
      name: string;
      badge: string;
    }>;
  };
}

export default function ProfilePDFExport({ profileData }: ProfilePDFExportProps) {
  const { isGenerating, exportProfile } = usePDFExport();
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleExportPDF = () => {
    exportProfile(profileData);
  };

  const handleShareToLinkedIn = () => {
    const shareContent = getShareContent('profile', profileData);
    shareToLinkedIn(shareContent);
    setShowShareOptions(false);
  };

  return (
    <div className="space-y-2">
      <Button 
        onClick={handleExportPDF} 
        disabled={isGenerating}
        className="w-full"
      >
        <Download className="h-4 w-4 mr-2" />
        {isGenerating ? 'Generating...' : 'Export Profile PDF'}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="w-full"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
      
      {showShareOptions && (
        <div className="space-y-2 pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShareToLinkedIn}
            className="w-full"
          >
            Share on LinkedIn
          </Button>
        </div>
      )}
    </div>
  );
}
