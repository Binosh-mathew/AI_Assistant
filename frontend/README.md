# KTU AI Assistant Frontend

A React TypeScript frontend for the KTU AI Assistant that helps students with academic queries using RAG (Retrieval-Augmented Generation).

## Features

- 🤖 AI-powered assistant for academic queries
- 📚 Document-based knowledge retrieval
- 💨 Fast and responsive UI with Tailwind CSS
- ⌨️ Keyboard shortcuts (Ctrl+Enter to submit)
- 📱 Responsive design for all devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for API communication

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn
- Backend server running on `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Backend Setup

Make sure your backend server is running on `http://localhost:8000`. The frontend expects the following API endpoint:

- `POST /ask` - Send queries to the AI assistant

## Usage

1. Type your academic question in the textarea
2. Click "Ask AI Assistant" or press Ctrl+Enter
3. Wait for the AI response based on your uploaded documents
4. View the response in the dedicated response area

## Example Queries

- "What are the requirements for CST306?"
- "What is the exam pattern for Algorithm Analysis?"
- "Explain the syllabus for Data Structures"
- "What are the university rules for attendance?"
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
