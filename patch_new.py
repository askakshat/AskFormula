import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Instead of blindly replacing with regex, let's precisely locate the nodes.
# Let's extract the features.
features = {}
for i in range(1, 5):
    # Match the block for each feature
    # Using the inner content that starts with <div className="grid...
    regex = r'(<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center".*?<span className="text-5xl font-mono font-bold text-white/40 block mb-6">0' + str(i) + r'.*?</div>\s*</div>)'
    match = re.search(regex, content, re.DOTALL)
    if match:
        features[i] = match.group(1)
    else:
        # Fallback for alternative structure, feature 1 and 4 have slightly different inner structures maybe?
        regex = r'(<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center".*?0' + str(i) + r'.*?</div>\s*</div>)'
        match = re.search(regex, content, re.DOTALL)
        if match:
             features[i] = match.group(1)
        else:
             print(f"Could not find Feature {i}")

# The user wants:
# 1. Background Wrapper (`blue-bg.png`) to wrap the *entire* Narrative section and the sections below it (Pricing, FAQ).
# 2. Reorder features 01, 02, 03, 04 inside the space-y-32 div.

# Let's see the original structure of the page:
# <section className="py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5">
#   <div className="max-w-6xl mx-auto">
#     <div className="mb-20">... A better way to revise ...</div>
#     <div className="space-y-32">
#       {/* Feature 1 */}
#       {/* Feature 4 */}
#     </div>
#   </div>
# </section>
# <div className="relative isolate">
#   <div className="absolute inset-0 z-0"> ... blue-bg.png ... </div>
#   <div className="relative z-10">
#     {/* Feature 2 */}
#     {/* Feature 3 */}
#     <section Pricing />
#     <section FAQ />
#     <section Final CTA />
#   </div>
# </div>

# We need to change it to:
# <div className="relative isolate">
#   <div className="absolute inset-0 z-0 pointer-events-none"> ... blue-bg.png ... </div>
#   <div className="relative z-10">
#     <section className="py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5">
#       <div className="max-w-6xl mx-auto">
#         <div className="mb-20">... A better way to revise ...</div>
#         <div className="space-y-32">
#           {/* Feature 1 */}
#           {/* Feature 2 */}
#           {/* Feature 3 */}
#           {/* Feature 4 */}
#         </div>
#       </div>
#     </section>
#     <section Pricing />
#     <section FAQ />
#     <section Final CTA />
#   </div>
# </div>
