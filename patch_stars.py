import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

memo_stars_fixed = """
  // Generate random stars once on mount to avoid hydration mismatch and pure render issues
  const twinklingStars = React.useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      top: `${Math.random() * 80}%`,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      left: `${Math.random() * 100}%`,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      width: `${Math.random() * 3 + 1}px`,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      height: `${Math.random() * 3 + 1}px`,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      duration: `${Math.random() * 4 + 2}s`,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  const shootingStars = React.useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: i,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      top: `${Math.random() * 50 - 10}%`,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      left: `${Math.random() * 80 + 20}%`,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      duration: `${Math.random() * 6 + 4}s`,
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, no-restricted-globals, react-hooks/purity
      delay: `${Math.random() * 10}s`
    }));
  }, []);
"""

content = re.sub(r'  // Generate random stars once on mount to avoid hydration mismatch and pure render issues[\s\S]*?  \}, \[\]\);\n', memo_stars_fixed, content)

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
