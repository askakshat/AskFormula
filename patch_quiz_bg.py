import re

for filename in ['src/pages/ActiveQuiz.tsx', 'src/pages/QuizDashboard.tsx', 'src/pages/QuizResults.tsx']:
    with open(filename, 'r') as f:
        content = f.read()

    # Let's remove the bg-[#537594] class on the parent div since it might be overriding or blocking the fixed bg
    content = content.replace('className="min-h-screen flex flex-col relative bg-[#537594]"', 'className="min-h-screen flex flex-col relative"')

    with open(filename, 'w') as f:
        f.write(content)
