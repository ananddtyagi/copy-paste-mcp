import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the MCP server
const server = new McpServer({
    name: "copy-paste",
    version: "1.0.0",
});

// Add a tool to extract liness from text content
server.tool(
    "extract-lines",
    "Extract a specific range of lines from text content",
    {
        text: z.string().describe("The full text content to extract lines from"),
        start_line: z.number().int().min(1).describe("Starting line number (inclusive)"),
        end_line: z.number().int().describe("Ending line number (inclusive)"),
    },
    async ({ text, start_line, end_line }) => {
        try {
            // Validate line numbers
            if (start_line > end_line) {
                return {
                    isError: true,
                    content: [
                        {
                            type: "text",
                            text: `Error: Start line (${start_line}) cannot be greater than end line (${end_line}).`,
                        },
                    ],
                };
            }

            // Split the text into lines
            const allLines = text.split('\n');
            
            // Validate that requested lines are within range
            if (start_line > allLines.length) {
                return {
                    isError: true,
                    content: [
                        {
                            type: "text",
                            text: `Error: Start line (${start_line}) exceeds the total number of lines (${allLines.length}).`,
                        },
                    ],
                };
            }

            // Extract the requested lines (adjusting for 0-based array indexing)
            const extractedLines = allLines.slice(
                start_line - 1, 
                Math.min(end_line, allLines.length)
            );

            // Return the extracted lines
            return {
                content: [
                    {
                        type: "text",
                        text: extractedLines.join('\n'),
                    },
                ],
            };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: `Error extracting lines: ${errorMessage}`,
                    },
                ],
            };
        }
    }
);

// Run the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Copy-Paste MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});