const fs = require('fs');

const physDataPath = 'src/data/ncert/physics.json';
let physData = JSON.parse(fs.readFileSync(physDataPath, 'utf8'));

const dataToInject2 = {
    "Mechanical Properties of Fluids": {
        keyPoints: [
            "Pascal’s Principle: Pressure applied to an enclosed static incompressible fluid is transmitted undiminished in all directions.",
            "Pressure in a static fluid is a scalar quantity and is identical at all points along the same horizontal depth.",
            "Atmospheric pressure at sea level is $1\\text{ atm} = 1.013 \\times 10^5\\text{ Pa} = 760\\text{ mm of Hg} = 760\\text{ torr}$.",
            "Continuity Equation: Incompressible fluid flow conserves mass along a flow tube ($A_1 v_1 = A_2 v_2$).",
            "Bernoulli’s Principle: Along a streamline in non-viscous flow, total energy per unit volume is constant.",
            "Dynamic lift (aerofoil wing and spinning Magnus effect) results from Bernoulli pressure differentials created by asymmetrical flow speeds.",
            "Viscous Drag & Terminal Velocity: Viscous retarding force on a sphere is $F = 6\\pi\\eta a v$ (Stokes' Law), leading to a constant terminal velocity.",
            "Viscosity of liquids decreases with increasing temperature, whereas viscosity of gases increases with temperature.",
            "Surface Tension & Capillarity: Surface tension produces excess pressure ($\\Delta p = 2S/r$ for drops) and drives capillary rise ($h = \\frac{2S\\cos\\theta}{\\rho g r}$).",
            "Wetting liquids ($\\theta < 90^\\circ$) rise in capillary tubes with a concave meniscus; non-wetting liquids like mercury ($\\theta > 90^\\circ$) suffer capillary depression."
        ],
        keyDerivations: [
            "Bernoulli’s Equation: Net work done by pressure forces $W_{\\text{net}} = (p_1 - p_2)\\Delta V$.",
            "Energy changes $\\Delta K = \\frac{1}{2}\\rho\\Delta V(v_2^2 - v_1^2), \\Delta U = \\rho g\\Delta V(h_2 - h_1)$.",
            "By Work-Energy Theorem, and dividing by $\\Delta V$: $p_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g h_1 = p_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g h_2$."
        ]
    },
    "Thermal Properties of Matter": {
        keyPoints: [
            "Fixed Points & Triple Point: The triple point of water ($273.16\\text{ K}$) is the unique standard reference point for thermodynamic temperature scales.",
            "Anomalous Water Expansion: Water contracts on heating from $0^\\circ\\text{C}$ to $4^\\circ\\text{C}$, reaching maximum density at $4^\\circ\\text{C}$, preserving aquatic life.",
            "Phase Transitions & Latent Heat: Temperature remains constant during melting and vaporization while latent heat ($Q = mL$) alters intermolecular bonds.",
            "Radiation & Cooling Laws: Blackbody radiation obeys the Stefan-Boltzmann law ($H = e\\sigma A T^4$), peak wavelength follows Wien's law ($\\lambda_m T = b$).",
            "Small-temperature convective cooling follows Newton’s law ($-dT/dt = K[T - T_s]$).",
            "Blackbody radiation curves are universal and depend solely on absolute temperature $T$."
        ],
        keyDerivations: [
            "Newton’s Law of Cooling from Stefan’s Law: Let $T = T_s + \\Delta T$ with $\\Delta T \\ll T_s$. Rate of heat loss $H = e\\sigma A (T^4 - T_s^4)$.",
            "Using binomial expansion, $H \\approx 4 e \\sigma A T_s^3 \\Delta T \\implies -dT/dt = K(T - T_s)$."
        ]
    },
    "Thermodynamics": {
        keyPoints: [
            "First Law & Energy Conservation: Energy is conserved in all processes ($\\Delta Q = \\Delta U + p\\Delta V$); internal energy $U$ is a state variable depending only on $T$ for ideal gases.",
            "Gas Process Work: Isothermal work is $W = 2.303 nRT \\log(V_2/V_1)$; adiabatic work is done at the expense of internal energy.",
            "Mayer's Relation: Molar specific heats satisfy $C_p - C_v = R$ because heating at constant pressure includes boundary expansion work.",
            "Quasi-static processes are infinitely slow, reversible idealizations that maintain equilibrium at every intermediate stage.",
            "Second Law & Carnot Engine: No heat engine can achieve $100\\%$ efficiency ($\\eta = 1 - T_2/T_1 < 1$).",
            "Kelvin-Planck Statement: No engine can convert heat entirely into mechanical work in a cyclic process.",
            "Clausius Statement: No process can transfer heat from a colder body to a hotter body without external work input.",
            "Carnot's Theorem: No engine working between two temperatures can be more efficient than a reversible Carnot engine operating between the same reservoirs."
        ],
        keyDerivations: [
            "Mayer's Relation ($C_p - C_v = R$): At constant volume $q_v = C_v \\Delta T = \\Delta U$. At constant pressure $q_p = C_p \\Delta T = \\Delta U + p\\Delta V$.",
            "For 1 mole of ideal gas $p\\Delta V = R\\Delta T$. Substituting: $C_p \\Delta T = C_v \\Delta T + R\\Delta T \\implies C_p - C_v = R$."
        ]
    },
    "Kinetic Theory of Gases": {
        keyPoints: [
            "Kinetic Pressure & Temperature: Gas pressure originates from molecular collisions ($p = \\frac{1}{3}\\rho\\overline{v^2}$).",
            "Absolute temperature is proportional to mean translational kinetic energy ($\\frac{1}{2}m\\overline{v^2} = \\frac{3}{2}k_B T$).",
            "Dalton’s Law of Partial Pressures: Total pressure is the sum of partial pressures of individual non-interacting components.",
            "Equipartition Theorem: In thermal equilibrium, each independent quadratic degree of freedom contains an average energy of $\\frac{1}{2}k_B T$.",
            "Specific Heat Ratios ($\\gamma$): Ratio of specific heats depends on molecular atomicity: $\\gamma = 1 + 2/f$ (Monatomic: $\\approx 1.67$; Diatomic: $1.40$).",
            "Mean Free Path: The average distance between successive molecular collisions is $l = \\frac{1}{\\sqrt{2}n\\pi d^2}$, governing diffusion and viscosity."
        ],
        keyDerivations: [
            "Ideal Gas Pressure: Momentum change $\\Delta p_x = 2mv_x$. Number of molecules hitting in time $\\Delta t = \\frac{1}{2} n A v_x \\Delta t$.",
            "Force $F = nmA v_x^2 \\implies p_x = nm\\overline{v_x^2}$. By isotropy, $\\overline{v_x^2} = \\frac{1}{3}\\overline{v^2} \\implies p = \\frac{1}{3}nm\\overline{v^2} = \\frac{1}{3}\\rho\\overline{v^2}$."
        ]
    },
    "Oscillations": {
        keyPoints: [
            "SHM Condition: Simple harmonic motion occurs when restoring force is proportional to displacement ($F = -kx \\implies a = -\\omega^2 x$).",
            "SHM is the projection of uniform circular motion on a diameter of the reference circle.",
            "Velocity leads displacement by $\\pi/2\\text{ rad}$ ($90^\\circ$); acceleration leads displacement by $\\pi\\text{ rad}$ ($180^\\circ$).",
            "Energy Conservation: Total mechanical energy in SHM is constant ($E = \\frac{1}{2}kA^2$); kinetic and potential energies exchange continuously at frequency $2\\nu$.",
            "Simple Pendulum Period: For small angular amplitudes, the period is $T = 2\\pi\\sqrt{L/g}$, independent of the bob's mass and amplitude."
        ],
        keyDerivations: [
            "Simple Pendulum Period: Restoring torque $\\tau = -mgL\\theta$. Equation of rotational motion $\\tau = I\\alpha = mL^2 \\frac{d^2\\theta}{dt^2}$.",
            "$\\frac{d^2\\theta}{dt^2} + \\frac{g}{L}\\theta = 0 \\implies \\omega = \\sqrt{\\frac{g}{L}} \\implies T = 2\\pi\\sqrt{\\frac{L}{g}}$."
        ]
    },
    "Waves": {
        keyPoints: [
            "Wave Types & Media Requirements: Transverse waves require shear elasticity (solids, stretched strings); longitudinal waves require bulk elasticity (solids, liquids, gases).",
            "Speed of Sound: Newton's isothermal formula was corrected by Laplace for adiabatic sound propagation ($B_{\\text{ad}} = \\gamma p$), giving $v = \\sqrt{\\gamma p/\\rho}$.",
            "Superposition & Standing Waves: Counter-propagating waves of equal frequency and amplitude form standing waves.",
            "Reflection at a rigid boundary introduces a phase reversal of $\\pi\\text{ rad}$ ($180^\\circ$); reflection at an open boundary produces zero phase change.",
            "Harmonics in Resonators: Stretched strings and open pipes produce all integer harmonics; closed pipes produce strictly odd harmonics.",
            "Beats: Superposition of two waves of slightly different frequencies produces periodic intensity beats at frequency $\\nu_{\\text{beat}} = |\\nu_1 - \\nu_2|$."
        ],
        keyDerivations: [
            "Standing Waves in Stretched String: Superposition of $y_1$ and $y_2$ yields $y(x,t) = -2a\\sin(kx)\\cos(\\omega t)$.",
            "Boundary condition at $x = L$ (Node): $\\sin(kL) = 0 \\implies kL = n\\pi \\implies \\lambda_n = \\frac{2L}{n}$.",
            "Natural frequencies: $\\nu_n = \\frac{nv}{2L} = \\frac{n}{2L}\\sqrt{\\frac{T}{\\mu}}$."
        ]
    }
};

