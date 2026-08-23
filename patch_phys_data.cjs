const fs = require('fs');

const physDataPath = 'src/data/ncert/physics.json';
let physData = JSON.parse(fs.readFileSync(physDataPath, 'utf8'));

const dataToInject = {
    "Units and Measurements": {
        keyPoints: [
            "SI System Foundations: Built on 7 base units ($\\text{m, kg, s, A, K, mol, cd}$) and 2 dimensionless supplementary units (radian, steradian).",
            "Base units are independent and uniquely defined standards; derived units are algebraic combinations of base units.",
            "Plane angle ($\\text{rad}$) and solid angle ($\\text{sr}$) are dimensionless quantities with units.",
            "Precision reflects instrument resolution; final results are limited by the least precise input value.",
            "Dimensional Homogeneity: Equations are physically valid only if both sides have identical dimensions; transcendental arguments must be dimensionless.",
            "Error Propagation Rules: Absolute errors always add during addition/subtraction, while relative errors add during multiplication/division.",
            "All non-zero digits are significant; zeros between non-zero digits are significant; leading zeros are never significant; trailing zeros without a decimal point are not significant.",
            "Dimensional analysis cannot determine dimensionless proportional constants, nor can it derive relations involving sums/differences of terms or trigonometric/exponential functions."
        ],
        keyDerivations: [
            "Simple Pendulum Time Period: Let $T = k \\cdot l^x g^y m^z$. Substitute dimensions: $[M^0 L^0 T^1] = [L]^x [LT^{-2}]^y [M]^z$. Equating exponents gives $T = k \\sqrt{\\frac{l}{g}}$."
        ]
    },
    "Motion in a Straight Line": {
        keyPoints: [
            "Calculus-Based Kinematics: Instantaneous velocity is $v = dx/dt$ and acceleration is $a = dv/dt = v\\,dv/dx$.",
            "Graphical Interpretations: Slope of x-t gives velocity, slope of v-t gives acceleration, and area under v-t gives displacement.",
            "Path length is a scalar and is always $\\ge \\vert{}\\text{displacement}\\vert{}$; they are equal only for strictly unidirectional straight-line motion.",
            "Galileo's Odd-Number Rule: Displacements of a body falling from rest in equal successive time intervals follow the ratio $1 : 3 : 5 : 7\\dots$",
            "Stopping Distance Scaling: Stopping distance under constant braking deceleration is proportional to the square of initial velocity ($d_s = v_0^2/2a$).",
            "Instantaneous speed is always equal to the magnitude of instantaneous velocity at that point.",
            "A body thrown vertically upward reaches maximum height $h_{\\max} = \\frac{v_0^2}{2g}$ in time $t_{\\text{up}} = \\frac{v_0}{g}$; total time of flight $T = \\frac{2v_0}{g}$."
        ],
        keyDerivations: [
            "Kinematic Equations via Calculus: $a = \\frac{dv}{dt} \\implies \\int_{v_0}^v dv = \\int_0^t a\\,dt \\implies v = v_0 + at$.",
            "$v = \\frac{dx}{dt} \\implies \\int_{x_0}^x dx = \\int_0^t (v_0 + at)\\,dt \\implies x = x_0 + v_0 t + \\frac{1}{2}at^2$.",
            "$a = v\\frac{dv}{dx} \\implies \\int_{v_0}^v v\\,dv = \\int_{x_0}^x a\\,dx \\implies v^2 = v_0^2 + 2a(x - x_0)$."
        ]
    },
    "Motion in a Plane": {
        keyPoints: [
            "Orthogonal Independence: 2D motion with constant acceleration decomposes into two independent, simultaneous 1D motions.",
            "Vector addition is commutative ($\\mathbf{A} + \\mathbf{B} = \\mathbf{B} + \\mathbf{A}$) and associative.",
            "A null (zero) vector has zero magnitude and an arbitrary, unspecified direction.",
            "Parabolic Trajectory: A projectile under uniform gravity follows a parabolic trajectory: $y = (\\tan\\theta_0)x - \\frac{g}{2v_0^2\\cos^2\\theta_0}x^2$.",
            "Range Symmetry: Launch angles $\\theta_0$ and ($90^\\circ - \\theta_0$) yield identical horizontal ranges, with maximum range at $\\theta_0 = 45^\\circ$.",
            "Horizontal velocity component ($v_x = v_0\\cos\\theta_0$) remains constant throughout flight in the absence of air resistance.",
            "Centripetal Acceleration: Uniform circular motion involves constant speed with continuously changing velocity direction, creating a radial inward acceleration $a_c = v^2/R = \\omega^2 R$.",
            "The centripetal acceleration vector is not constant because its direction rotates continuously in the plane of motion."
        ],
        keyDerivations: [
            "Projectile Trajectory & Range: Horizontal displacement $x = (v_0\\cos\\theta_0)t \\implies t = \\frac{x}{v_0\\cos\\theta_0}$.",
            "Vertical displacement $y = (v_0\\sin\\theta_0)t - \\frac{1}{2}gt^2$. Substitute $t$ to get trajectory.",
            "At $y = 0, x = R: R\\tan\\theta_0 = \\frac{g R^2}{2v_0^2\\cos^2\\theta_0} \\implies R = \\frac{v_0^2\\sin 2\\theta_0}{g}$."
        ]
    },
    "Laws of Motion": {
        keyPoints: [
            "Momentum and Force: Net force equals the time rate of change of momentum ($\\mathbf{F} = d\\mathbf{p}/dt$); momentum is conserved when $\\mathbf{F}_{\\text{ext}} = 0$.",
            "Action-Reaction Pairs: Action and reaction forces act simultaneously on different bodies and never cancel each other.",
            "Newton’s First Law defines inertia and inertial reference frames.",
            "Friction Dynamics: Static friction is self-adjusting ($f_s \\le \\mu_s N$); once motion begins, kinetic friction ($f_k = \\mu_k N < f_{s,\\max}$) opposes relative motion.",
            "In non-inertial reference frames with acceleration $\\mathbf{a}_0$, a pseudo force $\\mathbf{F}_p = -m\\mathbf{a}_0$ must be applied to every mass $m$.",
            "Banked Road Mechanics: Banking at angle $\\theta$ provides centripetal force via normal force components, allowing safe speeds $v = \\sqrt{Rg\\tan\\theta}$ even without friction."
        ],
        keyDerivations: [
            "Maximum Safe Speed on Banked Road: Vertical balance $N\\cos\\theta - f_s\\sin\\theta = mg$. Horizontal centripetal force $N\\sin\\theta + f_s\\cos\\theta = \\frac{mv^2}{R}$.",
            "Divide horizontal by vertical to yield: $v_{\\max} = \\sqrt{Rg\\left(\\frac{\\mu_s + \\tan\\theta}{1 - \\mu_s\\tan\\theta}\\right)}$."
        ]
    },
    "Work, Energy and Power": {
        keyPoints: [
            "Work-Energy Theorem: The net work done by all acting forces on a body equals the change in its kinetic energy ($W_{\\text{net}} = \\Delta K$).",
            "Work done by a force is zero if the displacement is zero, if the force is zero, or if the force is perpendicular to displacement ($\\theta = 90^\\circ$).",
            "Conservative Forces & Potential Energy: For conservative forces, work is path-independent, and force relates to potential energy via $F(x) = -dU/dx$.",
            "Mechanical Energy Conservation: In systems with only conservative forces, total mechanical energy is constant ($E = K + U = \\text{constant}$).",
            "Collision Principles: Momentum is conserved in all collisions; total kinetic energy is conserved strictly in elastic collisions."
        ],
        keyDerivations: [
            "Work-Energy Theorem for Variable Force: $W = \\int_{x_i}^{x_f} F\\,dx = \\int_{v_i}^{v_f} mv\\,dv = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2 = \\Delta K$."
        ]
    },
    "System of Particles and Rotational Motion": {
        keyPoints: [
            "Center of Mass Motion: The center of mass moves as if the entire system mass were concentrated at that point under all external forces ($M\\mathbf{a}_{\\text{cm}} = \\mathbf{F}_{\\text{ext}}$).",
            "Internal forces cannot accelerate the center of mass of an isolated system.",
            "Vector cross product is anti-commutative ($\\mathbf{A} \\times \\mathbf{B} = -\\mathbf{B} \\times \\mathbf{A}$) and vanishes for parallel or anti-parallel vectors.",
            "Rotational Dynamics Analogy: Torque ($\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F}$) produces angular acceleration ($\\boldsymbol{\\tau} = I\\boldsymbol{\\alpha}$) through moment of inertia ($I = \\sum m_i r_i^2$).",
            "Angular Momentum Conservation: When external torque is zero ($\\boldsymbol{\\tau}_{\\text{ext}} = 0$), total angular momentum is conserved ($I\\boldsymbol{\\omega} = \\text{constant}$).",
            "Rolling Kinetic Energy: Total kinetic energy of a rolling body is the sum of translational and rotational components ($K = \\frac{1}{2}Mv_{\\text{cm}}^2[1 + k^2/R^2]$).",
            "In pure rolling without slipping, the instantaneous velocity of the point of contact with the ground is zero ($v_{\\text{cm}} = \\omega R$)."
        ],
        keyDerivations: []
    },
    "Gravitation": {
        keyPoints: [
            "Inverse-Square Law: Gravitational force between two point masses is $F = G m_1 m_2 / r^2$, acting along the line joining them.",
            "Gravitational force is a central, conservative force; the gravitational force inside a uniform spherical shell is zero everywhere.",
            "Variation of Gravity ($g$): Acceleration due to gravity decreases with altitude ($g_h \\approx g_0[1 - 2h/R_E]$) and depth ($g_d = g_0[1 - d/R_E]$).",
            "Escape Velocity: The minimum speed to escape Earth's gravitational field is $v_e = \\sqrt{2gR_E} \\approx 11.2\\text{ km/s}$, which is $\\sqrt{2}$ times the orbital speed ($v_o$).",
            "Kepler’s Planetary Laws: Orbits are ellipses with the Sun at one focus; areal velocity is constant ($\\frac{d\\mathbf{A}}{dt} = \\frac{\\mathbf{L}}{2m}$); orbital period squared is proportional to semi-major axis cubed ($T^2 \\propto a^3$).",
            "Geostationary satellites orbit in the equatorial plane from west to east with $T = 24\\text{ hours}$ at an altitude of $\\approx 35,800\\text{ km}$."
        ],
        keyDerivations: [
            "Escape Velocity ($v_e$): Total mechanical energy on surface $E_i = \\frac{1}{2}mv_e^2 - \\frac{GMm}{R_E}$.",
            "At infinity, $E_f \\ge 0$. Minimum threshold gives $\\frac{1}{2}mv_e^2 - \\frac{GMm}{R_E} = 0 \\implies v_e = \\sqrt{\\frac{2GM}{R_E}}$."
        ]
    },
    "Mechanical Properties of Solids": {
        keyPoints: [
            "Hooke's Law & Moduli: Within the elastic limit, stress is proportional to strain ($\\sigma = E \\cdot \\epsilon$), defining Young's ($Y$), Shear ($G$), and Bulk ($B$) moduli.",
            "Stress is an internal restoring force per unit area and is a tensor; strain is a dimensionless fractional deformation.",
            "Elasticity Comparison: Steel is more elastic than rubber because it requires much greater stress for the same fractional elongation (higher $Y$).",
            "Elastomers (like rubber and tissue of aorta) exhibit large elastic strains but do not strictly obey Hooke’s law.",
            "Elastic Strain Energy: Work done during elastic deformation is stored internally with volume energy density $u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain}$.",
            "Structural Engineering: Bending in beams sags by $\\delta = \\frac{W l^3}{4 b d^3 Y}$; increasing depth $d$ is most effective ($\\delta \\propto d^{-3}$), motivating I-shaped girders."
        ],
        keyDerivations: []
    }
};

let hasChanges = false;
if (physData.subject === "Physics" && physData.chapters) {
    physData.chapters.forEach(chapter => {
        let nameMatch = chapter.name.trim();
        // Since there is a slight mismatch in chapter names (e.g. Electric Charges and Fields vs Mechanical Properties of Fluids)
        // I will match strictly based on names provided
        if (dataToInject[nameMatch]) {
            chapter.keyPoints = dataToInject[nameMatch].keyPoints;
            chapter.keyDerivations = dataToInject[nameMatch].keyDerivations;
            hasChanges = true;
        }
    });
}

if (hasChanges) {
    fs.writeFileSync(physDataPath, JSON.stringify(physData, null, 2));
    console.log("Successfully injected available key points and derivations for Physics Class 11.");
} else {
    console.log("No matching chapter IDs found.");
}
