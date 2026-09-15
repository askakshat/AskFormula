import re
with open('index.html', 'r') as f:
    content = f.read()

# Make sure basic SEO tags exist
if '<meta name="description"' not in content:
    meta_tags = """
    <meta name="description" content="AskFormula by AskAkshat. Generate, customize, and print concise formula sheets and take interactive quizzes for JEE, NEET, and NCERT." />
    <meta name="keywords" content="AskFormula, AskAkshat, Akshat Agarwal, physics formulas, chemistry formulas, math formulas, JEE, NEET, NCERT, formula sheet builder, quiz" />
    <meta property="og:title" content="AskFormula - The Ultimate Revision Tool" />
    <meta property="og:description" content="Build clean, print-ready formula sheets in seconds." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://askformula.vercel.app/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="AskFormula - The Ultimate Revision Tool" />
    <meta name="twitter:description" content="Build clean, print-ready formula sheets in seconds." />
"""
    content = content.replace('<title>Vite + React + TS</title>', f'<title>AskFormula - The Ultimate Revision Tool</title>\n{meta_tags}')
else:
    # It might already have some
    content = content.replace('<title>AskFormula</title>', '<title>AskFormula - The Ultimate Revision Tool</title>')

with open('index.html', 'w') as f:
    f.write(content)
