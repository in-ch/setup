# Init Command

The **init** command allows you to easily set up various configurations in your project.

# 🛠 Installation

To running **init** command, run the following command:

```bash
npm install @in-ch/setup -g
```

<br />

# 🚀 Usage

```bash
ics init
```

### What It Does

- Prompts you to select configuration files to install.

- Automatically installs and sets up selected configurations.

- Runs version checks to ensure you have the latest updates.

### Available Configuration Options

You can select from the following configurations:

- **ESLint**: Ensures consistent code quality by enforcing linting rules.

- **Prettier**: Automatically formats code for better readability.

- **TypeScript**: Sets up TypeScript for type-safe development.

- **Git Commit Message Templates**: Helps maintain a structured commit history.

- **Husky**: Enables Git hooks for automated checks before committing.

- **Commitlint**: Enforces commit message conventions.

### Example Output

```
? Which files do you want to install?
  ❯ eslint
    prettier
    typeScript
    gitmessage
    husky
    commitlint
```

Once selected, the necessary configuration files will be created, and dependencies will be installed.

<br />

# ⚙️ Customization

After running ics init, you can manually adjust the generated configuration files to fit your project's needs. For example:

Modify **eslintrc.config.mjs** to extend Airbnb, Google, or custom linting rules.

Update **.prettierrc.cjs** to change formatting preferences.

Adjust **tsconfig.json** to enable or disable specific TypeScript compiler options.

<br />

# ❓ Troubleshooting

- Command Not Found? Ensure **@in-ch/setup** is installed globally using <code>npm list -g --depth=0</code>.

- Permission Errors? Try running the command with sudo (Mac/Linux) or in an admin shell (Windows).

- Config Not Applying? Double-check that the necessary files were generated and referenced in your project.
