# Technology Stack

## Runtime & Build System
- **Deno**: Primary runtime and build system
- **TypeScript**: Main programming language
- **JSR (JavaScript Registry)**: Package management via `jsr:` imports

## Key Dependencies
- `@std/http`: HTTP server and file serving utilities
- `@std/assert`: Testing assertions
- Workspace-internal imports using `@workspace/` prefix

## Development Commands

### Root Level Commands
```bash
# Development
deno task dev              # Run main.ts with watch mode
deno task dev:frontend     # Start frontend development server
deno task dev:webserver    # Start webserver in development mode

# Building
deno task build:frontend   # Build frontend for production

# Testing
deno task test             # Run root-level tests
deno task test:all         # Run all workspace tests
```

### Component-Specific Commands
```bash
# Frontend
cd frontend
deno task build            # Clean, copy assets, and bundle
deno task dev              # Development server
deno task test             # Run frontend tests

# Webserver
cd webserver
deno task dev              # Development server with file watching
deno task start            # Production server
deno task test             # Run webserver tests

# Library
cd lib
deno task test             # Run library tests
```

## Permissions
- `--allow-net`: Required for HTTP server functionality
- `--allow-read`: Required for serving static files
- `--allow-all`: Used for comprehensive testing

## Build Process
Frontend build pipeline: clean dist → copy assets → bundle files