---
sidebar_position: 2
---

# Setting Git Message

This project provides a CLI utility to set up and manage Git commit message templates.

<br />

# 🛠 Installation

To set up a Git commit message template in your project, follow these steps:

```bash
npm install @in-ch/setup -g
```

<br />

# 🚀 Usage

### Running the Husky Setup

```bash
ics gitmessage
```

If Git is not initialized, you will see the following message:

```bash
Git is not initialized. Would you like to initialize it?
```

- Selecting **Yes** will initialize Git in your project.

- Selecting **No** will cancel the setup.

Once **Git** is initialized, the **.gitmessage** file will be created, and **Git** will be configured to use it as a commit message template.

<br />

# 📌 Features

When executing the command, the following tasks will be performed:

- Check and update the **@in-ch/setup** version

- Verify if **Git** is initialized in the project

- Prompt the user to initialize **Git** if not already done

- Create a commit message template file (**.gitmessage**)

- Configure **Git** to use the commit message template

<br />

# ❗ Important Notes

**Git** must be initialized for this setup to work.

The **.gitmessage** file will be used as a commit message template.
