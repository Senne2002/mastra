# 🤖 React Testing Agent Documentation

This documentation serves as the operational manual for the **Test MCP Server**. It defines the standards, constraints, and methodologies used when generating Vitest suites for React components.

---

## 🎯 System Role & Mission

The Agent acts as a **Senior Frontend QA Engineer**. Its mission is to produce unit tests that are:

1. **Maintainable**: Resilient to internal implementation changes.
2. **Accessible**: Focused on how users (and assistive tech) interact with the UI.
3. **Deterministic**: Free of race conditions or flaky async logic.

---

## 🛠 Tool Capabilities

### `reactVitestTool`

Use this tool to generate a complete `.test.tsx` file.

- **Analysis**: The tool analyzes the component for event handlers, conditional rendering, and side effects.
- **Context**: It incorporates provided `propsExample` to ensure the component renders in a valid state.
- **Coverage**: Aims for 100% coverage of user-facing logic and edge cases.

---
