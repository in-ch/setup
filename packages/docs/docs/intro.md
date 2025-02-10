---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **@in-ch/setup** and set up your project efficiently.

## Getting Started

**@in-ch/setup** helps you easily configure **ESLint**, **Prettier**, **husky** and other development tools for maintaining code quality and consistency.

### Requirements

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, it is recommended to check all checkboxes related to dependencies.

## Setting Up Your Project

To install **@in-ch/setup**, run the following command:

```bash
npm install @in-ch/setup -g
```

To configure your project with @in-ch/setup, run the following command:

```bash
ics init
```

This command will generate configuration files for ESLint, Prettier, and other tools, and install the necessary dependencies.

To see more available commands, run the following command:"

```bash
ics list
```

## Verifying the Configuration

Once the setup is complete, you can check the generated configuration files and make modifications if needed.
For example, files like **.eslintrc.js** and **.prettierrc** should now be available in your project.

## Running Code Quality Checks

After the setup, you can run the following command to check and fix code issues:

```bash
ics lint
```

This command will analyze your project's code based on the defined rules and automatically fix styling issues where possible.

---

With this tutorial, you can quickly configure and use **@in-ch/setup** to improve your project's code quality and maintain consistency. 🚀
