import { execSync } from 'child_process';
import checkVsCodeExtensionInstalled from 'lib/check-vscode-extension-installed.ts';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

describe('checkVsCodeExtensionInstalled', () => {
  let consoleErrorSpy: jest.SpyInstance;
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if the extension is installed', () => {
    (execSync as jest.Mock).mockReturnValueOnce('esbenp.prettier-vscode\nsome.other.extension\n');
    return checkVsCodeExtensionInstalled('esbenp.prettier-vscode').then(result => {
      expect(result).toBe(true);
    });
  });
  it('should return false if the extension is not installed', () => {
    (execSync as jest.Mock).mockReturnValueOnce('some.other.extension\nanother.extension\n');
    return checkVsCodeExtensionInstalled('esbenp.prettier-vscode').then(result => {
      expect(result).toBe(false);
    });
  });
  it('should handle empty or error lists gracefully', () => {
    (execSync as jest.Mock).mockReturnValueOnce('');
    return checkVsCodeExtensionInstalled('esbenp.prettier-vscode').then(result => {
      expect(result).toBe(false);
    });
  });
  it('should handle errors correctly', () => {
    (execSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Command failed');
    });
    return checkVsCodeExtensionInstalled('esbenp.prettier-vscode').catch(error => {
      expect(error).toBeUndefined();
    });
  });
});
