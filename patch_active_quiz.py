import re
with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    content = f.read()

# I need to add more details to the "detailedResults" object.
# I want to include the question text, the correct option text, the user's selected option text, and chapter name.
# Wait, `q` already has all this info. I'll just store the whole `q` object alongside the results.

replacement = """
      const detailedResults = questions.map((q, idx) => {
        const isCorrect = userAnswers[idx] === q.correctOptionId;
        if (isCorrect) correctCount++;

        const selectedOption = q.options.find(o => o.id === userAnswers[idx]);
        const correctOption = q.options.find(o => o.id === q.correctOptionId);

        return {
          questionId: q.id,
          chapterId: q.chapterId,
          isCorrect,
          timeSpent: timeSpent[idx] || 0,
          questionText: q.text,
          userAnswerText: selectedOption ? selectedOption.text : "Skipped",
          correctAnswerText: correctOption ? correctOption.text : "Unknown",
        };
      });
"""

# Replace the old `detailedResults` definition
content = re.sub(
    r'const detailedResults = questions.map\(\(q, idx\) => \{.*?\};\n\s*\}\);',
    replacement.strip(),
    content,
    flags=re.DOTALL
)

with open('src/pages/ActiveQuiz.tsx', 'w') as f:
    f.write(content)
