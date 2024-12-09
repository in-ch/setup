import fs from 'fs-extra';
import path from 'path';

export function getPackageInfo() {
  const packageJsonPath = path.join('package.json');

  return fs.readJSONSync(packageJsonPath);
}
