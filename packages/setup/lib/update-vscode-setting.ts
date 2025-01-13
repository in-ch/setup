import fs from 'fs';
import os from 'os';
import path from 'path';
import checkVsCodeExtensionInstalled from './check-vscode-extension-installed.ts';
import installVscodeExtension from './install-vscode-extension.ts';

const vscodeSettingsPath = (() => {
  const platform = os.platform();
  if (platform === 'win32') {
    return path.join(
      process.env.APPDATA || path.join(process.env.HOME!, 'AppData', 'Roaming'),
      'Code',
      'User',
      'settings.json'
    );
  } else if (platform === 'darwin') {
    return path.join(process.env.HOME!, 'Library', 'Application Support', 'Code', 'User', 'settings.json');
  } else {
    return path.join(process.env.HOME!, '.config', 'Code', 'User', 'settings.json');
  }
})();

const newSettings = {
  '[javascript]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.formatOnSave': true,
  },
  '[typescript]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.formatOnSave': true,
  },
  '[javascriptreact]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.formatOnSave': true,
  },
  '[typescriptreact]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.formatOnSave': true,
  },
};

/**
 * update vscode setting
 * @returns {void}
 */
export default function updateVscodeSetting(): void {
  fs.readFile(vscodeSettingsPath, 'utf8', async (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading VSCode settings.json:', err);
      return;
    }
    const installed = await checkVsCodeExtensionInstalled('esbenp.prettier-vscode');
    if (!installed) {
      await installVscodeExtension('esbenp.prettier-vscode');
    }

    let settings = {};
    if (data) {
      try {
        settings = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing settings.json:', parseErr);
        return;
      }
    }
    const updatedSettings = { ...settings, ...newSettings };
    fs.writeFile(vscodeSettingsPath, JSON.stringify(updatedSettings, null, 2), 'utf8', writeErr => {
      if (writeErr) {
        console.error('Error writing to settings.json:', writeErr);
      } else {
        console.log('VSCode settings.json updated successfully!');
      }
    });
  });
}
