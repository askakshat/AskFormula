import re

with open('src/pages/QuizDashboard.tsx', 'r') as f:
    content = f.read()

# I see my previous patch_biology.py might have failed to replace the useMemo for chapters.
# Let's check exactly what's there and replace it.
chapters_memo_regex = r"""  const chapters = useMemo\(\(\) => \{
    if \(!subject\) return \[\];
    return getChaptersBySubject\(subject\)\.filter\(
      \(ch\) => !selectedClass \|\| ch\.class === selectedClass,
    \);
  \}, \[subject, selectedClass\]\);"""

chapters_memo_replacement = """  const chapters = useMemo(() => {
    if (!subject) return [];
    return getChaptersBySubject(exam === "jee" ? "JEE " + subject : subject).filter(
      (ch) => !selectedClass || ch.class === selectedClass,
    );
  }, [subject, selectedClass, exam]);"""

content = re.sub(chapters_memo_regex, chapters_memo_replacement, content, flags=re.DOTALL)

with open('src/pages/QuizDashboard.tsx', 'w') as f:
    f.write(content)
