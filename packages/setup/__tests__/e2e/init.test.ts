import { spawnSync } from 'child_process';
import { commandChoices } from 'const/commands.ts';
import fs from 'fs';
import getCliPath from './utils/getCliPath.ts';
import { cleanUpTestEnv, getTestEnvDir, makeTestEnv } from './utils/testEnv.ts';

describe('[e2e] init.test.ts', () => {
  beforeAll(() => {
    makeTestEnv();
  });
  afterAll(() => {
    cleanUpTestEnv();
  });

  test('should list all commands', () => {
    const cliPath = getCliPath();
    const result = spawnSync('node', [cliPath, 'init'], {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    commandChoices.map(({ name }) => {
      expect(result.stdout).toContain(name);
    });
  });

  test('should execute selected commands and create appropriate files', async () => {
    const cliPath = getCliPath();
    const expectedFiles: { [k: string]: string } = {
      eslint: 'eslintrc.config.mjs',
      prettier: '.prettierrc.cjs',
    };
    const expectedOptions = Object.keys(expectedFiles).join('\n');
    spawnSync('node', [cliPath, 'init'], {
      stdio: 'pipe',
      encoding: 'utf-8',
      input: expectedOptions,
    });
    const testEnvDir = getTestEnvDir();
    const files = fs.readdirSync(testEnvDir);
    Object.keys(expectedFiles).map((execute: string) => {
      expect(files.includes(expectedFiles[execute] as string)).toBe(true);
    });
  });
});
