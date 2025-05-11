# Copy-Paste MCP

A Model Context Protocol (MCP) server that provides a tool for extracting specific lines from text content.

## Features

- Simple tool to extract specific line ranges from any text content
- Preserves exact content formatting and newlines
- No modification of content - pure extraction
- MCP server implementation for easy integration with AI tools

## MCP Server

This package includes an MCP server that exposes the line extraction functionality as a tool that can be used by any MCP client like Claude Desktop, VS Code, or other MCP-compatible applications.

### Available Tools

1. **extract-lines** - Extract a specific range of lines from text content

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Usage

### Starting the MCP Server

```bash
npm start
```

This will start the MCP server using the stdio transport, which can be connected to by MCP clients.

### Connecting to the Server

In an MCP-compatible client (like Claude Desktop), you can add this server with:

- Name: Copy-Paste
- Command: `node /path/to/copy-paste-mcp/dist/index.js`
- Transport: stdio

### Using the Tool

Once connected, you can use the tool through your MCP client's interface:

#### Extract Lines

```
Tool: extract-lines
Parameters:
  - text: "Your multi-line text content goes here\nSecond line\nThird line"
  - start_line: 1
  - end_line: 2
```

This will return the first two lines of the provided text content.

## Examples

Extract lines 10-20 from a large text block:
```
Tool: extract-lines
Parameters:
  - text: [your text content with many lines]
  - start_line: 10
  - end_line: 20
```

Extract just a single line (line 5):
```
Tool: extract-lines
Parameters:
  - text: [your text content]
  - start_line: 5
  - end_line: 5
```

## Why use this?

This tool is useful when you need to:
- Extract specific sections from large text blocks
- Copy exact line ranges from code or documentation
- Ensure precise content extraction without any alterations
- Integrate line extraction capabilities into AI workflows via MCP
- Work with specific portions of large documents