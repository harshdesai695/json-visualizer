# JSON Visualizer

A modern, interactive JSON visualization tool built with React that helps you understand and explore JSON data structures through both code and visual representations.

## Features

- **Monaco Editor Integration**: Edit JSON with the same powerful editor that powers VS Code
- **Responsive Split View**: Adjustable panes for editor and visualization that work on both desktop and mobile
- **Theme Support**: Toggle between light and dark themes for comfortable viewing
- **Auto-formatting**: Automatically formats your JSON for better readability
- **Real-time Parsing**: Instant validation and visualization as you type

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jsonvisualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter or paste your JSON data in the left pane (editor)
2. The visualization will appear in the right pane
3. Adjust the pane sizes by dragging the divider
4. Toggle between light and dark themes using the button in the editor

## Built With

- **React** - Frontend framework
- **Monaco Editor** - Code editor component
- **React Flow** - For node-based visualizations
- **Create React App** - Project setup and build tooling

## Project Structure

```
jsonvisualizer/
├── src/
│   ├── App.js              # Main application component
│   ├── Home/
│   │   ├── Home.jsx        # Split pane layout
│   │   └── Home.css        # Layout styles
│   └── Editor/
│       ├── MonoEditor.jsx  # Monaco editor wrapper
│       └── MonoEditor.css  # Editor styles
├── package.json
└── README.md
```

## Development

- `npm start` - Run development server
- `npm test` - Run test suite
- `npm run build` - Create production build

## Future Enhancements

- Interactive node-based JSON tree visualization
- Export visualizations as images
- JSON schema validation
- Support for large JSON files
- Shareable visualization links
- Multiple visualization formats (tree, table, graph)


## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.