#!/usr/bin/env node

const fs = require('fs').promises;

async function copyDirectory(source, destination) {
  try {
    const files = await fs.readdir(source);
    await fs.mkdir(destination, { recursive: true });

    for (const file of files) {
      const sourcePath = `${source}/${file}`;
      const destinationPath = `${destination}/${file}`;
      const fileStat = await fs.stat(sourcePath);

      if (fileStat.isDirectory()) {
        await copyDirectory(sourcePath, destinationPath);
      } else {
        await fs.copyFile(sourcePath, destinationPath);
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

    const projectName = process.argv[2];
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
