import json
import re

def update_json(filepath, additions, title_to_chapter_id=None):
    with open(filepath, 'r') as f:
        data = json.load(f)

    # We will just append the new formulas to the end of the corresponding chapters.
    # To avoid duplicates, we check the latex string.

    # mapping is a dict: Chapter Name -> List of formula dicts

    for chapter in data["chapters"]:
        chap_name = chapter["name"]

        # In our additions, we categorized by sections which might map to chapter names
        # Let's do a broad matching or explicit mapping.
        added_formulas_for_this_chap = []
        if title_to_chapter_id and chap_name in title_to_chapter_id:
            for title in title_to_chapter_id[chap_name]:
                 if title in additions:
                     added_formulas_for_this_chap.extend(additions[title])

        if not added_formulas_for_this_chap:
            continue

        existing_latex = set(f["latex"].replace(" ", "") for f in chapter["formulas"])

        for new_f in added_formulas_for_this_chap:
            # Check for duplicate
            if new_f["latex"].replace(" ", "") not in existing_latex:
                # generate id
                new_f["id"] = f"{chapter['id']}_add_{len(chapter['formulas']) + 1}"
                chapter["formulas"].append(new_f)
                existing_latex.add(new_f["latex"].replace(" ", ""))

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)


chemistry_11 = {
    "Mole Concept & Stoichiometry": [
        {"name": "Moles", "latex": "n = \\frac{\\text{mass}}{M} = \\frac{\\text{molecules}}{N_A} = \\frac{\\text{volume(STP)}}{22.4L}", "tags": ["moles"]},
        {"name": "Avogadro's Number", "latex": "N_A = 6.022 \\times 10^{23} \\text{ mol}^{-1}", "tags": ["avogadro"]},
        {"name": "Molarity", "latex": "M = \\frac{\\text{moles of solute}}{\\text{volume of solution (L)}}", "tags": ["molarity"]},
        {"name": "Molality", "latex": "m = \\frac{\\text{moles of solute}}{\\text{mass of solvent (kg)}}", "tags": ["molality"]},
        {"name": "Normality", "latex": "N = \\frac{\\text{equivalents}}{\\text{volume (L)}} = M \\times n\\text{-factor}", "tags": ["normality"]},
        {"name": "Mole Fraction", "latex": "\\chi_A = \\frac{n_A}{n_A + n_B}", "tags": ["mole fraction"]},
        {"name": "ppm", "latex": "\\text{ppm} = \\left(\\frac{\\text{mass of solute}}{\\text{mass of solution}}\\right) \\times 10^6", "tags": ["ppm"]},
        {"name": "Equivalent Weight", "latex": "E = \\frac{\\text{Molecular Weight}}{n\\text{-factor}}", "tags": ["equivalent weight"]},
        {"name": "% Yield", "latex": "\\% \\text{ yield} = \\left(\\frac{\\text{actual yield}}{\\text{theoretical yield}}\\right) \\times 100", "tags": ["yield"]},
        {"name": "Vapour Density", "latex": "VD = \\frac{M}{2} \\text{ (For gases)}", "tags": ["vapour density"]},
        {"name": "Gay-Lussac's Law", "latex": "\\frac{V_1}{n_1} = \\frac{V_2}{n_2} \\text{ (at same T, P)}", "tags": ["gay lussac"]}
    ],
    "Atomic Structure": [
        {"name": "de Broglie Wavelength", "latex": "\\lambda = \\frac{h}{mv} = \\frac{h}{p}", "tags": ["de broglie"]},
        {"name": "Bohr Radius", "latex": "r_n = 0.529 \\times \\frac{n^2}{Z} \\text{ \\AA}", "tags": ["bohr", "radius"]},
        {"name": "Bohr Energy", "latex": "E_n = -13.6 \\frac{Z^2}{n^2} \\text{ eV}", "tags": ["bohr", "energy"]},
        {"name": "Bohr Velocity", "latex": "v_n = 2.18 \\times 10^6 \\times \\frac{Z}{n} \\text{ m/s}", "tags": ["bohr", "velocity"]},
        {"name": "Bohr Frequency", "latex": "\\nu_n = 6.58 \\times 10^{15} \\times \\frac{Z^2}{n^3} \\text{ Hz}", "tags": ["bohr", "frequency"]},
        {"name": "Rydberg Formula", "latex": "\\frac{1}{\\lambda} = R Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)", "tags": ["rydberg"]},
        {"name": "Heisenberg Uncertainty", "latex": "\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}", "tags": ["heisenberg"]},
        {"name": "Photoelectric Effect", "latex": "E = h\\nu = \\frac{hc}{\\lambda} = KE + \\phi", "tags": ["photoelectric"]},
        {"name": "Number of Spectral Lines", "latex": "\\text{Lines} = \\frac{n(n-1)}{2}", "tags": ["spectral lines"]}
    ],
    "Chemical Thermodynamics": [
        {"name": "First Law", "latex": "\\Delta U = q + w", "tags": ["first law"]},
        {"name": "Enthalpy", "latex": "H = U + PV", "tags": ["enthalpy"]},
        {"name": "Gibbs Free Energy", "latex": "\\Delta G = \\Delta H - T\\Delta S", "tags": ["gibbs"]},
        {"name": "Gibbs & Equilibrium", "latex": "\\Delta G^\\circ = -RT \\ln K = -2.303RT \\log K", "tags": ["gibbs", "equilibrium"]},
        {"name": "Gibbs & Cell EMF", "latex": "\\Delta G^\\circ = -nFE^\\circ_{cell}", "tags": ["gibbs", "emf"]},
        {"name": "Work (Reversible Isothermal)", "latex": "w = -nRT \\ln\\left(\\frac{V_2}{V_1}\\right) = -2.303nRT \\log\\left(\\frac{V_2}{V_1}\\right)", "tags": ["work", "isothermal"]},
        {"name": "Work (Irreversible)", "latex": "w = -P_{ext}(V_2 - V_1)", "tags": ["work", "irreversible"]},
        {"name": "Heat Capacity", "latex": "C_p - C_v = nR", "tags": ["heat capacity"]},
        {"name": "Hess's Law", "latex": "\\Delta H_{rxn} = \\sum \\Delta H_f(\\text{products}) - \\sum \\Delta H_f(\\text{reactants})", "tags": ["hess"]},
        {"name": "Kirchhoff's Equation", "latex": "\\Delta H_2 - \\Delta H_1 = \\Delta C_p(T_2 - T_1)", "tags": ["kirchhoff"]},
        {"name": "Bond Energy", "latex": "\\Delta H = \\sum BE(\\text{reactants}) - \\sum BE(\\text{products})", "tags": ["bond energy"]},
        {"name": "Trouton's Rule", "latex": "\\Delta S_{vap} \\approx 88 \\text{ J/mol}\\cdot\\text{K}", "tags": ["trouton"]},
        {"name": "Entropy Change", "latex": "\\Delta S = \\frac{q_{rev}}{T} = nC_p \\ln\\left(\\frac{T_2}{T_1}\\right) + nR \\ln\\left(\\frac{V_2}{V_1}\\right)", "tags": ["entropy"]}
    ],
    "Chemical Equilibrium": [
        {"name": "Kp & Kc Relation", "latex": "K_p = K_c(RT)^{\\Delta n}", "tags": ["equilibrium", "kp", "kc"]},
        {"name": "Degree of Dissociation", "latex": "\\alpha = \\sqrt{\\frac{K_p}{K_p + P}} \\text{ for } A \\rightleftharpoons B + C", "tags": ["dissociation"]},
        {"name": "Van't Hoff Equation", "latex": "\\ln\\left(\\frac{K_2}{K_1}\\right) = \\frac{\\Delta H^\\circ}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)", "tags": ["vant hoff"]},
        {"name": "Kw (Water)", "latex": "K_w = [H^+][OH^-] = 10^{-14} \\text{ at } 25^\\circ\\text{C}", "tags": ["kw"]},
        {"name": "Henderson-Hasselbalch", "latex": "\\text{pH} = \\text{p}K_a + \\log\\frac{[A^-]}{[HA]}", "tags": ["henderson hasselbalch", "ph"]},
        {"name": "Buffer Capacity", "latex": "\\beta = \\frac{\\Delta B}{\\Delta \\text{pH}}", "tags": ["buffer"]},
        {"name": "Solubility Product", "latex": "K_{sp} = [A^{n+}]^m \\times [B^{m-}]^n \\text{ for } A_m B_n", "tags": ["ksp"]}
    ],
    "Organic Chemistry Reactions": [
        {"name": "Degree of Unsaturation", "latex": "DoU = \\frac{2C + 2 + N - H - X}{2}", "tags": ["dou"]}
    ]
}

