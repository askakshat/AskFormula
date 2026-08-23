import * as fs from 'fs';

const content = fs.readFileSync('src/lib/formulas.ts', 'utf8');

// Replace Chapter interface to include missing properties from type 'Chapter': chapterNumber, chapterName, topics
const patched = content.replace(
`export interface Chapter {
  id: string;
  class: string;
  name: string;
  formulas: Formula[];
}`,
`export interface Chapter {
  id: string;
  class: string;
  name: string;
  chapterNumber?: number;
  chapterName?: string;
  topics?: string[];
  formulas: Formula[];
}`);

fs.writeFileSync('src/lib/formulas.ts', patched);
