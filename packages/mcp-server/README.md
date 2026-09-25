# Sendblue API TypeScript MCP Server

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export SENDBLUE_API_API_KEY="My API Key"
export SENDBLUE_API_API_SECRET="My API Secret"
npx -y sendblue-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "sendblue_api": {
      "command": "npx",
      "args": ["-y", "sendblue-mcp"],
      "env": {
        "SENDBLUE_API_API_KEY": "My API Key",
        "SENDBLUE_API_API_SECRET": "My API Secret"
      }
    }
  }
}
```

The server runs on your machine and talks to the Sendblue API directly. The code tool needs
[Deno](https://deno.land) installed (see "Where code runs" below).

### Cursor

Add the configuration JSON above to Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

### VS Code

Add the server to VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration:

```json
{
  "servers": {
    "sendblue_api": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "sendblue-mcp"],
      "env": {
        "SENDBLUE_API_API_KEY": "My API Key",
        "SENDBLUE_API_API_SECRET": "My API Secret"
      }
    }
  }
}
```

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal:

```
claude mcp add sendblue_mcp_api -e SENDBLUE_API_API_KEY="My API Key" -e SENDBLUE_API_API_SECRET="My API Secret" -- npx -y sendblue-mcp
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in a
sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code is executed in a sandbox whose filesystem and network access are restricted to
  what the SDK needs (see "Where code runs" below). Then, anything the code returns or
  prints will be returned to the agent as the result of the tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

### Where code runs

The code tool runs each call in a Deno subprocess on the same machine as the MCP server,
restricted to reading the server's own files and to making network requests to your API host.
Nothing is sent to Stainless. Deno must be installed: install it from https://deno.land, or add
it to the MCP server's dependencies with `npm install deno`. Without Deno the code tool returns
an error asking you to install it; the docs search tool keeps working.

Known issue: the code runner starts with Deno 2.7 and 2.8, but Deno 2.9 and later refuse the
runner's local socket without an extra network permission, so the code tool fails with "Deno
exited before being ready". Use Deno 2.8 until this is fixed.

`--code-execution-mode=local` is the default and the only mode. The Stainless-hosted sandbox
(`--code-execution-mode=stainless-sandbox`) has been removed: passing it logs a warning and runs
the code locally. Likewise, docs search always uses the index bundled with the server, and
`--docs-search-mode=stainless-api` falls back to it with a warning.

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------- | ------------------------ | --------------- |
| `sb-api-key-id` | `apiKey` | ApiKeyAuth |
| `sb-api-secret-key` | `apiSecret` | ApiSecretAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "sendblue_api": {
      "url": "http://localhost:3000",
      "headers": {
        "sb-api-key-id": "My API Key"
      }
    }
  }
}
```
