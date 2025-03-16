---
sidebar_position: 2
---

# Setting Env

Generates an **env** file with simple commands.

<br />

# 🛠 Installation

To set up **env** file in your project, follow these steps:

```bash
npm install @in-ch/setup -g
```

or

```bash
npm install @in-ch/setup --save-dev
```

<br />

# 🚀 Usage

### Running the ev command

```bash
ics env
```

### What happens when you run the command:

1. The CLI checks if a `.env` file already exists in your project root:
   - If it exists, you'll get a message: `"At least one env file exists."`
2. If no `.env` file exists, the CLI will:

   - Create a new `.env` file in the root directory.
   - Prompt you to add key-value pairs.
     Example:

     ```yaml
     Enter the key: API_KEY
     Enter the value: 123456
     ```

     Resulting `.env` file content:

     ```yaml
     API_KEY=123456
     ```

3. After each key-value pair, the CLI asks if you'd like to add more. You can continue adding or finish the process.

4. If any errors occur during the process, a message will appear: `"🥲 Failed to create env file."`

# ❗ Important Notes

env setup must be executed from the project root.
