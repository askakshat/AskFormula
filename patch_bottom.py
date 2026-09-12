import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Soften the feature background from `#0e1014` to `#0b0d11` and add ambient glow
feature_bg = """      {/* Feature Narrative Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0b0d11] border-t border-white/5 relative z-20 overflow-hidden" id="features">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">"""
content = content.replace('      {/* Feature Narrative Section */}\n      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0e1014] border-t border-white/5 relative z-20" id="features">\n        <div className="max-w-7xl mx-auto">', feature_bg)

# Soften FAQ section background as well
faq_bg = """      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0b0d11] border-t border-white/5 relative z-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 relative z-10">"""
content = content.replace('      {/* FAQ Section */}\n      <section id="faq" className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0e1014] border-t border-white/5 relative z-20">\n        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">', faq_bg)


with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
