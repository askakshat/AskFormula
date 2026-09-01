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

physics_11 = {
    "Kinematics": [
        {"name": "Equations of Motion", "latex": "v = u + at; \\quad s = ut + \\frac{1}{2}at^2; \\quad v^2 = u^2 + 2as", "tags": ["kinematics", "motion"]},
        {"name": "Relative Velocity", "latex": "v_{AB} = v_A - v_B", "tags": ["kinematics", "relative"]},
        {"name": "Projectile Range", "latex": "R = \\frac{u^2\\sin 2\\theta}{g}", "tags": ["projectile", "range"]},
        {"name": "Projectile Max Height", "latex": "H = \\frac{u^2\\sin^2\\theta}{2g}", "tags": ["projectile", "height"]},
        {"name": "Time of Flight", "latex": "T = \\frac{2u \\sin\\theta}{g}", "tags": ["projectile", "time"]},
        {"name": "Projectile on Incline", "latex": "R = \\frac{2u^2\\sin\\alpha\\cdot\\cos(\\alpha+\\beta)}{g\\cdot\\cos^2\\beta}", "tags": ["projectile", "incline"]},
        {"name": "River Crossing (min time)", "latex": "t = \\frac{d}{v_{swim}}; \\quad \\text{Drift} = \\left(\\frac{v_{river}}{v_{swim}}\\right)\\times d", "tags": ["river"]},
        {"name": "Circular Motion (Centripetal)", "latex": "a_c = \\frac{v^2}{r} = \\omega^2r", "tags": ["circular"]}
    ],
    "Newton's Laws & Friction": [
        {"name": "Newton's 2nd Law", "latex": "F = ma = \\frac{dp}{dt}", "tags": ["newtons laws"]},
        {"name": "Friction", "latex": "f \\le \\mu N; \\quad f_{kinetic} = \\mu_k N", "tags": ["friction"]},
        {"name": "Pseudo Force", "latex": "F_{pseudo} = -ma_{frame}", "tags": ["pseudo force"]},
        {"name": "Pulley (Atwood)", "latex": "a = \\frac{(m_1 - m_2)g}{m_1 + m_2}; \\quad T = \\frac{2m_1m_2g}{m_1 + m_2}", "tags": ["pulley"]},
        {"name": "Banking Angle", "latex": "\\tan \\theta = \\frac{v^2}{rg}", "tags": ["banking"]},
        {"name": "Spring Force", "latex": "F = -kx", "tags": ["spring"]},
        {"name": "Impulse", "latex": "J = F\\Delta t = \\Delta p", "tags": ["impulse"]},
        {"name": "Conical Pendulum", "latex": "T = 2\\pi\\sqrt{\\frac{L \\cos\\theta}{g}}", "tags": ["pendulum"]}
    ],
    "Work, Energy & Power": [
        {"name": "Work Done", "latex": "W = F\\cdot d\\cdot\\cos\\theta = \\int F\\cdot ds", "tags": ["work"]},
        {"name": "Kinetic Energy", "latex": "KE = \\frac{1}{2}mv^2", "tags": ["kinetic energy"]},
        {"name": "Gravitational PE", "latex": "U = -\\frac{GMm}{r} \\quad \\text{(from infinity)}; \\quad U = mgh \\quad \\text{(near surface)}", "tags": ["potential energy"]},
        {"name": "Spring PE", "latex": "U = \\frac{1}{2}kx^2", "tags": ["spring energy"]},
        {"name": "Power", "latex": "P = \\frac{W}{t} = F\\cdot v", "tags": ["power"]},
        {"name": "Coefficient of Restitution", "latex": "e = -\\frac{(v_2 - v_1)}{(u_2 - u_1)}", "tags": ["restitution"]},
        {"name": "Elastic Collision (1D)", "latex": "v_1 = \\frac{(m_1-m_2)u_1 + 2m_2u_2}{m_1+m_2}", "tags": ["collision"]}
    ],
    "Rotational Motion & Gravitation": [
        {"name": "Torque", "latex": "\\tau = r \\times F = I\\alpha", "tags": ["torque"]},
        {"name": "Angular Momentum", "latex": "L = I\\omega = mvr", "tags": ["angular momentum"]},
        {"name": "MOI (Disc)", "latex": "I = \\frac{1}{2}MR^2", "tags": ["moi"]},
        {"name": "MOI (Solid Sphere)", "latex": "I = \\frac{2}{5}MR^2", "tags": ["moi"]},
        {"name": "MOI (Hollow Sphere)", "latex": "I = \\frac{2}{3}MR^2", "tags": ["moi"]},
        {"name": "MOI (Rod, center)", "latex": "I = \\frac{ML^2}{12}", "tags": ["moi"]},
        {"name": "Parallel Axis Theorem", "latex": "I = I_{cm} + Md^2", "tags": ["parallel axis"]},
        {"name": "Rolling (No Slip)", "latex": "v = R\\omega; \\quad a = R\\alpha", "tags": ["rolling"]},
        {"name": "KE of Rolling Body", "latex": "KE = \\frac{1}{2}mv^2\\left(1 + \\frac{k^2}{R^2}\\right)", "tags": ["rolling energy"]},
        {"name": "Newton's Gravity", "latex": "F = \\frac{GMm}{r^2}", "tags": ["gravity"]},
        {"name": "Orbital Velocity", "latex": "v_0 = \\sqrt{\\frac{GM}{r}} = \\sqrt{gR}", "tags": ["orbital velocity"]},
        {"name": "Escape Velocity", "latex": "v_e = \\sqrt{2gR} = \\sqrt{\\frac{2GM}{R}}", "tags": ["escape velocity"]},
        {"name": "Kepler's 3rd Law", "latex": "T^2 \\propto a^3", "tags": ["keplers law"]},
        {"name": "g at Height h", "latex": "g' = g\\left(1 - \\frac{2h}{R}\\right)", "tags": ["gravity", "height"]},
        {"name": "g at Depth d", "latex": "g' = g\\left(1 - \\frac{d}{R}\\right)", "tags": ["gravity", "depth"]}
    ],
    "Thermodynamics & Kinetic Theory": [
        {"name": "Ideal Gas Law", "latex": "PV = nRT", "tags": ["ideal gas"]},
        {"name": "KE of Gas Molecule", "latex": "KE = \\frac{3}{2}kT", "tags": ["kinetic energy"]},
        {"name": "RMS Speed", "latex": "v_{rms} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3kT}{m}}", "tags": ["rms"]},
        {"name": "Most Probable Speed", "latex": "v_{mp} = \\sqrt{\\frac{2RT}{M}}", "tags": ["mp speed"]},
        {"name": "Mean Speed", "latex": "v_{mean} = \\sqrt{\\frac{8RT}{\\pi M}}", "tags": ["mean speed"]},
        {"name": "First Law", "latex": "\\Delta U = Q - W", "tags": ["first law"]},
        {"name": "Isothermal Work", "latex": "W = nRT \\ln\\left(\\frac{V_2}{V_1}\\right)", "tags": ["isothermal"]},
        {"name": "Adiabatic Process", "latex": "PV^\\gamma = \\text{constant}; \\quad TV^{\\gamma-1} = \\text{constant}", "tags": ["adiabatic"]},
        {"name": "Carnot Efficiency", "latex": "\\eta = 1 - \\frac{T_{cold}}{T_{hot}}", "tags": ["carnot"]},
        {"name": "Entropy", "latex": "\\Delta S = \\frac{Q_{rev}}{T}", "tags": ["entropy"]},
        {"name": "Stefan's Law", "latex": "P = \\sigma AT^4", "tags": ["stefans law"]},
        {"name": "Newton's Law of Cooling", "latex": "\\frac{dT}{dt} = -k(T - T_s)", "tags": ["newtons cooling"]},
        {"name": "Wien's Law", "latex": "\\lambda_{max} T = b", "tags": ["wiens law"]},
        {"name": "Thermal Conductivity", "latex": "\\frac{Q}{t} = kA\\frac{(T_1 - T_2)}{L}", "tags": ["thermal conductivity"]}
    ],
    "SHM & Waves": [
        {"name": "SHM Displacement", "latex": "x = A \\sin(\\omega t + \\phi)", "tags": ["shm"]},
        {"name": "SHM Period (Spring)", "latex": "T = 2\\pi\\sqrt{\\frac{m}{k}}", "tags": ["shm", "spring"]},
        {"name": "SHM Period (Pendulum)", "latex": "T = 2\\pi\\sqrt{\\frac{L}{g}}", "tags": ["shm", "pendulum"]},
        {"name": "SHM Velocity", "latex": "v = \\omega\\sqrt{A^2 - x^2}", "tags": ["shm", "velocity"]},
        {"name": "SHM Energy", "latex": "E = \\frac{1}{2}kA^2 = \\frac{1}{2}m\\omega^2A^2", "tags": ["shm", "energy"]},
        {"name": "Wave Speed", "latex": "v = f\\lambda = \\frac{\\omega}{k}", "tags": ["wave"]},
        {"name": "String Wave Speed", "latex": "v = \\sqrt{\\frac{T}{\\mu}}", "tags": ["wave", "string"]},
        {"name": "Beat Frequency", "latex": "f_{beat} = |f_1 - f_2|", "tags": ["beat"]},
        {"name": "Doppler Effect", "latex": "f' = f\\frac{v \\pm v_{observer}}{v \\mp v_{source}}", "tags": ["doppler"]},
        {"name": "Standing Wave (Both Ends Fixed)", "latex": "f_n = \\frac{nv}{2L}", "tags": ["standing wave"]},
        {"name": "Resonance (Closed Pipe)", "latex": "f_n = \\frac{nv}{4L}", "tags": ["resonance"]}
    ]
}

