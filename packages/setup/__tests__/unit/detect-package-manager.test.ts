import fs from 'fs';
import detectPackageManager from 'lib/detect-package-manger.ts';

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
}));

describe('detectPackageManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return "yarn add" when "yarn.lock" is present', () => {
    (fs.readdirSync as jest.Mock).mockReturnValue(['yarn.lock']);
    const result = detectPackageManager();
    expect(result).toBe('yarn add');
  });

  it('should return "pnpm add" when "pnpm-lock.yaml" is present', () => {
    (fs.readdirSync as jest.Mock).mockReturnValue(['pnpm-lock.yaml']);
    const result = detectPackageManager();
    expect(result).toBe('pnpm add');
  });

  it('should return "npm install" when "package-lock.json" is present', () => {
    (fs.readdirSync as jest.Mock).mockReturnValue(['package-lock.json']);
    const result = detectPackageManager();
    expect(result).toBe('npm install');
  });

  it('should return "npm install" when no known lock files are present', () => {
    (fs.readdirSync as jest.Mock).mockReturnValue(['test.txt']);
    const result = detectPackageManager();
    expect(result).toBe('npm install');
  });

  it('should return "default" when no files are present', () => {
    (fs.readdirSync as jest.Mock).mockReturnValue([]);
    const result = detectPackageManager();
    expect(result).toBe('npm install');
  });
});
