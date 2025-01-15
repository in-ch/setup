import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import getCliPath from './utils/getCliPath.ts';
import { cleanUpTestEnv, makeTestEnv } from './utils/testEnv.ts';

const TEMP_DIR = path.join(__dirname, 'temp-test-dir');

describe('[e2e] commitlint.test.ts', () => {
  beforeAll(() => {
    makeTestEnv();
  });

  afterAll(() => {
    cleanUpTestEnv();
  });

  test('commitlint CLI initializes husky and creates config files', () => {
    if (fs.existsSync('.husky')) {
      fs.rmSync('.husky', { recursive: true });
    }
    const cliPath = getCliPath();
    const result = spawnSync('node', [cliPath, 'commitlint'], {
      input: 'yes\nnpm\n',
      stdio: 'pipe',
      encoding: 'utf-8',
    });

    expect(fs.existsSync('.husky')).toBe(true);

    const commitlintrcPath = path.join(TEMP_DIR, '.commitlintrc.json');
    const lintstagedrcPath = path.join(TEMP_DIR, '.lintstagedrc.json');

    expect(fs.existsSync(commitlintrcPath)).toBe(true);
    expect(fs.existsSync(lintstagedrcPath)).toBe(true);

    const commitlintrcContent = fs.readFileSync(commitlintrcPath, 'utf-8');
    expect(commitlintrcContent).toContain('@commitlint/config-conventional');

    const lintStagedContent = fs.readFileSync(lintstagedrcPath, 'utf-8');
    expect(lintStagedContent).toContain('eslint --fix');

    expect(result.stdout).toContain('Installing eslint dependencies');
  });
});
