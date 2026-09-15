with open('src/pages/Landing.tsx', 'r') as f:
    lines = f.readlines()

# Line 182 and 183 have closing divs.
# `</div>`
# `</div>`
# These were supposed to close the background wrapper.

# But earlier, my regex might have stripped too much or too little.
# Let's count open `<div` vs `</div` in the file.
import re

open_divs = 0
for line in lines:
    open_divs += len(re.findall(r'<div\b[^>]*>', line))
    open_divs -= len(re.findall(r'</div\b[^>]*>', line))

print(f"Net open divs: {open_divs}")

open_sections = 0
for line in lines:
    open_sections += len(re.findall(r'<section\b[^>]*>', line))
    open_sections -= len(re.findall(r'</section\b[^>]*>', line))

print(f"Net open sections: {open_sections}")
