import { readFile, writeFile } from 'fs';
import checkVsCodeExtensionInstalled from 'lib/check-vscode-extension-installed.ts';
import installVscodeExtension from 'lib/install-vscode-extension.ts';
import updateVscodeSetting from 'lib/update-vscode-setting.ts';
import os from 'os';

jest.mock('fs', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
}));
jest.mock('os');
jest.mock('lib/check-vscode-extension-installed');
jest.mock('lib/install-vscode-extension');

describe('updateVscodeSetting', () => {
  let consoleLogSpy: jest.SpyInstance;
  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterAll(() => {
    consoleLogSpy.mockRestore();
  });
  const mockSettings = {
    '[javascript]': {
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'editor.formatOnSave': true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (os.platform as jest.Mock).mockReturnValue('win32');
    (readFile as unknown as jest.Mock).mockImplementation((_path, _encoding, callback) => {
      callback(null, JSON.stringify(mockSettings));
    });
    (writeFile as unknown as jest.Mock).mockImplementation((_path, _data, _encoding, callback) => {
      callback(null);
    });
    (checkVsCodeExtensionInstalled as jest.Mock).mockResolvedValue(false);
    (installVscodeExtension as jest.Mock).mockResolvedValue(true);
  });

  it('should update VSCode settings and install Prettier extension if not installed', async () => {
    await updateVscodeSetting();

    expect(checkVsCodeExtensionInstalled).toHaveBeenCalledWith('esbenp.prettier-vscode');
    expect(installVscodeExtension).toHaveBeenCalledWith('esbenp.prettier-vscode');
  });

  it('should handle errors when reading settings file', async () => {
    (readFile as unknown as jest.Mock).mockImplementationOnce((_path, _encoding, callback) => {
      callback(new Error('File read error'));
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await updateVscodeSetting();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error reading VSCode settings.json:', expect.any(Error));
  });
});
