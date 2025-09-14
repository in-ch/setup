import { execSync } from 'child_process';
import { Command } from 'commander';

export const claudeCodeCli = new Command()
  .command('icc')
  .description('Setup claude code initialization')
  .action(() => {
    claudeCode();
  });

export const claudeCode = async () => {
  installDependencies();
  settingClaudeCode();
};

/**
 * install dependencies
 * @returns {Promise<void>}
 */
const installDependencies = async (): Promise<void> => {
  console.log('\n Installing claude code dependencies...\n');
  try {
    execSync('npm install -g @anthropic-ai/claude-code');
  } catch (error) {
    console.error('Failed to install claude code dependencies...');
    process.exit(1);
  }
};

/**
 * setting claude code
 * @returns {Promise<void>}
 */
const settingClaudeCode = async (): Promise<void> => {
  console.log('\n Setting up claude code...\n');
  try {
    execSync('alias c="claude code"');
    execSync('/terminal-setup');
  } catch (error) {
    console.error('Failed to setup claude code...');
    process.exit(1);
  }
};
