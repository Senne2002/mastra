import { createTool } from "@mastra/core";
import { z } from "zod";

const TEST_INSTRUCTIONS = `
You are a senior frontend engineer.

Generate unit tests for the given React component using:
- Vitest
- @testing-library/react
- @testing-library/jest-dom

Rules:
- Do NOT mock React Testing Library
- Prefer screen.getByRole / getByText
- Test required props
- Test user interactions
- Avoid snapshots unless necessary
- Use vi.fn() for mocks
- Tests must be deterministic
`;

const TEST_TEMPLATE = `
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {{COMPONENT_NAME}} from './{{COMPONENT_NAME}}';

describe('{{COMPONENT_NAME}}', () => {
  it('renders correctly', () => {
    {{RENDER_BLOCK}}
  });

  {{INTERACTION_TESTS}}
});
`;

const inputSchema = z.object({
  componentName: z.string(),
  componentCode: z.string(),
  propsExample: z.string().optional(),
});

export const reactVitestTool = createTool({
  id: "generate_react_vitest_tests",
  description:
    "Generate React unit tests using Vitest and React Testing Library",
  inputSchema: inputSchema,

  execute: async (context) => {
    const { componentName, componentCode, propsExample } = context.context;

    return {
      instructions: TEST_INSTRUCTIONS,
      template: TEST_TEMPLATE,
      component: {
        name: componentName,
        code: componentCode,
        exampleProps: propsExample ?? "",
      },
    };
  },
});
