# Copy-Paste File Splitter MCP

A Model Context Protocol (MCP) server that provides tools for splitting large files into smaller chunks while preserving the exact content.

## Features

- Uses only copy-paste operations to ensure file content integrity
- No generation or modification of content
- Two splitting methods:
  - Split by number of lines
  - Split by file size
- MCP server implementation with easy-to-use tools
- File analysis to recommend the best splitting method

## MCP Server

This package includes an MCP server that exposes the file splitting functionality as tools that can be used by any MCP client like Claude Desktop, VS Code, or other MCP-compatible applications.

### Available Tools

1. **split-by-lines** - Split a file into chunks with a specified number of lines each
2. **split-by-size** - Split a file into chunks with a specified maximum size in MB
3. **analyze-file** - Analyze a file and recommend the best splitting method

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

- Name: Copy-Paste File Splitter
- Command: `node /path/to/copy-paste-mcp/mcp-server.js`
- Transport: stdio

### Using the Tools

Once connected, you can use the tools through your MCP client's interface:

#### Split by Lines

```
Tool: split-by-lines
Parameters:
  - input_file: "/path/to/your/file.txt"
  - output_dir: "output"
  - chunk_size: 1000
  - prefix: "chunk"
```

#### Split by Size

```
Tool: split-by-size
Parameters:
  - input_file: "/path/to/your/file.bin"
  - output_dir: "output"
  - max_size_mb: 10
  - prefix: "chunk"
```

#### Analyze File

```
Tool: analyze-file
Parameters:
  - input_file: "/path/to/your/file.txt"
```

## Python Scripts

The MCP server calls the underlying Python scripts which can also be used directly:

### Split by Lines

```bash
python split.py input_file.txt --output_dir output_dir --chunk_size 1000 --prefix chunk
```

Parameters:
- `input_file`: Path to the file you want to split
- `--output_dir`: Directory to store output files (default: "output")
- `--chunk_size`: Number of lines per output file (default: 1000)
- `--prefix`: Prefix for output files (default: "chunk")

### Split by Size

```bash
python split_by_size.py input_file.txt --output_dir output_dir --max_size_mb 10 --prefix chunk
```

Parameters:
- `input_file`: Path to the file you want to split
- `--output_dir`: Directory to store output files (default: "output")
- `--max_size_mb`: Maximum size of each chunk in MB (default: 10.0)
- `--prefix`: Prefix for output files (default: "chunk")

## Examples

Split a large log file into 1000-line chunks:
```bash
python split.py large_log.txt --chunk_size 1000
```

Split a large binary file into 5MB chunks:
```bash
python split_by_size.py large_binary.bin --max_size_mb 5
```

## Why use this?

This tool is useful when you need to:
- Process large files in smaller chunks
- Split files without risking content modification
- Ensure exact content preservation without any alterations
- Integrate file splitting capabilities into AI workflows via MCP