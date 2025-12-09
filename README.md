# Contrib Aura Farming

A React-based web application that generates beautiful screenshots of your GitHub contributions. Showcase your merged pull requests organized by repository with star counts and descriptions - perfect for LinkedIn, portfolios, and resumes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![Vite](https://img.shields.io/badge/vite-5.3.1-purple.svg)
![Tailwind](https://img.shields.io/badge/tailwindcss-3.4.18-38bdf8.svg)

## ✨ Features

### Core Features
- 📊 **Automatic PR Discovery**: Fetches all your merged pull requests from GitHub API
- ⭐ **Repository Insights**: Displays star counts, descriptions, and contribution details
- 🎨 **Safari-Style UI**: Clean, professional browser mockup design
- 📸 **High-Resolution Export**: Generate 2x resolution PNG screenshots via html2canvas
- 🔐 **Token Support**: Optional Personal Access Token to avoid rate limits
- 🚀 **Smart Pagination**: Automatically fetches up to 500 merged PRs

### New Modular Features
- 🧩 **Component Toggle System**: Show/hide individual components in your screenshot
- 📅 **Contribution Heatmap**: GitHub-style contribution calendar with year selection
- 🏆 **Top Repos Summary**: Compact card showing your top 5 repos by stars
- 🎯 **Layout Presets**: Quick-select common layout combinations
- 🎨 **8 Beautiful Themes**: Classic, Midnight, Sunset, Violet, Ocean, Forest, Dark, Neon
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

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

### Basic Usage

1. **Enter GitHub Username**: Type your GitHub username in the input field
2. **Add Token (Optional)**: Paste a GitHub Personal Access Token if you hit rate limits
   - For contribution heatmap, token needs `read:user` scope
   - Generate at: https://github.com/settings/tokens
3. **Click Load**: The app fetches your merged PRs and organizes them by repository

### Component Toggles

Use the **Layout & Features** panel to customize what appears in your screenshot:

- **GitHub Profile**: Shows avatar, name, followers, bio, and merged PR count
- **Contribution Heatmap**: GitHub-style contribution graph with year selector
- **Merged PRs Grid**: Full grid of repositories with PR details
- **Top Repos Summary**: Compact cards showing top 5 repos by stars

### Layout Presets

Quick-select common layouts:

- **Profile + Heatmap**: Great for showing activity overview
- **Profile + Top Repos**: Highlight your best contributions
- **Profile + PR Grid**: Detailed view of all contributions
- **Heatmap Only**: Focus on contribution patterns
- **All Components**: Show everything

### Theme Selection

Choose from 8 professionally designed themes:

- **Classic**: Clean white background, perfect for professional use
- **Midnight**: Dark slate theme with cyan accents
- **Sunset**: Warm orange-to-pink gradient
- **Violet Dreams**: Purple and fuchsia gradient
- **Ocean Breeze**: Cool blue and cyan tones
- **Forest**: Green and emerald nature theme
- **Dark Mode**: Pure dark theme with indigo accents
- **Neon Glow**: Cyberpunk-inspired with glowing effects

## 📁 Project Structure

```
contrib-aura-farming/
├── src/
│   ├── components/
│   │   ├── GitHubProfileCard.jsx         # User profile with stats
│   │   ├── SafariHeader.jsx              # Browser-style header
│   │   ├── MergedPRsGrid.jsx             # Repository grid with PRs
│   │   ├── TopMergedReposSummary.jsx     # Top 5 repos cards
│   │   ├── ContributionHeatmap.jsx       # GitHub-style heatmap
│   │   ├── LayoutTogglePanel.jsx         # Component toggle controls
│   │   └── ThemeSelector.jsx             # Theme selection dropdown
│   ├── constants/
│   │   └── themes.js                     # Theme definitions
│   ├── App.jsx                           # Main application logic
│   ├── App.css                           # Component-specific styles
│   ├── index.css                         # Global styles with Tailwind
│   └── main.jsx                          # React app entry point
├── public/                               # Static assets
├── index.html                            # HTML template
├── package.json                          # Dependencies and scripts
├── package-lock.json                     # Locked dependency versions
├── vite.config.js                        # Vite bundler configuration
├── tailwind.config.js                    # Tailwind CSS configuration
├── postcss.config.js                     # PostCSS plugin setup
├── eslint.config.js                      # ESLint code quality rules
├── .gitignore                            # Git ignore patterns
├── README.md                             # This file
└── CONTRIBUTING.md                       # Contribution guidelines
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
- **GitHub GraphQL API v4** - Fetches contribution calendar data

## 🔧 Configuration Files

### `vite.config.js`
Configures Vite bundler with React plugin support.

### `tailwind.config.js`
Defines Tailwind CSS content sources and plugins including line-clamp.

### `postcss.config.js`
Configures PostCSS with Tailwind CSS and Autoprefixer plugins.

### `eslint.config.js`
Sets up ESLint rules for React and JSX code quality.

## 📝 Key Components Explained

### `src/App.jsx`
Main application component containing:
- GitHub API integration logic
- PR fetching and aggregation
- Repository details fetching
- Screenshot download functionality
- Component toggle state management
- Error handling and loading states

### `src/components/GitHubProfileCard.jsx`
Displays user profile information:
- Avatar with CORS support for html2canvas
- Username and display name
- Follower/following counts
- Bio with 2-line clamp
- Email if available
- Merged PR count badge

### `src/components/MergedPRsGrid.jsx`
Repository grid component:
- Full repository name with owner
- Repository description
- Star count with visual indicator
- List of merged PRs (up to 5 shown)
- Links to GitHub

### `src/components/TopMergedReposSummary.jsx`
Compact summary cards:
- Top 5 repositories by star count
- Repository name and owner
- Star count
- Merged PR count
- Responsive grid layout

### `src/components/ContributionHeatmap.jsx`
GitHub-style contribution calendar:
- Fetches data via GitHub GraphQL API
- Year selector (last 5 years)
- Color-coded contribution intensity
- Total contribution count
- Responsive week-by-week grid

### `src/components/LayoutTogglePanel.jsx`
Component visibility controls:
- Individual component toggles
- Quick preset buttons
- Collapsible panel design
- Selected count indicator

### `src/components/ThemeSelector.jsx`
Theme selection dropdown:
- All 8 themes listed
- Current theme indicator
- Hover states
- Clean dropdown UI

### `src/components/SafariHeader.jsx`
Safari-style browser chrome:
- macOS traffic light buttons
- URL bar with lock icon
- Theme-aware styling
- Clean, minimalist design

### `src/constants/themes.js`
Centralized theme definitions:
- 8 complete theme configurations
- Background, text, border, accent colors
- Shadow styles
- Header styles

## 🎨 Styling Approach

This project uses **Tailwind CSS** utility classes for styling:

- **No custom CSS classes** - All styling done via Tailwind utilities
- **Responsive design** - Mobile-first approach with breakpoints
- **Consistent spacing** - Uses Tailwind's spacing scale
- **Component composition** - Reusable component patterns
- **Theme system** - Centralized color schemes

Example:
```jsx
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-md">
  {/* Content */}
</div>
```

## 🔒 Environment Variables & Security

No environment variables required. GitHub Personal Access Tokens are:
- Entered directly in the UI
- **Never stored** in localStorage or cookies
- **Never logged** to console
- Used only for API requests
- Passed via Authorization header

### Token Scopes

For full functionality:
- **Public data**: No token required (subject to rate limits)
- **Contribution heatmap**: Token with `read:user` scope recommended
- **Private repos**: Token with `repo` scope (future feature)

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

### Completed ✅
- [x] Modular component system with toggles
- [x] Contribution heatmap with year selection
- [x] Top repos summary component
- [x] Layout preset system
- [x] 8 beautiful themes
- [x] Responsive design

### In Progress 🚧
- [ ] PDF export format
- [ ] Multiple screenshot layout templates
- [ ] Contribution statistics dashboard

### Future Features 🔮
- [ ] Private repository support (with OAuth)
- [ ] Team/organization contribution views
- [ ] Historical data tracking and trends
- [ ] GitLab and Bitbucket integration
- [ ] Custom date range filtering
- [ ] Drag-and-drop component reordering
- [ ] Save/load configuration presets
- [ ] Social media share integration

## 📊 Project Stats

- **Language**: JavaScript (JSX)
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Package Manager**: npm
- **Components**: 8 modular components
- **Themes**: 8 professional themes
- **Layout Presets**: 5 quick presets

## 💡 Tips & Tricks

### For Best Screenshot Quality
1. Use 2x scale (default) for high-resolution output
2. Choose themes with good contrast for readability
3. Enable only components you need to reduce clutter
4. For LinkedIn: Aim for 1200×630 or higher resolution

### For Contribution Heatmap
1. Use a GitHub token for reliable data fetching
2. Token needs `read:user` scope minimum
3. Select different years to show activity trends
4. Works best with Classic, Midnight, or Dark themes

### For Performance
1. Limit to top 500 PRs for faster loading
2. Use token to avoid rate limiting
3. Components only render when toggled on
4. Screenshot generation optimized with CORS

---

**Made with ❤️ by the open-source community**

Star ⭐ this repository if you find it helpful!
