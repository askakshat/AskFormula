import re

with open('src/pages/Build.tsx', 'r') as f:
    content = f.read()

# PDFButton component also doesn't seem to expect `exam` prop based on previous structure
content = content.replace('                  exam={exam || ""}\n', '')

with open('src/pages/Build.tsx', 'w') as f:
    f.write(content)
