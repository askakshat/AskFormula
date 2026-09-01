import re

with open('src/main.tsx', 'r') as f:
    content = f.read()

imports_to_add = "const QuizResults = lazy(() => import(\"./pages/QuizResults.tsx\"));"
content = re.sub(r'(const ActiveQuiz = lazy\(\(\) => import\("\./pages/ActiveQuiz\.tsx"\)\);\n)', r'\1' + imports_to_add + '\n', content)

routes_to_add = '            <Route path="/quiz/results" element={<QuizResults />} />'
content = re.sub(r'(<Route path="/quiz/active" element={<ActiveQuiz />} />\n)', r'\1' + routes_to_add + '\n', content)

with open('src/main.tsx', 'w') as f:
    f.write(content)
