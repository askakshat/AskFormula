with open("src/pages/QuizDashboard.tsx", "r") as f:
    content = f.read()

content = content.replace("}, []);", "// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, []);")

with open("src/pages/QuizDashboard.tsx", "w") as f:
    f.write(content)

with open("src/hooks/useQuizEngine.ts", "r") as f:
    content = f.read()

content = content.replace("let swappedSign =", "const swappedSign =")
content = content.replace("let swappedNums =", "const swappedNums =")
content = content.replace("let distractorLatex = ", "const distractorLatex = ")
content = content.replace("const trueSameTopic = trueOptions", "// const trueSameTopic = trueOptions")
content = content.replace("const isReasoningCorrect = isAssertionCorrect", "// const isReasoningCorrect = isAssertionCorrect")
content = content.replace("const fracMatches =", "// const fracMatches =")

content = content.replace("        let match = false;\n\t\t\t\t\tfor", "        let match = false;\n                    for")
content = content.replace("                    if (latex.includes(prefix)) {\n\t\t\t\t\t\tmatch = true", "                    if (latex.includes(prefix)) {\n                        match = true")

with open("src/hooks/useQuizEngine.ts", "w") as f:
    f.write(content)
