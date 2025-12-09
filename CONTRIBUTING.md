# Contributing to GitHub Contributions Screenshot Generator

First off, thank you for considering contributing to this project! It's people like you that make open source such a great community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Feature Requests](#feature-requests)
- [Bug Reports](#bug-reports)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code:

- **Be respectful**: Treat everyone with respect. Harassment and exclusionary behavior aren't acceptable.
- **Be collaborative**: Work together towards the common goal of improving the project.
- **Be patient**: Remember that people come from different backgrounds and skill levels.
- **Be constructive**: Provide constructive feedback and be open to receiving it.
- **Be welcoming**: Welcome newcomers and help them get started.

## 🎯 How Can I Contribute?

There are many ways you can contribute to this project:

### 1. Report Bugs 🐛

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or screen recordings (if applicable)
- Your environment (OS, browser, Node version)

### 2. Suggest Features 💡

Have an idea for a new feature? Open an issue with:
- A clear description of the feature
- Why this feature would be useful
- Any implementation ideas you might have
- Mockups or examples (if applicable)

### 3. Improve Documentation 📝

Documentation improvements are always welcome:
- Fix typos or grammatical errors
- Add missing information
- Improve clarity of existing documentation
- Add code examples
- Translate documentation

### 4. Submit Code Changes 💻

Whether it's fixing bugs, adding features, or improving performance, code contributions are highly valued.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git installed on your machine
- A GitHub account
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/contrib-aura-farming.git
   cd contrib-aura-farming
   ```

3. **Add the upstream repository** as a remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/contrib-aura-farming.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:5173`

## 🔄 Development Workflow

### 1. Create a New Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/feature-name` - For new features
- `fix/bug-description` - For bug fixes
- `docs/what-changed` - For documentation updates
- `refactor/what-changed` - For code refactoring
- `style/what-changed` - For styling changes
- `test/what-added` - For adding tests

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style and patterns
- Add comments for complex logic
- Keep commits focused and atomic
- Test your changes thoroughly

### 3. Keep Your Branch Updated

Regularly sync your branch with the upstream repository:

```bash
git fetch upstream
git rebase upstream/main
```

### 4. Commit Your Changes

Follow our commit message guidelines (see below):

```bash
git add .
git commit -m "feat: add dark mode toggle"
```

### 5. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 6. Open a Pull Request

- Go to the original repository on GitHub
- Click "New Pull Request"
- Select your fork and branch
- Fill out the PR template completely
- Link any related issues
- Request reviews from maintainers

## 📏 Coding Standards

### JavaScript/React Style Guide

#### General Principles
- Use functional components with React hooks
- Keep components small and focused (single responsibility)
- Use meaningful variable and function names
- Prefer `const` over `let`, avoid `var`
- Use template literals for string concatenation

#### Component Structure
```jsx
import React, { useState, useEffect } from "react";
import { Icon } from "lucide-react";

/**
 * Component description
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 */
export default function MyComponent({ title, children }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Effect logic
  }, []);

  const handleClick = () => {
    // Handler logic
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

#### Naming Conventions
- **Components**: PascalCase (`UserProfile.jsx`)
- **Functions**: camelCase (`fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case in files, but use Tailwind utilities

#### React Best Practices
- Destructure props in function parameters
- Use prop-types or TypeScript for type checking (if available)
- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback` when needed
- Use custom hooks for reusable logic

#### Error Handling
```javascript
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error("Error fetching data:", error);
  setError(error.message || "An error occurred");
}
```

### Tailwind CSS Guidelines

- Use Tailwind utility classes for styling
- Keep custom CSS to a minimum
- Follow mobile-first responsive design
- Use consistent spacing scale (4px increments)
- Group related utilities logically

Example:
```jsx
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-md">
  <img src={url} alt={alt} className="w-12 h-12 rounded-full" />
  <div className="flex-1">
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
</div>
```

### File Organization

```
src/
├── components/        # Reusable UI components
│   ├── common/       # Generic components (Button, Card, etc.)
│   └── features/     # Feature-specific components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── services/         # API services
├── constants/        # Constants and configuration
└── styles/           # Global styles
```

## ✍️ Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (whitespace, formatting)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
# Good commit messages
feat: add dark mode toggle to header
fix: resolve API rate limit error handling
docs: update installation instructions in README
refactor: simplify PR aggregation logic
perf: optimize image loading with lazy loading

# With scope
feat(profile): add user follower count display
fix(api): handle 404 errors gracefully

# With body and footer
feat: add export to PDF functionality

Implements PDF export using jsPDF library.
Users can now export their contribution screenshot directly to PDF.

Closes #123
```

