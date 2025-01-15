import { execSync } from 'child_process';
import getGlobalPackagePath from 'lib/get-global-package-path.ts';
import path from 'path';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));
jest.mock('path', () => ({
  resolve: jest.fn(),
}));

describe('getGlobalPackagePath', () => {
  let consoleErrorSpy: jest.SpyInstance;
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return the correct global package path', () => {
    const packageName = 'typescript';
    const mockGlobalNpmRoot = '/usr/local/lib/node_modules';
    const mockPackagePath = '/usr/local/lib/node_modules/typescript';
    (execSync as jest.Mock).mockReturnValue(mockGlobalNpmRoot);
    (path.resolve as jest.Mock).mockReturnValue(mockPackagePath);
    const result = getGlobalPackagePath(packageName);
    expect(execSync).toHaveBeenCalledWith('npm root -g', { encoding: 'utf8' });
    expect(path.resolve).toHaveBeenCalledWith(mockGlobalNpmRoot, packageName);
    expect(result).toBe(mockPackagePath);
  });

  it('should return null if an error occurs', () => {
    const packageName = 'nonexistent-package';
    (execSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('npm root -g failed');
    });
    const result = getGlobalPackagePath(packageName);
    expect(result).toBeNull();
  });
});
