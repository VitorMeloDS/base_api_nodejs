#!/usr/bin/env node

const copyDirectory = require('./index');

const arg = process.argv[2];

if (!arg) throw new Error('Argumento invalido!');

copyDirectory(arg);

// const { execSync } = require('child_process');
// const path = require('path');

// // Obtém o diretório atual
// const currentDir = process.cwd();

// // Altera para o diretório atual
// process.chdir(currentDir);

// const param = process.argv[2];

// // Executa o script principal (index.js) do seu pacote
// execSync('node index.js ' + param, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
