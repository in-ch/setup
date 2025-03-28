# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.7](https://github.com/in-ch/setup/compare/v0.0.6...v0.0.7) (2025-03-12)


### Features

* add aliases for simpler command usage ([1fb7622](https://github.com/in-ch/setup/commit/1fb76229c1d0d9bc213be6bc86f3d24a4f32af23))


### Bug Fixes

* **docs:** google site verification ([c1fc598](https://github.com/in-ch/setup/commit/c1fc598cce35b0518cabb5015ad7f0ac7e11c662))
* remove stdio option at initializePackageManager ([59ec72a](https://github.com/in-ch/setup/commit/59ec72a0a35d024dfef2630d898b331393a73c7b))
* set default package manager to npm install ([5fb1f88](https://github.com/in-ch/setup/commit/5fb1f884bd12b6247bd9df385a04f0e7ec9bf7de))

### [0.0.6](https://github.com/in-ch/setup/compare/v0.0.5...v0.0.6) (2025-03-08)


### Features

* add setup script to pnpm workspace ([7af3229](https://github.com/in-ch/setup/commit/7af3229fefc9c41505be36f5eb56a1f6b5a0ccfc))
* **setup:** create filteredCommandChoices to remove unnecessary options from the init command ([7eb7a62](https://github.com/in-ch/setup/commit/7eb7a62f525369902cbb002f2d63dfde70334c31))


### Bug Fixes

* add pnpm installation step to GitHub Actions workflow ([7878641](https://github.com/in-ch/setup/commit/787864189111904245c3041742b381079dca6781))
* replace pnpm with npm in GitHub Actions workflow ([4faff35](https://github.com/in-ch/setup/commit/4faff35541b20918bffe39425f9b2f1df36a4d3b))
* update build:docs command for npm compatibility ([828018b](https://github.com/in-ch/setup/commit/828018b9b1eabd17db06b0c3c76b2d7db1402151))
* update GitHub Actions to run build in docs package directory ([803f998](https://github.com/in-ch/setup/commit/803f9984c0a4d65ed838f9242a2eb169c43e3e95))

### [0.0.5](https://github.com/in-ch/setup/compare/v0.0.4...v0.0.5) (2025-02-04)


### Features

* add version update command line ([b254b31](https://github.com/in-ch/setup/commit/b254b315464c1a1e6984a85ab9d9946d3c854de8))

### [0.0.4](https://github.com/in-ch/setup/compare/v0.0.3...v0.0.4) (2025-02-03)


### Features

* ensure npm version is checked before package version check ([b161f60](https://github.com/in-ch/setup/commit/b161f603e8ba0ac316cfcd50cb2120288a715f03))


### Bug Fixes

* getPackageInfo to fetch version from global package instead of local ([2fb6eec](https://github.com/in-ch/setup/commit/2fb6eec37169ac542782d9fe38ce35989147520f))

### [0.0.3](https://github.com/in-ch/setup/compare/v0.0.2...v0.0.3) (2025-02-03)


### Features

* add Airbnb ESLint option to eslint command ([1a6c727](https://github.com/in-ch/setup/commit/1a6c727df6f918a4dfe6400087913b49b9dc46f6))
* add Google & XO ESLint option to eslint command ([3d3710b](https://github.com/in-ch/setup/commit/3d3710bc22c1358d169f6a178e9c75dbe2243622))


### Bug Fixes

* airbnb eslint path error ([f652028](https://github.com/in-ch/setup/commit/f6520286a0bef087f4ecf92c8ef8b71c8ec31c9b))

### [0.0.2](https://github.com/in-ch/setup/compare/v0.0.1...v0.0.2) (2025-01-26)


### Features

* add latest command ([ebfdaf3](https://github.com/in-ch/setup/commit/ebfdaf33ad97a82f8185021853c4fa7c1559d16b))
* add version check and prompt for update before executing commands ([20430cb](https://github.com/in-ch/setup/commit/20430cb7f0643b42775ad8342a63a3a1cef8904b))


### Bug Fixes

* change eslint file name ([b8c21b0](https://github.com/in-ch/setup/commit/b8c21b0397d3eefeac9d84f35e7602384df206a2))
* resolve issue with install command failing ([0e3cf0d](https://github.com/in-ch/setup/commit/0e3cf0d4165d756a292b77a877561252ae6ae04c))

### [0.0.1](https://github.com/in-ch/setup/compare/v0.0.1-rc5...v0.0.1) (2025-01-19)

### [0.0.1-rc5](https://github.com/in-ch/setup/compare/v0.0.1-rc4...v0.0.1-rc5) (2025-01-13)

### Features

- add automatic 'test' script to package.json during Husky initialization ([01ef90c](https://github.com/in-ch/setup/commit/01ef90c7557cc57a8baebf515033481e4ff405f0))
- add Update VsCode setting cli ([4a93914](https://github.com/in-ch/setup/commit/4a9391413298a6377c592040edfa9d876576707a))
- ensure files open in default text editor when executing edit command ([ca86216](https://github.com/in-ch/setup/commit/ca86216411aaf94dae5d5cf51605d45aee7935be))
- **vscode:** add checkVsCodeExtensionInstalled fuc ([15377ea](https://github.com/in-ch/setup/commit/15377eaad084e6f015cb4f67394e526ca11e0a44))
- **vscode:** add install vscode extension fuc ([385ddc2](https://github.com/in-ch/setup/commit/385ddc2172ad972ccc5509ce8094d193584fab22))

### Bug Fixes

- removed leading dot in ESLint config filename ([114b3a7](https://github.com/in-ch/setup/commit/114b3a7a1c958cbbf6052664060c7098b55e15ef))

## 0.0.1-rc4 (2024-12-22)

## 0.0.1-rc3 (2024-12-21)

### Features

- initialize package manager if not already initialized command 2d3e489

### Refactor

- remove fixedMessage feature from list command 4dab47f

## 0.0.1-rc2 (2024-12-19)

## 0.0.1-rc1 (2024-12-19)

### Features

- add lighthouse command c97e75f
- add package manager command 897ff3d

## 0.0.1-beta

### Patch Changes

- beta version release
