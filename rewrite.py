import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Original file is ~470 lines. We need to do two things:
# 1. Change the background image wrapper to wrap the feature block.
# 2. Reorder feature 4 and feature 2/3.

# Look for the start of the narrative section
start_regex = r'<section className="py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5">'
content = content.replace(start_regex,
"""      {/* Background Wrapper */}
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
        </div>

        <div className="relative z-10">
          <section className="py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5">""")

# Remove the old wrapper around feature 2 & 3:
content = content.replace(
'''          {/* We'll wrap the rest of the features in a nice dark/ambient background block */}
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
            </div>

            <div className="relative z-10 space-y-32">''',
'''          {/* Features 2 & 3 (Moved to be together) */}
          <div className="space-y-32">''')

# Close the new top level wrapper right before Final CTA (or Global Footer)
content = content.replace(
'''      {/* Final CTA */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#0b0c0f] border-t border-white/5 relative z-20 overflow-hidden">''',
'''      {/* Final CTA */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#0b0c0f] border-t border-white/5 relative z-20 overflow-hidden">''')

# Let's extract the feature blocks carefully.

def extract_between(text, start, end):
    pattern = re.escape(start) + r'(.*?)' + re.escape(end)
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(0)
    return ""

# The order is: Feature 1, Feature 4, old wrapper start, Feature 2, Feature 3, old wrapper end.
# We want Feature 1, Feature 2, Feature 3, Feature 4.

# We'll just replace the entire content of `<div className="space-y-32">` inside the narrative section.
# Wait, the structure in the file currently is:
# <section> (Narrative)
#   <div max-w-6xl>
#     <div mb-20> header </div>
#     <div space-y-32>
#       {/* Feature 1 */}
#       {/* Feature 4 */}
#     </div>
#   </div>
# </section>
# <div relative isolate>
#   <div relative z-10 space-y-32>
#     {/* Feature 2 */}
#     {/* Feature 3 */}
#   </div>
# </div>
