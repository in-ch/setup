import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import getCliPath from './utils/getCliPath.ts';
import { checkSetupIsRunning, makeTestEnv } from './utils/testEnv.ts';

const TEMP_DIR = path.join(__dirname, 'temp-test-dir');

describe('[e2e] env.test.ts', () => {
  beforeAll(() => {
    checkSetupIsRunning();
    makeTestEnv();
  });

  afterAll(() => {
    // cleanUpTestEnv();
  });

  test('env CLI create env file', () => {
    const cliPath = getCliPath();
    const result = spawnSync('node', [cliPath, 'env'], {
      input: 'y\nA\nA',
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    console.log(result);
    const envPath = path.join(TEMP_DIR, '.env');
    // expect(result.stdout).toContain('Finished adding key-value pairs.');
    expect(fs.existsSync(envPath)).toBe(true);
    expect(fs.existsSync('.env')).toBe(true);
  });
});
