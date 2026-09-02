const fs = require('fs');

function replaceInFile(file, replacements) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [oldStr, newStr] of replacements) {
        content = content.replace(oldStr, newStr);
    }
    fs.writeFileSync(file, content);
}

replaceInFile('src/pages/QuizDashboard.tsx', [
    ["(v as any)", "(v as \"school\" | \"jee\" | \"neet\")"],
    ["(v as any)", "(v as \"11\" | \"12\")"]
]);