## 🔍 Pull Request Process

### Before Submitting

1. ✅ Update documentation if needed
2. ✅ Add tests for new features
3. ✅ Ensure all tests pass: `npm run build`
4. ✅ Check for console errors
5. ✅ Test on different browsers/screen sizes
6. ✅ Update the README if needed
7. ✅ Add yourself to CONTRIBUTORS.md

### PR Template

When opening a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on multiple browsers

## Related Issues
Closes #(issue number)
```

### Review Process

1. At least one maintainer will review your PR
2. Address any feedback or requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test the following:

#### Basic Functionality
- [ ] App loads without errors
- [ ] Can enter username and fetch data
- [ ] Profile card displays correctly
- [ ] Repository list renders properly
- [ ] Star counts are accurate
- [ ] PR links work correctly

#### Error Handling
- [ ] Invalid username shows appropriate error
- [ ] Rate limit error displays helpful message
- [ ] Network errors are caught and displayed
- [ ] Empty results show appropriate message

#### UI/UX
- [ ] Responsive on mobile (375px width)
- [ ] Responsive on tablet (768px width)
- [ ] Responsive on desktop (1920px width)
- [ ] Loading states display correctly
- [ ] No layout shifts during loading
- [ ] Images load properly with CORS

#### Screenshot Feature
- [ ] Screenshot captures full content
- [ ] Image quality is high (2x resolution)
- [ ] Download filename is correct
- [ ] Safari header renders correctly

### Browser Testing

Test on at least two of these browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## 💡 Feature Requests

### High Priority Features

We're particularly interested in contributions for:

**User Experience:**
- Dark mode toggle
- Customizable color themes
- Layout templates/presets
- Drag-and-drop to reorder repos

**Functionality:**
- Date range filtering
- Multiple layout options
- Private repository support
- Export to different formats (PDF, SVG)

**Data & Analytics:**
- Contribution statistics dashboard
- Time-based contribution graphs
- Language breakdown
- Contribution streaks

**Integration:**
- GitLab support
- Bitbucket support
- Save/load configurations
- Share generated screenshots

### Proposing New Features

When proposing a new feature:

1. **Check existing issues** to avoid duplicates
2. **Open a new issue** with the `enhancement` label
3. **Describe the feature** in detail
4. **Explain the use case** and benefits
5. **Provide mockups** if possible
6. **Discuss implementation** approach

## 🐛 Bug Reports

### What Makes a Good Bug Report?

A good bug report should include:

1. **Clear title**: Summarize the issue in one line
2. **Description**: Detailed explanation of the problem
3. **Steps to reproduce**: Step-by-step instructions
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happens
6. **Screenshots**: Visual evidence of the bug
7. **Environment**: OS, browser, Node version, etc.
8. **Additional context**: Any other relevant information

### Bug Report Template

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
Add screenshots if applicable.

**Environment**
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Node Version: [e.g., 18.17.0]
- npm Version: [e.g., 9.6.7]

**Additional Context**
Any other information about the problem.
```

## 🎓 Learning Resources

New to React or open source? Check out these resources:

### React
- [React Official Documentation](https://react.dev/)
- [React Hooks Guide](https://react.dev/reference/react)
- [Thinking in React](https://react.dev/learn/thinking-in-react)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### Git & GitHub
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

### JavaScript
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)


## 🙏 Thank You!

Your contributions make this project better for everyone. Whether you're fixing typos, adding features, or improving documentation, every contribution matters.

Happy coding! 🚀
