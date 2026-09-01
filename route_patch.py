import re

with open('src/main.tsx', 'r') as f:
    content = f.read()

# Add imports
imports_to_add = """const QuizDashboard = lazy(() => import("./pages/QuizDashboard.tsx"));
const ActiveQuiz = lazy(() => import("./pages/ActiveQuiz.tsx"));"""

content = re.sub(r'(const PrintView = lazy\(\(\) => import\("\./pages/PrintView\.tsx"\)\);\n)', r'\1' + imports_to_add + '\n', content)

# Add routes
routes_to_add = """            <Route path="/quiz" element={<QuizDashboard />} />
            <Route path="/quiz/active" element={<ActiveQuiz />} />"""

content = re.sub(r'(<Route path="/print" element={<PrintView />} />\n)', r'\1' + routes_to_add + '\n', content)

with open('src/main.tsx', 'w') as f:
    f.write(content)

print("Patched src/main.tsx")
