import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import getCliPath from './utils/getCliPath.ts';
import { cleanUpTestEnv, makeTestEnv } from './utils/testEnv.ts';

describe('[e2e] lighthouse.test.ts', () => {
  beforeAll(() => {
    makeTestEnv();
  });

  afterAll(() => {
    cleanUpTestEnv();
  });
  test('should initialize lighthouse', () => {
    const cliPath = getCliPath();
    spawnSync('node', [cliPath, 'lg', '--headless'], {
      input: '\n',
      stdio: 'pipe',
      encoding: 'utf-8',
    });

    const testEnvDir = path.join(process.cwd(), '');
    const files = fs.readdirSync(testEnvDir);
    const localhostHtmlFile = files.find(file => /^localhost.*\.html$/.test(file));
    expect(localhostHtmlFile).toBeDefined();
  });
});
