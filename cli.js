#!/usr/bin/env node
const { execSync } = require('child_process');

// Obtém o diretório atual
const currentDir = process.cwd();

console.log('current', currentDir);
console.log('current', process);
console.log('antes', __dirname);

// Altera para o diretório atual
process.chdir(currentDir);
console.log('depois', __dirname);

// Executa o script principal (index.js) do seu pacote
// execSync('node index.js', { stdio: 'inherit' });
