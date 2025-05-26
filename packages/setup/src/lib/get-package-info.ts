import { execSync } from 'child_process';
import fs from 'fs-extra';
import fileErrorHandle from 'src/utils/file-error-handle.ts';
import path from 'path';

export function getPackageInfo(packageName = '@in-ch/setup') {
  try {
    const globalRoot = execSync('npm root -g', { encoding: 'utf-8' }).trim();
    const packageJsonPath = path.join(globalRoot, packageName, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    } else {
      throw new Error('package.json not found');
    }
  } catch (error: unknown) {
    fileErrorHandle(error, 'Failed to get package info');
    return null;
  }
}
