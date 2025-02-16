---
sidebar_position: 1
---

# Lighthouse Command

The `Lighthouse` command allows you to run a website performance analysis using **Google Lighthouse.** It ensures that you have the necessary dependencies installed and guides you through the process of testing a webpage for performance, accessibility, best practices, SEO, and more.

<br />

# 🛠 Installation

To run **lg** command, follow these steps:

```bash
npm install @in-ch/setup -g
```

<br />

# 🚀 Usage

To run a Lighthouse test, use the following command:

```bash
ics lg
```

### Running in Headless Mode

If you prefer to run Lighthouse in **headless mode**, use:

```bash
ics lg --headless
```

### What It Does

1. Version Check & Update

- Ensures that you are using the latest version of `@in-ch/setup` before proceeding.
- If an update is available, prompts you to install the latest version.

2. Dependency Installation

- Checks if Lighthouse is installed globally.
- If not found, asks if you want to install it before proceeding.

3. Website Analysis

- Prompts you to enter the URL of the website you want to analyze.
- Validates the provided URL to ensure it is correctly formatted.
- Runs `Lighthouse` with the selected settings (headless or standard mode).
- Displays the results in the terminal or opens a detailed HTML report.

### 📌 Example Output

```less
Checking for updates...
Lighthouse is not installed. Would you like to install it? (Y/n)
> Y
Installing Lighthouse...
Enter the web address: (default: http://localhost:3000)
> https://example.com
Running Lighthouse analysis...
Report generated and opened in your browser.
```

If you run the command with `--headless`, the output will be displayed in the terminal instead of opening an HTML report.

<br />

# 🛠 Troubleshooting

### ❌ Lighthouse is not installed

- If you encounter an error stating that Lighthouse is missing, you can manually install it using:

  ```bash
    npm install -g lighthouse
  ```

### ⚠️ Invalid URL Error

- Ensure that you enter a valid URL starting with http:// or https://.

### 🔄 Version Update Issues

- If the version update process fails, try running:

  ```bash
    npm install @in-ch/setup@latest -g
  ```
