const fs = require('fs');

const path = 'src/components/askformula/Hero.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
    "A high-density, distraction-free environment for scientific study.\n            Build custom PDF reference sheets tailored to your CBSE Class 11 and\n            12 curriculum in seconds.",
    "A high-density, distraction-free environment for scientific study.\n            Build custom PDF reference sheets tailored to your CBSE and JEE Class 11 and\n            12 curriculum in seconds."
);

fs.writeFileSync(path, code);
