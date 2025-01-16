import { spawnSync } from 'child_process';
import fs from 'fs';
import getCliPath from './utils/getCliPath.ts';
import { cleanUpTestEnv, makeTestEnv } from './utils/testEnv.ts';

describe('[e2e] pkgmng.test.ts', () => {
  beforeAll(() => {
    makeTestEnv();
  });
  afterAll(() => {
    cleanUpTestEnv();
  });

  test('[e2e] should there is no files', () => {
    const cliPath = getCliPath();
    spawnSync('node', [cliPath, 'pm'], {
      input: 'cancel\n',
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    expect(fs.existsSync('yarn.lock')).toBe(false);
    expect(fs.existsSync('pnpm-lock.yaml')).toBe(false);
  });

  test('[e2e] should initialize the selected package manager', () => {
    const cliPath = getCliPath();
    spawnSync('node', [cliPath, 'pm'], {
      input: 'yarn\n',
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    expect(fs.existsSync('yarn.lock')).toBe(true);
  });
});
