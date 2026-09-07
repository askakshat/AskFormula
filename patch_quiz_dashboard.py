import re

with open("src/pages/QuizDashboard.tsx", "r") as f:
    content = f.read()

cleanup_code = """
  // Cleanup stale chapter IDs on mount
  useEffect(() => {
     const validIds = new Set(allSubjects.flatMap(s => s.chapters.map(c => c.id)));
     const filtered = selectedChapters.filter(id => validIds.has(id));
     if (filtered.length !== selectedChapters.length) {
         setSelectedChapters(filtered);
     }
  }, []);
"""

# Insert the cleanup code right after the state declarations
content = re.sub(
    r'(const \[selectedSubject, setSelectedSubject\] = useState<string \| null>\(null\);)',
    r'\1\n' + cleanup_code,
    content
)

# Make sure useEffect is imported
if "import { useState, useMemo" in content:
    content = content.replace("import { useState, useMemo", "import { useState, useMemo, useEffect")
elif "import { useState" in content and "useEffect" not in content:
    content = content.replace("import { useState", "import { useState, useEffect")

with open("src/pages/QuizDashboard.tsx", "w") as f:
    f.write(content)
