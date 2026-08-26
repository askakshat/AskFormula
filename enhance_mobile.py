import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Instead of hiding/showing completely linearly which gets tall on mobile, let's wrap them in accordion-style logic
# or ensure the smooth scroll logic happens efficiently.
# Since we already have `AnimatePresence` and smooth scroll logic in `Landing.tsx`,
# a simple but highly effective mobile enhancement is adjusting padding, spacing, and adding step summary cards
# when a step is completed, but since it's already a stacked view, making it feel more like a wizard by scrolling to the *top* of the active section is better.
# Let's adjust the smooth scroll offsets.

content = content.replace("block: \"start\"", "block: \"center\"")

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
