# Contributing Guidelines

Thank you for your interest in contributing to the Vite + Tailwind CSS v4 Starter! This document provides guidelines for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## How to Contribute

### Reporting Bugs

Before creating a bug report:

1. Check existing [GitHub Issues](https://github.com/chetan3460/vite-tailwind-starter/issues)
2. Ensure you're using the latest version
3. Test in a clean environment

**Bug Report Template**:

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome 120, Firefox 110]
- Node version: [e.g., 18.0.0]
- npm version: [e.g., 9.0.0]

**Additional context**
Any other relevant information.
```

### Suggesting Features

Feature requests are welcome! Please:

1. Check if the feature was already suggested
2. Provide clear use cases
3. Explain why it would be valuable
4. Consider implementation details

**Feature Request Template**:

```markdown
**Feature Description**
Clear description of the feature.

**Problem it Solves**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
What alternatives did you consider?

**Additional Context**
Screenshots, mockups, or examples.
```

### Pull Requests

#### Process

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and validations**:
   ```bash
   npm run validate
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create Pull Request**

#### PR Guidelines

- **One feature per PR** - Keep PRs focused
- **Update documentation** - Document new features
- **Add tests** - Include tests for new functionality
- **Follow code style** - Run `npm run lint:fix`
- **Update CHANGELOG** - Add entry under "Unreleased"
- **Keep commits clean** - Use meaningful commit messages

#### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples**:

```bash
feat(accordion): add keyboard navigation support

Added arrow key navigation for accessibility.
Implements WCAG 2.1 keyboard interaction pattern.

Closes #123
```

```bash
fix(dark-mode): persist theme preference

Theme preference now correctly saved to localStorage
and restored on page reload.

Fixes #456
```

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/vite-tailwind-starter.git
cd vite-tailwind-starter

# Add upstream remote
git remote add upstream https://github.com/chetan3460/vite-tailwind-starter.git

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature
```

### Development Workflow

```bash
# Start dev server
npm run dev

# Run tests in watch mode
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run all validations
npm run validate
```

### Keeping Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## Code Style Guidelines

### JavaScript/TypeScript

- Use ES6+ features
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Add JSDoc comments for public APIs
- Follow existing code patterns

**Example**:

```javascript
/**
 * Toggles the accordion panel
 * @param {string} id - Panel ID to toggle
 * @returns {void}
 */
toggle(id) {
  const item = this.getItem(id);
  if (item.active) {
    this.close(id);
  } else {
    this.open(id);
  }
}
```

### CSS

- Use Tailwind utilities first
- Create custom utilities for repeated patterns
- Follow BEM naming for custom components
- Use CSS variables for theming

**Example**:

```css
/* Good */
.component__element--modifier {
  color: var(--color-primary);
}

/* Avoid */
.componentElementModifier {
  color: #6366f1;
}
```

### HTML

- Use semantic HTML5 elements
- Add ARIA attributes for accessibility
- Use meaningful class names
- Include alt text for images

**Example**:

```html
<!-- Good -->
<button aria-expanded="false" aria-controls="menu" class="menu-toggle">
  Menu
</button>

<!-- Avoid -->
<div onclick="toggleMenu()" class="btn">Menu</div>
```

## Testing Guidelines

### Writing Tests

- Test user behavior, not implementation
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

**Example**:

```javascript
describe('Accordion', () => {
  it('should open panel when trigger is clicked', () => {
    // Arrange
    const trigger = screen.getByRole('button');
    const panel = screen.getByRole('region');

    // Act
    trigger.click();

    // Assert
    expect(panel).not.toHaveClass('hidden');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
```

### Test Coverage

- Aim for 80%+ coverage
- Focus on critical paths
- Test edge cases
- Test accessibility features

```bash
# Run tests with coverage
npm run test:coverage
```

## Documentation

### Adding Documentation

- Update README.md for major changes
- Add JSDoc comments for public APIs
- Update relevant docs in `docs/` folder
- Include usage examples

### Documentation Style

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Link to related documentation

## Review Process

### For Contributors

- Respond to review comments
- Update PR based on feedback
  -Make requested changes promptly
- Mark conversations as resolved

### For Reviewers

- Be constructive and respectful
- Explain reasoning for requested changes
- Approve PRs that meet guidelines
- Test changes locally when needed

## Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in relevant documentation

## Questions?

- Check existing documentation
- Ask in [GitHub Discussions](https://github.com/chetan3460/vite-tailwind-starter/discussions)
- Create an issue for clarification

## License

By contributing, you agree that your contributions will be licensed under the project's ISC License.

---

Thank you for contributing to make this project better! 🎉
