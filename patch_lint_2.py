import re

with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '// eslint-disable-next-line react-hooks/set-state-in-effect\n  useEffect(() => {\n    if (hasCompleted) {',
    'useEffect(() => {\n    if (hasCompleted) {'
)

# And try removing the eslint-disable on Date.now in handleOptionSelect, maybe I can just wrap it in useCallback?
# Actually wait, handleOptionSelect IS just a normal function declaration inside the component. The linter flagged it as part of render because it's not wrapped in useCallback. Let's see if we can wrap it.
content = content.replace(
    '// eslint-disable-next-line react-hooks/purity\n    const timeTaken = Date.now() - questionStartTime;',
    '// eslint-disable-next-line react-hooks/purity\n    const timeTaken = Date.now() - questionStartTime;'
)

with open('src/pages/ActiveQuiz.tsx', 'w') as f:
    f.write(content)
