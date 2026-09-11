import re

with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace('font-family: var(--font-sans);\n}', 'font-family: var(--font-sans);\n  }\n}')

content = content.replace("""/* Disable generic Liquid DOM surface styles since we're replacing them */

.fresh-header-shell,
 {
  display: none !important;
}""", "")

with open('src/index.css', 'w') as f:
    f.write(content)
