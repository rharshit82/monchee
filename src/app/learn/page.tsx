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
  Loader2,
  Lightbulb,
  TrendingUp
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
  known?: boolean;
}

interface FlashcardSet {
  title: string;
  description: string;
  cards: Flashcard[];
}

interface TradeoffScenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: {
    id: string;
    label: string;
    reasoning: string;
  }[];
  correct: string;
  explanation: string;
}

// Quiz data
const quizData: Record<string, Quiz> = {
  "caching-basics": {
    title: "Caching Patterns",
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
      },
      {
        id: 4,
        question: "Which cache eviction policy removes the least recently used items?",
        options: [
          "FIFO",
          "LRU",
          "LFU",
          "Random"
        ],
        correct: 1,
        explanation: "LRU (Least Recently Used) removes items that haven't been accessed for the longest time."
      },
      {
        id: 5,
        question: "What is the main advantage of write-behind caching?",
        options: [
          "Better consistency",
          "Faster write operations",
          "Lower memory usage",
          "Better cache hit ratio"
        ],
        correct: 1,
        explanation: "Write-behind caching provides faster write operations by writing to cache first and database later."
      }
    ]
  },
  "sharding-basics": {
    title: "Database Sharding",
    description: "Test your knowledge of database partitioning and sharding",
    questions: [
      {
        id: 1,
        question: "What is the main purpose of database sharding?",
        options: [
          "To improve data consistency",
          "To enable horizontal scaling",
          "To reduce storage costs",
          "To improve security"
        ],
        correct: 1,
        explanation: "Sharding enables horizontal scaling by distributing data across multiple database instances."
      },
      {
        id: 2,
        question: "Which sharding strategy divides data based on value ranges?",
        options: [
          "Hash-based sharding",
          "Range-based sharding",
          "Directory-based sharding",
          "Consistent hashing"
        ],
        correct: 1,
        explanation: "Range-based sharding divides data based on value ranges (e.g., user IDs 1-1000 go to shard 1)."
      },
      {
        id: 3,
        question: "What is a major challenge with sharding?",
        options: [
          "Data consistency",
          "Cross-shard queries",
          "Replication lag",
          "All of the above"
        ],
        correct: 3,
        explanation: "Sharding introduces challenges with data consistency, cross-shard queries, and replication management."
      },
      {
        id: 4,
        question: "Which sharding approach uses a hash function to determine shard placement?",
        options: [
          "Range-based",
          "Hash-based",
          "Directory-based",
          "Vertical partitioning"
        ],
        correct: 1,
        explanation: "Hash-based sharding uses a hash function to determine which shard a record belongs to."
      },
      {
        id: 5,
        question: "What happens when you need to add more shards in a hash-based system?",
        options: [
          "No data needs to be moved",
          "All data needs to be redistributed",
          "Only new data goes to new shards",
          "Data is automatically balanced"
        ],
        correct: 1,
        explanation: "Adding shards in hash-based systems typically requires redistributing existing data."
      }
    ]
  },
  "cap-theorem": {
    title: "CAP Theorem",
    description: "Test your understanding of the CAP theorem and distributed systems",
    questions: [
      {
        id: 1,
        question: "What does CAP stand for?",
        options: [
          "Consistency, Availability, Partition tolerance",
          "Consistency, Accuracy, Performance",
          "Caching, Availability, Partitioning",
          "Consistency, Availability, Performance"
        ],
        correct: 0,
        explanation: "CAP stands for Consistency, Availability, and Partition tolerance."
      },
      {
        id: 2,
        question: "According to CAP theorem, how many guarantees can a distributed system provide?",
        options: [
          "All three",
          "Two out of three",
          "One out of three",
          "It depends on the system"
        ],
        correct: 1,
        explanation: "CAP theorem states that a distributed system can only guarantee two out of three properties."
      },
      {
        id: 3,
        question: "Which systems prioritize Consistency and Partition tolerance?",
        options: [
          "AP systems",
          "CP systems",
          "CA systems",
          "All distributed systems"
        ],
        correct: 1,
        explanation: "CP systems prioritize Consistency and Partition tolerance, sacrificing Availability during partitions."
      },
      {
        id: 4,
        question: "What happens to a CA system during a network partition?",
        options: [
          "It continues operating normally",
          "It becomes unavailable",
          "It switches to AP mode",
          "It automatically recovers"
        ],
        correct: 1,
        explanation: "CA systems cannot handle network partitions, so they become unavailable when partitions occur."
      },
      {
        id: 5,
        question: "Which type of system is best for a social media feed?",
        options: [
          "CP system",
          "AP system",
          "CA system",
          "It doesn't matter"
        ],
        correct: 1,
        explanation: "AP systems are better for social media feeds as availability is more important than perfect consistency."
      }
    ]
  }
};

