with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    text = f.read()

if "import { useLocalStorage } from '@/lib/local-storage';" not in text:
    text = text.replace("import { useQuizEngine, QuizQuestion } from '@/hooks/useQuizEngine';", "import { useQuizEngine, QuizQuestion } from '@/hooks/useQuizEngine';\nimport { useLocalStorage } from '@/lib/local-storage';")

with open('src/pages/ActiveQuiz.tsx', 'w') as f:
    f.write(text)
