const PACKAGE_MANAGER = {
  NPM: 'npm',
  PNPM: 'pnpm',
  YARN: 'yarn',
};
const PACKAGE_MANAGER_VALUE = {
  NPM: 'npm',
  PNPM: 'pnpm',
  YARN: 'yarn',
};
const PACKAGE_MANAGER_VALUE_INSTALL = {
  NPM: 'npm install',
  PNPM: 'pnpm add',
  YARN: 'yarn add',
};
type PackageManagerTypes = (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];

const packageManagerChoices = [
  { name: PACKAGE_MANAGER.NPM, value: PACKAGE_MANAGER_VALUE.NPM },
  { name: PACKAGE_MANAGER.PNPM, value: PACKAGE_MANAGER_VALUE.PNPM },
  { name: PACKAGE_MANAGER.YARN, value: PACKAGE_MANAGER_VALUE.YARN },
  { name: 'cancel', value: 'cancel' },
];

const packageManagerInstallChoices = [
  { name: PACKAGE_MANAGER.NPM, value: PACKAGE_MANAGER_VALUE_INSTALL.NPM },
  { name: PACKAGE_MANAGER.PNPM, value: PACKAGE_MANAGER_VALUE_INSTALL.PNPM },
  { name: PACKAGE_MANAGER.YARN, value: PACKAGE_MANAGER_VALUE_INSTALL.YARN },
  { name: 'cancel', value: 'cancel' },
];

export { PACKAGE_MANAGER, packageManagerChoices, packageManagerInstallChoices };
export type { PackageManagerTypes };