// Flashcard data
const flashcardData: Record<string, FlashcardSet> = {
  "consistency-models": {
    title: "Consistency Models",
    description: "Learn about different consistency models in distributed systems",
    cards: [
      {
        id: 1,
        front: "Strong Consistency",
        back: "After a write, any subsequent read will return the latest written value. All replicas are updated before the write is acknowledged."
      },
      {
        id: 2,
        front: "Eventual Consistency",
        back: "If no new updates are made, eventually all reads will return the last updated value. Updates propagate asynchronously."
      },
      {
        id: 3,
        front: "Weak Consistency",
        back: "Reads may or may not see the most recent write. No guarantees about the order or timing of updates."
      },
      {
        id: 4,
        front: "Causal Consistency",
        back: "Operations that are causally related are seen by all processes in the same order. Non-causal operations can be seen in different orders."
      },
      {
        id: 5,
        front: "Session Consistency",
        back: "A client sees its own writes immediately, but other clients' writes may be delayed. Provides consistency within a user session."
      }
    ]
  },
  "sql-vs-nosql": {
    title: "SQL vs NoSQL Trade-offs",
    description: "Understand the differences between SQL and NoSQL databases",
    cards: [
      {
        id: 1,
        front: "SQL Database Characteristics",
        back: "ACID properties, structured schema, vertical scaling, complex queries, strong consistency, relational model."
      },
      {
        id: 2,
        front: "NoSQL Database Characteristics",
        back: "BASE properties, flexible schema, horizontal scaling, simple queries, eventual consistency, various data models."
      },
      {
        id: 3,
        front: "When to use SQL",
        back: "Complex queries, ACID transactions, structured data, strong consistency requirements, financial systems."
      },
      {
        id: 4,
        front: "When to use NoSQL",
        back: "High scalability needs, flexible schema, simple queries, real-time applications, big data processing."
      },
      {
        id: 5,
        front: "SQL Scaling Strategy",
        back: "Vertical scaling (more powerful hardware) and read replicas. Limited horizontal scaling capabilities."
      },
      {
        id: 6,
        front: "NoSQL Scaling Strategy",
        back: "Horizontal scaling (more servers), sharding, and partitioning. Designed for distributed systems."
      }
    ]
  },
  "cache-eviction": {
    title: "Cache Eviction Policies",
    description: "Learn about different cache eviction strategies",
    cards: [
      {
        id: 1,
        front: "LRU (Least Recently Used)",
        back: "Removes items that haven't been accessed for the longest time. Good for temporal locality patterns."
      },
      {
        id: 2,
        front: "LFU (Least Frequently Used)",
        back: "Removes items that have been accessed the least number of times. Good for frequency-based patterns."
      },
      {
        id: 3,
        front: "FIFO (First In, First Out)",
        back: "Removes items in the order they were added. Simple but may not reflect actual usage patterns."
      },
      {
        id: 4,
        front: "Random Eviction",
        back: "Randomly selects items to remove. Simple implementation but unpredictable performance."
      },
      {
        id: 5,
        front: "TTL (Time To Live)",
        back: "Items expire after a fixed time period. Good for data with known expiration times."
      },
      {
        id: 6,
        front: "LRU vs LFU Trade-off",
        back: "LRU is better for recent access patterns, LFU is better for long-term frequency patterns."
      }
    ]
  }
};

