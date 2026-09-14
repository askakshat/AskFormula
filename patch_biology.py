import re

with open('src/pages/Build.tsx', 'r') as f:
    content = f.read()

# Make Biology disabled/hidden for JEE in Build page
biology_block = """{["Physics", "Chemistry", "Mathematics", "Biology"].map(sub => ("""
biology_replacement = """{["Physics", "Chemistry", "Mathematics", "Biology"]
                      .filter(sub => !(exam === "jee" && sub === "Biology"))
                      .map(sub => ("""

content = content.replace(biology_block, biology_replacement)

with open('src/pages/Build.tsx', 'w') as f:
    f.write(content)

with open('src/pages/QuizDashboard.tsx', 'r') as f:
    content = f.read()

# Make Biology disabled/hidden for JEE in QuizDashboard
biology_block2 = """{["Physics", "Chemistry", "Mathematics", "Biology"].map((sub) => ("""
biology_replacement2 = """{["Physics", "Chemistry", "Mathematics", "Biology"]
                  .filter(sub => !(exam === "jee" && sub === "Biology"))
                  .map((sub) => ("""

content = content.replace(biology_block2, biology_replacement2)

# Lock NEET UG Option in Quiz Dashboard
# Wait, let's see how NEET is structured in Quiz Dashboard
neet_regex = r'\{ id: "neet", label: "NEET UG", desc: "High-speed formula recall" \}'
neet_replacement = '{ id: "neet", label: "NEET UG", desc: "High-speed formula recall (Coming Soon)", disabled: true }'
content = re.sub(neet_regex, neet_replacement, content)

# Check the click handler for exam in QuizDashboard to respect disabled
click_handler_regex = r'onClick=\{\(\) => \{ setExam\(track\.id as "school" \| "jee" \| "neet"\);'
click_handler_replacement = r'onClick={() => { if (track.disabled) return; setExam(track.id as "school" | "jee" | "neet");'
content = re.sub(click_handler_regex, click_handler_replacement, content)

# Check the class name for disabled state
class_regex = r'className=\{`relative p-5 rounded-2xl border text-left transition-all duration-300 \$\{\n\s*exam === track.id\n\s*\? "bg-\[rgba\(162,212,248,0.06\)\] border-\[#a2d4f8\]/50 shadow-\[0_0_25px_rgba\(162,212,248,0.12\)\]"\n\s*: "bg-white/\[0.02\] border-white/\[0.08\] hover:bg-white/\[0.04\] hover:border-white/\[0.15\]"\n\s*\}\`\}'
class_replacement = r"""className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                      track.disabled ? 'opacity-50 cursor-not-allowed bg-black/20 border-white/5' :
                      exam === track.id
                        ? "bg-[rgba(162,212,248,0.06)] border-[#a2d4f8]/50 shadow-[0_0_25px_rgba(162,212,248,0.12)]"
                        : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15]"
                    }`}"""
content = re.sub(class_regex, class_replacement, content)


# In QuizDashboard, the `chapters` memo needs to fetch JEE chapters when JEE is selected.
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

content = content.replace(chapters_memo_regex, chapters_memo_replacement)

# Update `handleStartQuiz` to save exam/subject properly if needed.
# Let's check `sessionStorage.setItem("quiz-subject", subject);`
# It might be good to save `exam === "jee" ? "JEE " + subject : subject`
quiz_start_regex = r'sessionStorage\.setItem\("quiz-subject", subject\);'
quiz_start_replacement = r'sessionStorage.setItem("quiz-subject", exam === "jee" ? "JEE " + subject : subject);'
content = re.sub(quiz_start_regex, quiz_start_replacement, content)

with open('src/pages/QuizDashboard.tsx', 'w') as f:
    f.write(content)
