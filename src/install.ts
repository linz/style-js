import { existsSync, promises as fs } from 'node:fs';
import * as path from 'node:path';

/** List of files to automatically install */
const InstallFiles = [
  { source: 'eslintrc.cjs', target: '.eslintrc.cjs' },
  { source: 'prettierrc.cjs', target: '.prettierrc.cjs' },
  { source: 'tsconfig.json', target: 'tsconfig.json' },
];

const InstallPath = new URL('../../config/', import.meta.url);

/** Install the config into the local folder */
async function main(): Promise<void> {
  for (const { source, target } of InstallFiles) {
    if (existsSync(target)) {
      console.log('Skipped', { fileName: target });
      continue;
    }
    const sourcePath = new URL(source, InstallPath);
    await fs.copyFile(sourcePath, path.join('./', target));
    console.log('Installed', { fileName: target });
  }
}

main().catch(console.error);
