---
inclusion: fileMatch
fileMatchPattern: ["frontend/**/*.html", "frontend/**/*.ts", "frontend/**/*.js"]
---

# Frontend UI Guidelines

## CSS Framework

Use **W3.CSS** as the primary CSS framework for all UI components. The framework
is available at `frontend/assets/w3.css` with examples in
`frontend/assets/w3_example.html`.

## Core W3.CSS Classes

### Layout & Containers

- `w3-container` - Standard content container with padding
- `w3-panel` - Content panel with borders and spacing
- `w3-margin` - Apply standard margins to body or elements

### Buttons & Interactive Elements

- `w3-button` - Base button class
- `w3-btn` - Alternative button class with hover effects
- Color classes: `w3-red`, `w3-blue`, `w3-green`, `w3-purple`, etc.
- State classes: `w3-disabled`, `w3-hover-*`

### Tables & Data Display

- `w3-table-all` - Complete table styling with borders
- `w3-striped` - Alternating row colors
- `w3-hoverable` - Row hover effects
- `w3-centered` - Center-align table content

### Forms & Inputs

- `w3-input` - Standard input field styling
- `w3-select` - Dropdown select styling
- `w3-border` - Add borders to form elements

## Color Scheme

Use W3.CSS color classes consistently:

- **Primary**: `w3-blue` for headers and primary actions
- **Success**: `w3-green` for positive actions and table headers
- **Warning**: `w3-amber` or `w3-orange` for warnings
- **Error**: `w3-red` for errors and destructive actions
- **Neutral**: `w3-grey` or `w3-light-grey` for secondary elements

## Layout Patterns

- Always use `w3-margin` on the body element for consistent spacing
- Use `w3-container` for main content sections
- Apply color classes to containers for visual hierarchy
- Use `w3-margin-top` for spacing between sections

## JavaScript Integration

- Maintain W3.CSS class names when dynamically creating elements
- Use W3.CSS state classes for interactive feedback
- Follow existing patterns in `frontend/index.html` for API integration
