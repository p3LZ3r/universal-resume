# Universal Resume - Agent Guidelines

This document provides coding standards and commands for AI agents working on this static resume website project.

## Build/Lint/Test Commands

### Development
- `npm run serve` - Start development server with live reload (watches CSS changes)
- `npm run build` - Generate production CSS with PostCSS and PurgeCSS optimization

### No Testing Framework
This project doesn't have unit tests. Manual testing is done by:
- Running `npm run serve` and checking the website in browser
- Testing print functionality (Right-click → Print in Chrome)
- Verifying mobile responsiveness

### No Linting
No linting tools are configured. Code style is maintained through:
- Manual code review
- Following established patterns in existing files

## Code Style Guidelines

### HTML Structure
- Use semantic HTML5 elements
- Include `data-i18n` attributes for internationalizable text
- Use `data-i18n-attr` for meta tag attributes
- Follow existing class naming patterns with Tailwind CSS
- Maintain print-friendly structure with `break-inside-avoid` classes

### CSS/Tailwind Guidelines
- Use Tailwind CSS utility classes primarily
- Custom CSS should be added to `tailwind.css` when needed
- Follow the established color palette (gray-150, gray-550, etc.)
- Maintain responsive design with mobile-first approach
- Ensure print compatibility with `@media print` styles
- Use custom utilities from `tailwind.config.js` for typography and layout

### JavaScript Standards
- Use modern ES6+ syntax (const/let, arrow functions, template literals)
- Follow IIFE pattern for encapsulation (like in `i18n.js`)
- Include JSDoc comments for all functions
- Use descriptive variable names with camelCase
- Implement error handling with try/catch blocks
- Follow functional programming patterns where appropriate
- Maintain DOM manipulation best practices

### File Organization
- Keep source files in root directory (`tailwind.css`, `tailwind.config.js`, etc.)
- Build output goes to `docs/` directory
- Static assets (images, fonts) belong in `docs/` subdirectories
- Translation files go in `docs/locales/` as JSON
- JavaScript files go in `docs/js/`

### Internationalization (i18n)
- Use the established i18n system in `docs/js/i18n.js`
- Add new translations to `docs/locales/en.json` and `docs/locales/de.json`
- Use `data-i18n="key.path"` for text content
- Use `data-i18n-attr="attributeName"` for HTML attributes
- Follow existing key naming conventions (dot notation)

### Git Workflow
- Build artifacts in `docs/` are committed to repository
- Use descriptive commit messages
- Follow existing branch naming conventions

### Performance Considerations
- Use CSS purging to minimize bundle size
- Preload critical fonts in HTML head
- Optimize images and use appropriate formats
- Minimize JavaScript bundle size

### Browser Support
- Target modern browsers (Chrome, Firefox, Safari, Edge)
- Ensure print compatibility across browsers
- Test mobile responsiveness on various screen sizes

## Project-Specific Patterns

### Typography
- Use FiraGO font family with proper fallbacks
- Apply `hyphens-manual` for better text flow
- Use established font size classes (sm2, md, lg)

### Layout
- Use CSS multi-column layout for desktop
- Implement `break-inside-avoid` for content sections
- Follow established spacing scale (custom values like 2.1, 3.2, 4.5)

### Print Optimization
- Design for both Letter and A4 paper sizes
- Use print-specific CSS rules
- Ensure single-page layout for PDF generation

## Security Notes
- This is a static HTML site - no server-side processing
- All content is public-facing
- No authentication or user data handling required