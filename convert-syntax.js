import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'src/services/user/users.js');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace all quoted property keys with unquoted versions
content = content.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)"\s*:/g, '$1:');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Conversion complete!');
