---
sidebar_position: 1
---

# Auto Prefix Command

The **autoPrefix** command updates **VSCode** settings to enable automatic formatting with **Prettier.**

<br />

# 🛠 Installation

To run this command, follow these steps:

```bash
npm install @in-ch/setup -g
```

<br />

# 🚀 Usage

To apply automatic formatting settings in VSCode, run:

```bash
ics autoPrefix
```

### What It Does

- Checks for updates before applying changes.

- Ensures the **Prettier** extension is installed in **VSCode**.

- Updates <code>settings.json</code> with the appropriate formatting configurations.

- Ensures settings are correctly merged without overwriting existing configurations.

### VSCode Settings Applied

This command modifies the following settings in <code>settings.json</code>:

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

### Example Output

```bash
Checking for updates...
Updating VSCode settings...
Ensuring Prettier extension is installed...
VSCode settings.json updated successfully!
```

<br />

# 🔖 Advanced Usage

If you need to manually update VSCode settings, you can locate settings.json here:

- **Windows:** <code>%APPDATA%/Code/User/settings.json</code>

- **Mac:** <code>~/Library/Application Support/Code/User/settings.json</code>

- **Linux:** <code>~/.config/Code/User/settings.json</code>

<br />

# ❓ Troubleshooting

- Command Not Found? Ensure **@in-ch/setup** is installed globally using <code>npm list -g --depth=0</code>.

- Permission Errors? Try running the command with sudo (Mac/Linux) or in an admin shell (Windows).

- Config Not Applying? Double-check that the necessary files were generated and referenced in your project.
