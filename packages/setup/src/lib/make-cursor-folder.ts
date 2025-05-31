import * as fs from 'fs-extra';
import { confirm } from '@inquirer/prompts';

/**
 * Make a cursor folder
 *
 * @param {string} dir - The directory to make
 * @returns {Promise<boolean>} - True if the directory was created, false otherwise
 */
export default async function makeCursorFolder(dir: string): Promise<boolean> {
  const cursorRulesDir = '.cursor/rules';
  const dirExists = await fs.pathExists(cursorRulesDir);

  if (!dirExists) {
    const createDir = await confirm({
      message: `Directory ${dir} does not exist. Create it?`,
      default: true,
    });

    if (createDir) {
      await fs.ensureDir(cursorRulesDir);
      console.log(`✅ Created directory: ${cursorRulesDir}`);
    } else {
      return false;
    }
  }
  return true;
}
