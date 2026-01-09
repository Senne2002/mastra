import { MCPServer } from "@mastra/mcp";

import { reactVitestTool } from "../tools/reactVitestTool";

const testMcpServer = new MCPServer({
  name: "test-mcp",
  version: "0.0.1",
  description: "A test MCP server",
  tools: {
    reactVitestTool: reactVitestTool,
  },
});

export { testMcpServer };
