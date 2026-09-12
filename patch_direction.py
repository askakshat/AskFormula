import re

with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace('transform: translateX(0) translateY(0) rotate(-45deg);', 'transform: translateX(0) translateY(0) rotate(135deg);')
content = content.replace('transform: translateX(500px) translateY(500px) rotate(-45deg);', 'transform: translateX(-800px) translateY(800px) rotate(135deg);')

with open('src/index.css', 'w') as f:
    f.write(content)

with open('src/pages/Landing.tsx', 'r') as f:
    tsx = f.read()

# Make shooting stars start from right side more
tsx = tsx.replace('left: `${Math.random() * 80}%`,', 'left: `${Math.random() * 80 + 20}%`,')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(tsx)
