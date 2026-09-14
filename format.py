import subprocess
import os

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Instead of fighting with regex, I'll copy the original working code, and manually
# do exactly the three required changes:
# 1. move the old background wrapper
# 2. reorder the feature blocks
# We'll use a very careful replacement logic.

subprocess.run(['git', 'checkout', 'ab9208a', '--', 'src/pages/Landing.tsx']) # The original commit before this session?
# Or just use the `/tmp/landing_original.tsx` which we confirmed works.

with open('/tmp/landing_original.tsx', 'r') as f:
    orig = f.read()

# Let's count tags in original:
import re
print("Orig div balance:", len(re.findall(r'<div\b[^>]*>', orig)) - len(re.findall(r'</div\b[^>]*>', orig)))
