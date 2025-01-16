import fs from 'fs';
import path from 'path';

const TEMP_DIR = path.join(__dirname, '../temp-test-dir');

function makeTestEnv() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
  }
  process.chdir(TEMP_DIR);
  const packageJson = {
    name: 'test-package',
    version: '1.0.0',
    dependencies: {},
  };
  fs.writeFileSync(path.join(TEMP_DIR, 'package.json'), JSON.stringify(packageJson, null, 2));
  fs.writeFileSync(path.join(TEMP_DIR, 'package-lock.json'), JSON.stringify(packageJson, null, 2));
}

function cleanUpTestEnv() {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }
}

function getTestEnvDir(): string {
  return TEMP_DIR;
}

export { makeTestEnv, cleanUpTestEnv, getTestEnvDir };
