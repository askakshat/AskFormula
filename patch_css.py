import re

with open('src/index.css', 'r') as f:
    content = f.read()

content += """
/* Hide liquid-canvas on mobile */
@media (max-width: 800px) {
  .liquid-canvas {
    display: none !important;
  }
}
"""

with open('src/index.css', 'w') as f:
    f.write(content)
