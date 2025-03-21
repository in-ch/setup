import fs from 'fs';
import checkIsMonorepo from 'lib/check-is-monorepo.ts';
import path from 'path';

jest.mock('fs');
jest.mock('path');

describe('checkIsMonorepo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));
  });
  it('There is not exist package.json file', () => {
    const basePath = '/path/to/base';
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const result = checkIsMonorepo(basePath);
    expect(result).toBe(false);
    expect(fs.existsSync).toHaveBeenCalledWith('/path/to/base/package.json');
  });

  it('checks if the given directory is a npm monorepo workspace', () => {
    const basePath = '/path/to/base';
    (fs.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === '/path/to/base/package.json';
    });
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ workspaces: ['packages/*'] }));
    const result = checkIsMonorepo(basePath);
    expect(result).toBe(true);
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/base/package.json', 'utf-8');
  });

  it('checks if the given directory is not monorepo workspace', () => {
    const basePath = '/path/to/base';
    (fs.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === '/path/to/base/package.json';
    });
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ name: 'test-project' }));
    const result = checkIsMonorepo(basePath);
    expect(result).toBe(false);
  });

  it('checks if the given directory is yarn monorepo workspace', () => {
    const basePath = '/path/to/base';
    (fs.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === '/path/to/base/package.json';
    });
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ workspaces: { packages: ['packages/*'] } }));
    const result = checkIsMonorepo(basePath);
    expect(result).toBe(true);
  });

  it('checks if the given directory is pnpm monorepo workspace', () => {
    const basePath = '/path/to/base';
    (fs.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === '/path/to/base/package.json' || filePath === '/path/to/base/pnpm-workspace.yaml';
    });
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ name: 'test-project' }));
    const result = checkIsMonorepo(basePath);
    expect(result).toBe(true);
    expect(fs.existsSync).toHaveBeenCalledWith('/path/to/base/pnpm-workspace.yaml');
  });

  it('checks if the given directory is lerna monorepo workspace', () => {
    const basePath = '/path/to/base';
    (fs.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === '/path/to/base/package.json' || filePath === '/path/to/base/lerna.json';
    });
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ name: 'test-project' }));
    const result = checkIsMonorepo(basePath);
    expect(result).toBe(true);
    expect(fs.existsSync).toHaveBeenCalledWith('/path/to/base/lerna.json');
  });

  it('checks if the given directory is bun monorepo workspace', () => {
    const basePath = '/path/to/base';
    (fs.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === '/path/to/base/package.json' || filePath === '/path/to/base/bunfig.toml';
    });
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ name: 'test-project' }));
    const result = checkIsMonorepo(basePath);
    expect(result).toBe(true);
    expect(fs.existsSync).toHaveBeenCalledWith('/path/to/base/bunfig.toml');
  });

  it('uses process.cwd() as default basePath when not provided', () => {
    (process.cwd as jest.Mock) = jest.fn().mockReturnValue('/default/path');
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const result = checkIsMonorepo();
    expect(result).toBe(false);
    expect(fs.existsSync).toHaveBeenCalledWith('/default/path/package.json');
  });
});
