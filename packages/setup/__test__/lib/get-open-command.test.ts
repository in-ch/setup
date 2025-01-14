import { execSync } from 'child_process';
import getOpenCommand from 'lib/get-open-command.ts';
import os from 'os';

jest.mock('os', () => ({
  platform: jest.fn(),
}));

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

describe('getOpenCommand', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct command for win32 platform', () => {
    const filePath = 'C:\\path\\to\\file.txt';

    (os.platform as jest.Mock).mockReturnValueOnce('win32');

    const result = getOpenCommand(filePath);
    expect(result).toBe(`start "" "notepad" "${filePath}"`);
  });

  it('should return the correct command for darwin platform with VS Code available', () => {
    const filePath = '/path/to/file.txt';

    (os.platform as jest.Mock).mockReturnValueOnce('darwin');
    (execSync as jest.Mock).mockImplementationOnce(() => '/usr/local/bin/code');

    const result = getOpenCommand(filePath);
    expect(result).toBe(`open -a "Visual Studio Code" "${filePath}"`);
  });

  it('should return the correct command for darwin platform with TextEdit when VS Code is unavailable', () => {
    const filePath = '/path/to/file.txt';

    (os.platform as jest.Mock).mockReturnValueOnce('darwin');
    (execSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Program not found');
    });

    const result = getOpenCommand(filePath);
    expect(result).toBe(`open -a "TextEdit" "${filePath}"`);
  });

  it('should return the correct command for linux platform with VS Code available', () => {
    const filePath = '/path/to/file.txt';

    (os.platform as jest.Mock).mockReturnValueOnce('linux');
    (execSync as jest.Mock).mockImplementationOnce(() => '/usr/local/bin/code');

    const result = getOpenCommand(filePath);
    expect(result).toBe(`code "${filePath}"`);
  });

  it('should return the correct command for linux platform with xdg-open when VS Code is unavailable', () => {
    const filePath = '/path/to/file.txt';

    (os.platform as jest.Mock).mockReturnValueOnce('linux');
    (execSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Program not found');
    });

    const result = getOpenCommand(filePath);
    expect(result).toBe(`xdg-open "${filePath}"`);
  });

  it('should return an empty string if platform is unsupported', () => {
    const filePath = '/path/to/file.txt';

    (os.platform as jest.Mock).mockReturnValueOnce('freebsd');

    const result = getOpenCommand(filePath);
    expect(result).toBe('');
  });
});
