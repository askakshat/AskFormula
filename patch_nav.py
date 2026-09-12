import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Update Nav links
old_nav_links = """
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-300">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Curriculum</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-sm font-medium text-zinc-300 hover:text-white hidden sm:block transition-colors">Login</Link>
"""

new_nav_links = """
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-300">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <Link to="/quiz" className="hover:text-white transition-colors pointer-events-auto">Quizzes</Link>
              <Link to="/build" className="hover:text-white transition-colors pointer-events-auto">Builder</Link>
              <a href="#faq" className="hover:text-white transition-colors pointer-events-auto">FAQ</a>
            </div>

            <div className="flex items-center gap-4">
"""

content = content.replace(old_nav_links, new_nav_links)

# Add FAQ ID to section so the anchor link works
content = content.replace('      {/* FAQ Section */}\n      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0e1014] border-t border-white/5 relative z-20">', '      {/* FAQ Section */}\n      <section id="faq" className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0e1014] border-t border-white/5 relative z-20">')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
