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

const fs = require('fs');
const path = require('path');

async function copyDirectory(arg) {
  const currentDirectory = process.cwd() + '/' + arg;
  const sourceDirectory = path.join(__dirname);

  fs.readdir(sourceDirectory, (err, files) => {
    if (err) {
      console.error('Error reading source directory:', err);
      return;
    }

    files.forEach(async (file) => {
      const sourcePath = path.join(sourceDirectory, file);
      const destinationPath = path.join(currentDirectory, file);
      const notCopy = ['node_modules', arg, 'index.js', 'cli.js'];
      const fileStat = fs.stat(sourcePath);

      if (fileStat.isDirectory() && !notCopy.includes(file)) {
        await copyDirectory(sourcePath, destinationPath);
      } else if (!notCopy.includes(file)) {
        fs.copyFile(sourcePath, destinationPath);
      }
    });
  });
}

module.exports = copyDirectory;
