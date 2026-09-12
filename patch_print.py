import re

with open('src/pages/PrintView.tsx', 'r') as f:
    content = f.read()

# Fallback in case includeContent is missing or malformed to ensure formulas show up
content = content.replace('const hasFormulas =\n            includeContent.includes("formulas") && items.length > 0;', 'const hasFormulas =\n            (!includeContent || includeContent.length === 0 || includeContent.includes("formulas")) && items.length > 0;')
content = content.replace('const hasKeyPoints =\n            includeContent.includes("keyPoints") && keyPoints.length > 0;', 'const hasKeyPoints =\n            (!includeContent || includeContent.length === 0 || includeContent.includes("keyPoints")) && keyPoints.length > 0;')
content = content.replace('const hasDerivations =\n            includeContent.includes("keyDerivations") &&\n            keyDerivations.length > 0;', 'const hasDerivations =\n            (!includeContent || includeContent.length === 0 || includeContent.includes("keyDerivations")) && keyDerivations.length > 0;')

with open('src/pages/PrintView.tsx', 'w') as f:
    f.write(content)
