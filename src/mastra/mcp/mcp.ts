import { join } from "path";
import { MCPServer } from "@mastra/mcp";
import { existsSync, readFileSync } from "fs";

import { reactVitestTool } from "../tools/reactVitestTool";

const mcpServer = new MCPServer({
  name: "test-mcp",
  version: "0.0.1",
  description: "An MCP server for testing react with vitest. ",
  tools: {
    reactVitestTool: reactVitestTool,
  },
  resources: {
    listResources: async () => {
      return [
        {
          uri: "file://agents.md",
          name: "Agents Documentation",
          description: "Documentation about available agents",
          mimeType: "text/markdown",
        },
      ];
    },
    getResourceContent: async ({ uri }) => {
      if (uri === "file://agents.md") {
        // Try multiple possible locations:
        // 1. Same directory as compiled file (for .mastra/output/)
        // 2. Source directory (for development)
        const possiblePaths = [
          join(__dirname, "agents.md"),
          join(process.cwd(), ".mastra", "output", "agents.md"),
          join(process.cwd(), "src", "mastra", "mcp", "agents.md"),
        ];

        for (const filePath of possiblePaths) {
          if (existsSync(filePath)) {
            const content = readFileSync(filePath, "utf-8");
            return { text: content };
          }
        }

        throw new Error(
          `agents.md not found. Tried: ${possiblePaths.join(", ")}`
        );
      }

      throw new Error(`Resource not found: ${uri}`);
    },
  },
});

export { mcpServer };
