import fs from 'fs';
import path from 'path';
import checkWhatIdeUse, { IDE_TOOL } from 'src/lib/check-what-ide-use.ts';
import { input } from '@inquirer/prompts';

export default async function setupGitHubMCP(mcpDir: string) {
  console.log('Setting up GitHub MCP...');

  const ide = await checkWhatIdeUse();
  const token = await input({
    message: 'Enter your GitHub Personal Access Token:',
    default: '',
    validate: input => {
      if (!input.trim()) {
        return 'GitHub token is required';
      }
      return true;
    },
  });

  const githubConfig = {
    name: 'github',
    command: 'npx',
    args: ['@modelcontextprotocol/server-github'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: token,
    },
  };

  const configPath = path.join(mcpDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  config.servers.github = githubConfig;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
  const githubEnvPath = path.join(mcpDir, 'github.env');
  fs.writeFileSync(githubEnvPath, `GITHUB_PERSONAL_ACCESS_TOKEN=${token}\n`, 'utf-8');

  console.log('GitHub MCP configuration created');
  console.log('GitHub token saved in .mcp/github.env');
}
