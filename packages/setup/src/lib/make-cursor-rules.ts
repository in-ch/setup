import * as fs from 'fs-extra';
import path from 'path';
import { confirm } from '@inquirer/prompts';
import fileErrorHandle from 'src/utils/file-error-handle.ts';

/**
 * Make cursor rules
 *
 * @param {string} cursorRulesDir - The directory to make cursor rules
 * @returns {Promise<void>}
 */
export default async function makeCursorRules(cursorRulesDir: string): Promise<void> {
  try {
    const { getCursorRuleTemplates } = await import('../const/cursor-rule-templates.ts');
    const templates = getCursorRuleTemplates();

    for (const [filename, content] of Object.entries(templates)) {
      const filePath = path.join(cursorRulesDir, filename);

      const fileExists = await fs.pathExists(filePath);
      if (fileExists) {
        const overwrite = await confirm({
          message: `File ${filename} already exists. Overwrite?`,
          default: false,
        });

        if (!overwrite) {
          console.log(`⏭️  Skipped: ${filename}`);
          continue;
        }
      }

      await fs.writeFile(filePath, content);
    }

    console.log('\n🎉 Cursor AI rules have been set up successfully!');
    console.log('📝 Files created in .cursor/rules/');
    console.log('💡 These rules will help Cursor AI understand your project better.');
  } catch (error) {
    fileErrorHandle(error, 'Failed to load cursor rule templates');
  }
}
