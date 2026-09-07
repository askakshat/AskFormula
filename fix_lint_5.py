with open("src/hooks/useQuizEngine.ts", "r") as f:
    content = f.read()

content = content.replace("    const isReasoningCorrect = Math.random() > 0.5;\n", "")

lines = content.split('\n')
for i, line in enumerate(lines):
    if "match = true" in line or "for" in line or "let match =" in line or "\t" in line:
        lines[i] = line.replace('\t', '    ')

    # Check for irregular whitespace
    new_line = ""
    for char in line:
        if char == ' ' or char == '\t':
            new_line += char
        elif char.isspace():
            new_line += ' '
        else:
            new_line += char
    lines[i] = new_line

content = '\n'.join(lines)

with open("src/hooks/useQuizEngine.ts", "w") as f:
    f.write(content)
