import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  try {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      if (file === 'types') continue; // Skip types folder
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files);
      } else {
        files.push(name);
      }
    }
  } catch (e) {
    console.warn(`Could not read dir ${dir}: ${e.message}`);
  }
  return files;
}

const allFiles = getFiles('src');
const tsFiles = allFiles.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
console.log(`Found ${tsFiles.length} TypeScript files.`);

for (const file of tsFiles) {
  try {
    const isTsx = file.endsWith('.tsx');
    const ext = isTsx ? '.jsx' : '.js';
    const outFile = file.replace(/\.tsx?$/, ext);
    console.log(`Processing: ${file} -> ${outFile}`);
    
    // Run detype
    execSync(`npx --yes detype "${file}" "${outFile}"`);
    
    // Delete the original TS file
    fs.unlinkSync(file);
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
  }
}

console.log('Migration completed!');
