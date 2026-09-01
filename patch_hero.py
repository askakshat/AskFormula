import re

with open('src/components/askformula/Hero.tsx', 'r') as f:
    content = f.read()

# Add Practice button
practice_btn = """            <Button
              variant="outline"
              onClick={() => {
                window.location.href = "/quiz";
              }}
              className="bg-[#15a47c]/10 text-[#61dcb0] h-10 px-6 rounded border border-[#15a47c]/50 hover:border-[#61dcb0] hover:bg-[#15a47c]/20 transition-all text-[12px] font-medium tracking-wide flex items-center justify-center gap-2"
            >
              Practice Mode
              <Sparkles className="w-4 h-4" />
            </Button>"""

content = re.sub(
    r'(<Button\s+variant="outline"\s+onClick=\{\(\) => \{\s+window.location.href = "/build";\s+\}\}\s+className="bg-\[#00275d\][^>]+>\s+Build Your Sheet\s+<ArrowRight[^>]+/>\s+</Button>)',
    r'\1\n' + practice_btn,
    content
)

with open('src/components/askformula/Hero.tsx', 'w') as f:
    f.write(content)

print("Patched Hero.tsx")
