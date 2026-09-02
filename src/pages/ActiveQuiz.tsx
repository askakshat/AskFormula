import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuizEngine, QuizQuestion } from '@/hooks/useQuizEngine';
import { useLocalStorage } from '@/lib/local-storage';
import QuizCard from '@/components/askformula/QuizCard';
import { X, Timer } from 'lucide-react';

export default function ActiveQuiz() {
  const navigate = useNavigate();
  const [selectedChapters] = useLocalStorage<string[]>("askformula-quiz-chapters", []);
  const { generateQuiz } = useQuizEngine(selectedChapters);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | null>>({});

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestions(generateQuiz(10));
    setIsTimerRunning(true);
  }, [generateQuiz]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (id: string) => {
    if (showFeedback) return;
    if (id === 'submit' && selectedOptionId) {
       setShowFeedback(true);
       setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedOptionId }));
       if (selectedOptionId === currentQuestion.correctOptionId) {
           setScore(prev => prev + 1);
       }
    } else {
       setSelectedOptionId(id);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setShowFeedback(false);
    } else {
      setIsTimerRunning(false);
      navigate('/quiz/results', {
          state: {
              score,
              total: questions.length,
              questions,
              userAnswers,
              timeElapsed
          },
          replace: true
      });
    }
  };

  const exitQuiz = () => {
    navigate('/quiz');
  };

  if (!currentQuestion) {
      return <div className="min-h-screen bg-[#11131a] flex items-center justify-center text-[#e3e2e6]">Initializing Engine...</div>;
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#11131a] text-[#e3e2e6] font-sans flex flex-col antialiased selection:bg-[#324565] selection:text-[#d8e2ff]">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-[1200px] mx-auto mt-8">

        <div className="w-full max-w-2xl flex justify-between items-center mb-8">
          <button
            onClick={exitQuiz}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm px-3 py-1.5 rounded border border-[#272a31] hover:bg-[#1c1e26]"
          >
            <X className="w-4 h-4" />
            Exit Practice
          </button>

          <div className="flex items-center gap-2 text-[#d8e2ff] font-mono text-sm bg-[#1c1e26] px-4 py-2 rounded border border-[#272a31]">
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
        </div>

        <QuizCard
           question={currentQuestion}
           currentIndex={currentIndex}
           totalQuestions={questions.length}
           selectedOptionId={selectedOptionId}
           onSelectOption={handleSelect}
           showFeedback={showFeedback}
           onNext={handleNext}
         />
      </main>
    </div>
  );
}
