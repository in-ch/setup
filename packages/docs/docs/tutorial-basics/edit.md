---
sidebar_position: 1
---

# Edit Command

The `edit` command allows you to quickly access and modify various configuration files used in your project. Whether you're adjusting `ESLint` rules, tweaking `Prettier` settings, or updating `TypeScript` configurations, this command streamlines the process by opening the relevant file in your preferred text editor.

<br />

# 🚀 Usage

To open and edit a configuration file, run the following command:

```bash
ics edit
```

### What It Does

1.  Version Check & Update

    - Before opening the file, the command ensures that you are using the latest version of the setup package. If an update is available, it will prompt you to update before proceeding.

2.  File Selection

    The command will prompt you to select the configuration file you wish to edit from a predefined list of available options, including:

    - **ESLint**
    - **Prettier**
    - **TypeScript**
    - **Git Commit Message Templates**
    - **Husky**
    - **Commitlint**

3.  File Path Resolution

    Depending on whether you are in a development environment or using a globally installed version of `@in-ch/setup`, the correct path to the configuration file is determined automatically.

4.  Opening the File

    The command then attempts to open the file in your preferred text editor. It supports:

    - **Windows**: Notepad (by default)
    - **MacOS**: Visual Studio Code (if installed), otherwise TextEdit
    - **Linux**: Visual Studio Code (if installed), otherwise the default system editor

### 📌 Example Output

```lua
Checking for updates...
What do you want to edit config file?
  ❯ eslint
    prettier
    typescript
    gitmessage
    husky
    commitlint
Opening: /path/to/config/file
```

If you select a configuration file, it will be opened automatically in the appropriate editor.

<br />

# 🛠 Troubleshooting

### ❌ The file does not open

- Ensure that you have a text editor installed that supports opening configuration files.
- If you are on **Mac** or **Linux**, make sure that **VS Code** or another suitable editor is installed.

### ⚠️ Error: "Failed to open file or folder"

- Double-check that the file path exists and is accessible.
- Run the command with administrator or root privileges if necessary.

### 🔍 File is missing

- If a configuration file is missing, it may not have been created yet.
- You can run `ics init` to set up missing configuration files before trying to edit them.
