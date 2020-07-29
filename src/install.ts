import * as fs from 'fs';
import * as path from 'path';

/** List of files to automatically install */
const InstallFiles = [
  { source: 'eslintrc.js', target: '.eslintrc.js' },
  { source: 'prettierrc.js', target: '.prettierrc.js' },
  { source: 'tsconfig.json', target: 'tsconfig.json' },
];

const InstallPath = path.join(__dirname, '..', '..', 'config');

/** Install the config into the local folder */
async function main(): Promise<void> {
  for (const { source, target } of InstallFiles) {
    if (fs.existsSync(target)) {
      console.log(`Skipping as ${target} exists`);
      continue;
    }

    await fs.promises.copyFile(path.join(InstallPath, source), path.join('./', target));
    console.log('Installed', { fileName: target });
  }
}

main().catch(console.error);
