import re

with open('index.html', 'r') as f:
    content = f.read()

content = content.replace('/vite.svg', '/assets/logo-new.png')

with open('index.html', 'w') as f:
    f.write(content)
