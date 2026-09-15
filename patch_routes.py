import re

with open('src/main.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Docs from "./pages/Docs";
import Status from "./pages/Status";
"""
content = content.replace('import NotFound from "./pages/NotFound";', 'import NotFound from "./pages/NotFound";' + imports)

# Add routes
routes = """
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/status" element={<Status />} />
"""
content = content.replace('<Route path="*" element={<NotFound />} />', routes.strip() + '\n        <Route path="*" element={<NotFound />} />')

with open('src/main.tsx', 'w') as f:
    f.write(content)
