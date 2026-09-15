import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# To ensure the background wrapper covers from the START of the feature narrative
# all the way down to the bottom (just above the global footer), we need to wrap
# the <section> elements.

# Let's see the current structure:
# <div className="min-h-screen bg-[#0b0c0f] text-zinc-50 font-sans selection:bg-emerald-500/30">
#   ... header ...
#   ... hero section ...
#   ... trusted by section ...
#   <section className="py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5">
#      ... Narrative Header ...
#      ... Feature 1 ...
#      ... Feature 4 ...
#      <div className="relative isolate">
#         ... Background Image ...
#         <div className="relative z-10">
#            ... Feature 2 ...
#            ... Feature 3 ...
#         </div>
#      </div>
#   </section>
#   <section Pricing />
#   <section FAQ />
#   <section Final CTA />
#   </div> (Wait, there are two closing divs at the end of Final CTA before footer in the original?)
# </div> (min-h-screen closing)

# Let's parse out the sections and re-assemble them cleanly.

# 1. Grab everything up to the Narrative Section
top_match = re.search(r'^(.*?)<section className="py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5">', content, re.DOTALL)
top_content = top_match.group(1) if top_match else ""

# 2. Grab features
f1_match = re.search(r'(<!-- Feature 1 -->.*?)(?=<!-- Feature 4 -->|<div className="relative isolate">)', content, re.DOTALL)
f1_str = f1_match.group(1).strip() if f1_match else ""

f2_match = re.search(r'({\/\* Feature 2 \*\/}.*?)(?={\/\* Feature 3 \*\/})', content, re.DOTALL)
f2_str = f2_match.group(1).strip() if f2_match else ""

f3_match = re.search(r'({\/\* Feature 3 \*\/}.*?)(?=</div>\s*</div>\s*</section>)', content, re.DOTALL)
f3_str = f3_match.group(1).strip() if f3_match else ""

f4_match = re.search(r'(<!-- Feature 4 -->.*?)(?=<div className="relative isolate">)', content, re.DOTALL)
f4_str = f4_match.group(1).strip() if f4_match else ""

# Fix HTML comments in features to JSX comments if needed
f1_str = f1_str.replace('<!-- Feature 1 -->', '{/* Feature 1 */}')
f4_str = f4_str.replace('<!-- Feature 4 -->', '{/* Feature 4 */}')

# 3. Grab bottom sections
bottom_match = re.search(r'({\/\* Pricing/CTA Section \*/}.*?){\/\* Global Footer \*/}', content, re.DOTALL)
# Note: we also need to strip out extra closing divs if there are any trailing before the footer.
bottom_content_raw = bottom_match.group(1) if bottom_match else ""
# Remove the two dangling closing divs that were erroneously left above the footer
bottom_content = re.sub(r'</div>\s*</div>\s*$', '', bottom_content_raw.strip(), flags=re.MULTILINE)

# 4. Grab the footer
footer_match = re.search(r'({\/\* Global Footer \*\/}.*)$', content, re.DOTALL)
footer_content = footer_match.group(1) if footer_match else ""

new_content = top_content + """
      {/* Background Wrapper for the rest of the page */}
      <div className="relative isolate">
        {/* The new image background covering the entire narrative, features, pricing, etc. */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/blue-bg.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-80 mix-blend-screen"
          />
          {/* Gradients to blend the image edges into the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0f] via-transparent to-[#0b0c0f] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0f] via-transparent to-[#0b0c0f] opacity-90" />
          <div className="absolute inset-0 bg-[#0b0c0f]/60" /> {/* Base overlay to ensure text readability */}
        </div>

        <div className="relative z-10">
          <section className="py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
              <div className="mb-20">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono block mb-2">A better way to revise</span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 max-w-2xl">
                  One calm place for<br/>everything that matters.
                </h2>
              </div>

              <div className="space-y-32">
                """ + f1_str + """

                """ + f2_str + """

                """ + f3_str + """

                """ + f4_str + """
              </div>
            </div>
          </section>

          """ + bottom_content + """
        </div>
      </div>

      """ + footer_content

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(new_content)
