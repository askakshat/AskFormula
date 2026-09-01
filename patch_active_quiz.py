import re

with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    content = f.read()

# Add userAnswers state tracking
content = content.replace(
    'const [score, setScore] = useState(0);',
    '''const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | null>>({});'''
)

# Update handleSelect to record answer
content = content.replace(
    '''    if (id === 'submit' && selectedOptionId) {
       setShowFeedback(true);
       if (selectedOptionId === currentQuestion.correctOptionId) {
           setScore(prev => prev + 1);
       }
    }''',
    '''    if (id === 'submit' && selectedOptionId) {
       setShowFeedback(true);
       setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedOptionId }));
       if (selectedOptionId === currentQuestion.correctOptionId) {
           setScore(prev => prev + 1);
       }
    }'''
)

# Update finish navigation
content = re.sub(
    r'if \(isFinished\) \{[\s\S]*?return \([\s\S]*?</div>\n          </div>\n      \)\n  \}',
    '''if (isFinished) {
      // Defer navigation to useEffect to prevent render warnings
      Promise.resolve().then(() => {
          navigate('/quiz/results', {
              state: {
                  score,
                  total: questions.length,
                  questions,
                  userAnswers
              },
              replace: true
          });
      });
      return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Calculating results...</div>;
  }''',
    content
)

with open('src/pages/ActiveQuiz.tsx', 'w') as f:
    f.write(content)
