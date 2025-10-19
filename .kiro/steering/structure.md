# Project Structure

## Workspace Organization
This is a Deno workspace with three main components defined in the root `deno.json`:

```
├── frontend/          # Client-side application
├── webserver/         # HTTP server
└── lib/              # Shared utilities and configuration
```

## Component Structure

### Frontend (`frontend/`)
- `index.html` - Main HTML template
- `assets/` - Static assets (images, styles, etc.)
- `dist/` - Built output directory (generated)
- `deno.json` - Frontend-specific configuration and build tasks

### Webserver (`webserver/`)
- `main.ts` - HTTP server with API routes and static file serving
- `deno.json` - Server configuration with development tasks
- Serves frontend dist files and provides `/api` and `/health` endpoints

### Library (`lib/`)
- `mod.ts` - Main export file with utilities and types
- `config.ts` - Shared configuration constants
- `deno.json` - Library configuration
- Exports utilities like `greet()`, `formatDate()`, `capitalize()`, `slugify()`

## Import Conventions
- Use `@workspace/lib` for importing from the shared library
- Use `@std/` prefix for Deno standard library imports
- Use `jsr:` for JSR registry packages
- Each component has its own `deno.json` with specific imports

## File Naming
- Use `.ts` extension for TypeScript files
- Use `mod.ts` for library exports

## Configuration Files
- Root `deno.json` defines workspace and cross-component tasks
- Each component has its own `deno.json` for specific configuration
- Shared constants are centralized in `lib/config.ts`