let hasChanges2 = false;

// If a chapter is missing in physics.json but exists in the prompt, let's create it, or check why it's missing.
// The previous output of check_physics.cjs showed that chapters 9 to 12 are Class 12 topics in NCERT,
// wait, the prompt includes:
// Chapter 9: Mechanical Properties of Fluids
// Chapter 10: Thermal Properties of Matter
// Chapter 11: Thermodynamics
// Chapter 12: Kinetic Theory of Gases
// Chapter 13: Oscillations
// Chapter 14: Waves
// But the current `physics.json` has:
// { id: 'ch8', name: 'Mechanical Properties of Solids' }
// { id: 'ch9', name: 'Electric Charges and Fields' }
// So physics.json does NOT have Fluids, Thermal, Thermodynamics, Kinetic Theory, Oscillations, Waves!

// Instead of creating new chapters with no formulas, let me inject these into the JSON as new chapters without formulas (since they are pure theory for now).

const class11ChapterNames = [
    "Mechanical Properties of Fluids",
    "Thermal Properties of Matter",
    "Thermodynamics",
    "Kinetic Theory of Gases",
    "Oscillations",
    "Waves"
];

let baseId = 20; // to avoid conflicts

if (physData.subject === "Physics" && physData.chapters) {
    class11ChapterNames.forEach(chName => {
        const existing = physData.chapters.find(ch => ch.name.toLowerCase() === chName.toLowerCase());
        if (existing) {
            existing.keyPoints = dataToInject2[chName].keyPoints;
            existing.keyDerivations = dataToInject2[chName].keyDerivations;
            hasChanges2 = true;
        } else {
            // Append as new chapter
            physData.chapters.push({
                id: "ch" + (baseId++),
                class: "11",
                name: chName,
                formulas: [], // Pure theory chapter
                keyPoints: dataToInject2[chName].keyPoints,
                keyDerivations: dataToInject2[chName].keyDerivations
            });
            hasChanges2 = true;
        }
    });

    // Sort chapters by class so Class 11 is together, Class 12 is together
    physData.chapters.sort((a, b) => {
        if (a.class !== b.class) return a.class.localeCompare(b.class);
        return 0; // keep relative order otherwise
    });
}

if (hasChanges2) {
    fs.writeFileSync(physDataPath, JSON.stringify(physData, null, 2));
    console.log("Successfully injected remaining chapters for Physics Class 11.");
} else {
    console.log("No matching chapter IDs found.");
}
