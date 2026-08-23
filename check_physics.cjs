const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/ncert/physics.json', 'utf8'));
console.log(data.chapters.map(ch => ({ id: ch.id, name: ch.name })));
