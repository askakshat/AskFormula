import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# I will use a very simple and robust string replacement strategy since we have the original file.
# The original file is perfectly formatted. I just need to move the wrapper and reorder the features.

# Let's extract exactly the feature blocks.
f1_match = re.search(r'({\/\* Feature 1 \*\/}.*?)(?={\/\* Feature 4: Quizzes \*\/})', content, re.DOTALL)
f1_str = f1_match.group(1).strip() if f1_match else ""

f4_match = re.search(r'({\/\* Feature 4: Quizzes \*\/}.*?)(?=</div>\s*</div>\s*</section>)', content, re.DOTALL)
f4_str = f4_match.group(1).strip() if f4_match else ""

f2_match = re.search(r'({\/\* Feature 2 \*\/}.*?)(?={\/\* Feature 3 \*\/})', content, re.DOTALL)
f2_str = f2_match.group(1).strip() if f2_match else ""

f3_match = re.search(r'({\/\* Feature 3 \*\/}.*?)(?=</div>\s*</div>\s*</section>|{/\* Pricing/CTA Section \*/})', content, re.DOTALL)
# It turns out in the original file, feature 2 and 3 are inside another section?
# No, let's look at the original structure.