chemistry_12 = {
    "Chemical Kinetics": [
        {"name": "Rate Law", "latex": "\\text{Rate} = k[A]^m[B]^n", "tags": ["rate law"]},
        {"name": "Zero Order", "latex": "[A] = [A]_0 - kt; \\quad t_{1/2} = \\frac{[A]_0}{2k}", "tags": ["zero order"]},
        {"name": "First Order", "latex": "k = \\frac{2.303}{t}\\log\\left(\\frac{[A]_0}{[A]}\\right); \\quad t_{1/2} = \\frac{0.693}{k}", "tags": ["first order"]},
        {"name": "Second Order", "latex": "\\frac{1}{[A]} = \\frac{1}{[A]_0} + kt; \\quad t_{1/2} = \\frac{1}{k[A]_0}", "tags": ["second order"]},
        {"name": "Arrhenius Equation", "latex": "k = Ae^{-E_a/RT}", "tags": ["arrhenius"]},
        {"name": "Arrhenius (Two Temp)", "latex": "\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)", "tags": ["arrhenius"]},
        {"name": "Temperature Coefficient", "latex": "\\mu = \\frac{k(T+10)}{k(T)} \\approx 2-3", "tags": ["temperature coefficient"]},
        {"name": "nth Order Half-Life", "latex": "t_{1/2} \\propto [A]_0^{1-n}", "tags": ["half life"]}
    ],
    "Electrochemistry": [
        {"name": "Nernst Equation", "latex": "E = E^\\circ - \\frac{0.0592}{n}\\log Q", "tags": ["nernst"]},
        {"name": "Cell EMF", "latex": "E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}", "tags": ["emf"]},
        {"name": "Faraday's 1st Law", "latex": "w = ZIt = \\frac{M \\times I \\times t}{n \\times F}", "tags": ["faraday"]},
        {"name": "Faraday's 2nd Law", "latex": "\\frac{w_1}{w_2} = \\frac{E_1}{E_2}", "tags": ["faraday"]},
        {"name": "Conductance", "latex": "G = \\frac{1}{R} = \\kappa \\times \\frac{A}{l}", "tags": ["conductance"]},
        {"name": "Molar Conductivity", "latex": "\\Lambda_m = \\kappa \\times \\frac{1000}{M}", "tags": ["molar conductivity"]},
        {"name": "Kohlrausch's Law", "latex": "\\Lambda^\\circ_m = \\nu_+\\lambda^\\circ_+ + \\nu_-\\lambda^\\circ_-", "tags": ["kohlrausch"]},
        {"name": "Debye-Hückel-Onsager", "latex": "\\Lambda_m = \\Lambda^\\circ_m - b\\sqrt{c}", "tags": ["debye huckel"]}
    ],
    "Solutions & Colligative Properties": [
        {"name": "Raoult's Law", "latex": "P = P^\\circ_A x_A + P^\\circ_B x_B", "tags": ["raoult"]},
        {"name": "Relative Lowering of VP", "latex": "\\frac{P^\\circ - P}{P^\\circ} = \\chi_{solute} = \\frac{n_2}{n_1 + n_2}", "tags": ["rlvp"]},
        {"name": "Elevation in BP", "latex": "\\Delta T_b = K_b \\times m \\times i", "tags": ["boiling point"]},
        {"name": "Depression in FP", "latex": "\\Delta T_f = K_f \\times m \\times i", "tags": ["freezing point"]},
        {"name": "Osmotic Pressure", "latex": "\\pi = iCRT = \\frac{inRT}{V}", "tags": ["osmotic pressure"]},
        {"name": "Van't Hoff Factor", "latex": "i = 1 + (n-1)\\alpha", "tags": ["vant hoff"]},
        {"name": "Kb Formula", "latex": "K_b = \\frac{RT_b^2 M_1}{1000 \\times \\Delta H_{vap}}", "tags": ["kb"]},
        {"name": "Kf Formula", "latex": "K_f = \\frac{RT_f^2 M_1}{1000 \\times \\Delta H_{fus}}", "tags": ["kf"]},
        {"name": "Henry's Law", "latex": "P = K_H \\times \\chi", "tags": ["henrys law"]}
    ],
    "Inorganic Chemistry — Coordination & Bonding": [
        {"name": "Magnetic Moment", "latex": "\\mu = \\sqrt{n(n+2)} \\text{ BM}", "tags": ["magnetic moment"]},
        {"name": "EAN Rule", "latex": "EAN = Z - OS + 2(CN)", "tags": ["ean"]},
        {"name": "Lattice Energy", "latex": "U \\propto \\frac{Z^+ \\times Z^-}{r^+ + r^-}", "tags": ["lattice energy"]},
        {"name": "Hybridization Formula", "latex": "H = \\frac{1}{2}(V + M - C + A)", "tags": ["hybridization"]},
        {"name": "Bond Order", "latex": "BO = \\frac{N_b - N_a}{2}", "tags": ["bond order"]},
        {"name": "Dipole Moment", "latex": "\\mu = q \\times d", "tags": ["dipole moment"]}
    ],
    "Surface Chemistry & Solid State": [
        {"name": "Freundlich Adsorption", "latex": "\\frac{x}{m} = kP^{1/n}", "tags": ["freundlich"]},
        {"name": "Langmuir Adsorption", "latex": "\\frac{P}{x/m} = \\frac{1}{ab} + \\frac{P}{a}", "tags": ["langmuir"]},
        {"name": "Density of Unit Cell", "latex": "\\rho = \\frac{ZM}{a^3N_A}", "tags": ["density"]},
        {"name": "Bragg's Law", "latex": "n\\lambda = 2d \\sin \\theta", "tags": ["bragg"]},
        {"name": "Void Radius (Octahedral)", "latex": "\\frac{r_{void}}{r_{sphere}} = 0.414", "tags": ["void", "octahedral"]},
        {"name": "Void Radius (Tetrahedral)", "latex": "\\frac{r_{void}}{r_{sphere}} = 0.225", "tags": ["void", "tetrahedral"]}
    ]
}


update_json("src/data/ncert/jee_chemistry.json", chemistry_11, {
    "Stoichiometry, Redox Reactions & Volumetric Analysis": ["Mole Concept & Stoichiometry"],
    "Atomic Structure": ["Atomic Structure"],
    "Chemical Energetics & Thermodynamics": ["Chemical Thermodynamics"],
    "Chemical Equilibrium": ["Chemical Equilibrium"],
    "General Organic Chemistry (GOC) & Hydrocarbons": ["Organic Chemistry Reactions"]
})

update_json("src/data/ncert/jee_class12_chemistry.json", chemistry_12, {
    "Chemical Kinetics": ["Chemical Kinetics"],
    "Electrochemistry": ["Electrochemistry"],
    "Liquid Solutions": ["Solutions & Colligative Properties"],
    "Coordination Compounds & d/f-Block Elements": ["Inorganic Chemistry \u2014 Coordination & Bonding"],
    "Solid State": ["Surface Chemistry & Solid State"]
})

print("Chem done")
