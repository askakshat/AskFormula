import json

data = {
  "subject": "Chemistry",
  "audience": ["jee"],
  "chapters": [
    {
      "id": "jee_c12_ch1",
      "class": "12",
      "name": "Solid State",
      "formulas": [
        {
          "id": "jee_c12_1_1",
          "name": "Density of Unit Cell Formula",
          "latex": "\\rho = \\frac{z \\times M}{a^3 \\times N_A}",
          "description": "[M in g/mol, a in cm, ρ in g/cm³, NA = 6.022 × 10²³]",
          "tags": ["solid state", "density"]
        },
        {
          "id": "jee_c12_1_2",
          "name": "Simple Cubic (SC)",
          "latex": "z = 1, \\quad CN = 6, \\quad a = 2r, \\quad \\text{PF} = \\frac{\\pi}{6} \\approx 52.4\\%",
          "tags": ["solid state", "sc"]
        },
        {
          "id": "jee_c12_1_3",
          "name": "Body-Centered Cubic (BCC)",
          "latex": "z = 2, \\quad CN = 8, \\quad \\sqrt{3} a = 4r, \\quad \\text{PF} = \\frac{\\sqrt{3}\\pi}{8} \\approx 68\\%",
          "tags": ["solid state", "bcc"]
        },
        {
          "id": "jee_c12_1_4",
          "name": "Face-Centered Cubic (FCC/CCP)",
          "latex": "z = 4, \\quad CN = 12, \\quad \\sqrt{2} a = 4r, \\quad \\text{PF} = \\frac{\\pi}{3\\sqrt{2}} \\approx 74\\%",
          "tags": ["solid state", "fcc"]
        },
        {
          "id": "jee_c12_1_5",
          "name": "Hexagonal Close Packed (HCP)",
          "latex": "z = 6, \\quad CN = 12, \\quad c = 4r \\sqrt{2/3}, \\quad a = 2r, \\quad \\text{PF} = 74\\%",
          "tags": ["solid state", "hcp"]
        }
      ],
      "keyPoints": [
        "Radius Ratio Rules (r+/r-): < 0.155: CN=2; 0.155–0.225: CN=3; 0.225–0.414: CN=4; 0.414–0.732: CN=6; 0.732–1.0: CN=8.",
        "Schottky Defect: Equal number of cations and anions missing; lowers density; high CN and similar sizes (NaCl, KCl, CsCl, AgBr).",
        "Frenkel Defect: Dislocation of smaller cation into interstitial site; density remains unchanged; large size difference (ZnS, AgCl, AgBr, AgI).",
        "Note: AgBr exhibits both Schottky and Frenkel defects.",
        "Metal Excess (F-Centres): Trapped electrons in anionic vacancies impart color and paramagnetism (yellow NaCl, pink LiCl, violet KCl)."
      ]
    },
    {
      "id": "jee_c12_ch2",
      "class": "12",
      "name": "Liquid Solutions",
      "formulas": [
        {
          "id": "jee_c12_2_1",
          "name": "Raoult's Law (Volatile Liquid Mixture)",
          "latex": "p_{total} = p_A + p_B = p_A^\\circ x_A + p_B^\\circ x_B = p_B^\\circ + (p_A^\\circ - p_B^\\circ) x_A",
          "tags": ["solutions", "raoults law"]
        },
        {
          "id": "jee_c12_2_2",
          "name": "Vapor Phase Mole Fraction",
          "latex": "y_A = \\frac{p_A}{p_{total}} = \\frac{p_A^\\circ x_A}{p_{total}}",
          "description": "Ideal Solution: ΔHmix = 0, ΔVmix = 0.",
          "tags": ["solutions", "vapor phase"]
        },
        {
          "id": "jee_c12_2_3",
          "name": "Relative Lowering of Vapor Pressure",
          "latex": "\\frac{p_1^\\circ - p}{p_1^\\circ} = i x_2 \\approx i \\left(\\frac{n_2}{n_1}\\right) = i \\left[\\frac{w_2 M_1}{M_2 w_1}\\right]",
          "tags": ["solutions", "colligative properties", "rlvp"]
        },
        {
          "id": "jee_c12_2_4",
          "name": "Elevation of Boiling Point",
          "latex": "\\Delta T_b = T_b - T_b^\\circ = i K_b m = i \\left[\\frac{1000 K_b w_2}{M_2 w_1}\\right]",
          "description": "Kb = R M1 Tb°² / (1000 ΔvapH).",
          "tags": ["solutions", "colligative properties", "boiling point"]
        },
        {
          "id": "jee_c12_2_5",
          "name": "Depression of Freezing Point",
          "latex": "\\Delta T_f = T_f^\\circ - T_f = i K_f m = i \\left[\\frac{1000 K_f w_2}{M_2 w_1}\\right]",
          "description": "Kf = R M1 Tf°² / (1000 ΔfusH).",
          "tags": ["solutions", "colligative properties", "freezing point"]
        },
        {
          "id": "jee_c12_2_6",
          "name": "Osmotic Pressure",
          "latex": "\\Pi = i C R T = i \\left(\\frac{w_2}{M_2 V}\\right) R T",
          "description": "Best colligative property for determining molar mass of biomacromolecules.",
          "tags": ["solutions", "colligative properties", "osmotic pressure"]
        },
        {
          "id": "jee_c12_2_7",
          "name": "Van 't Hoff Factor (Dissociation)",
          "latex": "\\alpha = \\frac{i - 1}{n - 1}",
          "tags": ["solutions", "van t hoff", "dissociation"]
        },
        {
          "id": "jee_c12_2_8",
          "name": "Van 't Hoff Factor (Association)",
          "latex": "\\alpha = \\frac{1 - i}{1 - 1/n}",
          "description": "K4[Fe(CN)6]: n = 5 ⇒ i = 1 + 4α. Acetic acid dimerizes in benzene (n = 2) ⇒ i = 1 - α/2.",
          "tags": ["solutions", "van t hoff", "association"]
        }
      ],
      "keyPoints": [
        "Non-Ideal Positive Deviation: ΔHmix > 0, ΔVmix > 0, forms minimum boiling azeotropes.",
        "Non-Ideal Negative Deviation: ΔHmix < 0, ΔVmix < 0, forms maximum boiling azeotropes."
      ]
    },
    {
      "id": "jee_c12_ch3",
      "class": "12",
      "name": "Electrochemistry",
      "formulas": [
        {
          "id": "jee_c12_3_1",
          "name": "Nernst Equation (at 298 K)",
          "latex": "E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log Q",
          "description": "E°cell = E°cathode - E°anode.",
          "tags": ["electrochemistry", "nernst"]
        },
        {
          "id": "jee_c12_3_2",
          "name": "Equilibrium Constant & Free Energy",
          "latex": "\\log K_c = \\frac{n E^\\circ_{cell}}{0.0591}, \\qquad \\Delta_r G^\\circ = -n F E^\\circ_{cell} = -2.303 RT \\log K_c",
          "description": "F = 96487 C/mol ≈ 96500 C.",
          "tags": ["electrochemistry", "equilibrium constant", "free energy"]
        },
        {
          "id": "jee_c12_3_3",
          "name": "Conductivity & Cell Constant",
          "latex": "G = \\frac{1}{R} = \\kappa \\left(\\frac{A}{l}\\right), \\qquad G^* = \\frac{l}{A} = R \\kappa",
          "tags": ["electrochemistry", "conductivity"]
        },
        {
          "id": "jee_c12_3_4",
          "name": "Molar Conductivity",
          "latex": "\\Lambda_m = \\frac{1000 \\times \\kappa}{M}",
          "description": "Kohlrausch's Law: Λm° = ν+ λ+° + ν- λ-°",
          "tags": ["electrochemistry", "molar conductivity"]
        },
        {
          "id": "jee_c12_3_5",
          "name": "Weak Electrolyte Dissociation",
          "latex": "\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}, \\qquad K_a = \\frac{c \\Lambda_m^2}{\\Lambda_m^\\circ(\\Lambda_m^\\circ - \\Lambda_m)}",
          "tags": ["electrochemistry", "dissociation"]
        },
        {
          "id": "jee_c12_3_6",
          "name": "Faraday's Laws of Electrolysis",
          "latex": "w = z Q = z I t = \\left[\\frac{M}{n F}\\right] I t, \\qquad \\frac{w_1}{w_2} = \\frac{E_1}{E_2}",
          "description": "z = E / 96500 = electrochemical equivalent.",
          "tags": ["electrochemistry", "faradays laws"]
        }
      ],
      "keyPoints": [
        "Dry Cell: Anode: Zn → Zn2+ + 2e-; Cathode: MnO2 + NH4+ + e- → MnO(OH) + NH3; E ≈ 1.5 V.",
        "Mercury Cell: Anode: Zn(Hg) + 2OH- → ZnO + H2O + 2e-; Cathode: HgO + H2O + 2e- → Hg + 2OH-; E = 1.35 V (constant voltage).",
        "Lead Storage Battery (Discharge): Pb + PbO2 + 2H2SO4 → 2PbSO4 + 2H2O; E ≈ 2 V per cell (12 V battery = 6 cells in series).",
        "H2-O2 Fuel Cell: 2H2 + O2 → 2H2O; Efficiency ≈ 70%."
      ]
    },
    {
      "id": "jee_c12_ch4",
      "class": "12",
      "name": "Chemical Kinetics",
      "formulas": [
        {
          "id": "jee_c12_4_1",
          "name": "Zero Order Kinetics",
          "latex": "k = \\frac{[R]_0 - [R]}{t}, \\qquad t_{1/2} = \\frac{[R]_0}{2k}",
          "description": "Units of k: mol L⁻¹ s⁻¹",
          "tags": ["kinetics", "zero order"]
        },
        {
          "id": "jee_c12_4_2",
          "name": "First Order Kinetics",
          "latex": "k = \\frac{2.303}{t} \\log\\left(\\frac{[R]_0}{[R]}\\right), \\qquad t_{1/2} = \\frac{0.693}{k}",
          "description": "Units of k: s⁻¹",
          "tags": ["kinetics", "first order"]
        },
        {
          "id": "jee_c12_4_3",
          "name": "Gas Phase (1st Order)",
          "latex": "k = \\frac{2.303}{t} \\log\\left[\\frac{p_i}{2p_i - p_t}\\right]",
          "description": "For A(g) → B(g) + C(g)",
          "tags": ["kinetics", "first order", "gas phase"]
        },
        {
          "id": "jee_c12_4_4",
          "name": "Arrhenius Equation",
          "latex": "k = A e^{-E_a/RT} \\implies \\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R} \\left[\\frac{T_2 - T_1}{T_1 T_2}\\right]",
          "description": "Plot of log k vs 1/T has Slope = -Ea / (2.303 R) and Intercept = log A.",
          "tags": ["kinetics", "arrhenius"]
        }
      ]
    },
    {
      "id": "jee_c12_ch5",
      "class": "12",
      "name": "Coordination Compounds & d/f-Block Elements",
      "formulas": [
        {
          "id": "jee_c12_5_1",
          "name": "Crystal Field Splitting",
          "latex": "\\Delta_t = \\frac{4}{9} \\Delta_o",
          "description": "Octahedral: t2g lowered by 0.4Δo, eg raised by 0.6Δo. Tetrahedral: e lowered by 0.6Δt, t2 raised by 0.4Δt.",
          "tags": ["coordination compounds", "cft"]
        },
        {
          "id": "jee_c12_5_2",
          "name": "Crystal Field Stabilization Energy (CFSE)",
          "latex": "CFSE = (-0.4 n_{t_{2g}} + 0.6 n_{e_g}) \\Delta_o + m P",
          "description": "Strong field (Δo > P): Low spin. Weak field (Δo < P): High spin.",
          "tags": ["coordination compounds", "cfse"]
        },
        {
          "id": "jee_c12_5_3",
          "name": "Spin-Only Magnetic Moment",
          "latex": "\\mu = \\sqrt{n(n + 2)} \\text{ BM}",
          "description": "n = number of unpaired d-electrons.",
          "tags": ["coordination compounds", "magnetic moment"]
        }
      ],
      "keyPoints": [
        "Spectrochemical series: I- < Br- < SCN- < Cl- < S2- < F- < OH- < C2O42- < H2O < NCS- < edta4- < NH3 < en < CN- < CO.",
        "Chromate & Dichromate Preparations: 2CrO42- (yellow) + 2H+ ⇌ Cr2O72- (orange) + H2O",
        "Cr2O72- + 14H+ + 6e- → 2Cr3+ + 7H2O (E° = +1.33 V). Oxidizes Fe2+→Fe3+, I-→I2, H2S→S, Sn2+→Sn4+.",
        "Permanganate Preparations: 2MnO4- + 5C2O42- + 16H+ → 2Mn2+ + 10CO2 + 8H2O (Acidic)",
        "2MnO4- + H2O + I- → 2MnO2 + 2OH- + IO3- (Alkaline/Neutral)",
        "In acidic medium, MnO4- → Mn2+ (n-factor = 5). In faintly alkaline/neutral medium, MnO4- → MnO2 (n-factor = 3)."
      ]
    },
    {
      "id": "jee_c12_ch6",
      "class": "12",
      "name": "Organic Chemistry Reactions",
      "formulas": [],
      "keyPoints": [
        "SN1: 2 steps via carbocation intermediate; racemisation; reactivity: 3° > 2° > 1° > CH3X (Benzylic ≈ Allylic > 3°); polar protic solvents.",
        "SN2: 1 step via transition state; 100% Walden inversion; reactivity: CH3X > 1° > 2° > 3°; polar aprotic solvents (acetone, DMSO, DMF).",
        "Aldol Condensation: Aldehydes/ketones with ≥ 1 α-H in dil. NaOH ⇒ β-hydroxyaldehyde/ketone → α,β-unsaturated carbonyl.",
        "Cannizzaro Reaction: Aldehydes with NO α-H (HCHO, C6H5CHO) in 50% conc. KOH ⇒ disproportionation into alcohol + carboxylate salt.",
        "Rosenmund Reduction: RCOCl + H2 →(Pd/BaSO4) RCHO.",
        "Stephen Reaction: RCN + SnCl2/HCl → RCH=NH →(H3O+) RCHO.",
        "Étard Reaction: Toluene + CrO2Cl2/CS2 → Benzaldehyde.",
        "Gattermann-Koch: Benzene + CO + HCl →(anh. AlCl3/CuCl) Benzaldehyde.",
        "Clemmensen Reduction: >C=O →(Zn-Hg / conc. HCl) >CH2.",
        "Wolff-Kishner Reduction: >C=O →(NH2NH2, KOH/glycol, Δ) >CH2.",
        "Hell-Volhard-Zelinsky (HVZ): R-CH2-COOH + X2/red P → R-CH(X)-COOH.",
        "Gabriel Phthalimide: Prepares pure 1° aliphatic amines (aromatic amines cannot be prepared).",
        "Hoffmann Bromamide Degradation: RCONH2 + Br2 + 4NaOH → RNH2 (1 less carbon) + Na2CO3 + 2NaBr + 2H2O.",
        "Carbylamine Test (Isocyanide): RNH2 / ArNH2 + CHCl3 + 3KOH → RNC (foul odor) + 3KCl + 3H2O. (1° amines only).",
        "Hinsberg Test: C6H5SO2Cl (1° amine ⇒ soluble in alkali; 2° amine ⇒ insoluble in alkali; 3° amine ⇒ no reaction).",
        "Phenol Reactions: Kolbe's synthesis (→ Salicylic acid with CO2/NaOH); Reimer-Tiemann (→ Salicylaldehyde with CHCl3/NaOH via :CCl2 carbene intermediate); Coupling with diazonium salt (→ p-hydroxyazobenzene orange dye at pH 9–10)."
      ]
    }
  ]
}

with open("src/data/ncert/jee_class12_chemistry.json", "w") as f:
    json.dump(data, f, indent=2)
