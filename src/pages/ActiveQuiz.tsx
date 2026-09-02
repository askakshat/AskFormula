import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuizEngine, QuizQuestion } from '@/hooks/useQuizEngine';
import { useLocalStorage } from '@/lib/local-storage';
import QuizCard from '@/components/askformula/QuizCard';

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestions(generateQuiz(10));
  }, [generateQuiz]);

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
      navigate('/quiz/results', {
          state: {
              score,
              total: questions.length,
              questions,
              userAnswers
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

  // Format timer (dummy static for now as per stitch UI)
  const timerDisplay = "12:45";

  return (
    <div className="min-h-screen bg-[#11131a] text-[#e3e2e6] font-sans flex flex-col antialiased selection:bg-[#324565] selection:text-[#d8e2ff]">

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-[1200px] mx-auto mt-8">

        {/* Header Actions */}
        <div className="w-full max-w-2xl flex justify-between items-center mb-8">
          <button
            onClick={exitQuiz}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm px-3 py-1.5 rounded border border-[#272a31] hover:bg-[#1c1e26]"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
            Exit Practice
          </button>

          <div className="flex items-center gap-2 text-[#d8e2ff] font-mono text-sm bg-[#1c1e26] px-4 py-2 rounded border border-[#272a31]">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>timer</span>
            <span>{timerDisplay}</span>
          </div>
        </div>

        {/* Question Container / Card */}
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
