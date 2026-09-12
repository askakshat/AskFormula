import re

with open('src/pages/Build.tsx', 'r') as f:
    content = f.read()

# PDFButton component doesn't expect `disabled` prop in this project
content = content.replace('                  disabled={selectedChapters.length === 0}\n', '')

with open('src/pages/Build.tsx', 'w') as f:
    f.write(content)
