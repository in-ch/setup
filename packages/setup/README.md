# setup

<div align="center">
    <img src="https://raw.githubusercontent.com/in-ch/setup/master/docs/sample.gif" alt="@in-ch/setup - A tool for quick setup and configuration of essential project files." />
</div>

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/%40in-ch%2Fsetup.svg?style=for-the-badge)](https://www.npmjs.com/package/@in-ch/setup)
[![npm total downloads](https://img.shields.io/npm/dt/%40in-ch%2Fsetup.svg?style=for-the-badge)](https://www.npmjs.com/package/@in-ch/setup)
[![license](https://img.shields.io/npm/l/%40in-ch%2Fsetup?style=for-the-badge)](https://github.com/in-ch/setup/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/in-ch/setup?style=for-the-badge)](https://github.com/in-ch/setup/stargazers)

</div>

### Features

`@in-ch/setup` is a powerful tool for quickly setting up various project files and configurations.
Save time and automate your setup process with the following commands:

| **Command**  | **Description**                               |
| ------------ | --------------------------------------------- |
| `husky`      | Creates Husky configuration files.            |
| `eslint`     | Generates ESLint configuration files.         |
| `gitmessage` | Creates a Git message template file.          |
| `prettier`   | Sets up Prettier configuration files.         |
| `typescript` | Creates TypeScript configuration files.       |
| `commitlint` | Adds Commitlint configuration.                |
| `edit`       | Edits existing configuration files.           |
| `init`       | Creates multiple configuration files at once. |
| `list`       | Lists all available commands.                 |

### Installation

To use `@in-ch/setup`, first install the package:

```bash
npm install -g @in-ch/setup
```

### Usage

Below are examples of how to use the primary commands of `@in-ch/setup`:

```bash
# Initialize essential configuration files (Husky, ESLint, Prettier, etc.)
ics init

# Add individual configuration files
# Husky setup
ics husky

# ESLint setup
ics eslint

# Git message template setup
ics gitmessage

# Prettier configuration
ics prettier

# TypeScript configuration
ics typescript

# Commit lint setup
ics commitlint

# Edit existing configuration files
ics edit

# List all available commands
ics list
```

### Why Use @in-ch/setup?

- **Save Time**: Automate the generation of multiple configuration files with a single command.
- **Ensure Consistency**: Easily enforce shared configurations across team projects.
- **Flexibility**: Edit generated files as needed to suit your project requirements.

### Contributors

Thanks go to these wonderful people! [[Become a contributor](CONTRIBUTING.md)].

<a href="https://github.com/in-ch/setup/graphs/contributors">
  <img src="https://img.shields.io/github/contributors/in-ch/setup?style=for-the-badge" alt="Contributors" />
  <br />
  <br />
  <img src="https://opencollective.com/setup/contributors.svg?width=890&button=false" />
</a>
