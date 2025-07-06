# Code Formatting Setup

This project uses **Prettier** for consistent code formatting across JavaScript, SCSS, and other supported file types.

## Available Scripts

### Formatting Commands

- `npm run format` - Format all supported files in the project
- `npm run format:check` - Check if files are properly formatted (without modifying them)
- `npm run format:js` - Format only JavaScript files in the `src/` directory
- `npm run format:scss` - Format only SCSS files in the `src/` directory

## Configuration Files

### Prettier Configuration (`.prettierrc`)

- **Semi-colons**: Required
- **Quotes**: Single quotes preferred
- **Trailing commas**: ES5 compatible
- **Tab width**: 2 spaces
- **Print width**: 80 characters
- **Arrow function parens**: Avoid when possible

### Prettier Ignore (`.prettierignore`)

The following files/directories are excluded from formatting:

- `node_modules/`
- `dist/`
- Minified files (`*.min.js`, `*.min.css`)
- Image and font files
- Generated files

### EditorConfig (`.editorconfig`)

Ensures consistent editor settings across different IDEs:

- 2 space indentation for JS, CSS, SCSS, HTML, JSON, YAML, MD
- 4 space indentation for PHP files
- UTF-8 encoding
- LF line endings
- Trim trailing whitespace

## VS Code Integration

### Settings (`.vscode/settings.json`)

- **Format on save**: Enabled
- **Default formatter**: Prettier
- **SCSS support**: Configured

### Recommended Extensions (`.vscode/extensions.json`)

- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Sass/SCSS support
- Auto Rename Tag
- Live Server

## Usage

### Automatic Formatting (VS Code)

Files will be automatically formatted when you save them if you have the Prettier extension installed.

### Manual Formatting

```bash
# Format all files
npm run format

# Format only JavaScript files
npm run format:js

# Format only SCSS files
npm run format:scss

# Check formatting without modifying files
npm run format:check
```

## Best Practices

1. **Run formatting before committing**: Always format your code before committing changes
2. **Use VS Code extensions**: Install the recommended extensions for the best development experience
3. **Respect .prettierignore**: Don't modify files listed in `.prettierignore`
4. **Consistent formatting**: Let Prettier handle all formatting decisions to maintain consistency

## Troubleshooting

### HTML Files Not Formatting

Some HTML files may have syntax errors that prevent Prettier from formatting them. Fix the HTML syntax first, then run formatting.

### Files Not Being Formatted

1. Check if the file extension is supported by Prettier
2. Verify the file isn't listed in `.prettierignore`
3. Ensure you have the Prettier VS Code extension installed and enabled
