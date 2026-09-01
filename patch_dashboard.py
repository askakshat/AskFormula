import re

with open('src/pages/Dashboard.tsx', 'r') as f:
    content = f.read()

# Add Practice button next to Back to Home
btn = """
            <Link to="/quiz" className="ml-4 inline-flex items-center text-sm font-medium text-[#61dcb0] hover:text-[#15a47c] transition-colors mb-2 bg-[#61dcb0]/10 px-3 py-1 rounded-md border border-[#61dcb0]/30">
              Go to Practice Mode
              <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
            </Link>"""

content = re.sub(
    r'(<Link to="/" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mb-2">\s*<ArrowLeft className="w-4 h-4 mr-1" />\s*Back to Home\s*</Link>)',
    r'\1' + btn,
    content
)

with open('src/pages/Dashboard.tsx', 'w') as f:
    f.write(content)

print("Patched Dashboard.tsx")
