import re
with open('src/pages/QuizDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('setExam(track.id as any);', 'setExam(track.id as "school" | "jee" | "neet");')

with open('src/pages/QuizDashboard.tsx', 'w') as f:
    f.write(content)
