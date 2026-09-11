import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

new_nav = """
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
        <LiquidGlassSurface className="pointer-events-auto rounded-[30px]">
          <nav className="px-6 lg:px-8 py-3 flex items-center justify-between gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <img src="/assets/logo-new.png" alt="AskFormula" className="h-7 object-contain" />
              <span className="font-semibold text-lg tracking-tight text-white/90">AskFormula</span>
            </div>

            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-300">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Curriculum</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-sm font-medium text-zinc-300 hover:text-white hidden sm:block transition-colors">Login</Link>
              <Button asChild className="h-8 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 text-sm font-medium transition-colors active:scale-95 shadow-none">
                <Link to="/build">Get started</Link>
              </Button>
            </div>
          </nav>
        </LiquidGlassSurface>
      </div>
"""

old_nav_pattern = r'<nav className="fixed top-0 inset-x-0 z-50[^>]*>[\s\S]*?<\/nav>'

content = re.sub(old_nav_pattern, new_nav.strip(), content)

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
