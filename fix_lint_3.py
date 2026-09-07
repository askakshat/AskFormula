with open("src/hooks/useQuizEngine.ts", "r") as f:
    content = f.read()

content = content.replace("            // const trueSameTopic = trueOptions", "")
content = content.replace("            // const isReasoningCorrect = isAssertionCorrect", "")

# aggressive whitespace cleanup
lines = content.split('\n')
for i, line in enumerate(lines):
    lines[i] = line.replace('\t', '    ')
content = '\n'.join(lines)

with open("src/hooks/useQuizEngine.ts", "w") as f:
    f.write(content)
