const fs = require('fs');

const chemDataPath = 'src/data/ncert/chemistry.json';
let chemData = JSON.parse(fs.readFileSync(chemDataPath, 'utf8'));

// Extract and organize the provided key points and derivations
const dataToInject = {
    "c_ch1": {
        keyPoints: [
            "Matter exists in three physical states (solid, liquid, gas) which are interconvertible by altering temperature and pressure.",
            "Matter is classified at macroscopic levels into Pure Substances (elements and compounds with fixed compositions) and Mixtures (homogeneous and heterogeneous).",
            "The Kelvin scale cannot have negative values because $0\\text{ K}$ represents absolute zero.",
            "Mass is the constant amount of matter present in an object, whereas weight is the force exerted by gravity ($w = mg$) and varies with location.",
            "Precision indicates the closeness of repeated measurements to one another; Accuracy represents the agreement of a particular measurement with the true value.",
            "Significant Figure Rules: All non-zero digits are significant; leading zeros are never significant; captive zeros are always significant; trailing zeros are significant only if a decimal point is present; exact numbers have infinite significant figures.",
            "Dalton’s Atomic Theory regarded atoms as indivisible units, successfully explaining mass laws but failing to explain Gay-Lussac’s gaseous volume relationships.",
            "Avogadro resolved the atomic-molecular paradox by establishing that elemental gases such as $\\text{H}_2$ and $\\text{O}_2$ are diatomic molecules.",
            "The standard reference isotope for atomic mass definition is $^{12}\\text{C}$ assigned a mass of exactly $12.0000\\text{ u}$.",
            "Ionic compounds do not contain discrete molecules in the solid state; hence \"formula mass\" is used instead of molecular mass.",
            "One mole is the amount of substance that contains exactly $6.02214076 \\times 10^{23}$ elementary entities.",
            "Molar mass ($M$) expressed in $\\text{g}\\cdot\\text{mol}^{-1}$ is numerically identical to the atomic/molecular/formula mass in unified atomic mass units ($\\text{u}$).",
            "Empirical formula denotes the simplest whole-number ratio of atoms of different elements in a compound.",
            "Limiting Reagent: The reactant completely consumed first in a reaction; it determines the theoretical maximum yield of products.",
            "Temperature Dependence: Molarity changes with temperature because solution volume is temperature-dependent; molality and mole fraction are independent of temperature as mass is invariant."
        ],
        keyDerivations: [
            "Empirical to Molecular Formula: $\\text{Molecular Formula} = [\\text{Empirical Formula}]_n$, where $n = \\frac{\\text{Molar Mass}}{\\text{Empirical Formula Mass}}$",
            "Dilution & Mixing Formula: $M_1 V_1 + M_2 V_2 = M_3(V_1 + V_2)$"
        ]
    },
    "c_ch2": {
        keyPoints: [
            "Cathode rays travel from cathode to anode, consist of negatively charged electrons, and their properties do not depend upon the electrode material or the gas inside the tube.",
            "Canal rays (anode rays) depend on the gas present in the tube; the lightest positive particle obtained from hydrogen gas is the proton.",
            "Rutherford's Conclusions: Most volume of an atom is empty space; positive charge and mass are concentrated in a tiny dense core called the nucleus.",
            "Drawbacks of Rutherford's Model: According to Maxwell's electromagnetic theory, an accelerating charged electron must continuously emit radiation, losing energy and spiraling into the nucleus in $\\approx 10^{-8}\\text{ s}$.",
            "Photoelectric emission is instantaneous; the number of ejected electrons is proportional to light intensity, while their kinetic energy depends strictly on the radiation frequency above the threshold frequency ($\\nu_0$).",
            "The negative sign of electronic energy indicates that the electron is electrostatically bound to the nucleus; at $n = \\infty$, $E = 0$ (ionized state).",
            "Limitations of Bohr’s Model: Fails for multi-electron atoms; cannot explain the splitting of spectral lines in a magnetic field (Zeeman effect) or electric field (Stark effect).",
            "de Broglie relationship applies to all moving matter, but wave characteristics are measurable only for microscopic subatomic particles due to the small value of $h$.",
            "Heisenberg’s principle rules out deterministic, well-defined classical trajectories/orbits for electrons, replacing them with statistical probability distributions.",
            "$\\Psi$ has no direct physical meaning, but $\\vert{}\\Psi\\vert{}^2$ represents probability density (probability per unit volume of finding the electron at a point).",
            "Orbital Shapes: s-orbitals are spherically symmetric ($l=0$); p-orbitals are dumb-bell shaped ($l=1$); d-orbitals are double dumb-bell shaped ($l=2$).",
            "Extra Stability of Half-filled and Fully-filled Subshells: Due to symmetrical distribution of electron density and maximum exchange energy ($\\text{Cr: } [\\text{Ar}]3d^5 4s^1$ and $\\text{Cu: } [\\text{Ar}]3d^{10} 4s^1$)."
        ],
        keyDerivations: [
            "Thomson's Charge-to-Mass Ratio ($e/m_e$): $1.758820 \\times 10^{11} \\text{ C kg}^{-1}$",
            "Rydberg Formula for Hydrogen Transitions: $\\bar{\\nu} = 109677 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right) \\text{ cm}^{-1}$",
            "Bohr Radius Derivation Result: $r_n = 52.9 \\times n^2 \\text{ pm}$",
            "Bohr Energy Derivation Result: $E_n = -2.18 \\times 10^{-18} \\left(\\frac{1}{n^2}\\right) \\text{ J}$",
            "Time-Independent Schrödinger Wave Equation: $\\hat{H}\\Psi = E\\Psi$"
        ]
    },
    "c_ch3": { // Note this is classification of elements in NCERT, but the JSON maps c_ch3 to Chemical Bonding?
        keyPoints: [
            "Mendeleev's Periodic Law: Properties of elements are periodic functions of their atomic weights.",
            "Modern Periodic Law: Physical and chemical properties of elements are periodic functions of their atomic numbers ($Z$).",
            "Helium strictly has an $1s^2$ configuration (s-block) but is placed in Group 18 due to its closed-shell noble gas properties.",
            "Radius Trend: Decreases across a period (increasing $Z_{\\text{eff}}$); increases down a group (increasing $n$).",
            "Electronegativity: Increases across a period ($\\text{Li} \\to \\text{F}=4.0$), decreases down a group ($\\text{F} \\to \\text{At}$).",
            "Diagonal Relationship: $\\text{Li}$ resembles $\\text{Mg}$, $\\text{Be}$ resembles $\\text{Al}$, and $\\text{B}$ resembles $\\text{Si}$ due to similar charge/radius ratios and electronegativities."
        ],
        keyDerivations: [
            "Moseley's Law: $\\sqrt{\\nu} = a(Z - b)$"
        ]
    },
    "c_ch4": { // Chemical bonding / States of matter in JSON
        keyPoints: [
            "Octet Rule: Atoms combine by transfer or sharing of valence electrons to attain a stable noble gas configuration ($ns^2 np^6$).",
            "Exceptions to Octet Rule: Incomplete octet ($\\text{BF}_3$), Odd-electron molecules ($\\text{NO}_2$), Expanded octet ($\\text{SF}_6$).",
            "Ionic bond formation is favored by low ionization enthalpy of the metal, high negative electron gain enthalpy of the non-metal, and high lattice enthalpy.",
            "Resonance stabilizes molecules and equalizes bond lengths.",
            "In trigonal bipyramidal systems, lone pairs preferentially occupy equatorial positions to minimize $90^\\circ$ repulsions.",
            "Hybrid orbitals form stronger $\\sigma$-bonds than pure atomic orbitals due to concentrated directional electron lobes.",
            "Magnetic Nature: Paramagnetic if unpaired electrons exist (e.g., $\\text{O}_2$ has 2 unpaired electrons); Diamagnetic if all electrons are paired.",
            "Intermolecular H-bonding occurs between different molecules causing high boiling points; Intramolecular H-bonding occurs within the same molecule lowering boiling point."
        ],
        keyDerivations: [
            "LCAO (Linear Combination of Atomic Orbitals): $\\Psi_{\\text{MO}} = \\Psi_A \\pm \\Psi_B$",
            "Bond Order (BO): $BO = \\frac{1}{2} (N_b - N_a)$"
        ]
    },
    "c_ch5": {
        keyPoints: [
            "State functions depend only on initial and final states ($U, H, S, G, T, p, V$); path functions depend on the path taken ($q, w$).",
            "Extensive depends on mass/size; Intensive is independent of mass.",
            "Work done in a reversible isothermal process is the maximum possible expansion work.",
            "Internal energy of an ideal gas depends solely on temperature ($\\Delta U = 0$ for any isothermal process).",
            "By convention, the standard enthalpy of formation ($\\Delta_f H^\\ominus$) of an element in its reference state is assigned as zero.",
            "Enthalpy of combustion ($\\Delta_c H^\\ominus$) is always negative (exothermic).",
            "Second Law of Thermodynamics: The entropy of the universe continuously increases in any spontaneous process.",
            "Third Law of Thermodynamics: The entropy of a perfectly crystalline solid approaches zero as absolute zero of temperature ($0\\text{ K}$) is approached."
        ],
        keyDerivations: [
            "Reversible Isothermal Expansion of an Ideal Gas: $w_{\\text{rev}} = -2.303 nRT \\log\\left(\\frac{V_f}{V_i}\\right)$",
            "Derivation of $C_p - C_v = R$ for 1 mole of Ideal Gas",
            "Gibbs Energy and Equilibrium Constant: $\\Delta G^\\ominus = -2.303 RT \\log K$"
        ]
    },
    "c_ch6": {
        keyPoints: [
            "Dynamic Nature: Equilibrium is dynamic; forward and reverse reactions proceed at equal rates.",
            "Heterogeneous Equilibrium: Concentrations and partial pressures of pure solids and pure liquids are constant and omitted from $K_c$ and $K_p$ expressions.",
            "Le Chatelier’s Principle: Increasing pressure shifts equilibrium toward the side with fewer gaseous moles ($\\Delta n_g < 0$).",
            "Exothermic ($\\Delta H < 0$): Increasing T decreases K, shifting equilibrium in reverse. Endothermic ($\\Delta H > 0$): Increasing T increases K, shifting equilibrium forward.",
            "Catalyst: Increases forward and reverse reaction rates equally by lowering activation energy; does not affect K or equilibrium composition.",
            "Acid-Base Theories: Arrhenius yields $\\text{H}^+$ or $\\text{OH}^-$ in water. Brönsted-Lowry is proton donor/acceptor. Lewis is electron-pair acceptor/donor.",
            "Common Ion Effect: The suppression of degree of dissociation ($\\alpha$) of a weak electrolyte by adding a strong electrolyte containing a common ion.",
            "Precipitation occurs if Ionic Product $Q_{sp} > K_{sp}$; solution is saturated if $Q_{sp} = K_{sp}$; unsaturated if $Q_{sp} < K_{sp}$."
        ],
        keyDerivations: [
            "Derivation of Relation between $K_p$ and $K_c$: $K_p = K_c(RT)^{\\Delta n}$",
            "Weak Acid Ionization: $K_a = \\frac{c\\alpha^2}{1-\\alpha} \\approx c\\alpha^2$ (for $\\alpha \\ll 1$)",
            "Conjugate Acid-Base Pair Relation: $K_a \\times K_b = K_w$"
        ]
    }
};

let hasChanges = false;
chemData[0].chapters.forEach(chapter => {
    if (dataToInject[chapter.id]) {
        chapter.keyPoints = dataToInject[chapter.id].keyPoints;
        chapter.keyDerivations = dataToInject[chapter.id].keyDerivations;
        hasChanges = true;
    }
});

if (hasChanges) {
    fs.writeFileSync(chemDataPath, JSON.stringify(chemData, null, 2));
    console.log("Successfully injected key points and derivations for Chemistry Class 11.");
} else {
    console.log("No matching chapter IDs found.");
}
