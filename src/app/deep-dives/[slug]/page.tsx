'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { usePDFExport } from '@/hooks/use-pdf-export';
import { shareToLinkedIn } from '@/lib/linkedin-share';
import { deepDivesData } from '@/data/deep-dives-data';

export default function DeepDivePage({ params }: { params: Promise<{ slug: string }> }) {
  const [deepDive, setDeepDive] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('interview');
  const { toast } = useToast();
  const { exportDeepDive } = usePDFExport();

  const handleComplete = async () => {
    try {
      const response = await fetch('/api/deep-dive/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deepDiveId: deepDive?.title.toLowerCase().replace(/\s+/g, '-'),
          score: 95,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Deep Dive Completed!',
          description: 'Great job! You\'ve completed this deep dive.',
        });
      }
    } catch (error) {
      console.error('Error completing deep dive:', error);
    }
  };

  const handlePDFExport = () => {
    exportDeepDive(deepDive);
  };

  const handleLinkedInShare = () => {
    shareToLinkedIn(
      window.location.href,
      deepDive.title,
      deepDive.description,
      'Monchee'
    );
  };

  useEffect(() => {
    const loadDeepDive = async () => {
      const resolvedParams = await params;
      const data = deepDivesData[resolvedParams.slug as keyof typeof deepDivesData];
      if (data) {
        setDeepDive(data);
      }
      setLoading(false);
    };
    
    loadDeepDive();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="text-lg">Loading deep dive...</div>
        </div>
      </div>
    );
  }

  if (!deepDive) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="text-lg">Deep dive not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{deepDive.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">{deepDive.description}</p>
            <div className="flex gap-4">
              <Badge variant="secondary">{deepDive.difficulty}</Badge>
              <Badge variant="outline">{deepDive.duration}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePDFExport}
            >
              📄 Download PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLinkedInShare}
            >
              🔗 Share on LinkedIn
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="interview">Interview Take</TabsTrigger>
          <TabsTrigger value="realworld">Real-World Take</TabsTrigger>
        </TabsList>

        <TabsContent value="interview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>{deepDive.interviewTake.overview}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Functional Requirements</h3>
                <ul className="space-y-2">
                  {deepDive.interviewTake.requirements.functional.map((req: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Non-Functional Requirements</h3>
                <ul className="space-y-2">
                  {deepDive.interviewTake.requirements.nonFunctional.map((req: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">⚡</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Architecture</CardTitle>
              <CardDescription>{deepDive.interviewTake.architecture.highLevel}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deepDive.interviewTake.architecture.components.map((component: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{component.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{component.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {component.technologies.map((tech: string, techIndex: number) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(deepDive.interviewTake.dataModels).map(([modelName, model]: [string, any]) => (
                  <div key={modelName} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 capitalize">{modelName}</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Fields: </span>
                        <span className="text-sm text-muted-foreground">{model.fields.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-medium">Relationships: </span>
                        <span className="text-sm text-muted-foreground">{model.relationships}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Algorithms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(deepDive.interviewTake.algorithms).map(([algoName, algo]: [string, any]) => (
                  <div key={algoName} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{algo.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{algo.description}</p>
                    {algo.factors && (
                      <div className="mb-3">
                        <h5 className="font-medium mb-2">Key Factors:</h5>
                        <ul className="space-y-1">
                          {algo.factors.map((factor: string, index: number) => (
                            <li key={index} className="text-sm">• {factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {algo.approach && (
                      <div className="mb-3">
                        <h5 className="font-medium mb-2">Approach:</h5>
                        <ul className="space-y-1">
                          {algo.approach.map((step: string, index: number) => (
                            <li key={index} className="text-sm">• {step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {algo.complexity && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Complexity: </span>{algo.complexity}
                      </div>
                    )}
                    {algo.implementation && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Implementation: </span>{algo.implementation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scaling Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Challenges</h4>
                  <ul className="space-y-1">
                    {deepDive.interviewTake.scaling.challenges.map((challenge: string, index: number) => (
                      <li key={index} className="text-sm">• {challenge}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Solutions</h4>
                  <ul className="space-y-1">
                    {deepDive.interviewTake.scaling.solutions.map((solution: string, index: number) => (
                      <li key={index} className="text-sm">• {solution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Design Trade-offs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deepDive.interviewTake.tradeoffs.map((tradeoff: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{tradeoff.decision}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-600 mb-2">Pros</h5>
                        <ul className="space-y-1">
                          {tradeoff.pros.map((pro: string, proIndex: number) => (
                            <li key={proIndex} className="text-sm">• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-600 mb-2">Cons</h5>
                        <ul className="space-y-1">
                          {tradeoff.cons.map((con: string, conIndex: number) => (
                            <li key={conIndex} className="text-sm">• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realworld" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current State</CardTitle>
              <CardDescription>{deepDive.realWorldTake.currentState}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {deepDive.realWorldTake.technicalChallenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">⚠️</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lessons Learned</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {deepDive.realWorldTake.lessonsLearned.map((lesson: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Future Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {deepDive.realWorldTake.futureConsiderations.map((consideration: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-2">🔮</span>
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Actions */}
      <div className="mt-8 flex justify-center">
        <Button onClick={handleComplete} size="lg">
          Mark as Complete
        </Button>
      </div>
    </div>
  );
}
