import re

with open('src/pages/Build.tsx', 'r') as f:
    content = f.read()

# Fix unused imports by removing them
content = re.sub(r'import { RotateCcw } from "lucide-react";\n', '', content)
content = re.sub(r'import ExamSelector from "@/components/askformula/ExamSelector";\n', '', content)
content = re.sub(r'import ClassSelector from "@/components/askformula/ClassSelector";\n', '', content)
content = re.sub(r'import SubjectSelector from "@/components/askformula/SubjectSelector";\n', '', content)
content = re.sub(r'import ChapterSelector from "@/components/askformula/ChapterSelector";\n', '', content)
content = re.sub(r'import GlobalSearch from "@/components/askformula/GlobalSearch";\n', '', content)

# Fix unused variables
content = re.sub(r'  const classRef = useRef<HTMLDivElement>\(null\);\n', '', content)
content = re.sub(r'  const subjectRef = useRef<HTMLDivElement>\(null\);\n', '', content)

content = re.sub(r'  const handleReset = \(\) => \{\n[\s\S]*?  \};\n\n', '', content)
content = re.sub(r'  const handleExamSelect = \(e: "school" \| "jee" \| "neet"\) => \{\n[\s\S]*?  \};\n\n', '', content)
content = re.sub(r'  const handleClassSelect = \(c: string\) => \{\n[\s\S]*?  \};\n\n', '', content)

# Fix explicit any in type casting
content = content.replace('setExam(track.id as any);', 'setExam(track.id as "school" | "jee" | "neet");')

with open('src/pages/Build.tsx', 'w') as f:
    f.write(content)
