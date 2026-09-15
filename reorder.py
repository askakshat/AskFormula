import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Get Feature 1
f1_match = re.search(r'({\/\* Feature 1 \*\/}.*?)(?={\/\* Feature 4: Quizzes \*\/})', content, re.DOTALL)
f1 = f1_match.group(1).strip() if f1_match else ""

# Get Feature 4
f4_match = re.search(r'({\/\* Feature 4: Quizzes \*\/}.*?)(?=</div>\s*</div>\s*</section>)', content, re.DOTALL)
f4 = f4_match.group(1).strip() if f4_match else ""

# Get Feature 2
f2_match = re.search(r'({\/\* Feature 2 \*\/}.*?)(?={\/\* Feature 3 \*\/})', content, re.DOTALL)
f2 = f2_match.group(1).strip() if f2_match else ""

# Get Feature 3
f3_match = re.search(r'({\/\* Feature 3 \*\/}.*?)(?=</div>\s*</div>)', content, re.DOTALL)
f3 = f3_match.group(1).strip() if f3_match else ""

# Print lengths to verify we captured them
print(f"F1 len: {len(f1)}, F2 len: {len(f2)}, F3 len: {len(f3)}, F4 len: {len(f4)}")
