const fs = require('fs');
const path = require('path');

fs.mkdirSync('nomeDoProjeto');

const packageJson = require(path.join(__dirname, 'package.json'));

delete packageJson.private;
delete packageJson.description;

fs.cpSync(path.join(__dirname));

packageJson.name = 'nomeDoProjeto';

fs.writeFileSync(
  path.join('nomeDoProjeto', 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

fs.readdirSync('./', (err, files) => {
  if (err) throw new Error(err);

  console.log(files);
  files.forEach((_file) => {
    const filter = [
      'script',
      '.git',
      '.husky',
      'package-lock.json',
      'node_modules',
      'nomeDoProjeto'
    ];
    const _path = path.join(__dirname, 'nomeDoProjeto', _file);
    if (!filter.includes(_file)) {
      console.log(`${path.join(__dirname, 'nomeDoProjeto')}/${_file}`);
      const file = fs.readFileSync(_file);
      fs.writeFileSync(_path, JSON.stringify(file));
    }
  });
});
