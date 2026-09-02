const fs = require('fs');

const path = 'src/lib/formulas.ts';
let code = fs.readFileSync(path, 'utf8');

// The file might already have our JEE imports, let's verify or add them.
if (!code.includes('jeePhysicsData')) {
    const importStatements = `
import jeePhysicsData from '../data/ncert/jee_physics.json';
import jeeChemistryData from '../data/ncert/jee_chemistry.json';
import jeeMathematicsData from '../data/ncert/jee_mathematics.json';
import jeeClass12PhysicsData from '../data/ncert/jee_class12_physics.json';
import jeeClass12ChemistryData from '../data/ncert/jee_class12_chemistry.json';
import jeeClass12MathematicsData from '../data/ncert/jee_class12_mathematics.json';
`;
    // Insert after the last import
    const lastImportIndex = code.lastIndexOf('import ');
    const endOfLastImport = code.indexOf('\n', lastImportIndex);
    code = code.slice(0, endOfLastImport + 1) + importStatements + code.slice(endOfLastImport + 1);
}

// Add to allSubjects if not already there
if (!code.includes('jeePhysicsData as Subject')) {
    const allSubjectsRegex = /export const allSubjects: Subject\[\] = \[([\s\S]*?)\];/;
    const match = allSubjectsRegex.exec(code);
    if (match) {
        const currentSubjects = match[1];
        const newSubjects = `
  { ...(jeePhysicsData as Subject), name: "JEE Physics" },
  { ...(jeeChemistryData as Subject), name: "JEE Chemistry" },
  { ...(jeeMathematicsData as Subject), name: "JEE Mathematics" },
  { ...(jeeClass12PhysicsData as Subject), name: "JEE Physics" },
  { ...(jeeClass12ChemistryData as Subject), name: "JEE Chemistry" },
  { ...(jeeClass12MathematicsData as Subject), name: "JEE Mathematics" },
`;
        const replaced = code.replace(allSubjectsRegex, `export const allSubjects: Subject[] = [${currentSubjects}${newSubjects}];`);
        code = replaced;
    }
}

fs.writeFileSync(path, code);
