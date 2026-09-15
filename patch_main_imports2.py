import re
with open('src/main.tsx', 'r') as f:
    content = f.read()

lazy_imports = """
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Docs = lazy(() => import("./pages/Docs.tsx"));
const Status = lazy(() => import("./pages/Status.tsx"));
"""

content = content.replace('const NotFound = lazy(() => import("./pages/NotFound.tsx"));', 'const NotFound = lazy(() => import("./pages/NotFound.tsx"));' + lazy_imports)

# We mistakenly added direct imports in main.tsx before? No, the previous python script failed or added it somewhere else?
# Let's remove the broken direct imports if they exist.
content = content.replace('import Privacy from "./pages/Privacy";\nimport Terms from "./pages/Terms";\nimport Docs from "./pages/Docs";\nimport Status from "./pages/Status";', '')

with open('src/main.tsx', 'w') as f:
    f.write(content)