// Trade-off scenarios
const tradeoffScenarios: TradeoffScenario[] = [
  {
    id: 1,
    title: "Chat Application Storage",
    description: "You're designing a real-time chat application with millions of users.",
    question: "What database would you choose for storing chat messages?",
    options: [
      {
        id: "sql",
        label: "SQL Database (PostgreSQL)",
        reasoning: "ACID transactions, complex queries for message history, strong consistency for message ordering"
      },
      {
        id: "nosql",
        label: "NoSQL Database (MongoDB)",
        reasoning: "Horizontal scaling, flexible schema for different message types, better performance for high write volumes"
      }
    ],
    correct: "nosql",
    explanation: "NoSQL is better for chat applications due to high write volume, horizontal scaling needs, and the fact that eventual consistency is acceptable for chat messages. You can use message timestamps for ordering."
  },
  {
    id: 2,
    title: "Video Streaming Caching",
    description: "You're building a video streaming platform like Netflix.",
    question: "Where would you implement caching for video content?",
    options: [
      {
        id: "cdn",
        label: "CDN/Edge Caching",
        reasoning: "Global distribution, reduces latency, handles geographic load distribution, specialized for media content"
      },
      {
        id: "app",
        label: "Application-level Caching",
        reasoning: "More control over cache policies, better for personalized content, easier to implement custom logic"
      }
    ],
    correct: "cdn",
    explanation: "CDN caching is essential for video streaming due to the large file sizes, global user base, and the need to reduce latency. CDNs are optimized for media content delivery and can handle the massive bandwidth requirements."
  },
  {
    id: 3,
    title: "E-commerce Product Catalog",
    description: "You're building an e-commerce platform with a product catalog.",
    question: "How would you handle the product catalog database?",
    options: [
      {
        id: "sql",
        label: "SQL Database with normalization",
        reasoning: "Complex relationships between products, categories, and attributes; ACID transactions for inventory; complex queries for search and filtering"
      },
      {
        id: "nosql",
        label: "NoSQL Database with denormalization",
        reasoning: "Faster reads for product pages, easier horizontal scaling, flexible schema for different product types, better performance for high traffic"
      }
    ],
    correct: "sql",
    explanation: "SQL is better for e-commerce catalogs due to complex relationships, need for ACID transactions (inventory management), and complex queries for search/filtering. The structured nature of product data fits well with relational models."
  },
  {
    id: 4,
    title: "Social Media Feed",
    description: "You're building a social media platform with user feeds.",
    question: "How would you ensure feed consistency?",
    options: [
      {
        id: "strong",
        label: "Strong Consistency",
        reasoning: "All users see the same feed order, no stale data, simpler to reason about, better user experience"
      },
      {
        id: "eventual",
        label: "Eventual Consistency",
        reasoning: "Better performance, higher availability, acceptable for social feeds, can handle high write volumes"
      }
    ],
    correct: "eventual",
    explanation: "Eventual consistency is better for social media feeds. Users can tolerate slight delays in seeing new posts, and the performance benefits outweigh the consistency requirements. The feed can be personalized and doesn't need to be identical for all users."
  },
  {
    id: 5,
    title: "Financial Transaction System",
    description: "You're building a banking system for processing transactions.",
    question: "What consistency model would you use?",
    options: [
      {
        id: "strong",
        label: "Strong Consistency",
        reasoning: "Critical for financial accuracy, prevents double-spending, required for regulatory compliance, maintains data integrity"
      },
      {
        id: "eventual",
        label: "Eventual Consistency",
        reasoning: "Better performance, higher availability, can handle more transactions, acceptable for non-critical operations"
      }
    ],
    correct: "strong",
    explanation: "Financial systems require strong consistency to prevent double-spending, maintain accurate balances, and comply with regulatory requirements. The performance trade-off is acceptable for the critical nature of financial data."
  },
  {
    id: 6,
    title: "Real-time Analytics Dashboard",
    description: "You're building a dashboard for real-time analytics data.",
    question: "How would you handle the data pipeline?",
    options: [
      {
        id: "batch",
        label: "Batch Processing",
        reasoning: "More accurate data, easier to implement, better for complex analytics, cost-effective for large datasets"
      },
      {
        id: "stream",
        label: "Stream Processing",
        reasoning: "Real-time updates, lower latency, better user experience, can handle high velocity data"
      }
    ],
    correct: "stream",
    explanation: "Stream processing is better for real-time analytics dashboards. Users expect to see data updates as they happen, and the lower latency provides a better user experience. You can use techniques like approximate algorithms for real-time insights."
  }
];

