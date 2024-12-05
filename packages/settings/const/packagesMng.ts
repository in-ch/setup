const PACKAGE_MANAGER = {
  NPM: 'npm',
  PNPM: 'pnpm',
  YARN: 'yarn'
};
type PackageManagerTypes = (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];

const packageManagerChoices = [
  { name: PACKAGE_MANAGER.NPM, value: PACKAGE_MANAGER.NPM },
  { name: PACKAGE_MANAGER.PNPM, value: PACKAGE_MANAGER.PNPM },
  { name: PACKAGE_MANAGER.YARN, value: PACKAGE_MANAGER.YARN },
  {name: 'cancel', value: 'cancel'}
];

export { PACKAGE_MANAGER, PackageManagerTypes, packageManagerChoices };
