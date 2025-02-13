---
sidebar_position: 2
---

# Setting husky

This project provides a CLI utility to set up and manage **Husky**.

# 🛠 Installation

To set up **Husky** in your project, follow these steps:

```bash
npm i @in-ch/setup -g
```

# 🚀 Usage

### Running the Husky Setup

```bash
ics husky
```

If Husky is already configured, you will see the following message:

```bash
Husky settings are already configured. Do you still want to proceed with the setup?
```

Selecting **Yes** will overwrite the existing configuration.

Selecting **No** will cancel the setup.

### Detecting Package Manager.

By default, the project detects the package manager (**npm**, **yarn**, **pnpm**). If not detected, you can manually select one.

# 📌 Features

When executing the command, the following tasks will be performed:

- Verify if the **.husky** directory already exists

- Prompt the user for overwriting existing configurations

- Install Husky-related dependencies

- Initialize **Husky**

- Update **package.json**

# ❗ Important Notes

Husky setup must be executed from the project root.

The package.json file must exist.
