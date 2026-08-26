import re

with open('src/lib/search.ts', 'r') as f:
    content = f.read()

content = content.replace("import { subjects } from '@/data/ncert';", """import physics from '@/data/ncert/physics.json';
import chemistry from '@/data/ncert/chemistry.json';
import mathematics from '@/data/ncert/mathematics.json';
import biology from '@/data/ncert/biology.json';
import { SubjectData } from '@/lib/formulas';

const subjects: SubjectData[] = [
  physics as SubjectData,
  chemistry as SubjectData,
  mathematics as SubjectData,
  biology as SubjectData
];""")

content = content.replace("some(tag =>", "some((tag: string) =>")

with open('src/lib/search.ts', 'w') as f:
    f.write(content)
