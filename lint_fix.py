import re

with open('src/hooks/useQuizEngine.ts', 'r') as f:
    engine = f.read()

engine = engine.replace('''  const variables = extractVariables(formula);
    variables.length > 0
      ? variables.map((v) => v.meaning).join(", ")

  const text = `Which formula correctly identifies ${targetVar}?`;''', '''  const text = `Which formula correctly identifies ${targetVar}?`;''')


with open('src/hooks/useQuizEngine.ts', 'w') as f:
    f.write(engine)
