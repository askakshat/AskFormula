import json

def update_json(filepath, additions, title_to_chapter_id=None):
    with open(filepath, 'r') as f:
        data = json.load(f)

    for chapter in data["chapters"]:
        chap_name = chapter["name"]

        added_formulas_for_this_chap = []
        if title_to_chapter_id and chap_name in title_to_chapter_id:
            for title in title_to_chapter_id[chap_name]:
                 if title in additions:
                     added_formulas_for_this_chap.extend(additions[title])

        if not added_formulas_for_this_chap:
            continue

        existing_latex = set(f["latex"].replace(" ", "") for f in chapter["formulas"])

        for new_f in added_formulas_for_this_chap:
            if new_f["latex"].replace(" ", "") not in existing_latex:
                new_f["id"] = f"{chapter['id']}_add_{len(chapter['formulas']) + 1}"
                chapter["formulas"].append(new_f)
                existing_latex.add(new_f["latex"].replace(" ", ""))

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

math_11 = {
    "Algebra — Quadratics & Progressions": [
        {"name": "Quadratic Formula", "latex": "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}", "tags": ["quadratic"]},
        {"name": "Discriminant", "latex": "D = b^2 - 4ac", "tags": ["discriminant"]},
        {"name": "Sum of Roots", "latex": "\\alpha + \\beta = -\\frac{b}{a}", "tags": ["sum of roots"]},
        {"name": "Product of Roots", "latex": "\\alpha\\beta = \\frac{c}{a}", "tags": ["product of roots"]},
        {"name": "AP nth Term", "latex": "a_n = a + (n-1)d", "tags": ["ap"]},
        {"name": "AP Sum", "latex": "S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}(a + l)", "tags": ["ap sum"]},
        {"name": "GP nth Term", "latex": "a_n = ar^{n-1}", "tags": ["gp"]},
        {"name": "GP Sum (Finite)", "latex": "S_n = a\\frac{(r^n-1)}{r-1}", "tags": ["gp sum"]},
        {"name": "GP Sum (Infinite)", "latex": "S_\\infty = \\frac{a}{1-r}", "tags": ["gp sum", "infinite"]},
        {"name": "AM-GM Inequality", "latex": "\\frac{a+b}{2} \\ge \\sqrt{ab}", "tags": ["am-gm"]},
        {"name": "Sum of Squares", "latex": "\\sum n^2 = \\frac{n(n+1)(2n+1)}{6}", "tags": ["sum of squares"]},
        {"name": "Sum of Cubes", "latex": "\\sum n^3 = \\left[\\frac{n(n+1)}{2}\\right]^2", "tags": ["sum of cubes"]}
    ],
    "Algebra — Complex Numbers & Matrices": [
        {"name": "Euler's Formula", "latex": "e^{i\\theta} = \\cos\\theta + i \\sin\\theta", "tags": ["euler"]},
        {"name": "Modulus", "latex": "|z| = \\sqrt{x^2 + y^2}", "tags": ["modulus"]},
        {"name": "Argument", "latex": "\\arg(z) = \\tan^{-1}\\left(\\frac{y}{x}\\right)", "tags": ["argument"]},
        {"name": "Roots of Unity", "latex": "z^n = 1 \\implies z = e^{2\\pi ik/n}", "tags": ["roots of unity"]},
        {"name": "Triangle Inequality", "latex": "||z_1| - |z_2|| \\le |z_1 + z_2| \\le |z_1| + |z_2|", "tags": ["triangle inequality"]},
        {"name": "Matrix Inverse (2x2)", "latex": "A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}", "tags": ["matrix inverse"]},
        {"name": "Cramer's Rule", "latex": "x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}, \\quad z = \\frac{D_z}{D}", "tags": ["cramers rule"]}
    ],
    "Permutations, Combinations & Binomial": [
        {"name": "Permutation", "latex": "^nP_r = \\frac{n!}{(n-r)!}", "tags": ["permutation"]},
        {"name": "Combination", "latex": "^nC_r = \\frac{n!}{r!(n-r)!}", "tags": ["combination"]},
        {"name": "Circular Permutation", "latex": "(n-1)!", "tags": ["circular permutation"]},
        {"name": "Derangement", "latex": "D_n = n!\\left[1 - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + ...\\right]", "tags": ["derangement"]},
        {"name": "Binomial Theorem", "latex": "(a+b)^n = \\sum ^nC_r a^{n-r} b^r", "tags": ["binomial theorem"]},
        {"name": "General Term", "latex": "T_{r+1} = ^nC_r \\cdot a^{n-r} \\cdot b^r", "tags": ["general term"]},
        {"name": "Multinomial Coefficient", "latex": "\\frac{n!}{a!b!c!} \\quad (a+b+c = n)", "tags": ["multinomial"]},
        {"name": "Stars & Bars", "latex": "^{n+k-1}C_{k-1}", "tags": ["stars and bars"]}
    ],
    "Trigonometry": [
        {"name": "Pythagorean Identity", "latex": "\\sin^2\\theta + \\cos^2\\theta = 1", "tags": ["pythagorean"]},
        {"name": "sec-tan Identity", "latex": "1 + \\tan^2\\theta = \\sec^2\\theta", "tags": ["sec tan"]},
        {"name": "Compound Angle (sin)", "latex": "\\sin(A\\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B", "tags": ["compound angle"]},
        {"name": "Compound Angle (cos)", "latex": "\\cos(A\\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B", "tags": ["compound angle"]},
        {"name": "Double Angle (sin)", "latex": "\\sin 2A = 2\\sin A \\cos A", "tags": ["double angle"]},
        {"name": "Double Angle (cos)", "latex": "\\cos 2A = \\cos^2A - \\sin^2A", "tags": ["double angle"]},
        {"name": "Half Angle (sin)", "latex": "\\sin^2(A/2) = \\frac{1-\\cos A}{2}", "tags": ["half angle"]},
        {"name": "Half Angle (cos)", "latex": "\\cos^2(A/2) = \\frac{1+\\cos A}{2}", "tags": ["half angle"]},
        {"name": "Sum-to-Product", "latex": "\\sin C + \\sin D = 2\\sin\\left(\\frac{C+D}{2}\\right)\\cos\\left(\\frac{C-D}{2}\\right)", "tags": ["sum to product"]},
        {"name": "Product-to-Sum", "latex": "2\\sin A \\cos B = \\sin(A+B) + \\sin(A-B)", "tags": ["product to sum"]},
        {"name": "Sine Rule", "latex": "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R", "tags": ["sine rule"]},
        {"name": "Cosine Rule", "latex": "c^2 = a^2 + b^2 - 2ab \\cos C", "tags": ["cosine rule"]},
        {"name": "Area of Triangle", "latex": "\\Delta = \\frac{1}{2}ab \\sin C = \\sqrt{s(s-a)(s-b)(s-c)}", "tags": ["area"]}
    ],
    "Coordinate Geometry — Straight Lines & Circles": [
        {"name": "Distance Formula", "latex": "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}", "tags": ["distance"]},
        {"name": "Section Formula", "latex": "\\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}\\right)", "tags": ["section formula"]},
        {"name": "Slope-Intercept", "latex": "y = mx + c", "tags": ["slope intercept"]},
        {"name": "Angle Between Lines", "latex": "\\tan\\theta = \\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|", "tags": ["angle"]},
        {"name": "Distance from Point to Line", "latex": "d = \\frac{|ax_1 + by_1 + c|}{\\sqrt{a^2 + b^2}}", "tags": ["distance to line"]},
        {"name": "Circle General Equation", "latex": "x^2 + y^2 + 2gx + 2fy + c = 0", "tags": ["circle"]},
        {"name": "Length of Tangent", "latex": "L = \\sqrt{x_1^2 + y_1^2 + 2gx_1 + 2fy_1 + c}", "tags": ["tangent"]},
        {"name": "Radical Axis", "latex": "S_1 - S_2 = 0", "tags": ["radical axis"]},
        {"name": "Family of Circles", "latex": "S + \\lambda L = 0", "tags": ["family of circles"]}
    ],
    "Coordinate Geometry — Conics": [
        {"name": "Parabola Standard", "latex": "y^2 = 4ax", "tags": ["parabola"]},
        {"name": "Ellipse Standard", "latex": "\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1", "tags": ["ellipse"]},
        {"name": "Hyperbola Standard", "latex": "\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1", "tags": ["hyperbola"]},
        {"name": "Tangent to Parabola", "latex": "y = mx + \\frac{a}{m}", "tags": ["tangent", "parabola"]},
        {"name": "Tangent to Ellipse", "latex": "y = mx \\pm \\sqrt{a^2m^2+b^2}", "tags": ["tangent", "ellipse"]},
        {"name": "Eccentricity Relation", "latex": "e_1e_2 = 1 \\quad \\text{(conjugate hyperbolas)}", "tags": ["eccentricity"]},
        {"name": "Focal Chord Length (Parabola)", "latex": "4a \\csc^2\\theta", "tags": ["focal chord"]},
        {"name": "Latus Rectum (Ellipse)", "latex": "LR = \\frac{2b^2}{a}", "tags": ["latus rectum"]}
    ]
}

