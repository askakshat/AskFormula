import re

with open('src/pages/Build.tsx', 'r') as f:
    content = f.read()

# Add missing handlers that the new layout relies on but old one didn't expose identically
handlers = """
  const selectAllChapters = () => {
    setSelectedChapters(chapters.map(c => c.name));
  };

  const clearSelection = () => {
    setSelectedChapters([]);
  };

  const toggleChapter = (chapterName: string) => {
    setSelectedChapters(prev =>
      prev.includes(chapterName)
        ? prev.filter(c => c !== chapterName)
        : [...prev, chapterName]
    );
  };
"""

content = content.replace('  const handleSubjectSelect = (s: string) => {', handlers + '\n  const handleSubjectSelect = (s: string) => {')

# Fix Chapter[] type error in PDFButton mapping by passing the full chapter objects instead of just strings
# We need to filter `chapters` based on `selectedChapters` array of strings
pdf_button_old = """                <PDFButton
                  disabled={selectedChapters.length === 0}
                  formulas={formulas}
                  chapters={selectedChapters}
                  subject={subject || ""}
                  exam={exam || ""}
                />"""
pdf_button_new = """                <PDFButton
                  disabled={selectedChapters.length === 0}
                  formulas={formulas}
                  chapters={chapters.filter(c => selectedChapters.includes(c.name))}
                  subject={subject || ""}
                  exam={exam || ""}
                />"""
content = content.replace(pdf_button_old, pdf_button_new)

with open('src/pages/Build.tsx', 'w') as f:
    f.write(content)

with open('src/pages/Landing.tsx', 'r') as f:
    landing = f.read()

# I see landing page failed to build again with duplicate shootingStars, likely the previous patch didn't take correctly
# if there were multiple blocks or we got a bad state.

duplicate_pattern = r"""  const shootingStars = React\.useMemo\(\(\) => \{\n    return \[\.\.\.Array\(6\)\]\.map\(\(_, i\) => \(\{\n      id: i,\n      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity\n      top: `\$\{Math\.random\(\) \* 50 - 10\}%`,\n      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity\n      left: `\$\{Math\.random\(\) \* 80 \+ 20\}%`,\n      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity\n      duration: `\$\{Math\.random\(\) \* 6 \+ 4\}s`,\n      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity\n      delay: `\$\{Math\.random\(\) \* 10\}s`\n    \}\)\);\n  \}, \[\]\);\n\n"""
landing = re.sub(duplicate_pattern, '', landing, count=1)

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(landing)
