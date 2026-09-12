import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { useState, useEffect } from "react";', 'import { useEffect } from "react";')
content = content.replace('      const scrollY = window.scrollY;', '')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)

with open('src/components/LiquidGlassSurface.tsx', 'r') as f:
    content = f.read()

content = content.replace('    setWebGpuReady(false); // Forced off temporarily due to webgpu canvas scaling crashes', '    // eslint-disable-next-line react-hooks/set-state-in-effect\n    setWebGpuReady(false); // Forced off temporarily due to webgpu canvas scaling crashes')

with open('src/components/LiquidGlassSurface.tsx', 'w') as f:
    f.write(content)
