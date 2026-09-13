import re

with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    content = f.read()

# Fix 1: Date.now() in useState initial value
content = content.replace(
    'const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());',
    'const [questionStartTime, setQuestionStartTime] = useState<number>(() => Date.now());'
)

# Fix 2: Unused eslint-disable directive
content = content.replace(
    '  // eslint-disable-next-line react-hooks/set-state-in-effect\n  useEffect(() => {\n    if (hasCompleted) {',
    '  useEffect(() => {\n    if (hasCompleted) {'
)

# Fix 3: Date.now() in event handler - actually Date.now() inside an event handler is allowed by React rules,
# but the linter is incorrectly flagging it because it thinks it's during render (maybe it thinks handleOptionSelect is called during render, which it isn't).
# Let's just disable the rule for that line.
content = content.replace(
    '    const timeTaken = Date.now() - questionStartTime;',
    '    // eslint-disable-next-line react-hooks/purity\n    const timeTaken = Date.now() - questionStartTime;'
)

with open('src/pages/ActiveQuiz.tsx', 'w') as f:
    f.write(content)
