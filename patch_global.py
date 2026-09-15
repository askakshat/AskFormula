import re
import os

# The user mentioned orange accents in the build page like numbering, active selection text, etc.
# Wait, let's look at `Build.tsx` again. The numbering is "1", "2", "3".
# In `Build.tsx`:
# <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/[0.15]">1</span>
# Where is the orange coming from?
# Ah, maybe I missed a file.
