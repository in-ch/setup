---
sidebar_position: 1
---

# Setting Commit Lint

Easily configure **Commitlint**, **Husky**, and **Lint-Staged** with simple commands.

# 🛠 Installation

To set up **Commitlint** in your project, run the following command:

```bash
npm install @in-ch/setup -g
```

# 🚀 Usage

### Getting Started

To set up Commitlint in your project, run the following command:

```bash
ics commitlint
```

This will automatically install dependencies and generate necessary configuration files.

If **Husky** is not initialized, you will be prompted to initialize it as well.

# 📌 Features

- **Commitlint**: Ensures commit messages follow a consistent style.

- **Husky**: Enables Git hooks for pre-commit validation.

- **Lint-Staged**: Runs linters only on staged files to improve performance.

# 📦 Installation Details

The following dependencies will be installed:

```bash
@commitlint/config-conventional @commitlint/cli lint-staged
```

If the package manager cannot be detected, you will be prompted to choose one manually.

# 🤔 Configuration Files

After running the setup, the following configuration files will be created:

- **.commitlintrc.json**: Defines commit linting rules.

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

- **.lintstagedrc.json**: Specifies which linters to run on staged files.

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write", "git add"]
}
```

# ❗ Running Lint Checks

To check your commit messages, run:

```bash
npm run lint
```
