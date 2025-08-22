import checkIsVscodeProject from 'lib/check-is-vscode-project.ts';
import makeCursorFolder from 'lib/make-cursor-folder.ts';
import { cursorRuleCli } from 'src/commands/cursor-rule.ts';

jest.mock('lib/check-is-vscode-project.ts');
jest.mock('lib/make-cursor-folder.ts');

const mockCheckIsVscodeProject = checkIsVscodeProject as jest.MockedFunction<typeof checkIsVscodeProject>;
const mockMakeCursorFolder = makeCursorFolder as jest.MockedFunction<typeof makeCursorFolder>;

describe('cursorRuleCli', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Command Configuration', () => {
    it('should have correct command name', () => {
      expect(cursorRuleCli.name()).toBe('cursor-rule');
    });

    it('should have correct alias', () => {
      expect(cursorRuleCli.alias()).toBe('cr');
    });

    it('should have correct description', () => {
      expect(cursorRuleCli.description()).toBe('Setup Cursor AI rules configuration');
    });
  });

  describe('Command Execution', () => {
    it('should exit early when not in a VSCode project', async () => {
      mockCheckIsVscodeProject.mockReturnValue(false);

      await cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule']);

      expect(mockCheckIsVscodeProject).toHaveBeenCalledTimes(1);
      expect(mockMakeCursorFolder).not.toHaveBeenCalled();

      expect(consoleSpy).toHaveBeenCalledWith('🎯 Setting up Cursor AI rules...\n');
      expect(consoleSpy).toHaveBeenCalledWith('🥲 .vscode directory not found\n');
      expect(consoleSpy).toHaveBeenCalledWith('Is this a cursor project?\n');
      expect(consoleSpy).toHaveBeenCalledWith('Please run `ics cursor-rule` in a cursor project\n');
    });

    it('should exit early when cursor folder creation fails', async () => {
      mockCheckIsVscodeProject.mockReturnValue(true);
      mockMakeCursorFolder.mockResolvedValue(false);

      await cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule']);

      expect(mockCheckIsVscodeProject).toHaveBeenCalledTimes(1);
      expect(mockMakeCursorFolder).toHaveBeenCalledWith('.cursor/rules');

      expect(consoleSpy).toHaveBeenCalledWith('🎯 Setting up Cursor AI rules...\n');
      expect(consoleSpy).toHaveBeenCalledWith('🥲 Cursor folder not created\n');
    });

    it('should complete successfully when all conditions are met', async () => {
      mockCheckIsVscodeProject.mockReturnValue(true);
      mockMakeCursorFolder.mockResolvedValue(true);

      await cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule']);

      expect(mockCheckIsVscodeProject).toHaveBeenCalledTimes(1);
      expect(mockMakeCursorFolder).toHaveBeenCalledWith('.cursor/rules');

      expect(consoleSpy).toHaveBeenCalledWith('🎯 Setting up Cursor AI rules...\n');
      expect(consoleSpy).not.toHaveBeenCalledWith('🥲 .vscode directory not found\n');
      expect(consoleSpy).not.toHaveBeenCalledWith('🥲 Cursor folder not created\n');
    });
  });

  describe('Error Handling', () => {
    it('should handle checkIsVscodeProject throwing an error', async () => {
      const error = new Error('File system error');
      mockCheckIsVscodeProject.mockImplementation(() => {
        throw error;
      });

      await expect(cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule'])).rejects.toThrow('File system error');

      expect(mockCheckIsVscodeProject).toHaveBeenCalledTimes(1);
      expect(mockMakeCursorFolder).not.toHaveBeenCalled();
    });

    it('should handle makeCursorFolder throwing an error', async () => {
      mockCheckIsVscodeProject.mockReturnValue(true);
      const error = new Error('Permission denied');
      mockMakeCursorFolder.mockRejectedValue(error);

      await expect(cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule'])).rejects.toThrow('Permission denied');

      expect(mockCheckIsVscodeProject).toHaveBeenCalledTimes(1);
      expect(mockMakeCursorFolder).toHaveBeenCalledWith('.cursor/rules');
    });
  });

  describe('Integration with Dependencies', () => {
    it('should call checkIsVscodeProject before makeCursorFolder', async () => {
      const callOrder: string[] = [];

      mockCheckIsVscodeProject.mockImplementation(() => {
        callOrder.push('checkIsVscodeProject');
        return true;
      });

      mockMakeCursorFolder.mockImplementation(async () => {
        callOrder.push('makeCursorFolder');
        return true;
      });

      await cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule']);

      expect(callOrder).toEqual(['checkIsVscodeProject', 'makeCursorFolder']);
    });

    it('should pass correct directory path to makeCursorFolder', async () => {
      mockCheckIsVscodeProject.mockReturnValue(true);
      mockMakeCursorFolder.mockResolvedValue(true);

      await cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule']);

      expect(mockMakeCursorFolder).toHaveBeenCalledWith('.cursor/rules');
      expect(mockMakeCursorFolder).toHaveBeenCalledTimes(1);
    });
  });

  describe('Console Output', () => {
    it('should always show initial setup message', async () => {
      mockCheckIsVscodeProject.mockReturnValue(false);

      await cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule']);

      expect(consoleSpy).toHaveBeenNthCalledWith(1, '🎯 Setting up Cursor AI rules...\n');
    });

    it('should show appropriate messages for each failure scenario', async () => {
      mockCheckIsVscodeProject.mockReturnValue(false);
      await cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule']);

      expect(consoleSpy).toHaveBeenCalledWith('🥲 .vscode directory not found\n');
      expect(consoleSpy).toHaveBeenCalledWith('Is this a cursor project?\n');
      expect(consoleSpy).toHaveBeenCalledWith('Please run `ics cursor-rule` in a cursor project\n');

      jest.clearAllMocks();
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      mockCheckIsVscodeProject.mockReturnValue(true);
      mockMakeCursorFolder.mockResolvedValue(false);
      await cursorRuleCli.parseAsync(['node', 'test', 'cursor-rule']);

      expect(consoleSpy).toHaveBeenCalledWith('🥲 Cursor folder not created\n');
    });
  });
});
