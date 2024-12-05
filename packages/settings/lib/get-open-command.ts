import os from 'os';

/**
 * @param {string} filepath
 * @description Get code open command
 * @returns {string}
 */
export default function getOpenCommand(filepath: string): string {
  const platform = os.platform();
  let command;
  if (platform === 'win32') {
    command = `start ${filepath}`;
  } else if (platform === 'darwin') {
    command = `open ${filepath}`;
  } else if (platform === 'linux') {
    command = `xdg-open ${filepath}`;
  } else {
    console.error('Unsupported platform');
    return '';
  }
  return command;
}
