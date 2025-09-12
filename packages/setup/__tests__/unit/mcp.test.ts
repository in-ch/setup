import fs from 'fs';
import path from 'path';
import { mcpCli } from 'src/commands/mcp.ts';

// Mock dependencies
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

jest.mock('lib/version-update.ts', () => jest.fn());

describe('MCP Command', () => {
  const mockExistsSync = fs.existsSync as jest.MockedFunction<typeof fs.existsSync>;
  const mockMkdirSync = fs.mkdirSync as jest.MockedFunction<typeof fs.mkdirSync>;
  const mockWriteFileSync = fs.writeFileSync as jest.MockedFunction<typeof fs.writeFileSync>;

  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, 'cwd').mockReturnValue('/test/project');
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    mockExistsSync.mockReturnValue(false);
    mockMkdirSync.mockImplementation(() => undefined);
    mockWriteFileSync.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('MCP directory initialization', () => {
    it('should create .mcp directory when it does not exist', async () => {
      mockExistsSync.mockReturnValue(false);

      await mcpCli.parseAsync(['node', 'test', 'mcp']);

      expect(mockMkdirSync).toHaveBeenCalledWith(path.join('/test/project', '.mcp'), { recursive: true });
      expect(consoleLogSpy).toHaveBeenCalledWith('Created .mcp directory');
    });

    it('should not create .mcp directory when it already exists', async () => {
      mockExistsSync.mockReturnValue(true);

      await mcpCli.parseAsync(['node', 'test', 'mcp']);

      expect(mockMkdirSync).not.toHaveBeenCalled();
    });
  });

  describe('MCP config file creation', () => {
    it('should create config.json when it does not exist', async () => {
      mockExistsSync.mockReturnValue(false);

      await mcpCli.parseAsync(['node', 'test', 'mcp']);

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        path.join('/test/project', '.mcp', 'config.json'),
        expect.stringContaining('"version": "1.0.0"'),
        'utf-8'
      );
      expect(consoleLogSpy).toHaveBeenCalledWith('Created default MCP config.json');
    });

    it('should not create config.json when it already exists', async () => {
      mockExistsSync.mockReturnValue(true);

      await mcpCli.parseAsync(['node', 'test', 'mcp']);

      expect(mockWriteFileSync).not.toHaveBeenCalledWith(
        expect.stringContaining('config.json'),
        expect.any(String),
        'utf-8'
      );
    });
  });

  describe('Command options handling', () => {
    it('should show help message when no options are provided', async () => {
      mockExistsSync.mockReturnValue(false);

      await mcpCli.parseAsync(['node', 'test', 'mcp']);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'MCP directory initialized. Use --figma, --github, or --all to setup specific configurations.'
      );
    });

    it('should handle --figma option', async () => {
      mockExistsSync.mockReturnValue(false);

      await mcpCli.parseAsync(['node', 'test', 'mcp', '--figma']);

      expect(consoleLogSpy).toHaveBeenCalledWith('Created .mcp directory');
      expect(consoleLogSpy).toHaveBeenCalledWith('Created default MCP config.json');
    });

    it('should handle --github option', async () => {
      mockExistsSync.mockReturnValue(false);

      await mcpCli.parseAsync(['node', 'test', 'mcp', '--github']);

      expect(consoleLogSpy).toHaveBeenCalledWith('Created .mcp directory');
      expect(consoleLogSpy).toHaveBeenCalledWith('Created default MCP config.json');
    });

    it('should handle --all option', async () => {
      mockExistsSync.mockReturnValue(false);

      await mcpCli.parseAsync(['node', 'test', 'mcp', '--all']);

      expect(consoleLogSpy).toHaveBeenCalledWith('Created .mcp directory');
      expect(consoleLogSpy).toHaveBeenCalledWith('Created default MCP config.json');
    });
  });

  describe('Error handling', () => {
    it('should handle file system errors gracefully', async () => {
      mockExistsSync.mockImplementation(() => {
        throw new Error('File system error');
      });

      await expect(mcpCli.parseAsync(['node', 'test', 'mcp'])).rejects.toThrow('File system error');
    });

    it('should handle directory creation errors', async () => {
      mockExistsSync.mockReturnValue(false);
      mockMkdirSync.mockImplementation(() => {
        throw new Error('Directory creation failed');
      });

      await expect(mcpCli.parseAsync(['node', 'test', 'mcp'])).rejects.toThrow('Directory creation failed');
    });

    it('should handle config file creation errors', async () => {
      mockExistsSync.mockReturnValue(false);
      mockWriteFileSync.mockImplementation(() => {
        throw new Error('File write failed');
      });

      await expect(mcpCli.parseAsync(['node', 'test', 'mcp'])).rejects.toThrow('File write failed');
    });
  });

  describe('Command structure', () => {
    it('should have correct command name and description', () => {
      expect(mcpCli.name()).toBe('mcp');
      expect(mcpCli.description()).toBe('Setup MCP (Model Context Protocol) configurations');
    });

    it('should have correct options defined', () => {
      const options = mcpCli.options;
      const optionNames = options.map((option: any) => option.long);

      expect(optionNames).toContain('--figma');
      expect(optionNames).toContain('--github');
      expect(optionNames).toContain('--all');
    });

    it('should have correct option descriptions', () => {
      const options = mcpCli.options;
      const figmaOption = options.find((option: any) => option.long === '--figma');
      const githubOption = options.find((option: any) => option.long === '--github');
      const allOption = options.find((option: any) => option.long === '--all');

      expect(figmaOption?.description).toBe('Setup Figma MCP configuration');
      expect(githubOption?.description).toBe('Setup GitHub MCP configuration');
      expect(allOption?.description).toBe('Setup all available MCP configurations');
    });
  });
});
