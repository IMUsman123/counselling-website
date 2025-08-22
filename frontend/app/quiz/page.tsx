'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Target, Users, TrendingUp, Sparkles, Trophy, Star } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: Array<{
    text: string;
    score: Record<string, number>;
  }>;
}

interface QuizResult {
  career: string;
  score: number;
  description: string;
  scope: string;
  demand: string;
  salary: string;
  skills: string[];
  personality: string[];
  allScores: Record<string, number>;
}

export default function QuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizData, setQuizData] = useState<{ questions: Question[]; careers: string[] } | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState('');

  // Helper functions for roadmap and YouTube videos
  const getRoadmapSteps = (career: string) => {
    const roadmaps: { [key: string]: string[] } = {
      "Software Engineer": [
        "Learn HTML, CSS, and JavaScript basics",
        "Master a programming language (Python, Java, or C++)",
        "Learn data structures and algorithms",
        "Study web frameworks (React, Node.js, or Django)",
        "Build real-world projects and contribute to open source",
        "Apply for internships and entry-level positions"
      ],
      "Data Scientist": [
        "Learn Python, Statistics, and Mathematics fundamentals",
        "Master data manipulation with Pandas and NumPy",
        "Learn data visualization with Matplotlib and Seaborn",
        "Study Machine Learning algorithms and libraries",
        "Participate in Kaggle competitions and build projects",
        "Apply for Data Science roles and internships"
      ],
      "Marketing Manager": [
        "Learn marketing fundamentals and consumer behavior",
        "Master digital marketing tools and platforms",
        "Study analytics and data interpretation",
        "Learn content creation and social media management",
        "Build a portfolio with real marketing campaigns",
        "Apply for marketing coordinator or assistant roles"
      ],
      "Healthcare Professional": [
        "Complete required education and certifications",
        "Gain hands-on experience through internships",
        "Develop patient care and communication skills",
        "Learn medical procedures and protocols",
        "Build professional network in healthcare",
        "Apply for positions in hospitals or clinics"
      ],
      "Financial Analyst": [
        "Study finance, accounting, and economics",
        "Learn Excel, financial modeling, and analysis tools",
        "Understand financial statements and ratios",
        "Study investment principles and market analysis",
        "Build financial models and analysis projects",
        "Apply for financial analyst or intern positions"
      ],
      "Designer": [
        "Learn design principles and color theory",
        "Master design software (Figma, Adobe Creative Suite)",
        "Study user experience and user interface design",
        "Build a portfolio with diverse design projects",
        "Learn about design trends and industry standards",
        "Apply for design internships or freelance work"
      ],
      "Teacher": [
        "Complete education degree and teacher certification",
        "Gain classroom experience through student teaching",
        "Develop lesson planning and classroom management skills",
        "Learn about educational technology and methods",
        "Build relationships with schools and educators",
        "Apply for teaching positions or substitute roles"
      ],
      "Sales Representative": [
        "Learn sales techniques and customer psychology",
        "Develop communication and negotiation skills",
        "Study product knowledge and market research",
        "Practice cold calling and lead generation",
        "Build a network of potential clients",
        "Apply for sales positions or internships"
      ]
    };
    return roadmaps[career] || roadmaps["Software Engineer"];
  };

  const getYouTubeVideos = (career: string) => {
    const videos: { [key: string]: { title: string; url: string }[] } = {
      "Software Engineer": [
        { title: "Learn Web Development in 2025", url: "https://www.youtube.com/watch?v=VfGW0Qiy2I0" },
        { title: "Next.js Full Course for Beginners", url: "https://www.youtube.com/watch?v=1WmNXEVia8I" },
        { title: "Supabase + Next.js Tutorial", url: "https://www.youtube.com/watch?v=2tQOI6ZpXjY" }
      ],
      "Data Scientist": [
        { title: "Introduction to Data Science", url: "https://www.youtube.com/watch?v=ua-CiDNNj30" },
        { title: "Machine Learning Crash Course", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ" },
        { title: "Data Science Projects Guide", url: "https://www.youtube.com/watch?v=Y6M89-6106I" }
      ],
      "Marketing Manager": [
        { title: "Digital Marketing for Beginners", url: "https://www.youtube.com/watch?v=HxXWu7tX0bY" },
        { title: "Social Media Marketing Strategy", url: "https://www.youtube.com/watch?v=9oY9OLHvDsA" },
        { title: "Marketing Analytics Tutorial", url: "https://www.youtube.com/watch?v=8W8lNvckzAs" }
      ],
      "Healthcare Professional": [
        { title: "Healthcare Career Paths", url: "https://www.youtube.com/watch?v=QxKdHnUuQ6E" },
        { title: "Patient Care Fundamentals", url: "https://www.youtube.com/watch?v=7cSgFboj0As" },
        { title: "Medical Procedures Guide", url: "https://www.youtube.com/watch?v=8KvZzLw5hsI" }
      ],
      "Financial Analyst": [
        { title: "Financial Analysis Basics", url: "https://www.youtube.com/watch?v=EFx-w_bVXe0" },
        { title: "Excel for Financial Modeling", url: "https://www.youtube.com/watch?v=KjAv2JAG_QI" },
        { title: "Investment Analysis Tutorial", url: "https://www.youtube.com/watch?v=3zxJznNB16c" }
      ],
      "Designer": [
        { title: "UI/UX Design Fundamentals", url: "https://www.youtube.com/watch?v=7kVeCqIPxlE" },
        { title: "Figma Tutorial for Beginners", url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8" },
        { title: "Design Portfolio Tips", url: "https://www.youtube.com/watch?v=9l0MzR-O1Q4" }
      ],
      "Teacher": [
        { title: "Teaching Strategies for Beginners", url: "https://www.youtube.com/watch?v=6jQ7y_qQmBU" },
        { title: "Classroom Management Tips", url: "https://www.youtube.com/watch?v=GmG8QvHnJNU" },
        { title: "Lesson Planning Guide", url: "https://www.youtube.com/watch?v=8KvZzLw5hsI" }
      ],
      "Sales Representative": [
        { title: "Sales Techniques That Work", url: "https://www.youtube.com/watch?v=QxKdHnUuQ6E" },
        { title: "Cold Calling Mastery", url: "https://www.youtube.com/watch?v=7cSgFboj0As" },
        { title: "Building Client Relationships", url: "https://www.youtube.com/watch?v=8KvZzLw5hsI" }
      ]
    };
    return videos[career] || videos["Software Engineer"];
  };

  // Motion values for progress animation
  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, [0, 100], ["0%", "100%"]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load quiz data
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const response = await fetch('/api/quiz/data');
        if (response.ok) {
          const data = await response.json();
          setQuizData(data);
        } else {
          setError('Failed to load quiz data');
        }
      } catch (err) {
        setError('Failed to load quiz data');
      } finally {
        setLoadingQuiz(false);
      }
    };

    if (user) {
      loadQuizData();
    }
  }, [user]);

  // Update progress when question changes
  useEffect(() => {
    if (quizData) {
      const progressValue = ((currentQuestion + 1) / quizData.questions.length) * 100;
      progress.set(progressValue);
    }
  }, [currentQuestion, quizData, progress]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== (quizData?.questions.length || 0)) {
      setError('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/quiz/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          answers,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        setError('Failed to submit quiz results');
      }
    } catch (err) {
      setError('Failed to submit quiz results');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setError('');
  };

  if (loading || loadingQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Loading your career assessment...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
              className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Congratulations! 🎉
              </h1>
              <p className="text-xl text-gray-600 mb-8">You've discovered your perfect career path</p>
            </motion.div>
          </motion.div>

          {/* Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1, type: "spring" }}
                className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Target className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-4xl font-bold text-gradient mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                {result.career}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                {result.description}
              </motion.p>

              {/* Career Scope, Demand, and Salary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="grid md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto"
              >
                {/* Career Scope */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-700">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Career Scope
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{result.scope}</p>
                </motion.div>

                {/* Career Demand */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.65 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-purple-700">
                    <Users className="w-5 h-5 mr-2" />
                    Career Demand
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{result.demand}</p>
                </motion.div>

                {/* Salary Expectations */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700">
                    <Star className="w-5 h-5 mr-2" />
                    Salary Expectations
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{result.salary}</p>
                </motion.div>
              </motion.div>

              {/* Score Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-full px-6 py-3 mb-8"
              >
                <Star className="w-5 h-5 text-green-600 fill-current" />
                <span className="text-green-700 font-semibold">Compatibility Score: {result.score}/15</span>
              </motion.div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  Key Skills Required
                </h3>
                <div className="space-y-4">
                  {result.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 2 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                      <span className="text-gray-700">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Personality */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
              >
                <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <TrendingUp className="w-6 h-6 mr-3 text-purple-600" />
                  Personality Traits
                </h3>
                <div className="space-y-4">
                  {result.personality.map((trait, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 2.2 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                      <span className="text-gray-700">{trait}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Roadmap Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
              Learning Roadmap
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <ul className="space-y-3">
                {getRoadmapSteps(result.career).map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 2.4 + index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* YouTube Videos Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
              <Star className="w-6 h-6 mr-3 text-red-600" />
              Recent YouTube Videos
            </h3>
            <div className="grid gap-4">
              {getYouTubeVideos(result.career).map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 2.7 + index * 0.1 }}
                >
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <span className="text-red-600 text-lg">🎥</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 group-hover:text-red-600 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-sm text-gray-500">Click to watch →</p>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.0 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetake}
              className="btn-secondary text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl"
            >
              Take Quiz Again
            </motion.button>
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-lg"
              >
                Back to Home
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Target className="w-8 h-8 text-red-600" />
          </motion.div>
          <p className="text-red-600 mb-4 text-lg">{error}</p>
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-3 rounded-xl"
            >
              Back to Home
            </motion.div>
          </Link>
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 text-sm font-medium">Career Assessment Quiz</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Your Path
          </h1>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(((currentQuestion + 1) / quizData.questions.length) * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: progressWidth }}
              initial={{ width: "0%" }}
              animate={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold mb-8 text-gray-900 text-center"
          >
            {question.question}
          </motion.h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-6 text-left border-2 rounded-2xl transition-all duration-300 cursor-pointer group ${
                  answers[currentQuestion] === index 
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-800 group-hover:text-gray-900 transition-colors">
                    {option.text}
                  </span>
                  {answers[currentQuestion] === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-between items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-secondary flex items-center px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </motion.button>

          {currentQuestion === quizData.questions.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={answers.length !== quizData.questions.length || submitting}
              className="btn-primary flex items-center px-10 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {submitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                />
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Submit Quiz
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined}
              className="btn-primary flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          )}
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-center shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Target className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
