# JSON Visualizer 🎨

A modern, interactive JSON visualization tool built with React that helps you understand and explore JSON data structures through both code and visual representations.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://visualizerjson.netlify.app/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Monaco Editor](https://img.shields.io/badge/Monaco-Editor-blue)](https://microsoft.github.io/monaco-editor/)

## 🚀 Live Demo

Check out the live application: **[https://visualizerjson.netlify.app/](https://visualizerjson.netlify.app/)**

## ✨ Features

- **Monaco Editor Integration**: Edit JSON with the same powerful editor that powers VS Code
  - Syntax highlighting
  - Auto-completion
  - Error detection
  - Line numbers and code folding

- **Responsive Split View**: Adjustable panes for editor and visualization that work seamlessly on both desktop and mobile devices

- **Theme Support**: Toggle between light and dark themes for comfortable viewing in any environment

- **Auto-formatting**: Automatically formats your JSON for better readability with proper indentation

- **Real-time Parsing**: Instant validation and visualization as you type with helpful error messages

- **Interactive Visualization**: Explore complex JSON structures with an intuitive visual representation

## 🎯 Use Cases

- Debug JSON APIs and responses
- Visualize configuration files
- Learn and understand JSON structure
- Format and validate JSON data
- Share JSON data in a readable format

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn** (v1.22.0 or higher)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshdesai695/json-visualizer.git
   cd json-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📖 Usage

1. **Enter JSON Data**: Type or paste your JSON data in the left pane (Monaco editor)
2. **View Visualization**: The visualization will automatically appear in the right pane
3. **Adjust Layout**: Drag the divider between panes to resize them according to your preference
4. **Switch Themes**: Use the theme toggle button to switch between light and dark modes
5. **Format JSON**: Click the format button to auto-format your JSON with proper indentation
6. **Error Detection**: Invalid JSON will be highlighted with error messages to help you debug

## 🏗️ Project Structure

```
json-visualizer/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   ├── favicon.ico        # Favicon
│   ├── manifest.json      # Web app manifest
│   └── robots.txt         # Robots file
├── src/                   # Source files
│   ├── App.js             # Main application component
│   ├── App.css            # Global application styles
│   ├── App.test.js        # App component tests
│   ├── index.js           # Application entry point
│   ├── index.css          # Global CSS styles
│   ├── Home/              # Home page component
│   │   ├── Home.jsx       # Split pane layout component
│   │   └── Home.css       # Layout styles
│   ├── Editor/            # Editor component
│   │   ├── MonoEditor.jsx # Monaco editor wrapper
│   │   └── MonoEditor.css # Editor-specific styles
│   ├── Visualizer/        # Visualizer component
│   │   ├── Visualizer.jsx # JSON tree visualization component
│   │   └── Visualizer.css # Visualizer styles
│   ├── reportWebVitals.js # Performance monitoring
│   └── setupTests.js      # Test configuration
├── node_modules/          # Dependencies (not in repo)
├── build/                 # Production build (generated)
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🧰 Built With

- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - The code editor that powers VS Code
- **[React Flow](https://reactflow.dev/)** - Library for building node-based visualizations
- **[Create React App](https://create-react-app.dev/)** - Project setup and build tooling

## 🎨 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## 🚀 Deployment

This application is deployed on [Netlify](https://www.netlify.com/). To deploy your own version:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service of choice (Netlify, Vercel, GitHub Pages, etc.)

For Netlify specifically:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

## 🔮 Future Enhancements

- [ ] Interactive node-based JSON tree visualization with expand/collapse
- [ ] Export visualizations as PNG/SVG images
- [ ] JSON schema validation support
- [ ] Support for large JSON files with virtual scrolling
- [ ] Shareable visualization links with URL encoding
- [ ] Multiple visualization formats (tree view, table view, graph view)
- [ ] JSON diff comparison tool
- [ ] Import JSON from URL
- [ ] Search and filter functionality
- [ ] Collapsible JSON paths
- [ ] Copy to clipboard functionality

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Harsh Desai**

- GitHub: [@harshdesai695](https://github.com/harshdesai695)
- Project Link: [https://github.com/harshdesai695/json-visualizer](https://github.com/harshdesai695/json-visualizer)
- Live Demo: [https://visualizerjson.netlify.app/](https://visualizerjson.netlify.app/)

---

<div align="center">
  Made with ❤️ by Harsh Desai
  <br/>
  <br/>
  If you found this project helpful, please consider giving it a ⭐️
</div>