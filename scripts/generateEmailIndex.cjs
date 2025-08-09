const fs = require('fs');
const path = require('path');

const dir = path.resolve('src/components/emailComponents');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');

const exportsCode = files
  .map(file => {
    const name = path.basename(file, '.tsx');
    return `export { default as ${name} } from './${name}';`;
  })
  .join('\n');

fs.writeFileSync(path.join(dir, 'index.ts'), exportsCode + '\n');
console.log('✅ emailComponents index.ts updated!');
