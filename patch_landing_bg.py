import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# The user wants to:
# "Tone down the background of the bottom slides in the landing page, almost dark, and add very smal and very little (as in quantity), twinkles (if needed)"

# We find the background wrapper added previously in `Landing.tsx`.
old_bg_wrapper = """      {/* Background Wrapper */}
      <div className="relative isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/blue-bg.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-80 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0f] via-transparent to-[#0b0c0f] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0f] via-transparent to-[#0b0c0f] opacity-90" />
          <div className="absolute inset-0 bg-[#0b0c0f]/60" />
        </div>"""

new_bg_wrapper = """      {/* Background Wrapper */}
      <div className="relative isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/blue-bg.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-[0.15] mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[#0b0c0f]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0f] via-transparent to-[#0b0c0f] opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0f] via-transparent to-[#0b0c0f] opacity-100" />

          {/* Sparse Twinkling Stars */}
          {twinklingStars.slice(0, 15).map(star => (
            <div
              key={`bottom-star-${star.id}`}
              className="absolute rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"
              style={{
                top: star.top,
                left: star.left,
                width: star.width,
                height: star.height,
                opacity: star.opacity * 0.7,
                animation: `twinkle ${star.duration} infinite alternate ease-in-out`
              }}
            />
          ))}
        </div>"""

content = content.replace(old_bg_wrapper, new_bg_wrapper)

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
