import fs from 'fs';
import checkWhatIdeUse, { IDE_TOOL } from 'lib/check-what-ide-use.ts';

jest.mock('fs');

describe('checkWhatIdeUse', () => {
  const mockedExistsSync = fs.existsSync as jest.MockedFunction<typeof fs.existsSync>;

  beforeEach(() => {
    mockedExistsSync.mockReset();
  });

  it('returns vscode if .vscode folder exists', () => {
    mockedExistsSync.mockImplementation(p => p.toString().endsWith('.vscode'));
    expect(checkWhatIdeUse()).toBe(IDE_TOOL.vscode);
  });

  it('returns cursor if .cursor folder exists', () => {
    mockedExistsSync.mockImplementation(p => p.toString().endsWith('.cursor'));
    expect(checkWhatIdeUse()).toBe(IDE_TOOL.cursor);
  });

  it('returns jetbrains if .ide folder exists', () => {
    mockedExistsSync.mockImplementation(p => p.toString().endsWith('.ide'));
    expect(checkWhatIdeUse()).toBe(IDE_TOOL.jetbrains);
  });

  it('returns windsurf if .wind folder exists', () => {
    mockedExistsSync.mockImplementation(p => p.toString().endsWith('.wind'));
    expect(checkWhatIdeUse()).toBe(IDE_TOOL.windsurf);
  });

  it('returns neovim if .nvim folder exists', () => {
    mockedExistsSync.mockImplementation(p => p.toString().endsWith('.nvim'));
    expect(checkWhatIdeUse()).toBe(IDE_TOOL.neovim);
  });

  it('returns vim if .vim folder exists', () => {
    mockedExistsSync.mockImplementation(p => p.toString().endsWith('.vim'));
    expect(checkWhatIdeUse()).toBe(IDE_TOOL.vim);
  });

  it('returns emacs if .emacs.d folder exists', () => {
    mockedExistsSync.mockImplementation(p => p.toString().endsWith('.emacs.d'));
    expect(checkWhatIdeUse()).toBe(IDE_TOOL.emacs);
  });

  it('returns other if no matching folder exists', () => {
    mockedExistsSync.mockReturnValue(false);
    expect(checkWhatIdeUse()).toBe(IDE_TOOL.other);
  });
});
