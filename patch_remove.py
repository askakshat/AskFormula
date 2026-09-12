import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Remove the dashboard container and its contents
dashboard_pattern = r'\{\/\* Floating App Mockup \(Fora Style\) \*\/\}\s*<div\s*id="dashboard-container"[\s\S]*?<!-- End of Dashboard Container, but we will match the closing div -->\s*<\/div>'

# Using regex to remove the mock dashboard, but since it has nested divs, it's safer to use a more specific replace or index-based removal
# Finding the start and end of the dashboard container
start_index = content.find('{/* Floating App Mockup (Fora Style) */}')
if start_index != -1:
    # Find the closing div of the dashboard container by counting open/close tags or finding the next major section
    end_marker = '{/* Misty Copper Autumn Treeline (SVG overlapping bottom) */}'
    end_index = content.find(end_marker)

    if end_index != -1:
        # We need to keep the closing div for the hero section, which is right before the end_marker
        hero_closing_div = '      </div>\n\n      '
        # The content to remove is from start_index to end_index, excluding the final closing div of the hero container

        # A simpler way is to replace everything from start_index to end_index with an empty string
        content = content[:start_index] + content[end_index:]

# Remove related state and functions
content = content.replace("  const [activeMockTab, setActiveMockTab] = useState('overview');\n  const [isCopied, setIsCopied] = useState(false);\n\n  const handleCopyLatex = () => {\n    navigator.clipboard.writeText(\"\\\\mathcal{L} = T - V\").then(() => {\n      setIsCopied(true);\n      setTimeout(() => setIsCopied(false), 1800);\n    });\n  };\n", "")

# Remove scroll logic targeting the dashboard
scroll_logic_pattern = r'      const dashboard = document\.getElementById\(\'dashboard-container\'\);\n[\s\S]*?if \(dashboard\) \{\n[\s\S]*?\}\n      \}\n'
content = re.sub(scroll_logic_pattern, '', content)

# Remove unused imports
content = content.replace('import { ArrowRight, FileText, Search, MessageCircle } from "lucide-react";\n', '')
content = content.replace('import "katex/dist/katex.min.css";\nimport { BlockMath } from "react-katex";\n', '')

# Remove onClick handlers from feature cards
content = content.replace(' onClick={() => setActiveMockTab(\'overview\')}', '')
content = content.replace(' onClick={() => setActiveMockTab(\'derivations\')}', '')
content = content.replace(' onClick={() => setActiveMockTab(\'discussions\')}', '')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
