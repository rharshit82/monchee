"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  CheckCircle, 
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Star,
  Award,
  Loader2
} from "lucide-react";

// Types
interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Quiz {
  title: string;
  description: string;
  questions: Question[];
}

interface Flashcard {
  id: number;
  front: string;
  back: string;
}

interface FlashcardSet {
  title: string;
  description: string;
  cards: Flashcard[];
}

// Quiz data
const quizData: Record<string, Quiz> = {
  "caching-basics": {
    title: "Caching Basics",
    description: "Test your understanding of caching concepts and strategies",
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of caching?",
        options: [
          "To reduce database load",
          "To improve response time",
          "To reduce memory usage",
          "All of the above"
        ],
        correct: 3,
        explanation: "Caching serves multiple purposes: reducing database load, improving response time, and optimizing resource usage."
      },
      {
        id: 2,
        question: "Which caching strategy writes data to both cache and database simultaneously?",
        options: [
          "Write-through",
          "Write-behind",
          "Cache-aside",
          "Write-around"
        ],
        correct: 0,
        explanation: "Write-through writes data to both cache and database at the same time, ensuring consistency."
      },
      {
        id: 3,
        question: "What is cache invalidation?",
        options: [
          "Removing expired data from cache",
          "Adding new data to cache",
          "Updating cache configuration",
          "Clearing all cache data"
        ],
        correct: 0,
        explanation: "Cache invalidation is the process of removing or updating expired or stale data from the cache."
      }
    ]
  }
};

// Flashcard data
const flashcardData: Record<string, FlashcardSet> = {
  "sharding-basics": {
    title: "Sharding Basics",
    description: "Learn key concepts about database sharding",
    cards: [
      {
        id: 1,
        front: "What is sharding?",
        back: "Sharding is a database partitioning technique that splits data into smaller, more manageable pieces called shards."
      },
      {
        id: 2,
        front: "What are the main benefits of sharding?",
        back: "Horizontal scaling, improved query performance, and avoiding single database bottlenecks."
      },
      {
        id: 3,
        front: "What is range-based sharding?",
        back: "Range-based sharding divides data based on value ranges (e.g., user IDs 1-1000 go to shard 1)."
      },
      {
        id: 4,
        front: "What is hash-based sharding?",
        back: "Hash-based sharding uses a hash function to determine which shard a record belongs to."
      }
    ]
  }
};

