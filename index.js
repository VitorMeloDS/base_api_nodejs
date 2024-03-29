#!/usr/bin/env node

// const fs = require('fs').promises;
// const path = require('path');

// const currentDir = process.cwd();
// const projectName = process.argv[2];

// async function copyDirectory(source, destination) {
//   try {
//     const files = await fs.readdir(source);
//     await fs.mkdir(destination, { recursive: true });

//     for (const file of files) {
//       const sourcePath = path.join(source, file);
//       const destinationPath = path.join(destination, file);
//       const fileStat = await fs.stat(sourcePath);
//       const notCopy = ['node_modules', projectName, 'index.js'];

//       if (fileStat.isDirectory() && !notCopy.includes(file)) {
//         await copyDirectory(sourcePath, destinationPath);
//       } else if (!notCopy.includes(file)) {
//         await fs.copyFile(sourcePath, destinationPath);
//       }
//     }

//     console.log(`Diretório ${source} copiado para ${destination} com sucesso!`);
//   } catch (error) {
//     console.error(`Erro ao copiar ${source} para ${destination}:`, error);
//   }
// }

// async function createProject() {
//   try {
//     if (!projectName) {
//       throw new Error(
//         'Nome do projeto não especificado. Por favor, execute novamente com o nome do projeto como argumento.'
//       );
//     }

//     const srcDir = __dirname;
//     const destDir = path.join(currentDir, projectName);

//     await fs.mkdir(destDir);
//     await copyDirectory(srcDir, destDir);
//   } catch (error) {
//     console.error('Erro ao criar o projeto:', error.message);
//   }
// }

// createProject();

const fs = require('fs').promises;
const path = require('path');

const projectName = process.argv[2];
const currentDir = process.cwd(); // Obter o diretório atual de onde o comando é executado

async function copyDirectory(source, destination) {
  try {
    const files = await fs.readdir(source);
    await fs.mkdir(destination, { recursive: true });

    for (const file of files) {
      const sourcePath = path.join(source, file);
      const destinationPath = path.join(destination, file);
      const fileStat = await fs.stat(sourcePath);
      const notCopy = ['node_modules', projectName, 'index.js'];

      if (fileStat.isDirectory() && !notCopy.includes(file)) {
        await copyDirectory(sourcePath, destinationPath);
      } else if (!notCopy.includes(file)) {
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
    if (!projectName) {
      throw new Error(
        'Project name not specified. Please run again with the project name as an argument.'
      );
    }

    const srcDir = path.join(__dirname, 'node_modules', 'base_api_nodejs'); // Diretório de origem dos arquivos
    const destDir = path.join(currentDir, projectName); // Diretório de destino é o diretório atual + nome do projeto

    await copyDirectory(srcDir, destDir); // Copiar os arquivos para o diretório de destino

    console.log(`Project created successfully at ${destDir}`);
  } catch (error) {
    console.error('Error creating the project:', error.message);
  }
}

createProject();
