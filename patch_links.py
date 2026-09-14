import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Update Footer links in Landing.tsx
footer_links = """
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link to="/docs" className="hover:text-zinc-300 transition-colors">Documentation</Link>
            <Link to="/status" className="hover:text-zinc-300 transition-colors">Status</Link>
"""

regex = r'<a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>.*?<a href="#" className="hover:text-zinc-300 transition-colors">Status</a>'
content = re.sub(regex, footer_links.strip(), content, flags=re.DOTALL)

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
