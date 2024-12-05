import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import getSettingFilePath from 'lib/get-setting-file-path.ts';
import { COMMANDS } from 'const/commands.ts';

const installDependencies = () => {
  console.log('prettier 패키지 설치 중...');
  try {
    execSync(
      'yarn add -D prettier prettier-plugin-sort-re-exports @trivago/prettier-plugin-sort-imports',
      { stdio: 'inherit' },
    );
  } catch (error) {
    console.error('🥲 패키지 설치에 실패했습니다.');
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
    fs.writeFileSync(path.join(rootDir, '.prettierignore '), prettierIgnore, 'utf-8');
    console.log('🎉 prettier 설정 파일이 생성되었습니다.');
  } catch (error) {
    console.error('🥲 설정 파일 생성에 실패했습니다:', error);
    process.exit(1);
  }
};

export { installDependencies, createConfigFiles };
