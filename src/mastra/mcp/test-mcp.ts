import { MCPServer } from "@mastra/mcp";
import { unitTestAgent } from "../agents/unit-test-agent";

const testMcpServer = new MCPServer({
  name: "test-mcp",
  version: "0.0.1",
  description: "A test MCP server",
  agents: {
    test: unitTestAgent,
  },
  tools: {
    test: unitTestAgent.tools,
  },
});

export { testMcpServer };
