const fs = require('fs');

const mathDataPath = 'src/data/ncert/mathematics.json';
let mathData = JSON.parse(fs.readFileSync(mathDataPath, 'utf8'));

// Extract and organize the provided formulas
const formulasToInject = {
    "Sets": [
        { id: "m1_1", name: "Total Subsets", latex: "\\text{Total Subsets} = 2^n", tags: ["subsets", "power set"] },
        { id: "m1_2", name: "Proper Subsets", latex: "\\text{Proper Subsets} = 2^n - 1", tags: ["subsets"] },
        { id: "m1_3", name: "Power Set", latex: "n(P(A)) = 2^{n(A)}", tags: ["power set", "cardinality"] },
        { id: "m1_4", name: "Open Interval", latex: "(a, b) = \\{x \\in \\mathbb{R} : a < x < b\\}", tags: ["intervals"] },
        { id: "m1_5", name: "Closed Interval", latex: "[a, b] = \\{x \\in \\mathbb{R} : a \\le x \\le b\\}", tags: ["intervals"] },
        { id: "m1_6", name: "Semi-Open/Closed Intervals", latex: "[a, b) = \\{x \\in \\mathbb{R} : a \\le x < b\\}, \\quad (a, b] = \\{x \\in \\mathbb{R} : a < x \\le b\\}", tags: ["intervals"] },
        { id: "m1_7", name: "Length of Interval", latex: "\\text{Length of Interval} = b - a", tags: ["intervals", "length"] },
        { id: "m1_8", name: "Difference of Sets", latex: "A - B = A \\cap B'", tags: ["operations", "difference"] },
        { id: "m1_9", name: "Disjoint Sets", latex: "A \\cap B = \\emptyset", tags: ["operations", "disjoint"] },
        { id: "m1_10", name: "De Morgan’s Laws", latex: "(A \\cup B)' = A' \\cap B', \\qquad (A \\cap B)' = A' \\cup B'", tags: ["laws", "de morgan"] },
        { id: "m1_11", name: "Distributive Laws", latex: "A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C), \\qquad A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)", tags: ["laws", "distributive"] },
        { id: "m1_12", name: "Complement & Identity Laws", latex: "A \\cup A' = U, \\quad A \\cap A' = \\emptyset, \\quad (A')' = A, \\quad \\emptyset' = U, \\quad U' = \\emptyset", tags: ["laws", "complement", "identity"] },
        { id: "m1_13", name: "Identity Laws (cont.)", latex: "A \\cup \\emptyset = A, \\quad A \\cap U = A, \\quad A \\cup A = A, \\quad A \\cap A = A", tags: ["laws", "identity"] },
        { id: "m1_14", name: "Cardinality of Union (2 sets)", latex: "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)", tags: ["cardinality", "union"] },
        { id: "m1_15", name: "Cardinality of Difference", latex: "n(A - B) = n(A) - n(A \\cap B)", tags: ["cardinality", "difference"] },
        { id: "m1_16", name: "Cardinality of Union (3 sets)", latex: "n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(B \\cap C) - n(C \\cap A) + n(A \\cap B \\cap C)", tags: ["cardinality", "union"] }
    ],
    "Relations and Functions": [
        { id: "m2_1", name: "Cartesian Product Definition", latex: "A \\times B = \\{(a, b) : a \\in A, b \\in B\\}", tags: ["cartesian product"] },
        { id: "m2_2", name: "Cardinality of Cartesian Product", latex: "n(A \\times B) = n(A) \\times n(B) = p \\cdot q", tags: ["cardinality", "cartesian product"] },
        { id: "m2_3", name: "Total Number of Relations", latex: "\\text{Total Relations} = 2^{n(A \\times B)} = 2^{pq}", tags: ["relations", "cardinality"] },
        { id: "m2_4", name: "Identity Function", latex: "f(x) = x \\implies \\text{Dom} = \\mathbb{R}, \\text{Range} = \\mathbb{R}", tags: ["functions", "identity"] },
        { id: "m2_5", name: "Constant Function", latex: "f(x) = c \\implies \\text{Dom} = \\mathbb{R}, \\text{Range} = \\{c\\}", tags: ["functions", "constant"] },
        { id: "m2_6", name: "Modulus Function", latex: "f(x) = \\vert{}x\\vert{} = \\begin{cases} x, & x \\ge 0 \\\\ -x, & x < 0 \\end{cases} \\implies \\text{Dom} = \\mathbb{R}, \\text{Range} = [0, \\infty)", tags: ["functions", "modulus"] },
        { id: "m2_7", name: "Signum Function", latex: "f(x) = \\text{sgn}(x) = \\begin{cases} 1, & x > 0 \\\\ 0, & x = 0 \\\\ -1, & x < 0 \\end{cases} = \\frac{\\vert{}x\\vert{}}{x} \\implies \\text{Dom} = \\mathbb{R}, \\text{Range} = \\{-1, 0, 1\\}", tags: ["functions", "signum"] },
        { id: "m2_8", name: "Greatest Integer Function", latex: "f(x) = [x] \\implies \\text{Dom} = \\mathbb{R}, \\text{Range} = \\mathbb{Z}", tags: ["functions", "greatest integer"] },
        { id: "m2_9", name: "Reciprocal Function", latex: "f(x) = \\frac{1}{x} \\implies \\text{Dom} = \\mathbb{R} \\setminus \\{0\\}, \\text{Range} = \\mathbb{R} \\setminus \\{0\\}", tags: ["functions", "reciprocal"] },
        { id: "m2_10", name: "Algebra of Functions", latex: "(f \\pm g)(x) = f(x) \\pm g(x), \\quad (fg)(x) = f(x)g(x), \\quad (kf)(x) = kf(x)", tags: ["algebra", "functions"] },
        { id: "m2_11", name: "Quotient of Functions", latex: "\\left(\\frac{f}{g}\\right)(x) = \\frac{f(x)}{g(x)} \\quad (g(x) \\neq 0)", tags: ["algebra", "functions", "quotient"] }
    ],
    "Trigonometric Functions": [
        { id: "m3_1", name: "Radian Measure", latex: "\\theta = \\frac{l}{r} \\text{ radians}, \\qquad \\pi \\text{ rad} = 180^\\circ", tags: ["radians", "angle"] },
        { id: "m3_2", name: "Angle Conversion", latex: "\\text{Radian Measure} = \\frac{\\pi}{180} \\times \\text{Degree Measure}, \\qquad \\text{Degree Measure} = \\frac{180}{\\pi} \\times \\text{Radian Measure}", tags: ["conversion", "angle"] },
        { id: "m3_3", name: "Angle Units", latex: "1 \\text{ rad} \\approx 57^\\circ 16' 22'', \\qquad 1^\\circ = 60' \\approx 0.01746 \\text{ rad}, \\qquad 1' = 60''", tags: ["units", "angle"] },
        { id: "m3_4", name: "Fundamental Identities", latex: "\\sin^2 x + \\cos^2 x = 1, \\qquad 1 + \\tan^2 x = \\sec^2 x, \\qquad 1 + \\cot^2 x = \\csc^2 x", tags: ["identities"] },
        { id: "m3_5", name: "Even/Odd Identities", latex: "\\sin(-x) = -\\sin x, \\quad \\cos(-x) = \\cos x, \\quad \\tan(-x) = -\\tan x", tags: ["identities", "even", "odd"] },
        { id: "m3_6", name: "Compound Angle (Cos)", latex: "\\cos(x \\pm y) = \\cos x \\cos y \\mp \\sin x \\sin y", tags: ["compound angle", "cosine"] },
        { id: "m3_7", name: "Compound Angle (Sin)", latex: "\\sin(x \\pm y) = \\sin x \\cos y \\pm \\cos x \\sin y", tags: ["compound angle", "sine"] },
        { id: "m3_8", name: "Compound Angle (Tan)", latex: "\\tan(x \\pm y) = \\frac{\\tan x \\pm \\tan y}{1 \\mp \\tan x \\tan y}", tags: ["compound angle", "tangent"] },
        { id: "m3_9", name: "Compound Angle (Cot)", latex: "\\cot(x \\pm y) = \\frac{\\cot x \\cot y \\mp 1}{\\cot y \\pm \\cot x}", tags: ["compound angle", "cotangent"] },
        { id: "m3_10", name: "Double Angle (Sin)", latex: "\\sin 2x = 2\\sin x \\cos x = \\frac{2\\tan x}{1 + \\tan^2 x}", tags: ["double angle", "sine"] },
        { id: "m3_11", name: "Double Angle (Cos)", latex: "\\cos 2x = \\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x = \\frac{1 - \\tan^2 x}{1 + \\tan^2 x}", tags: ["double angle", "cosine"] },
        { id: "m3_12", name: "Double Angle (Tan)", latex: "\\tan 2x = \\frac{2\\tan x}{1 - \\tan^2 x}", tags: ["double angle", "tangent"] },
        { id: "m3_13", name: "Triple Angle (Sin)", latex: "\\sin 3x = 3\\sin x - 4\\sin^3 x", tags: ["triple angle", "sine"] },
        { id: "m3_14", name: "Triple Angle (Cos)", latex: "\\cos 3x = 4\\cos^3 x - 3\\cos x", tags: ["triple angle", "cosine"] },
        { id: "m3_15", name: "Triple Angle (Tan)", latex: "\\tan 3x = \\frac{3\\tan x - \\tan^3 x}{1 - 3\\tan^2 x}", tags: ["triple angle", "tangent"] },
        { id: "m3_16", name: "Product-to-Sum (Cos-Cos)", latex: "2\\cos x \\cos y = \\cos(x+y) + \\cos(x-y)", tags: ["product-to-sum"] },
        { id: "m3_17", name: "Product-to-Sum (Sin-Sin)", latex: "-2\\sin x \\sin y = \\cos(x+y) - \\cos(x-y)", tags: ["product-to-sum"] },
        { id: "m3_18", name: "Product-to-Sum (Sin-Cos)", latex: "2\\sin x \\cos y = \\sin(x+y) + \\sin(x-y)", tags: ["product-to-sum"] },
        { id: "m3_19", name: "Product-to-Sum (Cos-Sin)", latex: "2\\cos x \\sin y = \\sin(x+y) - \\sin(x-y)", tags: ["product-to-sum"] },
        { id: "m3_20", name: "Sum-to-Product (Sin+Sin)", latex: "\\sin C + \\sin D = 2\\sin\\left(\\frac{C+D}{2}\\right)\\cos\\left(\\frac{C-D}{2}\\right)", tags: ["sum-to-product"] },
        { id: "m3_21", name: "Sum-to-Product (Sin-Sin)", latex: "\\sin C - \\sin D = 2\\cos\\left(\\frac{C+D}{2}\\right)\\sin\\left(\\frac{C-D}{2}\\right)", tags: ["sum-to-product"] },
        { id: "m3_22", name: "Sum-to-Product (Cos+Cos)", latex: "\\cos C + \\cos D = 2\\cos\\left(\\frac{C+D}{2}\\right)\\cos\\left(\\frac{C-D}{2}\\right)", tags: ["sum-to-product"] },
        { id: "m3_23", name: "Sum-to-Product (Cos-Cos)", latex: "\\cos C - \\cos D = -2\\sin\\left(\\frac{C+D}{2}\\right)\\sin\\left(\\frac{C-D}{2}\\right) = 2\\sin\\left(\\frac{C+D}{2}\\right)\\sin\\left(\\frac{D-C}{2}\\right)", tags: ["sum-to-product"] }
    ],
    "Complex Numbers and Quadratic Equations": [
        { id: "m4_1", name: "Powers of i", latex: "i = \\sqrt{-1}, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1", tags: ["complex", "powers"] },
        { id: "m4_2", name: "General Powers of i", latex: "i^{4k} = 1, \\quad i^{4k+1} = i, \\quad i^{4k+2} = -1, \\quad i^{4k+3} = -i \\quad (k \\in \\mathbb{Z})", tags: ["complex", "powers"] },
        { id: "m4_3", name: "Modulus & Conjugate", latex: "\\vert{}z\\vert{} = \\sqrt{a^2 + b^2}, \\qquad \\bar{z} = a - ib, \\qquad z\\bar{z} = \\vert{}z\\vert{}^2", tags: ["modulus", "conjugate"] },
        { id: "m4_4", name: "Multiplicative Inverse", latex: "z^{-1} = \\frac{1}{z} = \\frac{\\bar{z}}{\\vert{}z\\vert{}^2} = \\frac{a - ib}{a^2 + b^2}", tags: ["inverse"] },
        { id: "m4_5", name: "Division of Complex Numbers", latex: "\\frac{z_1}{z_2} = \\frac{a+ib}{c+id} = \\left(\\frac{ac+bd}{c^2+d^2}\\right) + i\\left(\\frac{bc-ad}{c^2+d^2}\\right)", tags: ["division"] },
        { id: "m4_6", name: "Modulus Properties", latex: "\\vert{}z_1 z_2\\vert{} = \\vert{}z_1\\vert{}\\vert{}z_2\\vert{}, \\quad \\left\\vert{}\\frac{z_1}{z_2}\\right\\vert{} = \\frac{\\vert{}z_1\\vert{}}{\\vert{}z_2\\vert{}}", tags: ["modulus", "properties"] },
        { id: "m4_7", name: "Conjugate Properties", latex: "\\overline{z_1 \\pm z_2} = \\bar{z}_1 \\pm \\bar{z}_2, \\quad \\overline{z_1 z_2} = \\bar{z}_1 \\bar{z}_2, \\quad \\overline{\\left(\\frac{z_1}{z_2}\\right)} = \\frac{\\bar{z}_1}{\\bar{z}_2}", tags: ["conjugate", "properties"] },
        { id: "m4_8", name: "Complex Quadratic Roots", latex: "x = \\frac{-b \\pm i\\sqrt{4ac - b^2}}{2a}", tags: ["quadratic", "roots"] }
    ],
    "Linear Inequalities": [
        { id: "m5_1", name: "Addition/Subtraction Rule", latex: "a < b \\implies a \\pm c < b \\pm c", tags: ["rules"] },
        { id: "m5_2", name: "Multiplication/Division (Positive)", latex: "a < b \\text{ and } c > 0 \\implies ac < bc, \\quad \\frac{a}{c} < \\frac{b}{c}", tags: ["rules", "positive"] },
        { id: "m5_3", name: "Multiplication/Division (Negative)", latex: "a < b \\text{ and } c < 0 \\implies ac > bc, \\quad \\frac{a}{c} > \\frac{b}{c} \\quad \\text{(Sign reverses)}", tags: ["rules", "negative"] },
        { id: "m5_4", name: "Absolute Value Inequality (Less than)", latex: "\\vert{}x\\vert{} \\le a \\iff -a \\le x \\le a \\quad (a > 0)", tags: ["absolute value"] },
        { id: "m5_5", name: "Absolute Value Inequality (Greater than)", latex: "\\vert{}x\\vert{} \\ge a \\iff x \\le -a \\quad \\text{or} \\quad x \\ge a \\quad (a > 0)", tags: ["absolute value"] }
    ],
    "Permutations and Combinations": [
        { id: "m6_1", name: "Factorial", latex: "n! = n(n-1)(n-2)\\dots 1, \\qquad 0! = 1", tags: ["factorial"] },
        { id: "m6_2", name: "Permutations Formula", latex: "^nP_r = \\frac{n!}{(n-r)!} \\quad (0 \\le r \\le n)", tags: ["permutations"] },
        { id: "m6_3", name: "Special Permutations", latex: "^nP_n = n!, \\qquad ^nP_0 = 1", tags: ["permutations"] },
        { id: "m6_4", name: "Arrangements with Repetitions", latex: "\\text{Arrangements} = \\frac{n!}{p_1! \\, p_2! \\, \\dots \\, p_k!}", tags: ["arrangements", "repetitions"] },
        { id: "m6_5", name: "Combinations Formula", latex: "^nC_r = \\frac{n!}{r!(n-r)!} = \\frac{^nP_r}{r!} \\quad (0 \\le r \\le n)", tags: ["combinations"] },
        { id: "m6_6", name: "Special Combinations", latex: "^nC_0 = ^nC_n = 1, \\qquad ^nC_1 = n", tags: ["combinations"] },
        { id: "m6_7", name: "Symmetric Combinations", latex: "^nC_r = ^nC_{n-r}", tags: ["combinations", "symmetry"] },
        { id: "m6_8", name: "Equality of Combinations", latex: "^nC_a = ^nC_b \\implies a = b \\quad \\text{or} \\quad a + b = n", tags: ["combinations", "equality"] },
        { id: "m6_9", name: "Pascal's Formula", latex: "^nC_r + ^nC_{r-1} = ^{n+1}C_r", tags: ["pascal", "combinations"] }
    ],
    "Binomial Theorem": [
        { id: "m7_1", name: "Binomial Expansion", latex: "(a+b)^n = \\sum_{r=0}^n {^nC_r} a^{n-r} b^r", tags: ["expansion"] },
        { id: "m7_2", name: "Expansion (1+x)^n", latex: "(1+x)^n = \\sum_{r=0}^n {^nC_r} x^r", tags: ["expansion"] },
        { id: "m7_3", name: "Expansion (1-x)^n", latex: "(1-x)^n = \\sum_{r=0}^n (-1)^r {^nC_r} x^r", tags: ["expansion", "alternating"] },
        { id: "m7_4", name: "General Term", latex: "T_{r+1} = {^nC_r} a^{n-r} b^r", tags: ["general term"] },
        { id: "m7_5", name: "Middle Term (Even n)", latex: "\\text{Middle Term} = T_{\\frac{n}{2} + 1}", tags: ["middle term", "even"] },
        { id: "m7_6", name: "Middle Terms (Odd n)", latex: "\\text{Middle Terms} = T_{\\frac{n+1}{2}} \\quad \\text{and} \\quad T_{\\frac{n+3}{2}}", tags: ["middle term", "odd"] },
        { id: "m7_7", name: "Sum of Binomial Coefficients", latex: "\\sum_{r=0}^n {^nC_r} = 2^n", tags: ["sum", "coefficients"] },
        { id: "m7_8", name: "Alternating Sum of Coefficients", latex: "\\sum_{r=0}^n (-1)^r {^nC_r} = 0", tags: ["sum", "coefficients", "alternating"] }
    ],
    "Sequences and Series": [
        { id: "m8_1", name: "nth Term of GP", latex: "a_n = a r^{n-1}", tags: ["gp", "nth term"] },
        { id: "m8_2", name: "Sum of n Terms of GP", latex: "S_n = \\frac{a(1 - r^n)}{1 - r} = \\frac{a(r^n - 1)}{r - 1}, \\quad (r \\neq 1)", tags: ["gp", "sum"] },
        { id: "m8_3", name: "Sum of Infinite GP", latex: "S_\\infty = \\frac{a}{1 - r} \\quad (\\vert{}r\\vert{} < 1)", tags: ["gp", "infinite sum"] },
        { id: "m8_4", name: "Geometric Mean (GM)", latex: "G = \\sqrt{ab}", tags: ["geometric mean"] },
        { id: "m8_5", name: "Inserting n GMs", latex: "r = \\left(\\frac{b}{a}\\right)^{\\frac{1}{n+1}}, \\qquad G_k = a r^k", tags: ["geometric mean", "insertion"] },
        { id: "m8_6", name: "Arithmetic Mean (AM)", latex: "\\text{AM} = A = \\frac{a+b}{2}", tags: ["arithmetic mean"] },
        { id: "m8_7", name: "AM-GM Inequality", latex: "A \\ge G \\iff \\frac{a+b}{2} \\ge \\sqrt{ab} \\quad (a, b > 0)", tags: ["inequality", "am-gm"] },
        { id: "m8_8", name: "Quadratic Relation (AM, GM)", latex: "x^2 - 2Ax + G^2 = 0", tags: ["quadratic", "am-gm"] }
    ],
    "Straight Lines": [
        { id: "m9_1", name: "Slope of a Line", latex: "m = \\tan\\theta = \\frac{y_2 - y_1}{x_2 - x_1}", tags: ["slope"] },
        { id: "m9_2", name: "Parallel Lines", latex: "m_1 = m_2", tags: ["parallel", "slope"] },
        { id: "m9_3", name: "Perpendicular Lines", latex: "m_1 m_2 = -1", tags: ["perpendicular", "slope"] },
        { id: "m9_4", name: "Acute Angle Between Lines", latex: "\\tan\\theta = \\left\\vert{}\\frac{m_2 - m_1}{1 + m_1 m_2}\\right\\vert{}", tags: ["angle", "lines"] },
        { id: "m9_5", name: "Point-Slope Form", latex: "y - y_0 = m(x - x_0)", tags: ["equation", "point-slope"] },
        { id: "m9_6", name: "Two-Point Form", latex: "y - y_1 = \\left(\\frac{y_2 - y_1}{x_2 - x_1}\\right)(x - x_1)", tags: ["equation", "two-point"] },
        { id: "m9_7", name: "Slope-Intercept Form", latex: "y = mx + c \\quad \\text{or} \\quad y = m(x - d)", tags: ["equation", "slope-intercept"] },
        { id: "m9_8", name: "Intercept Form", latex: "\\frac{x}{a} + \\frac{y}{b} = 1", tags: ["equation", "intercept"] },
        { id: "m9_9", name: "General Form Properties", latex: "Ax + By + C = 0 \\implies m = -\\frac{A}{B}, \\quad x\\text{-int} = -\\frac{C}{A}, \\quad y\\text{-int} = -\\frac{C}{B}", tags: ["equation", "general"] },
        { id: "m9_10", name: "Distance from Point to Line", latex: "d = \\frac{\\vert{}Ax_1 + By_1 + C\\vert{}}{\\sqrt{A^2 + B^2}}", tags: ["distance", "point", "line"] },
        { id: "m9_11", name: "Distance between Parallel Lines", latex: "d = \\frac{\\vert{}C_1 - C_2\\vert{}}{\\sqrt{A^2 + B^2}}", tags: ["distance", "parallel lines"] }
    ],
    "Conic Sections": [
        { id: "m10_1", name: "Circle Standard Form", latex: "(x-h)^2 + (y-k)^2 = r^2", tags: ["circle", "equation"] },
        { id: "m10_2", name: "Circle General Form", latex: "x^2 + y^2 + 2gx + 2fy + c = 0 \\implies \\text{Center } (-g, -f), \\quad r = \\sqrt{g^2 + f^2 - c}", tags: ["circle", "equation"] },
        { id: "m10_3", name: "Parabola y^2 = 4ax", latex: "y^2 = 4ax \\implies \\text{Focus } (a, 0), \\text{Directrix } x = -a, \\text{Latus Rectum } 4a", tags: ["parabola", "equation"] },
        { id: "m10_4", name: "Parabola y^2 = -4ax", latex: "y^2 = -4ax \\implies \\text{Focus } (-a, 0), \\text{Directrix } x = a, \\text{Latus Rectum } 4a", tags: ["parabola", "equation"] },
        { id: "m10_5", name: "Parabola x^2 = 4ay", latex: "x^2 = 4ay \\implies \\text{Focus } (0, a), \\text{Directrix } y = -a, \\text{Latus Rectum } 4a", tags: ["parabola", "equation"] },
        { id: "m10_6", name: "Parabola x^2 = -4ay", latex: "x^2 = -4ay \\implies \\text{Focus } (0, -a), \\text{Directrix } y = a, \\text{Latus Rectum } 4a", tags: ["parabola", "equation"] },
        { id: "m10_7", name: "Ellipse Horizontal", latex: "\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\implies c = \\sqrt{a^2 - b^2}, \\quad e = \\frac{c}{a} < 1, \\quad \\text{Foci } (\\pm c, 0)", tags: ["ellipse", "horizontal"] },
        { id: "m10_8", name: "Ellipse Horizontal Properties", latex: "\\text{Latus Rectum} = \\frac{2b^2}{a}, \\quad PF_1 + PF_2 = 2a", tags: ["ellipse", "horizontal", "properties"] },
        { id: "m10_9", name: "Ellipse Vertical", latex: "\\frac{x^2}{b^2} + \\frac{y^2}{a^2} = 1 \\implies \\text{Foci } (0, \\pm c), \\quad \\text{Vertices } (0, \\pm a)", tags: ["ellipse", "vertical"] },
        { id: "m10_10", name: "Hyperbola Horizontal", latex: "\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\implies c = \\sqrt{a^2 + b^2}, \\quad e = \\frac{c}{a} > 1, \\quad \\text{Foci } (\\pm c, 0)", tags: ["hyperbola", "horizontal"] },
        { id: "m10_11", name: "Hyperbola Horizontal Properties", latex: "\\text{Latus Rectum} = \\frac{2b^2}{a}, \\quad \\vert{}PF_1 - PF_2\\vert{} = 2a", tags: ["hyperbola", "horizontal", "properties"] },
        { id: "m10_12", name: "Hyperbola Vertical", latex: "\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1 \\implies \\text{Foci } (0, \\pm c), \\quad \\text{Vertices } (0, \\pm a)", tags: ["hyperbola", "vertical"] }
    ],
    "Introduction to Three Dimensional Geometry": [
        { id: "m11_1", name: "Distance Formula", latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}", tags: ["distance"] },
        { id: "m11_2", name: "Distance from Origin", latex: "OP = \\sqrt{x^2 + y^2 + z^2}", tags: ["distance", "origin"] },
        { id: "m11_3", name: "Internal Division", latex: "P = \\left(\\frac{mx_2 + nx_1}{m+n}, \\, \\frac{my_2 + ny_1}{m+n}, \\, \\frac{mz_2 + nz_1}{m+n}\\right)", tags: ["division", "internal"] },
        { id: "m11_4", name: "External Division", latex: "P = \\left(\\frac{mx_2 - nx_1}{m-n}, \\, \\frac{my_2 - ny_1}{m-n}, \\, \\frac{mz_2 - nz_1}{m-n}\\right)", tags: ["division", "external"] },
        { id: "m11_5", name: "Midpoint", latex: "M = \\left(\\frac{x_1 + x_2}{2}, \\, \\frac{y_1 + y_2}{2}, \\, \\frac{z_1 + z_2}{2}\\right)", tags: ["midpoint"] },
        { id: "m11_6", name: "Centroid of Triangle", latex: "G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\, \\frac{y_1 + y_2 + y_3}{3}, \\, \\frac{z_1 + z_2 + z_3}{3}\\right)", tags: ["centroid"] }
    ],
    "Limits and Derivatives": [
        { id: "m12_1", name: "Standard Limit (Algebraic)", latex: "\\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = n a^{n-1}", tags: ["limits", "algebraic"] },
        { id: "m12_2", name: "Standard Limits (Trig)", latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\qquad \\lim_{x \\to 0} \\frac{\\tan x}{x} = 1, \\qquad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0", tags: ["limits", "trigonometric"] },
        { id: "m12_3", name: "Derivative (First Principle)", latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", tags: ["derivative", "first principle"] },
        { id: "m12_4", name: "Product Rule", latex: "(uv)' = u'v + uv'", tags: ["derivative", "product rule"] },
        { id: "m12_5", name: "Quotient Rule", latex: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}", tags: ["derivative", "quotient rule"] },
        { id: "m12_6", name: "Power Rule & Constant", latex: "\\frac{d}{dx}(x^n) = nx^{n-1}, \\qquad \\frac{d}{dx}(c) = 0", tags: ["derivative", "power rule"] },
        { id: "m12_7", name: "Derivatives of Sin & Cos", latex: "\\frac{d}{dx}(\\sin x) = \\cos x, \\qquad \\frac{d}{dx}(\\cos x) = -\\sin x", tags: ["derivative", "trigonometric"] },
        { id: "m12_8", name: "Derivatives of Tan & Cot", latex: "\\frac{d}{dx}(\\tan x) = \\sec^2 x, \\qquad \\frac{d}{dx}(\\cot x) = -\\csc^2 x", tags: ["derivative", "trigonometric"] },
        { id: "m12_9", name: "Derivatives of Sec & Csc", latex: "\\frac{d}{dx}(\\sec x) = \\sec x \\tan x, \\qquad \\frac{d}{dx}(\\csc x) = -\\csc x \\cot x", tags: ["derivative", "trigonometric"] }
    ],
    "Statistics": [
        { id: "m13_1", name: "Range", latex: "\\text{Range} = x_{\\max} - x_{\\min}", tags: ["range", "dispersion"] },
        { id: "m13_2", name: "Mean Deviation (Ungrouped)", latex: "\\text{MD}(\\bar{x}) = \\frac{\\sum \\vert{}x_i - \\bar{x}\\vert{}}{n}, \\qquad \\text{MD}(M) = \\frac{\\sum \\vert{}x_i - M\\vert{}}{n}", tags: ["mean deviation", "ungrouped"] },
        { id: "m13_3", name: "Mean Deviation (Grouped)", latex: "\\text{MD}(\\bar{x}) = \\frac{\\sum f_i \\vert{}x_i - \\bar{x}\\vert{}}{N}, \\qquad \\text{MD}(M) = \\frac{\\sum f_i \\vert{}x_i - M\\vert{}}{N}", tags: ["mean deviation", "grouped"] },
        { id: "m13_4", name: "Median (Continuous)", latex: "M = l + \\left(\\frac{\\frac{N}{2} - C}{f}\\right) \\times h", tags: ["median", "continuous"] },
        { id: "m13_5", name: "Variance (Ungrouped)", latex: "\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2 = \\frac{\\sum x_i^2}{n} - (\\bar{x})^2", tags: ["variance", "ungrouped"] },
        { id: "m13_6", name: "Standard Deviation (Ungrouped)", latex: "\\sigma = \\sqrt{\\sigma^2}", tags: ["standard deviation"] },
        { id: "m13_7", name: "Variance (Grouped)", latex: "\\sigma^2 = \\frac{1}{N^2}\\left[N\\sum f_i x_i^2 - \\left(\\sum f_i x_i\\right)^2\\right]", tags: ["variance", "grouped"] },
        { id: "m13_8", name: "Step-Deviation Method (Mean)", latex: "\\bar{x} = A + \\left(\\frac{\\sum f_i y_i}{N}\\right)h", tags: ["mean", "step-deviation"] },
        { id: "m13_9", name: "Step-Deviation Method (Variance)", latex: "\\sigma_x^2 = \\frac{h^2}{N^2}\\left[N\\sum f_i y_i^2 - \\left(\\sum f_i y_i\\right)^2\\right]", tags: ["variance", "step-deviation"] },
        { id: "m13_10", name: "First n Natural Numbers (Variance)", latex: "\\sigma^2 = \\frac{n^2 - 1}{12}", tags: ["variance", "natural numbers"] }
    ],
    "Probability": [
        { id: "m14_1", name: "Probability Formula", latex: "P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{Favourable Outcomes}}{\\text{Total Possible Outcomes}}", tags: ["probability"] },
        { id: "m14_2", name: "Probability Bounds", latex: "0 \\le P(E) \\le 1, \\qquad P(S) = 1, \\qquad P(\\emptyset) = 0", tags: ["bounds", "probability"] },
        { id: "m14_3", name: "Addition Theorem", latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)", tags: ["addition theorem"] },
        { id: "m14_4", name: "Addition Theorem (Mutually Exclusive)", latex: "P(A \\cup B) = P(A) + P(B)", tags: ["addition theorem", "mutually exclusive"] },
        { id: "m14_5", name: "Complementary Event", latex: "P(A') = 1 - P(A)", tags: ["complementary"] },
        { id: "m14_6", name: "Difference of Events", latex: "P(A - B) = P(A) - P(A \\cap B)", tags: ["difference"] },
        { id: "m14_7", name: "Three Events Addition Rule", latex: "P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(B \\cap C) - P(C \\cap A) + P(A \\cap B \\cap C)", tags: ["addition rule", "three events"] }
    ]
};

let hasChanges = false;

if (mathData.subject === "Mathematics" && mathData.chapters) {
    mathData.chapters.forEach(chapter => {
        const chapterName = chapter.name.trim();
        if (formulasToInject[chapterName]) {
            chapter.formulas = formulasToInject[chapterName];
            hasChanges = true;
        } else {
            console.log(`No formulas found for chapter: ${chapterName}`);
        }
    });
}

if (hasChanges) {
    fs.writeFileSync(mathDataPath, JSON.stringify(mathData, null, 2));
    console.log("Successfully updated all formulas for Mathematics Class 11 while retaining key points/derivations.");
} else {
    console.log("Failed to update formulas.");
}
