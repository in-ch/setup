import fs from 'fs';
import path from 'path';

async function setupGitHubMCP(mcpDir: string) {
  console.log('🐙 Setting up GitHub MCP...');

  const githubConfig = {
    name: 'github',
    command: 'npx',
    args: ['@modelcontextprotocol/server-github'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: 'your_github_token_here',
    },
  };

  const configPath = path.join(mcpDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  config.servers.github = githubConfig;

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

  const githubEnvPath = path.join(mcpDir, 'github.env');
  fs.writeFileSync(githubEnvPath, 'GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here\n', 'utf-8');

  console.log('GitHub MCP configuration created');
  console.log('Please update your GitHub token in .mcp/github.env');
}
