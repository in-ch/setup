import fs from 'fs';
import path from 'path';

const TEMP_DIR = path.join(__dirname, '../temp-test-dir');

/**
 * Check if setup is running
 *
 * @returns {void}
 */
function checkSetupIsRunning(): void {
  try {
    if (!fs.existsSync(path.join(__dirname, '../../../dist/index.js'))) {
      throw new Error('Setup is not running, please run `dev script`');
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

/**
 * Create a test environment
 *
 * @returns {void} - Nothing
 */
function makeTestEnv(): void {
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
  fs.writeFileSync(path.join(TEMP_DIR, 'package-lock.json'), JSON.stringify('', null, 2));
}

function cleanUpTestEnv(): void {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }
}

function getTestEnvDir(): string {
  return TEMP_DIR;
}

export { makeTestEnv, cleanUpTestEnv, getTestEnvDir, checkSetupIsRunning };
