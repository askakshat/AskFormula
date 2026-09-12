import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

duplicate_pattern = r"""  const shootingStars = React\.useMemo\(\(\) => \{\n    return \[\.\.\.Array\(6\)\]\.map\(\(_, i\) => \(\{\n      id: i,\n      top: `\$\{Math\.random\(\) \* 50 - 10\}%`,\n      left: `\$\{Math\.random\(\) \* 80\}%`,\n      duration: `\$\{Math\.random\(\) \* 6 \+ 4\}s`,\n      delay: `\$\{Math\.random\(\) \* 10\}s`\n    \}\)\);\n  \}, \[\]\);\n\n"""

content = re.sub(duplicate_pattern, '', content)

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
