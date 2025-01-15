import { spawnSync } from 'child_process';
import getCliPath from './utils/getCliPath.ts';

describe('[e2e] list.test.ts', () => {
  test('should list all commands', () => {
    const cliPath = getCliPath();
    const result = spawnSync('node', [cliPath, 'list'], {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    expect(result.stdout).toContain('eslint');
    expect(result.stdout).toContain('prettier');
    expect(result.stdout).toContain('husky');
    expect(result.stdout).toContain('gitmessage');
    expect(result.stdout).toContain('typescript');
    expect(result.stdout).toContain('commitlint');
    expect(result.stdout).toContain('edit');
    expect(result.stdout).toContain('init');
    expect(result.stdout).toContain('lg');
    expect(result.stdout).toContain('list');
    expect(result.stdout).toContain('pm');
  });
});
