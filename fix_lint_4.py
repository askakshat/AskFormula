with open("src/hooks/useQuizEngine.ts", "r") as f:
    content = f.read()

content = content.replace("const trueSameTopic = stripTheoryPrefix(point.text); // Wait, we need another true statement from the same topic ideally.", "")
content = content.replace("const isReasoningCorrect = isAssertionCorrect ? true : Math.random() > 0.5;", "")

# Fix irregular whitespace (this time more thoroughly by checking for non-breaking space char 0xA0)
content = content.replace(chr(0xA0), ' ')
content = content.replace(chr(0x200B), '') # zero width space

with open("src/hooks/useQuizEngine.ts", "w") as f:
    f.write(content)
