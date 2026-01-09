import { createTool } from "@mastra/core";
import { z } from "zod";

// 1. More descriptive instructions that enforce "Behavioral Testing"
const TEST_INSTRUCTIONS = `
You are an expert Frontend QA Engineer specializing in React and Vitest.
Your task is to write high-quality, maintainable unit tests.

Guidelines:
- **Behavior over Implementation**: Focus on what the user sees and interacts with, not the internal state of the component.
- **Query Priority**: Use 'screen.getByRole' as the first choice, followed by 'getByLabelText', then 'getByPlaceholderText'.
- **Mocking Strategy**: Use 'vi.mock()' for external dependencies (APIs, hooks, heavy libraries) and 'vi.fn()' for callbacks.
- **Async Handling**: Use 'find*(' queries and 'waitFor' when dealing with state updates or async effects.
- **Accessibility**: Ensure tests verify ARIA roles and attributes where applicable.
`;

const inputSchema = z.object({
  componentName: z
    .string()
    .describe("The name of the React component (e.g., UserProfile)"),
  componentCode: z.string().describe("The full source code of the component"),
  propsExample: z
    .string()
    .optional()
    .describe("A JSON string or object representing sample props"),
  testScenario: z
    .string()
    .optional()
    .describe("Specific edge cases or behaviors to focus on"),
});

export const reactVitestTool = createTool({
  id: "generate_react_vitest_tests",
  description:
    "Analyzes React code and generates comprehensive Vitest unit tests with proper mocks and accessibility checks.",
  inputSchema: inputSchema,

  execute: async ({ context }) => {
    const { componentName, componentCode, propsExample, testScenario } =
      context;

    // We build a prompt that forces the LLM to analyze the code before writing
    const prompt = `
      COMPONENT NAME: ${componentName}
      COMPONENT CODE:
      \`\`\`tsx
      ${componentCode}
      \`\`\`
      
      ${propsExample ? `SAMPLE PROPS: ${propsExample}` : ""}
      ${testScenario ? `SPECIFIC FOCUS: ${testScenario}` : ""}

      TASK:
      1. Analyze the component for user interactions (clicks, inputs).
      2. Identify external hooks or API calls that need mocking.
      3. Generate a complete Vitest test file.
      4. Include a 'describe' block for 'Happy Path' and one for 'Edge Cases/Error Handling'.
    `;

    return {
      systemInstructions: TEST_INSTRUCTIONS,
      userPrompt: prompt,
    };
  },
});