physics_12 = {
    "Electrostatics & Capacitors": [
        {"name": "Coulomb's Law", "latex": "F = \\frac{kq_1q_2}{r^2}", "tags": ["coulomb"]},
        {"name": "Electric Field", "latex": "E = \\frac{kQ}{r^2} = \\frac{F}{q_0}", "tags": ["electric field"]},
        {"name": "Gauss's Law", "latex": "\\oint E\\cdot dA = \\frac{Q_{enc}}{\\varepsilon_0}", "tags": ["gauss"]},
        {"name": "E (Infinite Plane)", "latex": "E = \\frac{\\sigma}{2\\varepsilon_0}", "tags": ["electric field", "plane"]},
        {"name": "Electric Potential", "latex": "V = \\frac{kQ}{r}", "tags": ["potential"]},
        {"name": "Potential Energy", "latex": "U = \\frac{kq_1q_2}{r}", "tags": ["potential energy"]},
        {"name": "Capacitance (Parallel Plate)", "latex": "C = \\frac{\\varepsilon_0 A}{d}", "tags": ["capacitance"]},
        {"name": "Capacitors in Series", "latex": "\\frac{1}{C_{eq}} = \\frac{1}{C_1} + \\frac{1}{C_2} + ...", "tags": ["capacitors", "series"]},
        {"name": "Capacitors in Parallel", "latex": "C_{eq} = C_1 + C_2 + ...", "tags": ["capacitors", "parallel"]},
        {"name": "Energy in Capacitor", "latex": "U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV", "tags": ["capacitor energy"]},
        {"name": "Electric Dipole Moment", "latex": "p = qd", "tags": ["dipole"]}
    ],
    "Current Electricity & Magnetism": [
        {"name": "Ohm's Law", "latex": "V = IR", "tags": ["ohms law"]},
        {"name": "Resistance", "latex": "R = \\frac{\\rho L}{A}", "tags": ["resistance"]},
        {"name": "Power", "latex": "P = VI = I^2R = \\frac{V^2}{R}", "tags": ["power"]},
        {"name": "Kirchhoff's Laws", "latex": "\\sum I = 0 \\quad \\text{(junction)}; \\quad \\sum V = 0 \\quad \\text{(loop)}", "tags": ["kirchhoff"]},
        {"name": "Wheatstone Bridge", "latex": "\\frac{R_1}{R_2} = \\frac{R_3}{R_4}", "tags": ["wheatstone"]},
        {"name": "EMF & Internal Resistance", "latex": "V = \\varepsilon - Ir", "tags": ["emf"]},
        {"name": "Biot-Savart Law", "latex": "dB = \\frac{\\mu_0}{4\\pi}\\frac{(I dl \\times \\hat{r})}{r^2}", "tags": ["biot savart"]},
        {"name": "B (Infinite Wire)", "latex": "B = \\frac{\\mu_0 I}{2\\pi r}", "tags": ["magnetic field", "wire"]},
        {"name": "B (Center of Coil)", "latex": "B = \\frac{\\mu_0 NI}{2R}", "tags": ["magnetic field", "coil"]},
        {"name": "B (Solenoid)", "latex": "B = \\mu_0 n I", "tags": ["magnetic field", "solenoid"]},
        {"name": "Force on Current", "latex": "F = BIL \\sin\\theta", "tags": ["magnetic force"]},
        {"name": "Force on Charge", "latex": "F = qv \\times B = qvB \\sin\\theta", "tags": ["magnetic force"]},
        {"name": "Faraday's Law", "latex": "EMF = -\\frac{d\\Phi}{dt} = -N\\frac{d\\Phi}{dt}", "tags": ["faradays law"]},
        {"name": "Self Inductance", "latex": "V = -L\\frac{dI}{dt}; \\quad \\text{Energy} = \\frac{1}{2}LI^2", "tags": ["inductance"]},
        {"name": "Impedance (RLC)", "latex": "Z = \\sqrt{R^2 + (X_L - X_C)^2}", "tags": ["impedance"]},
        {"name": "Resonant Frequency", "latex": "f_0 = \\frac{1}{2\\pi\\sqrt{LC}}", "tags": ["resonance"]},
        {"name": "Transformer", "latex": "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}", "tags": ["transformer"]}
    ],
    "Optics": [
        {"name": "Snell's Law", "latex": "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2", "tags": ["snells law"]},
        {"name": "Critical Angle", "latex": "\\sin\\theta_c = \\frac{n_2}{n_1}", "tags": ["critical angle"]},
        {"name": "Mirror Formula", "latex": "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}", "tags": ["mirror"]},
        {"name": "Lens Formula", "latex": "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}", "tags": ["lens"]},
        {"name": "Lens Maker's", "latex": "\\frac{1}{f} = (n-1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)", "tags": ["lens makers"]},
        {"name": "Magnification", "latex": "m = -\\frac{v}{u} \\quad \\text{(mirror)}; \\quad m = \\frac{v}{u} \\quad \\text{(lens)}", "tags": ["magnification"]},
        {"name": "Power of Lens", "latex": "P = \\frac{1}{f}", "tags": ["power"]},
        {"name": "YDSE Fringe Width", "latex": "\\beta = \\frac{\\lambda D}{d}", "tags": ["ydse"]},
        {"name": "Single Slit Min", "latex": "a \\sin\\theta = n\\lambda", "tags": ["single slit"]},
        {"name": "Brewster's Angle", "latex": "\\tan \\theta_B = \\frac{n_2}{n_1}", "tags": ["brewster"]},
        {"name": "Resolving Power", "latex": "\\theta_{min} = 1.22\\frac{\\lambda}{D}", "tags": ["resolving power"]}
    ],
    "Modern Physics": [
        {"name": "Photoelectric Effect", "latex": "KE_{max} = h\\nu - \\phi = eV_0", "tags": ["photoelectric"]},
        {"name": "de Broglie Wavelength", "latex": "\\lambda = \\frac{h}{p} = \\frac{h}{mv}", "tags": ["de broglie"]},
        {"name": "Bohr Model Energy", "latex": "E_n = -13.6\\frac{Z^2}{n^2} \\text{ eV}", "tags": ["bohr energy"]},
        {"name": "Bohr Model Radius", "latex": "r_n = 0.529\\frac{n^2}{Z} \\text{ \\AA}", "tags": ["bohr radius"]},
        {"name": "Half-Life", "latex": "t_{1/2} = \\frac{0.693}{\\lambda}; \\quad N = N_0e^{-\\lambda t}", "tags": ["half life"]},
        {"name": "Activity", "latex": "A = \\lambda N = A_0e^{-\\lambda t}", "tags": ["activity"]},
        {"name": "Mass-Energy", "latex": "E = mc^2", "tags": ["mass energy"]},
        {"name": "Binding Energy per Nucleon", "latex": "BE/A = \\frac{[Zm_p + Nm_n - M]c^2}{A}", "tags": ["binding energy"]},
        {"name": "Q-value", "latex": "Q = (m_{reactants} - m_{products})c^2", "tags": ["q value"]},
        {"name": "X-ray Cutoff Wavelength", "latex": "\\lambda_{min} = \\frac{hc}{eV}", "tags": ["xray"]},
        {"name": "Moseley's Law", "latex": "\\sqrt{\\nu} = a(Z - b)", "tags": ["moseleys law"]}
    ]
}


