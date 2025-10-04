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
    <div className="container mx-auto py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-5xl font-bold mb-4 leading-tight">{deepDive.title}</h1>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-3xl">{deepDive.description}</p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="text-sm px-3 py-1">{deepDive.difficulty}</Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">{deepDive.duration}</Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="default"
              onClick={handlePDFExport}
              className="text-sm"
            >
              📄 Download PDF
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={handleLinkedInShare}
              className="text-sm"
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

        <TabsContent value="interview" className="space-y-8">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold mb-3">System Overview</CardTitle>
              <CardDescription className="text-lg leading-relaxed">{deepDive.interviewTake.overview}</CardDescription>
            </CardHeader>
          </Card>

          {deepDive.interviewTake.problemStatement && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold mb-3">{deepDive.interviewTake.problemStatement.title}</CardTitle>
                <CardDescription className="text-lg leading-relaxed">{deepDive.interviewTake.problemStatement.content}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-6">
                  <h4 className="font-semibold text-xl mb-4">Key Challenges</h4>
                  <ul className="space-y-3">
                    {deepDive.interviewTake.problemStatement.keyChallenges.map((challenge: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">⚠️</span>
                        <span className="text-base leading-relaxed">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Requirements Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Functional Requirements</h3>
                <ul className="space-y-3">
                  {deepDive.interviewTake.requirements.functional.map((req: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span className="text-base leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Non-Functional Requirements</h3>
                <ul className="space-y-3">
                  {deepDive.interviewTake.requirements.nonFunctional.map((req: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">⚡</span>
                      <span className="text-base leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold mb-3">System Architecture</CardTitle>
              <CardDescription className="text-lg leading-relaxed">{deepDive.interviewTake.architecture.highLevel}</CardDescription>
            </CardHeader>
            <CardContent>
              {deepDive.interviewTake.architecture.systemComponents && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{deepDive.interviewTake.architecture.systemComponents.title}</h3>
                    <p className="text-base text-muted-foreground mb-6 leading-relaxed">{deepDive.interviewTake.architecture.systemComponents.description}</p>
                  </div>
                  <div className="space-y-6">
                    {deepDive.interviewTake.architecture.systemComponents.components.map((component: any, index: number) => (
                      <div key={index} className="border rounded-lg p-6 bg-gray-50/50">
                        <h4 className="font-semibold text-lg mb-3">{component.name}</h4>
                        <p className="text-base text-muted-foreground mb-4 leading-relaxed">{component.description}</p>
                        
                        {component.responsibilities && (
                          <div className="mb-4">
                            <h5 className="font-medium mb-3 text-base">Responsibilities:</h5>
                            <ul className="space-y-2">
                              {component.responsibilities.map((resp: string, respIndex: number) => (
                                <li key={respIndex} className="text-sm leading-relaxed">• {resp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {component.technologies.map((tech: string, techIndex: number) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs px-2 py-1">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        {component.scaling && (
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Scaling: </span>{component.scaling}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {deepDive.interviewTake.architecture.dataFlow && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">{deepDive.interviewTake.architecture.dataFlow.title}</h3>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">{deepDive.interviewTake.architecture.dataFlow.description}</p>
                  <div className="space-y-6">
                    {deepDive.interviewTake.architecture.dataFlow.flows.map((flow: any, index: number) => (
                      <div key={index} className="border rounded-lg p-6 bg-gray-50/50">
                        <h4 className="font-semibold text-lg mb-4">{flow.name}</h4>
                        <ol className="space-y-3">
                          {flow.steps.map((step: string, stepIndex: number) => (
                            <li key={stepIndex} className="text-base flex items-start leading-relaxed">
                              <span className="text-blue-500 mr-3 font-medium text-lg">{stepIndex + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">{deepDive.interviewTake.dataModels.title || 'Data Models'}</CardTitle>
              {deepDive.interviewTake.dataModels.description && (
                <CardDescription className="text-lg leading-relaxed">{deepDive.interviewTake.dataModels.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(deepDive.interviewTake.dataModels).filter(([key]) => key !== 'title' && key !== 'description').map(([modelName, model]: [string, any]) => (
                  <div key={modelName} className="border rounded-lg p-6 bg-gray-50/50">
                    <h4 className="font-semibold mb-4 capitalize text-xl">{modelName}</h4>
                    <div className="space-y-4">
                      {model.fields && (
                        <div>
                          <span className="font-medium text-base">Fields: </span>
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {model.fields.map((field: string, index: number) => (
                              <div key={index} className="text-sm text-muted-foreground font-mono bg-white p-2 rounded border">
                                {field}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {model.relationships && (
                        <div>
                          <span className="font-medium text-base">Relationships: </span>
                          <span className="text-base text-muted-foreground leading-relaxed">{model.relationships}</span>
                        </div>
                      )}
                      {model.indexes && (
                        <div>
                          <span className="font-medium text-base">Indexes: </span>
                          <span className="text-base text-muted-foreground leading-relaxed">{model.indexes.join(', ')}</span>
                        </div>
                      )}
                      {model.partitioning && (
                        <div>
                          <span className="font-medium text-base">Partitioning: </span>
                          <span className="text-base text-muted-foreground leading-relaxed">{model.partitioning}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{deepDive.interviewTake.algorithms.title || 'Key Algorithms'}</CardTitle>
              {deepDive.interviewTake.algorithms.description && (
                <CardDescription>{deepDive.interviewTake.algorithms.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(deepDive.interviewTake.algorithms).filter(([key]) => key !== 'title' && key !== 'description').map(([algoName, algo]: [string, any]) => (
                  <div key={algoName} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-lg">{algo.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{algo.description}</p>
                    
                    {algo.coreFactors && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-3">Core Factors:</h5>
                        <div className="space-y-3">
                          {algo.coreFactors.map((factor: any, index: number) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{factor.factor}</span>
                                <Badge variant="outline" className="text-xs">Weight: {factor.weight}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{factor.description}</p>
                              {factor.implementation && (
                                <p className="text-xs font-mono bg-gray-100 p-2 rounded">{factor.implementation}</p>
                              )}
                              {factor.considerations && (
                                <p className="text-xs text-muted-foreground italic">{factor.considerations}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {algo.algorithmSteps && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-2">Algorithm Steps:</h5>
                        <ol className="space-y-1">
                          {algo.algorithmSteps.map((step: string, index: number) => (
                            <li key={index} className="text-sm flex items-start">
                              <span className="text-blue-500 mr-2 font-medium">{index + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    
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
                    
                    {algo.techniques && (
                      <div className="mb-3">
                        <h5 className="font-medium mb-2">Techniques:</h5>
                        <ul className="space-y-1">
                          {algo.techniques.map((technique: string, index: number) => (
                            <li key={index} className="text-sm">• {technique}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {algo.optimization && (
                      <div className="mb-3">
                        <h5 className="font-medium mb-2">Optimization:</h5>
                        <ul className="space-y-1">
                          {algo.optimization.map((opt: string, index: number) => (
                            <li key={index} className="text-sm">• {opt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                      {algo.complexity && (
                        <div>
                          <span className="font-medium">Complexity: </span>{algo.complexity}
                        </div>
                      )}
                      {algo.implementation && (
                        <div>
                          <span className="font-medium">Implementation: </span>{algo.implementation}
                        </div>
                      )}
                      {algo.accuracy && (
                        <div>
                          <span className="font-medium">Accuracy: </span>{algo.accuracy}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{deepDive.interviewTake.scaling.title || 'Scaling Considerations'}</CardTitle>
              {deepDive.interviewTake.scaling.description && (
                <CardDescription>{deepDive.interviewTake.scaling.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Key Challenges</h4>
                  <ul className="space-y-2">
                    {deepDive.interviewTake.scaling.challenges.map((challenge: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">⚠️</span>
                        <span className="text-sm">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4 text-xl">Solutions</h4>
                  <div className="space-y-6">
                    {deepDive.interviewTake.scaling.solutions.map((solution: any, index: number) => (
                      <div key={index} className="border rounded-lg p-6 bg-gray-50/50">
                        <h5 className="font-semibold mb-3 text-lg">{solution.strategy}</h5>
                        <p className="text-base text-muted-foreground mb-4 leading-relaxed">{solution.description}</p>
                        {solution.implementation && (
                          <div className="mb-4">
                            <h6 className="font-medium mb-3 text-base">Implementation:</h6>
                            <ul className="space-y-2">
                              {solution.implementation.map((impl: string, implIndex: number) => (
                                <li key={implIndex} className="text-sm leading-relaxed">• {impl}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {solution.benefits && (
                          <div>
                            <h6 className="font-medium mb-3 text-base">Benefits:</h6>
                            <ul className="space-y-2">
                              {solution.benefits.map((benefit: string, benefitIndex: number) => (
                                <li key={benefitIndex} className="text-sm leading-relaxed">• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {deepDive.interviewTake.scaling.performanceMetrics && (
                  <div>
                    <h4 className="font-semibold mb-4 text-xl">Performance Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(deepDive.interviewTake.scaling.performanceMetrics).map(([metric, value]: [string, string]) => (
                        <div key={metric} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                          <span className="font-medium text-base">{metric}:</span>
                          <span className="text-base text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {deepDive.interviewTake.security && (
            <Card>
              <CardHeader>
                <CardTitle>{deepDive.interviewTake.security.title}</CardTitle>
                <CardDescription>{deepDive.interviewTake.security.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deepDive.interviewTake.security.authentication && (
                    <div>
                      <h4 className="font-semibold mb-2">Authentication</h4>
                      <ul className="space-y-1">
                        {deepDive.interviewTake.security.authentication.map((item: string, index: number) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {deepDive.interviewTake.security.dataProtection && (
                    <div>
                      <h4 className="font-semibold mb-2">Data Protection</h4>
                      <ul className="space-y-1">
                        {deepDive.interviewTake.security.dataProtection.map((item: string, index: number) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {deepDive.interviewTake.security.contentSecurity && (
                    <div>
                      <h4 className="font-semibold mb-2">Content Security</h4>
                      <ul className="space-y-1">
                        {deepDive.interviewTake.security.contentSecurity.map((item: string, index: number) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {deepDive.interviewTake.monitoring && (
            <Card>
              <CardHeader>
                <CardTitle>{deepDive.interviewTake.monitoring.title}</CardTitle>
                <CardDescription>{deepDive.interviewTake.monitoring.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deepDive.interviewTake.monitoring.metrics && (
                    <div>
                      <h4 className="font-semibold mb-2">Metrics</h4>
                      <ul className="space-y-1">
                        {deepDive.interviewTake.monitoring.metrics.map((metric: string, index: number) => (
                          <li key={index} className="text-sm">• {metric}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {deepDive.interviewTake.monitoring.logging && (
                    <div>
                      <h4 className="font-semibold mb-2">Logging</h4>
                      <ul className="space-y-1">
                        {deepDive.interviewTake.monitoring.logging.map((item: string, index: number) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {deepDive.interviewTake.monitoring.alerting && (
                    <div>
                      <h4 className="font-semibold mb-2">Alerting</h4>
                      <ul className="space-y-1">
                        {deepDive.interviewTake.monitoring.alerting.map((item: string, index: number) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Design Trade-offs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deepDive.interviewTake.tradeoffs.map((tradeoff: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-lg">{tradeoff.decision}</h4>
                    {tradeoff.context && (
                      <p className="text-sm text-muted-foreground mb-4">{tradeoff.context}</p>
                    )}
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
                    {tradeoff.recommendation && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h6 className="font-medium text-blue-800 mb-1">Recommendation:</h6>
                        <p className="text-sm text-blue-700">{tradeoff.recommendation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realworld" className="space-y-8">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold mb-3">Current State</CardTitle>
              <CardDescription className="text-lg leading-relaxed">{deepDive.realWorldTake.currentState}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Technical Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deepDive.realWorldTake.technicalChallenges.map((challenge: any, index: number) => (
                  <div key={index} className="border rounded-lg p-6 bg-gray-50/50">
                    <h4 className="font-semibold mb-3 text-lg">{challenge.challenge}</h4>
                    <p className="text-base text-muted-foreground mb-4 leading-relaxed">{challenge.description}</p>
                    {challenge.impact && (
                      <div className="mb-3">
                        <span className="font-medium text-base">Impact: </span>
                        <span className="text-base leading-relaxed">{challenge.impact}</span>
                      </div>
                    )}
                    {challenge.solutions && (
                      <div>
                        <span className="font-medium text-base">Solutions: </span>
                        <span className="text-base leading-relaxed">{challenge.solutions}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Lessons Learned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deepDive.realWorldTake.lessonsLearned.map((lesson: any, index: number) => (
                  <div key={index} className="border rounded-lg p-6 bg-gray-50/50">
                    <h4 className="font-semibold mb-3 text-lg">{lesson.lesson}</h4>
                    <p className="text-base text-muted-foreground mb-4 leading-relaxed">{lesson.description}</p>
                    {lesson.application && (
                      <div>
                        <span className="font-medium text-base">Application: </span>
                        <span className="text-base leading-relaxed">{lesson.application}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Future Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deepDive.realWorldTake.futureConsiderations.map((consideration: any, index: number) => (
                  <div key={index} className="border rounded-lg p-6 bg-gray-50/50">
                    <h4 className="font-semibold mb-3 text-lg">{consideration.consideration}</h4>
                    <p className="text-base text-muted-foreground mb-4 leading-relaxed">{consideration.description}</p>
                    {consideration.timeline && (
                      <div className="mb-3">
                        <span className="font-medium text-base">Timeline: </span>
                        <span className="text-base leading-relaxed">{consideration.timeline}</span>
                      </div>
                    )}
                    {consideration.impact && (
                      <div>
                        <span className="font-medium text-base">Impact: </span>
                        <span className="text-base leading-relaxed">{consideration.impact}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {deepDive.realWorldTake.performanceBenchmarks && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Benchmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(deepDive.realWorldTake.performanceBenchmarks).map(([metric, value]: [string, string]) => (
                    <div key={metric} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-sm">{metric}:</span>
                      <span className="text-sm text-muted-foreground font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {deepDive.realWorldTake.costOptimization && (
            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deepDive.realWorldTake.costOptimization.map((optimization: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">💰</span>
                      <span className="text-sm">{optimization}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
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
