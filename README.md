# Contrib Aura Farming

A React-based web application that generates beautiful screenshots of your GitHub contributions. Showcase your merged pull requests organized by repository with star counts and descriptions - perfect for LinkedIn, portfolios, and resumes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![Vite](https://img.shields.io/badge/vite-5.3.1-purple.svg)
![Tailwind](https://img.shields.io/badge/tailwindcss-3.4.18-38bdf8.svg)

## ✨ Features

- 📊 **Automatic PR Discovery**: Fetches all your merged pull requests from GitHub API
- ⭐ **Repository Insights**: Displays star counts, descriptions, and contribution details
- 🎨 **Safari-Style UI**: Clean, professional browser mockup design
- 📸 **High-Resolution Export**: Generate 2x resolution PNG screenshots via html2canvas
- 🔐 **Token Support**: Optional Personal Access Token to avoid rate limits
- 🚀 **Smart Pagination**: Automatically fetches up to 500 merged PRs

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/contrib-aura-farming.git
cd contrib-aura-farming

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action.

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```


## 🎯 Usage

1. **Enter GitHub Username**: Type your GitHub username in the input field
2. **Add Token (Optional)**: Paste a GitHub Personal Access Token if you hit rate limits
   - No special scopes needed for public data
   - Generate at: https://github.com/settings/tokens
3. **Click Load**: The app fetches your merged PRs and organizes them by repository

## 📁 Project Structure

```
contrib-aura-farming/
├── src/
│   ├── components/
│   │   ├── GitHubProfileCard.jsx    # User profile display with stats
│   │   └── SafariHeader.jsx          # Browser-style header UI
│   ├── App.jsx                       # Main application logic
│   ├── App.css                       # Component-specific styles
│   ├── index.css                     # Global styles with Tailwind directives
│   └── main.jsx                      # React app entry point
├── public/                           # Static assets
├── index.html                        # HTML template
├── package.json                      # Dependencies and scripts
├── package-lock.json                 # Locked dependency versions
├── vite.config.js                    # Vite bundler configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS plugin setup
├── eslint.config.js                  # ESLint code quality rules
├── .gitignore                        # Git ignore patterns
├── README.md                         # This file
└── CONTRIBUTING.md                   # Contribution guidelines
```

## 🛠️ Technology Stack

### Core Framework
- **React 18.3.1** - UI library with hooks
- **Vite 5.3.1** - Fast build tool and dev server

### Styling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **@tailwindcss/line-clamp 0.4.4** - Text truncation utilities
- **Autoprefixer 10.4.22** - CSS vendor prefixing
- **PostCSS 8.5.6** - CSS transformation tool

### Utilities
- **html2canvas 1.4.1** - Screenshot generation from DOM
- **Lucide React 0.556.0** - Icon components

### Development Tools
- **@vitejs/plugin-react 4.3.1** - React support for Vite
- **ESLint** - Code linting and quality

### APIs
- **GitHub REST API v3** - Fetches user data, PRs, and repository info

## 🔧 Configuration Files

### `vite.config.js`
Configures Vite bundler with React plugin support.

### `tailwind.config.js`
Defines Tailwind CSS content sources and plugins including line-clamp.

### `postcss.config.js`
Configures PostCSS with Tailwind CSS and Autoprefixer plugins.

### `eslint.config.js`
Sets up ESLint rules for React and JSX code quality.

## 📝 Key Files Explained

### `src/App.jsx`
Main application component containing:
- GitHub API integration logic
- PR fetching and aggregation
- Repository details fetching
- Screenshot download functionality
- Error handling and loading states

### `src/components/GitHubProfileCard.jsx`
Displays user profile information:
- Avatar with CORS support for html2canvas
- Username and display name
- Follower/following counts
- Bio and email
- Merged PR count

### `src/components/SafariHeader.jsx`
Safari-style browser chrome:
- macOS traffic light buttons
- URL bar with lock icon
- Clean, minimalist design

### `src/index.css`
Global stylesheet with Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎨 Styling Approach

This project uses **Tailwind CSS** utility classes for styling:

- **No custom CSS classes** - All styling done via Tailwind utilities
- **Responsive design** - Mobile-first approach with breakpoints
- **Consistent spacing** - Uses Tailwind's spacing scale
- **Component composition** - Reusable component patterns

Example:
```jsx
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-md">
  {/* Content */}
</div>
```

## 🔒 Environment Variables

No environment variables required. GitHub Personal Access Tokens are entered directly in the UI (not stored).

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code of conduct
- Development workflow
- Coding standards
- Pull request process
- Testing guidelines

Quick contribution steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub API** - For providing comprehensive contribution data
- **React Team** - For the excellent UI library
- **Vite Team** - For the blazing-fast build tool
- **Tailwind Labs** - For the utility-first CSS framework
- **html2canvas** - For DOM-to-canvas screenshot capability

## 🗺️ Roadmap

- [ ] Dark mode theme toggle
- [ ] Export to PDF format
- [ ] Multiple screenshot layout templates
- [ ] Contribution statistics dashboard
- [ ] Private repository support (with OAuth)
- [ ] Team/organization contribution views
- [ ] Historical data tracking and trends
- [ ] GitLab and Bitbucket integration

## 📊 Project Stats

- **Language**: JavaScript (JSX)
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Package Manager**: npm

---

**Made with ❤️ by the open-source community**

Star ⭐ this repository if you find it helpful!
