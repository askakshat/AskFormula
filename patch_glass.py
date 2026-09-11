import re

with open('src/components/LiquidGlassSurface.tsx', 'r') as f:
    content = f.read()

# Disable WebGPU conditionally if window size crashes the proposal hook (experimental API issues)
content = content.replace('setWebGpuReady(typeof navigator !== "undefined" && "gpu" in navigator);', 'setWebGpuReady(false); // Forced off temporarily due to webgpu canvas scaling crashes')

with open('src/components/LiquidGlassSurface.tsx', 'w') as f:
    f.write(content)
