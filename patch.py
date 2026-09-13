import os

filepath = 'src/pages/ActiveQuiz.tsx'
with open(filepath, 'r') as f:
    content = f.read()

old_str = """                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <span className={letterClass}>{alphabet[idx]}</span>
                      <span className={textClass}>
                        {renderTextWithMath(opt.text || "")}
                      </span>
                    </div>"""

new_str = """                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <span className={letterClass}>{alphabet[idx]}</span>
                      <span className={textClass}>
                        {renderTextWithMath(opt.text || (opt.latex ? `$${opt.latex}$` : ""))}
                      </span>
                    </div>"""

if old_str in content:
    content = content.replace(old_str, new_str)
    with open(filepath, 'w') as f:
        f.write(content)
    print("Replaced successfully.")
else:
    print("Could not find the target string to replace.")
