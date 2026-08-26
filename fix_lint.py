with open('src/hooks/useLocalStorage.ts', 'r') as f:
    content = f.read()

content = content.replace("import { useState, useEffect } from 'react';", "import { useState } from 'react';")

with open('src/hooks/useLocalStorage.ts', 'w') as f:
    f.write(content)
