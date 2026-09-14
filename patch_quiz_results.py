import re

with open('src/pages/QuizResults.tsx', 'r') as f:
    content = f.read()

# I need to update the "detailedResults" parsing logic to also include the actual questions and answers.
# The user wants "a breakdown of each and every question in the result page, and the topics recommended for the formula sheet".
# To do this properly, the active quiz component needs to save the questions/answers to sessionStorage.

# First, let's see what is stored in "detailedResults" right now.
# In `QuizResults.tsx`, the interface is:
# interface DetailedResult {
#   questionId: string;
#   chapterId: string;
#   isCorrect: boolean;
#   timeSpent: number;
# }
# But we don't have the question text, the user's answer, or the correct answer.
