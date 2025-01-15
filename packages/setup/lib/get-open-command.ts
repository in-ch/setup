import { execSync } from 'child_process';
import os from 'os';

/**
 * @param {string} program program name
 *
 * @description Checks if the program specified as a parameter is installed.
 * @returns {boolean} Returns true if the specified program is installed, false otherwise.
 */
const isProgramAvailable = (program: string): boolean => {
  try {
    execSync(`which ${program}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

/**
 * @param {string} filepath File path
 * @description Get a command to open a file in VS Code or the default text editor, depending on the OS and availability
 * @returns {string} Command to open the file
 */
export default function getOpenCommand(filepath: string): string {
  const platform = os.platform();
  let command;

  if (platform === 'win32') {
    command = `start "" "notepad" "${filepath}"`;
  } else if (platform === 'darwin') {
    if (isProgramAvailable('code')) {
      command = `open -a "Visual Studio Code" "${filepath}"`;
    } else {
      command = `open -a "TextEdit" "${filepath}"`;
    }
  } else if (platform === 'linux') {
    if (isProgramAvailable('code')) {
      command = `code "${filepath}"`;
    } else {
      command = `xdg-open "${filepath}"`;
    }
  } else {
    console.error('Unsupported platform');
    return '';
  }
  return command;
}
