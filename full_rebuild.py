import re

with open('/tmp/landing_original.tsx', 'r') as f:
    content = f.read()

# 1. Grab everything up to `<div className="space-y-32">` (the first one)
top_match = re.search(r'^(.*?<div className="space-y-32">\s*)', content, re.DOTALL)
top_part = top_match.group(1) if top_match else ""

# Modify the top part to insert the new wrapper before the `<section>`
top_part = top_part.replace('<section className="py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5">',
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

# 2. Extract features
f1_match = re.search(r'({\/\* Feature 1 \*\/}.*?)(?={\/\* Feature 4: Quizzes \*\/})', content, re.DOTALL)
f1 = f1_match.group(1).strip() if f1_match else ""

f4_match = re.search(r'({\/\* Feature 4: Quizzes \*\/}.*?)(?=</div>\s*</div>\s*</section>)', content, re.DOTALL)
f4 = f4_match.group(1).strip() if f4_match else ""

f2_match = re.search(r'({\/\* Feature 2 \*\/}.*?)(?={\/\* Feature 3 \*\/})', content, re.DOTALL)
f2 = f2_match.group(1).strip() if f2_match else ""

f3_match = re.search(r'({\/\* Feature 3 \*\/}.*?)(?=</div>\s*</div>)', content, re.DOTALL)
# It's tricky to match the end of Feature 3. Let's just find the end of the second `space-y-32`.
# Looking at the original:
# {/* Feature 3 */}
# ...
# </div>
# </div> (closes space-y-32)
# </div> (closes relative z-10)
# </div> (closes relative isolate)
# {/* Pricing/CTA Section */}
f3_match = re.search(r'({\/\* Feature 3 \*\/}.*?)(?=</div>\s*</div>\s*</div>\s*</div>\s*{\/\* Pricing/CTA Section \*\/})', content, re.DOTALL)
f3 = f3_match.group(1).strip() if f3_match else ""

# 3. Assemble the ordered features
features_block = f"{f1}\n\n{f2}\n\n{f3}\n\n{f4}\n"

# 4. Grab everything from `</section>` (end of narrative) downwards, skipping the old background wrapper.
# In the original file, after Feature 4 is:
#         </div>
#       </div>
#     </section>
#
#     {/* We'll wrap the rest of the features... */}
#     <div className="relative isolate">
#       ...
#       <div className="relative z-10 space-y-32">
#         {/* Feature 2 */}
#         {/* Feature 3 */}
#       </div>
#     </div>
#
#     {/* Pricing/CTA Section */}

# We need to grab the closing tags for the narrative section and everything from Pricing/CTA to the end.
bottom_match = re.search(r'({\/\* Pricing/CTA Section \*\/}.*?){\/\* Global Footer \*\/}', content, re.DOTALL)
bottom_content = bottom_match.group(1).strip() if bottom_match else ""

footer_match = re.search(r'({\/\* Global Footer \*\/}.*)$', content, re.DOTALL)
footer_content = footer_match.group(1).strip() if footer_match else ""

# Let's fix up `bottom_content` so it fits properly. We just need to close the narrative section.
# The structure is:
# <section> (Narrative)
#   <div max-w-6xl>
#     <div mb-20>
#     <div space-y-32>
#       {features_block}
#     </div>
#   </div>
# </section>
# {bottom_content}

# Then we need to close the background wrapper before the footer. Wait, does the background wrapper wrap Pricing/CTA and FAQ?
# The user wants "pricing, FAQ" included in the wrapper too.
# Yes, "all the way down to the bottom (just above the global footer)".

# So structure:
# {top_part} (opens wrapper, opens narrative section space-y-32)
# {features_block}
#             </div>
#           </div>
#         </section>
# {bottom_content}
#       </div>
#     </div>
# {footer_content}

new_content = top_part + features_block + """
          </div>
        </div>
      </section>

      """ + bottom_content + """
        </div>
      </div>

      """ + footer_content

# Clean up extra closing divs if there are any at the end.
new_content = re.sub(r'</div>\s*</div>\s*$', '</div>\n  );\n}', new_content)
# Since the footer is wrapped in a div?
# In original:
#      </footer>
#    </div>
#    </div>
#  );
#}
# We will just replace it properly.
new_content = re.sub(r'</footer>.*?$', '</footer>\n    </div>\n  );\n}', new_content, flags=re.DOTALL)

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(new_content)