update_json("src/data/ncert/jee_physics.json", physics_11, {
    "Kinematics (1D, 2D, Projectile & Relative Motion)": ["Kinematics"],
    "Laws of Motion, Friction & Variable Mass Systems": ["Newton's Laws & Friction"],
    "Work, Energy, Power & Vertical Circular Motion": ["Work, Energy & Power"],
    "Rotational Mechanics": ["Rotational Motion & Gravitation"],
    "Gravitation": ["Rotational Motion & Gravitation"],
    "Heat, Thermodynamics & Kinetic Theory of Gases": ["Thermodynamics & Kinetic Theory"],
    "Simple Harmonic Motion (SHM)": ["SHM & Waves"],
    "Elasticity & Mechanical Waves": ["SHM & Waves"]
})

update_json("src/data/ncert/jee_class12_physics.json", physics_12, {
    "Electrostatics & Capacitance": ["Electrostatics & Capacitors"],
    "Current Electricity": ["Current Electricity & Magnetism"],
    "Magnetic Effects of Current & Magnetism": ["Current Electricity & Magnetism"],
    "Electromagnetic Induction & Alternating Current": ["Current Electricity & Magnetism"],
    "Optics: Ray Optics & Wave Optics": ["Optics"],
    "Modern Physics & Error Analysis": ["Modern Physics"]
})

print("Phy done")
