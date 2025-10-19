# Product Overview

**deno-web-ui** is a simple web application built with Deno that combines a web server and frontend UI.

## Key Features
- Web server with API endpoints (`/api`, `/health`)
- Frontend UI served from static files
- Shared library for common utilities and configuration
- Development and production build workflows

## Architecture
The application follows a monorepo structure with three main components:
- **webserver**: HTTP server that serves API endpoints and static frontend files
- **frontend**: Client-side application with bundled assets
- **lib**: Shared utilities, configuration, and types used across components

The webserver serves the frontend's built assets and provides API endpoints for dynamic functionality.