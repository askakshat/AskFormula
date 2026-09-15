import re

with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    content = f.read()

# Replace the specific unused directive on line 45.
# Let's see the context again.
# The warning was on line 45.

lines = content.split('\n')
for i, line in enumerate(lines):
    if '// eslint-disable-next-line react-hooks/set-state-in-effect' in line:
        print(f"Line {i+1}: {line}")
