---
sidebar_position: 1
---

# Package Manager Command

The <code>pm</code> command initializes a package manager in your project.

# 🛠 Installation

To run **pm** command, run the following command:

```bash
npm install @in-ch/setup -g
```

<br />

# 🚀 Usage

To initialize a package manager, run:

```bash
ics pm
```

### What It Does

- Prompts you to choose a package manager (<code>npm</code>, <code>pnpm</code>, or <code>yarn</code>).

- Runs the initialization command for the selected package manager.

- Ensures a clean and structured setup process.

### Example Output

```
? Which package manager would you like to use?
  ❯ npm
    pnpm
    yarn
    cancel
```

If you select a package manager, it runs the corresponding initialization command:

```bash
npm init
```

If you select **cancel**, the operation will be aborted.

<br />

# 🔖 Package Manager Options

| Name | Command Used |
| ---- | ------------ |
| npm  | npm init     |
| pnpm | pnpm init    |
| yarn | yarn init    |

<br />

# ❓ Troubleshooting

- If the package manager command fails, ensure that you have the necessary permissions.

- If no package manager is detected, install the one you need manually.

- If initialization fails, check that your environment is properly set up.
