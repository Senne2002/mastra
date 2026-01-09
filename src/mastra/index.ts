import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";

import { mcpServer } from "./mcp/mcp";

export const mastra = new Mastra({
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  mcpServers: { mcpServer },
});
