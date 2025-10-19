---
inclusion: always
---

# Coding Standards

## File Naming & Structure

- Use **lower_snake_case** for .ts file names (e.g., `main.ts`, `config.ts`, `file_utilities.ts`)
- Use `mod.ts` as the main export file for libraries and components
- Use `.ts` extension for all TypeScript files
- Organize files by component in workspace structure (`frontend/`, `webserver/`,
  `lib/`)

## TypeScript Conventions

- **Always use explicit return types** for functions
- Use **interface** for object type definitions (e.g., `User` interface)
- Export functions and types from `mod.ts` files using `export *` pattern
- Use **const assertions** for configuration constants (e.g., `APP_VERSION`,
  `PORT`)

## Import Patterns

- Use `@workspace/lib` for internal workspace imports
- Use `@std/` prefix for Deno standard library imports
- Use `jsr:` for JSR registry packages
- Group imports: workspace imports first, then standard library, then external
  packages

## Code Style

- Use **camelCase** for variables and functions
- Use **PascalCase** for interfaces and types
- Use **UPPER_SNAKE_CASE** for constants
- Prefer `const` over `let` when values don't change
- Use template literals for string interpolation

## API & Server Conventions

- API endpoints should return JSON with proper `content-type` headers
- Use async/await pattern for request handlers
- Include version and timestamp in API responses where appropriate
- Implement `/health` endpoint for service monitoring

## Error Handling

- Use proper HTTP status codes in responses
- Handle errors gracefully with meaningful error messages
- Use Deno's built-in error types when appropriate

## Documentation

- Include JSDoc comments for exported functions and interfaces
- Use descriptive variable and function names
- Add inline comments for complex logic
