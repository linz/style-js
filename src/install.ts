import { existsSync, promises as fs } from 'node:fs';
import * as path from 'node:path';

/** List of files to automatically install */
const InstallFiles = [
  { source: 'oxfmt.config.ts', target: 'oxfmt.config.ts' },
  { source: 'oxlint.config.ts', target: 'oxlint.config.ts' },
  { source: 'tsconfig.json', target: 'tsconfig.json' },
];

const InstallPath = new URL('../../config/', import.meta.url);

/** Replace the unsupported `extends: [base]` written by 6.x installs */
async function fixOxfmtExtends(target: string): Promise<boolean> {
  const content = await fs.readFile(target, 'utf8');
  if (!content.includes('extends: [base]')) {
    return false;
  }
  await fs.writeFile(target, content.replace('extends: [base]', '...base'));
  return true;
}

/** Install the config into the local folder */
async function main(): Promise<void> {
  for (const { source, target } of InstallFiles) {
    if (existsSync(target)) {
      if (target === 'oxfmt.config.ts' && (await fixOxfmtExtends(target))) {
        console.log('Fixed', { fileName: target });
      } else {
        console.log('Skipped', { fileName: target });
      }
      continue;
    }
    const sourcePath = new URL(source, InstallPath);
    await fs.copyFile(sourcePath, path.join('./', target));
    console.log('Installed', { fileName: target });
  }
}

main().catch(console.error);
