// cli.js
const { execSync } = require('child_process');

// Obtém o diretório atual
const currentDir = process.cwd();

// Altera para o diretório atual
process.chdir(currentDir);

const param = process.argv[2];

// Executa o script principal (index.js) do seu pacote
execSync('node index.js ' + param, { stdio: 'inherit' });
