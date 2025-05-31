/**
 * Cursor AI rule templates
 * These templates help Cursor AI understand your project structure and coding patterns
 */

export function getCursorRuleTemplates(): Record<string, string> {
  return {
    'code-style-guidelines.mbc': CodeStyleGuidelines(),
    'my-custom-rule.mbc': getMyCustomRule(),
  };
}

function CodeStyleGuidelines(): string {
  return `# Code Style Guidelines

This project follows the principles below. Cursor AI should refer to this document to maintain consistency in all code suggestions and refactoring.

---

## 1. Prefer Declarative Programming

- Use declarative programming as the default approach.
- Imperative code is allowed when absolutely necessary but should be minimized.
- Focus on describing *what* the code should do, not *how* it does it.
- Prefer higher-order functions like \`map\`, \`filter\`, \`reduce\`, and composition techniques.

---

## 2. Keep Abstraction Levels Consistent

- Avoid mixing different levels of abstraction within the same function or module.
- Group high-level abstractions together and separate them from low-level operations.
- Example:
  - High-level: \`calculateInvoice()\`
  - Low-level: \`parsePrice()\`, \`applyTax()\`

---

## 3. Follow the Single Responsibility Principle

- Each function or module should do exactly one thing.
- Split logic into smaller, well-named functions where necessary.
- Example:
  - ❌ \`fetchUserAndSaveToDatabase()\`
  - ✅ \`fetchUser()\` + \`saveToDatabase()\`

---

## 4. Align Function Implementation Depth

- Functions at the same abstraction level should have consistent implementation depth and complexity.
- Do not mix high-level orchestration with detailed low-level logic in the same function.
- Example:
  - ❌ A single function that fetches data, parses it, and renders the UI
  - ✅ Separate those responsibilities into distinct layers

---

## Scope

These guidelines apply to:

- All TypeScript/JavaScript code
- React components and hooks
- Business logic and utility functions

---

**This file serves as persistent context for Cursor AI. Always follow these principles when generating, editing, or refactoring code.**
`;
}

function getMyCustomRule(): string {
  return `# Code Style Guidelines

This project follows the principles below. Cursor AI should refer to this document to maintain consistency in all code suggestions and refactoring.

---

## 1. Prefer Declarative Programming

- Use declarative programming as the default approach.
- Imperative code is allowed when absolutely necessary but should be minimized.
- Focus on describing *what* the code should do, not *how* it does it.
- Prefer higher-order functions like \`map\`, \`filter\`, \`reduce\`, and composition techniques.

---

## 2. Keep Abstraction Levels Consistent

- Avoid mixing different levels of abstraction within the same function or module.
- Group high-level abstractions together and separate them from low-level operations.
- Example:
  - High-level: \`calculateInvoice()\`
  - Low-level: \`parsePrice()\`, \`applyTax()\`

---

## 3. Follow the Single Responsibility Principle

- Each function or module should do exactly one thing.
- Split logic into smaller, well-named functions where necessary.
- Example:
    - ❌ \`fetchUserAndSaveToDatabase()\`
  - ✅ \`fetchUser()\` + \`saveToDatabase()\`

---

## 4. Align Function Implementation Depth

- Functions at the same abstraction level should have consistent implementation depth and complexity.
- Do not mix high-level orchestration with detailed low-level logic in the same function.
- Example:
  - ❌ A single function that fetches data, parses it, and renders the UI
  - ✅ Separate those responsibilities into distinct layers

---

## Scope

These guidelines apply to:

- All TypeScript/JavaScript code
- React components and hooks
- Business logic and utility functions

---

**This file serves as persistent context for Cursor AI. Always follow these principles when generating, editing, or refactoring code.**
`;
}
