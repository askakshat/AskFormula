import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

duplicate_pattern = r"""  const shootingStars = React\.useMemo\(\(\) => \{\n    return \[\.\.\.Array\(6\)\]\.map\(\(_, i\) => \(\{\n      id: i,\n       \n      top: `\$\{Math\.random\(\) \* 50 - 10\}%`,\n       \n      left: `\$\{Math\.random\(\) \* 80 \+ 20\}%`,\n       \n      duration: `\$\{Math\.random\(\) \* 6 \+ 4\}s`,\n       \n      delay: `\$\{Math\.random\(\) \* 10\}s`\n    \}\)\);\n  \}, \[\]\);\n\n"""

# We just remove one of the duplicates by running a replace and then we can check
content = re.sub(duplicate_pattern, '', content, count=1)

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
