import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Update import
content = content.replace('import { useLocalStorage } from "@/lib/local-storage";', 'import { useLocalStorage } from "@/hooks/useLocalStorage";')

# Update state variables to use useLocalStorage
content = re.sub(
    r'const \[exam, setExam\] = useState<"school" \| "jee" \| "neet" \| null>\(null\);',
    'const [exam, setExam] = useLocalStorage<"school" | "jee" | "neet" | null>("askformula-exam", null);',
    content
)
content = re.sub(
    r'const \[selectedClass, setSelectedClass\] = useState<string \| null>\(null\);',
    'const [selectedClass, setSelectedClass] = useLocalStorage<string | null>("askformula-class", null);',
    content
)
content = re.sub(
    r'const \[subject, setSubject\] = useState<string \| null>\(null\);',
    'const [subject, setSubject] = useLocalStorage<string | null>("askformula-subject", null);',
    content
)

refs_str = """
  const classRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const formulaRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setExam(null);
    setSelectedClass(null);
    setSubject(null);
    setSelectedChapters([]);
  };
"""

# Try to insert after selectedChapters
content = re.sub(r'(const \[selectedChapters, setSelectedChapters\] = useLocalStorage<string\[\]>\(\s*"askformula-selected-chapters",\s*\[\]\s*\);)', r'\1' + refs_str, content)


with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