export default function LearnPage() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("quizzes");
  const [currentQuiz, setCurrentQuiz] = useState<keyof typeof quizData>("caching-basics");
  const [currentFlashcardSet, setCurrentFlashcardSet] = useState<keyof typeof flashcardData>("consistency-models");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedTradeoff, setSelectedTradeoff] = useState<string | null>(null);
  const [showTradeoffExplanation, setShowTradeoffExplanation] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  
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

  const handleTradeoffSelection = (optionId: string) => {
    setSelectedTradeoff(optionId);
    setShowTradeoffExplanation(true);
  };

  const handleNextScenario = () => {
    if (currentScenario < tradeoffScenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedTradeoff(null);
      setShowTradeoffExplanation(false);
    } else {
      // Mark all scenarios as completed
      setCompletedScenarios([...Array(tradeoffScenarios.length).keys()]);
      toast({
        title: "🎉 All Scenarios Complete!",
        description: "Great job working through all the trade-off scenarios!",
      });
    }
  };

  const resetScenarios = () => {
    setCurrentScenario(0);
    setSelectedTradeoff(null);
    setShowTradeoffExplanation(false);
    setCompletedScenarios([]);
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
                <TabsTrigger value="scenarios">Trade-offs</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              {/* Quizzes Tab */}
              <TabsContent value="quizzes" className="space-y-6">
                {/* Quiz Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {Object.entries(quizData).map(([key, quiz]) => (
                    <Card 
                      key={key} 
                      className={`cursor-pointer transition-all ${currentQuiz === key ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                      onClick={() => {
                        setCurrentQuiz(key as keyof typeof quizData);
                        resetQuiz();
                      }}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <CardDescription className="text-sm">{quiz.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Badge variant="secondary">{quiz.questions.length} questions</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

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
                {/* Flashcard Set Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {Object.entries(flashcardData).map(([key, set]) => (
                    <Card 
                      key={key} 
                      className={`cursor-pointer transition-all ${currentFlashcardSet === key ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                      onClick={() => {
                        setCurrentFlashcardSet(key as keyof typeof flashcardData);
                        resetFlashcards();
                      }}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{set.title}</CardTitle>
                        <CardDescription className="text-sm">{set.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Badge variant="secondary">{set.cards.length} cards</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

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

              {/* Trade-off Scenarios Tab */}
              <TabsContent value="scenarios" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Trade-off Scenarios
                    </CardTitle>
                    <CardDescription>
                      Practice making design decisions with real-world trade-offs. Scenario {currentScenario + 1} of {tradeoffScenarios.length}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentScenario < tradeoffScenarios.length ? (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">{tradeoffScenarios[currentScenario].title}</h3>
                          <p className="text-gray-600">{tradeoffScenarios[currentScenario].description}</p>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Scenario Question:</h4>
                            <p className="text-blue-800">{tradeoffScenarios[currentScenario].question}</p>
                          </div>
                        </div>

                        {!showTradeoffExplanation ? (
                          <div className="space-y-4">
                            <h4 className="font-medium">Choose your approach:</h4>
                            {tradeoffScenarios[currentScenario].options.map((option) => (
                              <Card 
                                key={option.id}
                                className={`cursor-pointer transition-all hover:shadow-md ${
                                  selectedTradeoff === option.id ? 'ring-2 ring-blue-500' : ''
                                }`}
                                onClick={() => handleTradeoffSelection(option.id)}
                              >
                                <CardContent className="p-4">
                                  <div className="font-medium mb-2">{option.label}</div>
                                  <div className="text-sm text-gray-600">{option.reasoning}</div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Your Choice:</h4>
                              <p>{tradeoffScenarios[currentScenario].options.find(opt => opt.id === selectedTradeoff)?.label}</p>
                            </div>
                            
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="font-medium text-green-900 mb-2">Model Answer:</h4>
                              <p className="text-green-800 mb-2">{tradeoffScenarios[currentScenario].options.find(opt => opt.id === tradeoffScenarios[currentScenario].correct)?.label}</p>
                              <p className="text-sm text-green-700">{tradeoffScenarios[currentScenario].explanation}</p>
                            </div>

                            <div className="flex justify-between">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedTradeoff(null);
                                  setShowTradeoffExplanation(false);
                                }}
                              >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Options
                              </Button>
                              
                              <Button onClick={handleNextScenario}>
                                {currentScenario === tradeoffScenarios.length - 1 ? 'Finish All' : 'Next Scenario'}
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="space-y-2">
                          <div className="text-4xl">🎉</div>
                          <div className="text-xl font-semibold">All Scenarios Complete!</div>
                          <div className="text-gray-600">
                            You've worked through all {tradeoffScenarios.length} trade-off scenarios.
                          </div>
                        </div>
                        
                        <Button onClick={resetScenarios} variant="outline">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Review Again
                        </Button>
                      </div>
                    )}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-blue-600">3</div>
                        <div className="text-sm text-gray-600">Quiz Topics</div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Brain className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <div className="text-sm text-gray-600">Flashcard Sets</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="text-2xl font-bold text-purple-600">6</div>
                        <div className="text-sm text-gray-600">Trade-off Scenarios</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button asChild>
                        <a href={`/profile/${user.username || user.id}`}>View Full Profile</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <style jsx>{`
        .flip-card {
          background-color: transparent;
          width: 100%;
          height: 300px;
          perspective: 1000px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flip-card-front {
          background-color: #f9fafb;
          color: #374151;
        }

        .flip-card-back {
          background-color: #3b82f6;
          color: white;
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
