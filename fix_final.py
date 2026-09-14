import re
with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# The error is that we have an extra `<section>` opening somewhere or we missed closing a div properly.
# Actually, the error `Parsing error: ')' expected` at 490 usually means the JSX tree is unbalanced.
# Let's count open `<div` vs `</div` and `<section` vs `</section`.

def count_tags(text):
    return len(re.findall(r'<div\b[^>]*>', text)) - len(re.findall(r'</div\b[^>]*>', text))

def count_sections(text):
    return len(re.findall(r'<section\b[^>]*>', text)) - len(re.findall(r'</section\b[^>]*>', text))

print(f"Div balance: {count_tags(content)}")
print(f"Section balance: {count_sections(content)}")

# If div balance is not 0, we need to add or remove closing divs at the very end.
# In a proper React component, the top-level element is a single div.
# So div balance should be 0.
