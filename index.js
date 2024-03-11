#!/usr/bin/env node

const fs = require('fs').promises;

const p = process;
const projectName = p.argv[2];

async function copyDirectory(source, destination) {
  try {
    const files = await fs.readdir(source);
    await fs.mkdir(destination, { recursive: true });

    for (const file of files) {
      const sourcePath = `${source}/${file}`;
      const destinationPath = `${destination}/${file}`;
      const fileStat = await fs.stat(sourcePath);
      const notCopy = ['node_modules', projectName, 'index.js', 'package-lock.json'];

      if (fileStat.isDirectory() && !notCopy.includes(file)) {
        await copyDirectory(sourcePath, destinationPath);
      } else if (!notCopy.includes(file)) {
        p.stdout.write(await fs.readFile(file));
      }
    }

    console.log(`Diretório ${source} copiado para ${destination} com sucesso!`);
  } catch (error) {
    console.error(`Erro ao copiar ${source} para ${destination}:`, error);
  }
}

async function createProject() {
  try {
    // Obtém o diretório atual
    const currentDir = process.cwd();

    // Altera para o diretório atual
    process.chdir(currentDir);

    if (!projectName) {
      throw new Error(
        'Nome do projeto não especificado. Por favor, execute novamente com o nome do projeto como argumento.'
      );
    }

    const srcDir = __dirname;
    const destDir = `${__dirname}/${projectName}`;

    await fs.mkdir(destDir);
    await copyDirectory(srcDir, destDir);
  } catch (error) {
    console.error('Erro ao criar o projeto:', error.message);
  }
}

createProject();
