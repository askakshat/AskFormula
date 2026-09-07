with open("src/pages/QuizDashboard.tsx", "r") as f:
    content = f.read()

content = "import { useState, useMemo, useEffect } from 'react';\n" + content

with open("src/pages/QuizDashboard.tsx", "w") as f:
    f.write(content)
