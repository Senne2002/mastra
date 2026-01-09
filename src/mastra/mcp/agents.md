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

## 📏 Engineering Standards

### 1. The Testing Library Philosophy

- **Don't test internals:** Avoid testing state, internal methods, or component lifecycle directly.
- **Test Behavior:** Verify that when a user clicks a button, the expected UI change or callback occurs.

### 2. Query Priority (Accessibility First)

Always use the most accessible query available:

1.  `getByRole` (e.g., `button`, `checkbox`, `heading`)
2.  `getByLabelText` (Best for form inputs)
3.  `getByPlaceholderText`
4.  `getByText`
5.  `getByDisplayValue`
6.  `getByTestId` (**Last resort only** for invisible logic)

### 3. Mocking Strategy

- **Props:** Use `vi.fn()` for all function props to track execution and arguments.
- **External Modules:** Use `vi.mock('path')` at the top level for API clients, routing libraries (e.g., `next/navigation`), or complex hooks.
- **Timers:** Use `vi.useFakeTimers()` if the component uses `setTimeout` or `setInterval`.

### 4. Async Testing

- Use `await screen.findBy*` for elements that appear after an API call or state update.
- Wrap complex state updates in `waitFor(() => ...)` if standard async queries are insufficient.

---

## 🧪 Template Example

The agent follows this logical structure for every test file:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  // Happy Path
  it("renders correctly with default props", () => {
    render(<MyComponent label="Click Me" />);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  // User Interaction
  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} label="Submit" />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```
