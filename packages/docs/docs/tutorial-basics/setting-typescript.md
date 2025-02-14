---
sidebar_position: 2
---

# Setting Typescript

This project provides a CLI utility to set up **TypeScript** configurations in your project.

# 🛠 Installation

To set up **TypeScript** in your project, run:

```bash
npm install @in-ch/setup -g
```

# 🚀 Usage

### Running the TypeScript Setup

```bash
ics typescript
```

If a **TypeScript** configuration file (**tsconfig.json**) already exists, the setup will be canceled with an error message:

```bash
At least one TypeScript file exists.
```

Otherwise, **TypeScript** dependencies will be installed, and the **TypeScript** configuration will be initialized.

# ❗ Important Notes

If **TypeScript** is already configured (**tsconfig.json** exists), the setup will be skipped.

The script detects and uses the appropriate package manager (**npm**, **yarn**, or **pnpm**).
