import json

data = {
  "subject": "Mathematics",
  "audience": ["jee"],
  "chapters": [
    {
      "id": "jee_m_ch1",
      "class": "11",
      "name": "Sets, Relations & Functions",
      "formulas": [
        {
          "id": "jee_m_1_1",
          "name": "Set Cardinality",
          "latex": "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)",
          "tags": ["sets", "cardinality"]
        },
        {
          "id": "jee_m_1_2",
          "name": "Set Cardinality (3 sets)",
          "latex": "n(A \\cup B \\cup C) = \\sum n(A) - \\sum n(A \\cap B) + n(A \\cap B \\cap C)",
          "tags": ["sets", "cardinality"]
        },
        {
          "id": "jee_m_1_3",
          "name": "De Morgan's Laws",
          "latex": "(A \\cup B)' = A' \\cap B', \\qquad (A \\cap B)' = A' \\cup B'",
          "description": "Number of subsets of set of n elements = 2ⁿ. Proper subsets = 2ⁿ - 1.",
          "tags": ["sets", "de morgan"]
        },
        {
          "id": "jee_m_1_4",
          "name": "Counting Relations",
          "latex": "\\text{Total: } 2^{n^2}, \\qquad \\text{Reflexive: } 2^{n(n - 1)}, \\qquad \\text{Symmetric: } 2^{n(n + 1)/2}",
          "description": "On set A (|A| = n)",
          "tags": ["relations", "counting"]
        },
        {
          "id": "jee_m_1_5",
          "name": "Counting Functions",
          "latex": "\\text{Total: } m^n, \\qquad \\text{Injective (1-1): } ^mP_n \\text{ } (m \\ge n)",
          "description": "Functions A → B (|A|=n, |B|=m)",
          "tags": ["functions", "counting"]
        },
        {
          "id": "jee_m_1_6",
          "name": "Surjective Functions",
          "latex": "\\sum_{r=0}^m (-1)^{m-r} \\; ^mC_r \\; r^n",
          "description": "Number of bijective functions on set of n elements = n!.",
          "tags": ["functions", "surjective"]
        },
        {
          "id": "jee_m_1_7",
          "name": "Standard Functions Properties",
          "latex": "|x| = x (x \\ge 0), -x (x < 0)",
          "description": "Signum: sgn(x) = |x|/x (x ≠ 0), 0 (x = 0). Greatest Integer: [x] ≤ x < [x] + 1; x = [x] + {x}",
          "tags": ["modulus", "greatest integer", "signum"]
        }
      ],
      "keyPoints": [
        "[x + n] = [x] + n (for n ∈ ℤ).",
        "[-x] = -[x] (if x ∈ ℤ); -[x] - 1 (if x ∉ ℤ).",
        "{-x} = 0 (if x ∈ ℤ); 1 - {x} (if x ∉ ℤ)."
      ]
    },
    {
      "id": "jee_m_ch2",
      "class": "11",
      "name": "Trigonometric Functions & Equations",
      "formulas": [
        {
          "id": "jee_m_2_1",
          "name": "Compound Angles",
          "latex": "\\sin(x \\pm y) = \\sin x \\cos y \\pm \\cos x \\sin y, \\qquad \\cos(x \\pm y) = \\cos x \\cos y \\mp \\sin x \\sin y",
          "tags": ["trigonometry", "compound angles"]
        },
        {
          "id": "jee_m_2_2",
          "name": "Compound Angles (Tan)",
          "latex": "\\tan(x \\pm y) = \\frac{\\tan x \\pm \\tan y}{1 \\mp \\tan x \\tan y}",
          "tags": ["trigonometry", "compound angles"]
        },
        {
          "id": "jee_m_2_3",
          "name": "Multiple Angles (Sin)",
          "latex": "\\sin 2x = 2\\sin x \\cos x = \\frac{2\\tan x}{1 + \\tan^2x}, \\qquad \\sin 3x = 3\\sin x - 4\\sin^3x",
          "tags": ["trigonometry", "multiple angles"]
        },
        {
          "id": "jee_m_2_4",
          "name": "Multiple Angles (Cos)",
          "latex": "\\cos 2x = \\cos^2x - \\sin^2x = 2\\cos^2x - 1 = 1 - 2\\sin^2x = \\frac{1 - \\tan^2x}{1 + \\tan^2x}",
          "tags": ["trigonometry", "multiple angles"]
        },
        {
          "id": "jee_m_2_5",
          "name": "Multiple Angles (Cos 3x)",
          "latex": "\\cos 3x = 4\\cos^3x - 3\\cos x",
          "tags": ["trigonometry", "multiple angles"]
        },
        {
          "id": "jee_m_2_6",
          "name": "Multiple Angles (Tan)",
          "latex": "\\tan 2x = \\frac{2\\tan x}{1 - \\tan^2x}, \\qquad \\tan 3x = \\frac{3\\tan x - \\tan^3x}{1 - 3\\tan^2x}",
          "tags": ["trigonometry", "multiple angles"]
        },
        {
          "id": "jee_m_2_7",
          "name": "Sum-to-Product (C-D)",
          "latex": "\\sin C + \\sin D = 2 \\sin\\left(\\frac{C+D}{2}\\right) \\cos\\left(\\frac{C-D}{2}\\right), \\qquad \\sin C - \\sin D = 2 \\cos\\left(\\frac{C+D}{2}\\right) \\sin\\left(\\frac{C-D}{2}\\right)",
          "tags": ["trigonometry", "c and d formulas"]
        },
        {
          "id": "jee_m_2_8",
          "name": "Sum-to-Product (C-D Cosine)",
          "latex": "\\cos C + \\cos D = 2 \\cos\\left(\\frac{C+D}{2}\\right) \\cos\\left(\\frac{C-D}{2}\\right), \\qquad \\cos C - \\cos D = -2 \\sin\\left(\\frac{C+D}{2}\\right) \\sin\\left(\\frac{C-D}{2}\\right) = 2 \\sin\\left(\\frac{C+D}{2}\\right) \\sin\\left(\\frac{D-C}{2}\\right)",
          "tags": ["trigonometry", "c and d formulas"]
        },
        {
          "id": "jee_m_2_9",
          "name": "Product-to-Sum",
          "latex": "2\\cos x \\cos y = \\cos(x+y) + \\cos(x-y), \\qquad 2\\sin x \\sin y = \\cos(x-y) - \\cos(x+y)",
          "tags": ["trigonometry", "product to sum"]
        },
        {
          "id": "jee_m_2_10",
          "name": "Extreme values",
          "latex": "a \\cos x + b \\sin x \\in [-\\sqrt{a^2+b^2}, \\sqrt{a^2+b^2}]",
          "tags": ["trigonometry", "range"]
        },
        {
          "id": "jee_m_2_11",
          "name": "General Solutions",
          "latex": "\\sin \\theta = \\sin \\alpha \\implies \\theta = n\\pi + (-1)^n \\alpha, \\qquad \\cos \\theta = \\cos \\alpha \\implies \\theta = 2n\\pi \\pm \\alpha",
          "description": "n ∈ ℤ.",
          "tags": ["trigonometry", "general solution"]
        },
        {
          "id": "jee_m_2_12",
          "name": "General Solutions (Tan and Squares)",
          "latex": "\\tan \\theta = \\tan \\alpha \\implies \\theta = n\\pi + \\alpha, \\qquad \\sin^2\\theta = \\sin^2\\alpha \\implies \\theta = n\\pi \\pm \\alpha",
          "description": "Similar for cos²θ = cos²α, tan²θ = tan²α. n ∈ ℤ.",
          "tags": ["trigonometry", "general solution"]
        }
      ]
    },
    {
      "id": "jee_m_ch3",
      "class": "11",
      "name": "Complex Numbers & Quadratic Equations",
      "formulas": [
        {
          "id": "jee_m_3_1",
          "name": "Algebra of Complex Numbers",
          "latex": "z = x + iy = r(\\cos\\theta + i \\sin\\theta) = r e^{i\\theta}",
          "tags": ["complex numbers", "polar form"]
        },
        {
          "id": "jee_m_3_2",
          "name": "Modulus & Conjugate",
          "latex": "|z| = \\sqrt{x^2 + y^2}, \\qquad \\bar{z} = x - iy, \\qquad z \\bar{z} = |z|^2, \\qquad z^{-1} = \\frac{\\bar{z}}{|z|^2}",
          "tags": ["complex numbers", "modulus", "conjugate"]
        },
        {
          "id": "jee_m_3_3",
          "name": "Argument",
          "latex": "\\theta = \\text{arg}(z) = \\tan^{-1}(y/x)",
          "description": "principal arg ∈ (-π, π]",
          "tags": ["complex numbers", "argument"]
        },
        {
          "id": "jee_m_3_4",
          "name": "Properties",
          "latex": "|z_1 z_2| = |z_1||z_2|, \\qquad \\text{arg}(z_1 z_2) = \\text{arg}(z_1) + \\text{arg}(z_2)",
          "tags": ["complex numbers", "properties"]
        },
        {
          "id": "jee_m_3_5",
          "name": "Triangle Inequality",
          "latex": "||z_1| - |z_2|| \\le |z_1 \\pm z_2| \\le |z_1| + |z_2|",
          "tags": ["complex numbers", "triangle inequality"]
        },
        {
          "id": "jee_m_3_6",
          "name": "Cube Roots of Unity",
          "latex": "1, \\omega, \\omega^2 \\quad \\text{where } \\omega = \\frac{-1 + i\\sqrt{3}}{2} = e^{i2\\pi/3}",
          "description": "Properties: 1 + ω + ω² = 0; ω³ = 1; ω³k = 1",
          "tags": ["complex numbers", "cube roots"]
        },
        {
          "id": "jee_m_3_7",
          "name": "Factorisations",
          "latex": "x^3 - y^3 = (x - y)(x - \\omega y)(x - \\omega^2y)",
          "description": "x² + y² + z² - xy - yz - zx = (x + ωy + ω²z)(x + ω²y + ωz).",
          "tags": ["complex numbers", "factorisation"]
        },
        {
          "id": "jee_m_3_8",
          "name": "Quadratic Roots",
          "latex": "\\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}, \\qquad D = b^2 - 4ac",
          "tags": ["quadratic equations", "sum and product"]
        }
      ],
      "keyPoints": [
        "Roots real & distinct (D > 0), coincident (D = 0), imaginary (D < 0).",
        "Location of roots for f(x) = ax2 + bx + c (a > 0):",
        "Both roots > k: D ≥ 0, -b/2a > k, f(k) > 0.",
        "Both roots < k: D ≥ 0, -b/2a < k, f(k) > 0.",
        "k lies between roots: f(k) < 0.",
        "Both roots in (k1, k2): D ≥ 0, k1 < -b/2a < k2, f(k1) > 0, f(k2) > 0."
      ]
    },
    {
      "id": "jee_m_ch4",
      "class": "11",
      "name": "Permutations, Combinations & Binomial Theorem",
      "formulas": [
        {
          "id": "jee_m_4_1",
          "name": "Combinatorial Identities",
          "latex": "^nP_r = \\frac{n!}{(n - r)!}, \\qquad ^nC_r = \\frac{n!}{r! (n - r)!}",
          "tags": ["permutations", "combinations"]
        },
        {
          "id": "jee_m_4_2",
          "name": "Pascal's Rule & Ratio",
          "latex": "^nC_r + ^nC_{r-1} = ^{n+1}C_r, \\qquad \\frac{^nC_r}{^nC_{r-1}} = \\frac{n - r + 1}{r}",
          "tags": ["combinations", "properties"]
        },
        {
          "id": "jee_m_4_3",
          "name": "Division into groups & Distribution",
          "latex": "\\text{Groups: } \\frac{(m + n)!}{m! n!}, \\qquad \\text{Identical items to r boxes: } ^{n+r-1}C_{r-1}",
          "description": "Distribution of n distinct items into r distinct boxes: rⁿ.",
          "tags": ["combinations", "groups", "distribution"]
        },
        {
          "id": "jee_m_4_4",
          "name": "Derangements",
          "latex": "D_n = n! \\left[1 - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + ... + \\frac{(-1)^n}{n!}\\right]",
          "description": "D1 = 0, D2 = 1, D3 = 2, D4 = 9, D5 = 44.",
          "tags": ["derangement"]
        },
        {
          "id": "jee_m_4_5",
          "name": "Multinomial expansion",
          "latex": "(x_1 + x_2 + ... + x_k)^n \\text{ has } ^{n+k-1}C_{k-1} \\text{ terms}",
          "tags": ["multinomial"]
        },
        {
          "id": "jee_m_4_6",
          "name": "Binomial Theorem",
          "latex": "(a + b)^n = \\sum_{r=0}^n \\; ^nC_r \\; a^{n-r} b^r",
          "tags": ["binomial theorem"]
        },
        {
          "id": "jee_m_4_7",
          "name": "General Term",
          "latex": "T_{r+1} = \\; ^nC_r \\; a^{n-r} b^r",
          "description": "Middle Term: n even ⇒ Tn/2 + 1; n odd ⇒ T(n+1)/2 and T(n+3)/2",
          "tags": ["binomial theorem", "general term"]
        },
        {
          "id": "jee_m_4_8",
          "name": "Sum of coefficients",
          "latex": "\\sum \\; ^nC_r = 2^n, \\qquad \\sum (-1)^r \\; ^nC_r = 0, \\qquad \\sum r \\; ^nC_r = n 2^{n-1}",
          "tags": ["binomial theorem", "coefficients"]
        }
      ]
    },
    {
      "id": "jee_m_ch5",
      "class": "11",
      "name": "Sequences and Series",
      "formulas": [
        {
          "id": "jee_m_5_1",
          "name": "Arithmetic Progression (AP)",
          "latex": "T_n = a + (n - 1)d, \\qquad S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)",
          "description": "AM = (a + b) / 2",
          "tags": ["ap", "progression"]
        },
        {
          "id": "jee_m_5_2",
          "name": "Geometric Progression (GP)",
          "latex": "T_n = a r^{n-1}, \\qquad S_n = \\frac{a(1 - r^n)}{1 - r} (r \\neq 1)",
          "description": "S∞ = a / (1 - r) (|r| < 1). GM = √(ab)",
          "tags": ["gp", "progression"]
        },
        {
          "id": "jee_m_5_3",
          "name": "Arithmetico-Geometric (AGP)",
          "latex": "T_n = [a + (n - 1)d] r^{n-1}, \\qquad S_\\infty = \\frac{a}{1 - r} + \\frac{dr}{(1 - r)^2} \\; (|r| < 1)",
          "tags": ["agp", "progression"]
        },
        {
          "id": "jee_m_5_4",
          "name": "Sum of Special Series",
          "latex": "\\sum n = \\frac{n(n+1)}{2}, \\qquad \\sum n^2 = \\frac{n(n+1)(2n+1)}{6}, \\qquad \\sum n^3 = \\left[\\frac{n(n+1)}{2}\\right]^2",
          "tags": ["special series", "summation"]
        },
        {
          "id": "jee_m_5_5",
          "name": "Means Inequality",
          "latex": "AM \\ge GM \\ge HM",
          "description": "For positive real numbers. Equality holds ⇔ all numbers are equal.",
          "tags": ["am gm hm inequality"]
        }
      ]
    },
    {
      "id": "jee_m_ch6",
      "class": "11",
      "name": "Coordinate Geometry: Straight Lines, Circles & Conic Sections",
      "formulas": [
        {
          "id": "jee_m_6_1",
          "name": "Straight Lines",
          "latex": "Ax + By + C = 0, \\qquad \\text{Slope: } m = -A/B",
          "tags": ["straight line", "coordinate geometry"]
        },
        {
          "id": "jee_m_6_2",
          "name": "Distance from point",
          "latex": "d = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2 + B^2}}",
          "tags": ["straight line", "distance"]
        },
        {
          "id": "jee_m_6_3",
          "name": "Parallel lines distance & Angle bisectors",
          "latex": "d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}}, \\qquad \\frac{a_1x + b_1y + c_1}{\\sqrt{a_1^2+b_1^2}} = \\pm \\frac{a_2x + b_2y + c_2}{\\sqrt{a_2^2+b_2^2}}",
          "tags": ["straight line", "angle bisector"]
        },
        {
          "id": "jee_m_6_4",
          "name": "Pair of Straight Lines",
          "latex": "ax^2 + 2hxy + by^2 = 0, \\qquad \\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{|a + b|}",
          "description": "Perpendicular ⇔ a + b = 0; Coincident ⇔ h² = ab. Pair condition: Δ = abc + 2fgh - af² - bg² - ch² = 0",
          "tags": ["pair of straight lines"]
        },
        {
          "id": "jee_m_6_5",
          "name": "Circle Equation",
          "latex": "x^2 + y^2 + 2gx + 2fy + c = 0",
          "description": "Center: (-g, -f), Radius: √(g² + f² - c)",
          "tags": ["circle"]
        },
        {
          "id": "jee_m_6_6",
          "name": "Circle Tangent",
          "latex": "T = xx_1 + yy_1 + g(x+x_1) + f(y+y_1) + c = 0, \\qquad y = mx \\pm r\\sqrt{1 + m^2}",
          "description": "Director Circle: x² + y² = 2r². Orthogonality condition: 2g₁g₂ + 2f₁f₂ = c₁ + c₂",
          "tags": ["circle", "tangent"]
        },
        {
          "id": "jee_m_6_7",
          "name": "Parabola (y² = 4ax)",
          "latex": "\\text{Focus: } (a, 0); \\quad \\text{Directrix: } x = -a; \\quad \\text{Latus Rectum } = 4a",
          "tags": ["parabola"]
        },
        {
          "id": "jee_m_6_8",
          "name": "Parabola Tangent & Normal",
          "latex": "yy_1 = 2a(x + x_1), \\qquad y = mx + \\frac{a}{m}, \\qquad y = mx - 2am - am^3",
          "description": "Parametric Tangent: ty = x + at²; Normal: y = -tx + 2at + at³",
          "tags": ["parabola", "tangent", "normal"]
        },
        {
          "id": "jee_m_6_9",
          "name": "Ellipse",
          "latex": "\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\; (a > b), \\qquad e = \\sqrt{1 - \\frac{b^2}{a^2}} < 1",
          "description": "Foci: (±ae, 0); Directrices: x = ±a/e. Latus Rectum = 2b²/a",
          "tags": ["ellipse"]
        },
        {
          "id": "jee_m_6_10",
          "name": "Ellipse Tangent & Normal",
          "latex": "y = mx \\pm \\sqrt{a^2m^2 + b^2}, \\qquad \\frac{a^2x}{x_1} - \\frac{b^2y}{y_1} = a^2 - b^2",
          "description": "Director Circle: x² + y² = a² + b². Focal property: PF₁ + PF₂ = 2a",
          "tags": ["ellipse", "tangent", "normal"]
        },
        {
          "id": "jee_m_6_11",
          "name": "Hyperbola",
          "latex": "\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1, \\qquad e = \\sqrt{1 + \\frac{b^2}{a^2}} > 1",
          "description": "Foci: (±ae, 0); Directrices: x = ±a/e. Latus Rectum = 2b²/a",
          "tags": ["hyperbola"]
        },
        {
          "id": "jee_m_6_12",
          "name": "Hyperbola Tangent & Properties",
          "latex": "y = mx \\pm \\sqrt{a^2m^2 - b^2}",
          "description": "Director Circle: x² + y² = a² - b². Rectangular Hyperbola (xy = c²): e = √2. Focal property: |PF₁ - PF₂| = 2a",
          "tags": ["hyperbola", "tangent"]
        }
      ]
    }
  ]
}

with open("src/data/ncert/jee_mathematics.json", "w") as f:
    json.dump(data, f, indent=2)
