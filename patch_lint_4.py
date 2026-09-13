with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    lines = f.read().split('\n')

if '// eslint-disable-next-line react-hooks/set-state-in-effect' in lines[44]:
    lines[44] = lines[44].replace('// eslint-disable-next-line react-hooks/set-state-in-effect', '')

with open('src/pages/ActiveQuiz.tsx', 'w') as f:
    f.write('\n'.join(lines))
