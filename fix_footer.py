import re

with open('src/components/askformula/Footer.tsx', 'r') as f:
    content = f.read()

# Add imports
content = content.replace(
    'import { Atom } from "lucide-react";',
    'import { Atom, Youtube, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";'
)

# Insert social links before copyright
social_links = """
        <div className="flex justify-center items-center gap-4 mb-6">
          <a href="https://youtube.com/@askformula" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/askformula" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="X (Twitter)">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/company/askformula" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://instagram.com/askformula" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://facebook.com/askformula" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="Facebook">
            <Facebook className="w-4 h-4" />
          </a>
        </div>
"""

content = content.replace(
    '<p className="text-xs text-slate-600 mb-1">',
    social_links + '\n        <p className="text-xs text-slate-600 mb-1">'
)

with open('src/components/askformula/Footer.tsx', 'w') as f:
    f.write(content)
