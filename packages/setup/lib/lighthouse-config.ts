import { execSync } from 'child_process';
import { confirm, input } from '@inquirer/prompts';

/**
 * install dependencies
 * @returns {Promise<void>}
 */
const installDependencies = async (): Promise<void> => {
  console.log('\nChecking Lighthouse dependencies...\n');

  try {
    const result = execSync('lighthouse --version', { encoding: 'utf-8' });
    console.log('Lighouse version: ', result.trim() + '\n');
  } catch (error) {
    const isOkInstall = await confirm({
      message: 'Lighthouse is not installed. Would you like to install it?',
    });
    if (isOkInstall) {
      execSync(`npm i lighthouse -g`, { stdio: 'inherit' });
    }
  }
};

const doAnalysis = async (headless = false): Promise<void> => {
  const webAddress = await input({
    message: 'Enter the web address:',
    default: 'http://localhost:3000',
  });
  let isValidUrl = false;
  try {
    const url = new URL(webAddress);
    isValidUrl = url.protocol === 'http:' || url.protocol === 'https:';
  } catch (e) {
    isValidUrl = false;
  }
  if (!isValidUrl) {
    console.error('Invalid web address. Please enter a valid URL.');
    return;
  }

  execSync(`lighthouse ${webAddress} ${headless ? '--chrome-flags="--headless"' : ' --output=html --view'} `, {
    stdio: 'inherit',
  });
};

export { installDependencies, doAnalysis };