math_12 = {
    "Vectors & 3D Geometry": [
        {"name": "Dot Product", "latex": "\\vec{a} \\cdot \\vec{b} = |a||b|\\cos\\theta = a_1b_1 + a_2b_2 + a_3b_3", "tags": ["dot product"]},
        {"name": "Cross Product", "latex": "|\\vec{a} \\times \\vec{b}| = |a||b|\\sin\\theta", "tags": ["cross product"]},
        {"name": "Scalar Triple Product", "latex": "[\\vec{a} \\vec{b} \\vec{c}] = \\vec{a} \\cdot (\\vec{b} \\times \\vec{c})", "tags": ["scalar triple product"]},
        {"name": "Projection", "latex": "\\text{proj} = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}", "tags": ["projection"]},
        {"name": "Distance Between Skew Lines", "latex": "d = \\frac{|[\\vec{a}_2-\\vec{a}_1, \\vec{b}_1, \\vec{b}_2]|}{|\\vec{b}_1 \\times \\vec{b}_2|}", "tags": ["skew lines"]},
        {"name": "Plane Equation", "latex": "ax + by + cz = d", "tags": ["plane"]},
        {"name": "Distance Point to Plane", "latex": "d = \\frac{|ax_1 + by_1 + cz_1 - d|}{\\sqrt{a^2+b^2+c^2}}", "tags": ["distance to plane"]},
        {"name": "Line in 3D", "latex": "\\frac{x-x_1}{a} = \\frac{y-y_1}{b} = \\frac{z-z_1}{c}", "tags": ["line"]},
        {"name": "Angle Between Planes", "latex": "\\cos\\theta = \\frac{|\\vec{n}_1 \\cdot \\vec{n}_2|}{|\\vec{n}_1||\\vec{n}_2|}", "tags": ["angle"]}
    ],
    "Calculus — Limits & Differentiation": [
        {"name": "L'Hôpital's Rule", "latex": "\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}", "tags": ["lhopital"]},
        {"name": "Standard Limit (sin)", "latex": "\\lim_{x\\to0} \\frac{\\sin x}{x} = 1", "tags": ["limit", "sin"]},
        {"name": "Standard Limit (e)", "latex": "\\lim_{n\\to\\infty} \\left(1+\\frac{1}{n}\\right)^n = e", "tags": ["limit", "e"]},
        {"name": "Power Rule", "latex": "\\frac{d}{dx}(x^n) = nx^{n-1}", "tags": ["derivative", "power rule"]},
        {"name": "Product Rule", "latex": "(uv)' = u'v + uv'", "tags": ["derivative", "product rule"]},
        {"name": "Quotient Rule", "latex": "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}", "tags": ["derivative", "quotient rule"]},
        {"name": "Chain Rule", "latex": "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}", "tags": ["derivative", "chain rule"]},
        {"name": "Logarithmic Diff", "latex": "\\frac{d}{dx}(\\ln x) = \\frac{1}{x}; \\quad \\frac{d}{dx}(e^x) = e^x", "tags": ["derivative", "logarithmic"]},
        {"name": "Trig Derivatives", "latex": "\\frac{d}{dx}(\\sin x) = \\cos x; \\quad \\frac{d}{dx}(\\cos x) = -\\sin x; \\quad \\frac{d}{dx}(\\tan x) = \\sec^2 x", "tags": ["derivative", "trig"]},
        {"name": "Rolle's Theorem", "latex": "f(a)=f(b) \\implies \\exists c \\in (a,b): f'(c)=0", "tags": ["rolles theorem"]},
        {"name": "LMVT", "latex": "f'(c) = \\frac{f(b)-f(a)}{b-a}", "tags": ["lmvt"]},
        {"name": "Maxima/Minima", "latex": "f'(x) = 0 \\text{ and } f''(x) > 0 \\implies \\text{minima}; \\quad f''(x) < 0 \\implies \\text{maxima}", "tags": ["maxima minima"]}
    ],
    "Calculus — Integration & Differential Equations": [
        {"name": "Integration by Parts", "latex": "\\int u\\cdot v dx = u\\int v dx - \\int\\left(u'\\int v dx\\right)dx", "tags": ["integration by parts"]},
        {"name": "Substitution", "latex": "\\int f(g(x))g'(x)dx = \\int f(t)dt", "tags": ["substitution"]},
        {"name": "Definite Integral", "latex": "\\int_a^b f(x)dx = F(b) - F(a)", "tags": ["definite integral"]},
        {"name": "Area Under Curve", "latex": "A = \\int_a^b |f(x)| dx", "tags": ["area"]},
        {"name": "Area Between Curves", "latex": "A = \\int_a^b |f(x) - g(x)| dx", "tags": ["area"]},
        {"name": "King's Property", "latex": "\\int_0^a f(x)dx = \\int_0^a f(a-x)dx", "tags": ["kings property"]},
        {"name": "Walli's Formula", "latex": "\\int_0^{\\pi/2} \\sin^n x dx = \\frac{(n-1)!!}{n!!} \\times (\\pi/2 \\text{ or } 1)", "tags": ["wallis formula"]},
        {"name": "Linear DE", "latex": "\\frac{dy}{dx} + P(x)y = Q(x); \\quad IF = e^{\\int P dx}", "tags": ["linear de"]},
        {"name": "Variable Separable", "latex": "f(y)dy = g(x)dx", "tags": ["variable separable"]},
        {"name": "Leibniz Rule", "latex": "\\frac{d}{dx} \\int_{a(x)}^{b(x)} f(t)dt = f(b(x))b'(x) - f(a(x))a'(x)", "tags": ["leibniz rule"]}
    ],
    "Probability & Statistics": [
        {"name": "Addition Rule", "latex": "P(A\\cup B) = P(A) + P(B) - P(A\\cap B)", "tags": ["addition rule"]},
        {"name": "Conditional Probability", "latex": "P(A|B) = \\frac{P(A\\cap B)}{P(B)}", "tags": ["conditional probability"]},
        {"name": "Bayes' Theorem", "latex": "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}", "tags": ["bayes theorem"]},
        {"name": "Binomial Distribution", "latex": "P(X=r) = ^nC_r p^r q^{n-r}", "tags": ["binomial distribution"]},
        {"name": "Binomial Mean & Variance", "latex": "\\mu = np; \\quad \\sigma^2 = npq", "tags": ["binomial mean"]},
        {"name": "Mean", "latex": "\\bar{x} = \\frac{\\sum x_i}{n}", "tags": ["mean"]},
        {"name": "Variance", "latex": "\\sigma^2 = \\frac{\\sum(x_i - \\bar{x})^2}{n} = \\frac{\\sum x_i^2}{n} - \\bar{x}^2", "tags": ["variance"]},
        {"name": "Standard Deviation", "latex": "\\sigma = \\sqrt{\\text{variance}}", "tags": ["standard deviation"]},
        {"name": "Total Probability", "latex": "P(A) = \\sum P(A|B_i)P(B_i)", "tags": ["total probability"]}
    ]
}

# we need to map to existing chapter names for Math
update_json("src/data/ncert/jee_mathematics.json", math_11, {
    "Complex Numbers & Quadratic Equations": ["Algebra \u2014 Quadratics & Progressions", "Algebra \u2014 Complex Numbers & Matrices"],
    "Permutations, Combinations & Binomial Theorem": ["Permutations, Combinations & Binomial"],
    "Sequences and Series": ["Algebra \u2014 Quadratics & Progressions"],
    "Trigonometric Functions & Equations": ["Trigonometry"],
    "Coordinate Geometry: Straight Lines, Circles & Conic Sections": ["Coordinate Geometry \u2014 Straight Lines & Circles", "Coordinate Geometry \u2014 Conics"]
})

update_json("src/data/ncert/jee_class12_mathematics.json", math_12, {
    "Vectors, 3D Geometry, Linear Programming & Probability": ["Vectors & 3D Geometry", "Probability & Statistics"],
    "Calculus: Differential Calculus (Continuity, Derivatives, AOD)": ["Calculus \u2014 Limits & Differentiation"],
    "Integral Calculus & Differential Equations": ["Calculus \u2014 Integration & Differential Equations"]
})

print("Math done")