export default function LearnPage() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("quizzes");
  const [currentQuiz, setCurrentQuiz] = useState<keyof typeof quizData>("caching-basics");
  const [currentFlashcardSet, setCurrentFlashcardSet] = useState<keyof typeof flashcardData>("sharding-basics");
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: [] as number[],
    isCompleted: false,
    score: 0,
    showResults: false,
    isSubmitting: false
  });
  const [flashcardState, setFlashcardState] = useState({
    currentCard: 0,
    isFlipped: false,
    isCompleted: false
  });

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    setQuizState(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const handleNextQuestion = async () => {
    if (quizState.currentQuestion < quizData[currentQuiz].questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      // Calculate score
      const correctAnswers = quizData[currentQuiz].questions.reduce((count: number, question: Question, index: number) => {
        return count + (quizState.answers[index] === question.correct ? 1 : 0);
      }, 0);
      const score = Math.round((correctAnswers / quizData[currentQuiz].questions.length) * 100);
      
      setQuizState(prev => ({
        ...prev,
        isCompleted: true,
        score,
        showResults: true,
        isSubmitting: true
      }));

      // Submit quiz completion to API
      try {
        const response = await fetch('/api/quiz/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: currentQuiz,
            score: correctAnswers,
            total: quizData[currentQuiz].questions.length
          }),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "🎉 Quiz Completed!",
            description: `✅ Progress saved! +${result.points} points added to your profile.${result.badgesAwarded > 0 ? ` You earned ${result.badgesAwarded} new badge${result.badgesAwarded > 1 ? 's' : ''}!` : ''}`,
          });
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to save progress. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error submitting quiz:', error);
        toast({
          title: "Error",
          description: "Failed to save progress. Please try again.",
          variant: "destructive",
        });
      } finally {
        setQuizState(prev => ({
          ...prev,
          isSubmitting: false
        }));
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      isCompleted: false,
      score: 0,
      showResults: false,
      isSubmitting: false
    });
  };

  const handleFlashcardFlip = () => {
    setFlashcardState(prev => ({
      ...prev,
      isFlipped: !prev.isFlipped
    }));
  };

  const handleNextFlashcard = () => {
    if (flashcardState.currentCard < flashcardData[currentFlashcardSet].cards.length - 1) {
      setFlashcardState(prev => ({
        ...prev,
        currentCard: prev.currentCard + 1,
        isFlipped: false
      }));
    } else {
      setFlashcardState(prev => ({
        ...prev,
        isCompleted: true
      }));
    }
  };

  const handlePreviousFlashcard = () => {
    if (flashcardState.currentCard > 0) {
      setFlashcardState(prev => ({
        ...prev,
        currentCard: prev.currentCard - 1,
        isFlipped: false
      }));
    }
  };

  const resetFlashcards = () => {
    setFlashcardState({
      currentCard: 0,
      isFlipped: false,
      isCompleted: false
    });
  };

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access the learning features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/sign-in">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Learning
            </h1>
            <p className="text-xl text-gray-600">
              Test your knowledge with quizzes, flashcards, and hands-on scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              {/* Quizzes Tab */}
              <TabsContent value="quizzes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {quizData[currentQuiz].title}
                    </CardTitle>
                    <CardDescription>
                      {quizData[currentQuiz].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!quizState.showResults ? (
                      <div className="space-y-6">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Question {quizState.currentQuestion + 1} of {quizData[currentQuiz].questions.length}</span>
                            <span>{Math.round(((quizState.currentQuestion + 1) / quizData[currentQuiz].questions.length) * 100)}%</span>
                          </div>
                          <Progress value={((quizState.currentQuestion + 1) / quizData[currentQuiz].questions.length) * 100} />
                        </div>

                        {/* Question */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">
                            {quizData[currentQuiz].questions[quizState.currentQuestion].question}
                          </h3>
                          
                          <RadioGroup
                            value={quizState.answers[quizState.currentQuestion]?.toString()}
                            onValueChange={(value) => handleQuizAnswer(parseInt(value))}
                          >
                            {quizData[currentQuiz].questions[quizState.currentQuestion].options.map((option: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            onClick={handlePreviousQuestion}
                            disabled={quizState.currentQuestion === 0}
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                          </Button>
                          
                          <Button
                            onClick={handleNextQuestion}
                            disabled={quizState.answers[quizState.currentQuestion] === undefined || quizState.isSubmitting}
                          >
                            {quizState.isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                {quizState.currentQuestion === quizData[currentQuiz].questions.length - 1 ? 'Finish' : 'Next'}
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="space-y-2">
                          <div className="text-4xl font-bold text-blue-600">
                            {quizState.score}%
                          </div>
                          <div className="text-lg text-gray-600">
                            {quizState.score >= 80 ? 'Excellent!' : quizState.score >= 60 ? 'Good job!' : 'Keep practicing!'}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {quizData[currentQuiz].questions.map((question: Question, index: number) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg text-left">
                              <div className="font-medium mb-2">{question.question}</div>
                              <div className="text-sm text-gray-600">
                                Your answer: {question.options[quizState.answers[index] || 0]}
                                {quizState.answers[index] === question.correct ? (
                                  <span className="text-green-600 ml-2">✓ Correct</span>
                                ) : (
                                  <span className="text-red-600 ml-2">✗ Incorrect</span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {question.explanation}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Button onClick={resetQuiz} variant="outline">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Retake Quiz
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Flashcards Tab */}
              <TabsContent value="flashcards" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      {flashcardData[currentFlashcardSet].title}
                    </CardTitle>
                    <CardDescription>
                      {flashcardData[currentFlashcardSet].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!flashcardState.isCompleted ? (
                      <div className="space-y-6">
                        {/* Progress */}
                        <div className="text-center">
                          <div className="text-sm text-gray-600">
                            Card {flashcardState.currentCard + 1} of {flashcardData[currentFlashcardSet].cards.length}
                          </div>
                        </div>

                        {/* Flashcard */}
                        <div className="flip-card" onClick={handleFlashcardFlip}>
                          <div className={`flip-card-inner ${flashcardState.isFlipped ? 'flipped' : ''}`}>
                            <div className="flip-card-front">
                              <div className="text-center p-8">
                                <div className="text-2xl font-bold mb-4">Question</div>
                                <div className="text-lg">
                                  {flashcardData[currentFlashcardSet].cards[flashcardState.currentCard].front}
                                </div>
                                <div className="text-sm text-gray-500 mt-4">Click to reveal answer</div>
                              </div>
                            </div>
                            <div className="flip-card-back">
                              <div className="text-center p-8">
                                <div className="text-2xl font-bold mb-4">Answer</div>
                                <div className="text-lg">
                                  {flashcardData[currentFlashcardSet].cards[flashcardState.currentCard].back}
                                </div>
                                <div className="text-sm text-gray-500 mt-4">Click to see question</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            onClick={handlePreviousFlashcard}
                            disabled={flashcardState.currentCard === 0}
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                          </Button>
                          
                          <Button onClick={handleNextFlashcard}>
                            {flashcardState.currentCard === flashcardData[currentFlashcardSet].cards.length - 1 ? 'Finish' : 'Next'}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="space-y-2">
                          <div className="text-4xl">🎉</div>
                          <div className="text-xl font-semibold">Flashcard Set Complete!</div>
                          <div className="text-gray-600">
                            You've reviewed all {flashcardData[currentFlashcardSet].cards.length} cards.
                          </div>
                        </div>
                        
                        <Button onClick={resetFlashcards} variant="outline">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Review Again
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Scenarios Tab */}
              <TabsContent value="scenarios" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Trade-off Scenarios
                    </CardTitle>
                    <CardDescription>
                      Coming soon! Practice making design decisions with real-world trade-offs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🚧</div>
                      <h3 className="text-xl font-semibold mb-2">Under Construction</h3>
                      <p className="text-gray-600">
                        Trade-off scenarios are coming soon. Check back later!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Your Progress
                    </CardTitle>
                    <CardDescription>
                      Track your learning journey and achievements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📊</div>
                      <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                      <p className="text-gray-600">
                        Your progress is being tracked! Complete activities to see your stats here.
                      </p>
                      <Button asChild className="mt-4">
                        <a href={`/profile/${user.username || user.id}`}>View Profile</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
