import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Make the absolute positioning relative to content wrapper rather than flex container stretching
content = content.replace('className={`tab-content w-full max-w-lg transition-all duration-500 ease-out ${activeMockTab === \'overview\' ? \'opacity-100 translate-y-0\' : \'hidden opacity-0 translate-y-2\'}`}', 'className={`absolute inset-0 p-8 flex items-center justify-center transition-all duration-500 ease-out ${activeMockTab === \'overview\' ? \'opacity-100 translate-y-0 z-10\' : \'opacity-0 translate-y-2 pointer-events-none z-0\'}`}')
content = content.replace('className={`tab-content w-full transition-all duration-500 ease-out ${activeMockTab === \'derivations\' ? \'opacity-100 translate-y-0\' : \'hidden opacity-0 translate-y-2\'}`}', 'className={`absolute inset-0 p-8 transition-all duration-500 ease-out overflow-y-auto ${activeMockTab === \'derivations\' ? \'opacity-100 translate-y-0 z-10\' : \'opacity-0 translate-y-2 pointer-events-none z-0\'}`}')
content = content.replace('className={`tab-content w-full transition-all duration-500 ease-out ${activeMockTab === \'discussions\' ? \'opacity-100 translate-y-0\' : \'hidden opacity-0 translate-y-2\'}`}', 'className={`absolute inset-0 p-8 transition-all duration-500 ease-out ${activeMockTab === \'discussions\' ? \'opacity-100 translate-y-0 z-10\' : \'opacity-0 translate-y-2 pointer-events-none z-0\'}`}')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
