import re

with open('src/pages/ActiveQuiz.tsx', 'r') as f:
    content = f.read()

# Make sure renderMath is inline-block and correctly spans
old_render = r"""  const renderMath = \(latex: string\) => \{
    try \{
      return \(
        <span
          dangerouslySetInnerHTML=\{\{
            __html: katex\.renderToString\(latex, \{
              displayMode: false,
              throwOnError: false,
            \}\),
          \}\}
        />
      \);
    \} catch \{
      return <span>Error rendering formula</span>;
    \}
  \};"""

new_render = """  const renderMath = (latex: string) => {
    try {
      return (
        <span
          className="inline-block"
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(latex, {
              displayMode: false,
              throwOnError: false,
            }),
          }}
        />
      );
    } catch {
      return <span>Error rendering formula</span>;
    }
  };"""

content = re.sub(old_render, new_render, content)

with open('src/pages/ActiveQuiz.tsx', 'w') as f:
    f.write(content)
