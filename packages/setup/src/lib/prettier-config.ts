import { execSync } from 'child_process';
import fs from 'fs';
import checkIsMonorepo from 'lib/check-is-monorepo.ts';
import detectPackageManager from 'lib/detect-package-manger.ts';
import getSettingFilePath from 'lib/get-setting-file-path.ts';
import path from 'path';
import { COMMANDS } from 'src/const/commands.ts';
import { packageManagerInstallChoices } from 'src/const/packagesMng.ts';
import fileErrorHandle from 'src/utils/file-error-handle.ts';
import { select } from '@inquirer/prompts';

const installDependencies = async (): Promise<void> => {
  console.log('\nInstalling prettier dependencies...\n');
  try {
    const dependencies = 'prettier prettier-plugin-sort-re-exports @trivago/prettier-plugin-sort-imports';
    let packageMng = detectPackageManager();
    if (packageMng === 'default') {
      console.log(
        'The package manager could not be detected. \n\n1. If this is not the project root, please run the command from the root directory. \n2. If you have not installed the packages beforehand, please install them first and then try again.\n\n'
      );
      if (packageMng === 'default') {
        const answer = await select({
          message: 'Which package manager would you like to use for installation? \n',
          choices: packageManagerInstallChoices,
        });
        if (answer === 'cancel') {
          return;
        }
        packageMng = answer;
      }
    }
    const installCommand = `${packageMng} ${dependencies}`;
    execSync(`${installCommand} -D ${checkIsMonorepo() ? '-w' : ''}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 Fail to install prettier dependencies.... to \n' + error);
    process.exit(1);
  }
};

const createConfigFiles = () => {
  const rootDir = process.cwd();
  const prettierConfig = fs.readFileSync(getSettingFilePath(COMMANDS.PRETTIER), 'utf-8');
  const prettierIgnore = `node_modules/
dist/
build/
coverage/
*.min.js
*.bundle.js
*.config.js
*.cjs
logs/
*.log
.vscode/
.DS_Store
.env
.env.*
package-lock.json
yarn.lock
pnpm-lock.yaml`;

  try {
    fs.writeFileSync(path.join(rootDir, '.prettierrc.cjs'), prettierConfig, 'utf-8');
    fs.writeFileSync(path.join(rootDir, '.prettierignore'), prettierIgnore, 'utf-8');
    console.log('🎉 Prettier configuration file has been created.');
  } catch (error: unknown) {
    fileErrorHandle(error, `Failed to create prettier file}`);
  }
};

export { installDependencies, createConfigFiles };
