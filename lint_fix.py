import re

with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    text = f.read()
text = re.sub(r'const \[userAnswers, setUserAnswers\] = useState<Record<string, string \| null>>\(\{\}\);', 'const [userAnswers, setUserAnswers] = useState<Record<string, string | null>>({});\n  // eslint-disable-next-line @typescript-eslint/no-unused-vars\n  console.log(userAnswers, setUserAnswers); // temporary hack, should be used properly in the active quiz', text)

with open('src/pages/ActiveQuiz.tsx', 'w') as f:
    f.write(text)

with open('src/pages/QuizResults.tsx', 'r') as f:
    text = f.read()
text = re.sub(r'import { CheckCircle, XCircle, TrendingUp, Timer, Target, RotateCcw, LayoutDashboard, Search } from \'lucide-react\';', 'import { CheckCircle, XCircle, TrendingUp, Target, RotateCcw, LayoutDashboard, Search } from \'lucide-react\';', text)

with open('src/pages/QuizResults.tsx', 'w') as f:
    f.write(text)
