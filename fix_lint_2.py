import re

with open("src/hooks/useQuizEngine.ts", "r") as f:
    content = f.read()

# Fix irregular whitespace (tabs/mixed whitespace)
lines = content.split('\n')
for i, line in enumerate(lines):
    if "match = true" in line or "for" in line or "let match =" in line:
        lines[i] = line.replace('\t', '    ')
content = '\n'.join(lines)

with open("src/hooks/useQuizEngine.ts", "w") as f:
    f.write(content)
