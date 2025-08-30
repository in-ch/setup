import getSettingFilePath from 'lib/get-setting-file-path.ts';
import { writeFileSafely } from 'lib/utils.ts';
import { installEslintDependencies } from 'lib/package-manager.ts';

/**
 * eslint import sort install dependencies
 * @param {string} command Config Type
 * @returns {boolean} true or false
 */
const createConfigFiles = (command: string): boolean => {
  const rootDir = process.cwd();
  const configContent = getSettingFilePath(command);
  
  if (!configContent) {
    console.error('❌ Failed to read ESLint configuration template');
    return false;
  }
  
  const configPath = `${rootDir}/eslint.config.mjs`;
  
  if (writeFileSafely(configPath, configContent)) {
    console.log('\n🎉 Successfully created the ESLint configuration file.');
    return true;
  } else {
    console.error('🥲 🥲 🥲 Failed to setup eslint...');
    return false;
  }
};

/**
 * Set up ESLint Config 
 * @param {string} configType Config Type
 * @param {string} command Command
 * @returns {Promise<boolean>} true or false
 */
const setupEslintConfig = async (configType: string, command: string): Promise<boolean> => {
  try {
    await installEslintDependencies(configType);
    return createConfigFiles(command);
  } catch (error) {
    console.error('Failed to setup ESLint configuration:', error);
    return false;
  }
};

export {
  createConfigFiles,
  setupEslintConfig,
};
