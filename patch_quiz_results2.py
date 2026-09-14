import re
with open('src/pages/QuizResults.tsx', 'r') as f:
    content = f.read()

# Update DetailedResult interface
content = content.replace(
"""interface DetailedResult {
  questionId: string;
  chapterId: string;
  isCorrect: boolean;
  timeSpent: number;
}""",
"""interface DetailedResult {
  questionId: string;
  chapterId: string;
  isCorrect: boolean;
  timeSpent: number;
  questionText: string;
  userAnswerText: string;
  correctAnswerText: string;
}"""
)

# Remove "session pace" and "current status" boxes.
# Search for them:
#             {/* Time / Pace Placeholder */}
#             ...
#             {/* Streak / Motivation Placeholder */}
#             ...
#           </div>

regex_remove_boxes = r'\{\/\* Time / Pace Placeholder \*\/\}.*?\{\/\* Streak / Motivation Placeholder \*\/\}.*?</div>\s*</div>'
content = re.sub(regex_remove_boxes, '</div>\n          </div>', content, flags=re.DOTALL)

# Add the breakdown section before the action row.
breakdown_ui = """
          {/* Detailed Breakdown */}
          <div className="mb-8">
            <h3 className="text-xl font-serif text-white mb-4">Question Breakdown</h3>
            <div className="space-y-4">
              {detailedResults.map((result, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${result.isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      {result.isCorrect ? (
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white/90 mb-2">{result.questionText}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                          <span className="text-white/40 block mb-1">Your Answer:</span>
                          <span className={result.isCorrect ? "text-emerald-300" : "text-rose-300"}>{result.userAnswerText}</span>
                        </div>
                        {!result.isCorrect && (
                          <div className="bg-white/5 p-2 rounded-lg border border-emerald-500/10">
                            <span className="text-white/40 block mb-1">Correct Answer:</span>
                            <span className="text-emerald-300">{result.correctAnswerText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
"""

content = content.replace('{/* Action Row */}', breakdown_ui)

with open('src/pages/QuizResults.tsx', 'w') as f:
    f.write(content)
