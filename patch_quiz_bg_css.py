import re

with open('src/index.css', 'r') as f:
    content = f.read()

new_bg = """.zen-gradient-bg {
  position: fixed !important;
  inset: 0 !important;
  z-index: -10 !important;
  background-image: url('/assets/quiz-bg.png') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
}"""

content = re.sub(r'\.zen-gradient-bg \{[^}]*\}', new_bg, content, flags=re.MULTILINE)

with open('src/index.css', 'w') as f:
    f.write(content)
