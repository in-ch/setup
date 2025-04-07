import { execSync } from 'child_process';
import { installDependencies } from 'lib/commit-lint-config.ts';
import detectPackageManager from 'lib/detect-package-manger.ts';
import { select } from '@inquirer/prompts';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));
jest.mock('lib/detect-package-manger', () => jest.fn());
jest.mock('@inquirer/prompts', () => ({
  select: jest.fn(),
}));

describe('installDependencies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should install dependencies with detected package manager', async () => {
    (detectPackageManager as jest.Mock).mockReturnValue('npm');
    await installDependencies();
    expect(execSync).toHaveBeenCalledWith('npm @commitlint/config-conventional @commitlint/cli lint-staged -D ', {
      stdio: 'inherit',
    });
  });

  it('should prompt for package manager if detection fails', async () => {
    (detectPackageManager as jest.Mock).mockReturnValue('default');
    (select as jest.Mock).mockResolvedValue('yarn');
    await installDependencies();
    expect(execSync).toHaveBeenCalledWith('yarn @commitlint/config-conventional @commitlint/cli lint-staged -D ', {
      stdio: 'inherit',
    });
  });

  it('should exit with an error if installation fails', async () => {
    (detectPackageManager as jest.Mock).mockReturnValue('npm');
    (execSync as jest.Mock).mockImplementation(() => {
      throw new Error('Installation failed');
    });
    const spyExit = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('Process exited');
    });
    await expect(installDependencies()).rejects.toThrow('Process exited');
    expect(spyExit).toHaveBeenCalledWith(1);
  });
});
