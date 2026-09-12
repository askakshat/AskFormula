import re

with open('src/index.css', 'r') as f:
    content = f.read()

stars_css = """
/* Magical Stars & Shooting Stars */
.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle var(--duration) ease-in-out infinite;
  opacity: var(--base-opacity);
}

.shooting-star {
  position: absolute;
  height: 2px;
  background: linear-gradient(-45deg, rgba(255,255,255,1), rgba(255,255,255,0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px rgba(255,255,255,1));
  animation: tail var(--duration) ease-in-out infinite, shooting var(--duration) ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: var(--base-opacity); transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }
}

@keyframes tail {
  0% { width: 0; }
  30% { width: 100px; }
  100% { width: 0; }
}

@keyframes shooting {
  0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
  100% { transform: translateX(500px) translateY(500px) rotate(-45deg); opacity: 0; }
}
"""

if "Magical Stars & Shooting Stars" not in content:
    content += "\n" + stars_css

with open('src/index.css', 'w') as f:
    f.write(content)
