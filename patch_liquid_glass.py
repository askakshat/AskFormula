import re

def make_liquid_glass(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Find the nav bar class
    nav_regex = r'<nav className="px-6 lg:px-8 py-3 flex items-center justify-between gap-8 md:gap-16 bg-\[#0b0c0f\]/70 backdrop-blur-[^"]+ rounded-\[30px\] border border-white/10[^"]+"'
    replacement = '<nav className="px-6 lg:px-8 py-3 flex items-center justify-between gap-8 md:gap-16 bg-white/[0.02] backdrop-blur-[40px] rounded-[30px] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full"'

    new_content = re.sub(nav_regex, replacement, content)

    # For pages that don't have the floating nav (Quiz, QuizResults, ActiveQuiz, Dashboard),
    # we need to style the <header> tag to be liquid glass.

    # ActiveQuiz, QuizDashboard, QuizResults:
    header_regex = r'<header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between" data-purpose="global-header">'
    header_replacement = '<header className="w-full max-w-7xl mx-auto px-6 py-4 mt-4 flex items-center justify-between bg-white/[0.02] backdrop-blur-[40px] rounded-[30px] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]" data-purpose="global-header">'
    new_content = new_content.replace(header_regex, header_replacement)

    with open(file_path, 'w') as f:
        f.write(new_content)

for file in [
    'src/pages/Landing.tsx',
    'src/pages/Build.tsx',
    'src/pages/QuizDashboard.tsx',
    'src/pages/ActiveQuiz.tsx',
    'src/pages/QuizResults.tsx'
]:
    make_liquid_glass(file)
