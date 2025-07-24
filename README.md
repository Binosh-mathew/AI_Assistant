# 🎓 KTU AI Assistant

A modern, full-stack Retrieval-Augmented Generation (RAG) system for Kerala Technological University (KTU) academic queries. This intelligent assistant helps students get accurate answers about syllabus, notes, rules, and academic guidelines using uploaded PDF documents.

## 🏗️ Architecture

```
KTU AI Assistant
├── 🔧 Backend (FastAPI + LangChain + Ollama)
├── 🎨 Frontend (React + TypeScript + Tailwind)
├── 🤖 AI Model (Llama3 via Ollama)
└── 📊 Vector DB (ChromaDB)
```

## � Project Structure

```
KTU_AI_Assistant/
├── 📂 backend/                    # FastAPI Backend
│   ├── 📂 app/                    # Application logic
│   │   ├── main.py                # FastAPI app & routes
│   │   ├── rag_service.py         # RAG implementation
│   │   ├── config.py              # Configuration settings
│   │   └── __init__.py            # Package initialization
│   ├── 📂 data/                   # Data storage
│   │   ├── docs/                  # PDF documents
│   │   └── vector_db/             # ChromaDB storage
│   ├── 📂 static/                 # Static files
│   ├── 📂 venv/                   # Python virtual environment
│   ├── server.py                  # Main server entry point
│   └── requirements.txt           # Python dependencies
├── 📂 frontend/                   # React Frontend
│   ├── 📂 src/                    # Source code
│   │   ├── App.tsx                # Main React component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Tailwind styles
│   ├── 📂 public/                 # Public assets
│   ├── package.json               # Node.js dependencies
│   ├── tailwind.config.js         # Tailwind configuration
│   └── vite.config.ts             # Vite configuration
├── 📂 scripts/                    # Utility scripts
│   ├── setup.bat                  # Initial setup script
│   └── start_servers.bat          # Start both servers
├── 📄 README.md                   # This file
├── 📄 .env                        # Environment variables
└── 📄 .gitignore                  # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 20.19.0+** with npm
- **Ollama** installed and running
- **Git** (optional, for cloning)

### 🔧 One-Command Setup

```bash
# Clone the repository (if needed)
git clone <repository-url>
cd KTU_AI_Assistant

# Run the complete setup
scripts\setup.bat
```

### 🎯 Start the Application

```bash
# Start both backend and frontend servers
scripts\start_servers.bat
```

**That's it!** 🎉 Your KTU AI Assistant will be running at:
- 🌐 **Frontend**: http://localhost:5173
- ⚙️ **Backend**: http://localhost:8000
- 📖 **API Docs**: http://localhost:8000/docs

## 💡 Manual Setup (Advanced)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server**:
   ```bash
   python server.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

### Ollama Setup

1. **Download and install** from https://ollama.com/download
2. **Pull the Llama3 model**:
   ```bash
   ollama pull llama3
   ```
3. **Start Ollama** (usually starts automatically)

## � Usage Examples

Once both servers are running, you can ask questions like:

- 💼 **Course Information**: "What are the requirements for CST306?"
- 📋 **Exam Patterns**: "What is the exam pattern for Algorithm Analysis?"
- 📖 **Syllabus Details**: "Explain the syllabus for Data Structures"
- 📏 **University Rules**: "What are the attendance requirements?"
- 🎯 **Learning Outcomes**: "What will I learn in this course?"

## 🔧 Features

### 🔥 Backend Features
- ✅ **RESTful API** with FastAPI
- ✅ **Document Processing** (PDF → chunks → embeddings)
- ✅ **Vector Search** with ChromaDB
- ✅ **AI Integration** with Ollama/Llama3
- ✅ **Async Processing** for better performance
- ✅ **Health Checks** and error handling
- ✅ **CORS Support** for frontend communication
- ✅ **Auto-documentation** with Swagger UI

### 🎨 Frontend Features
- ✅ **Modern React 18** with TypeScript
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Real-time Queries** with loading states
- ✅ **Error Handling** with user-friendly messages
- ✅ **Keyboard Shortcuts** (Ctrl+Enter to submit)
- ✅ **Professional UI** with gradient backgrounds
- ✅ **Accessibility** features built-in

## 🛠️ Development

### Adding New Documents
1. Place PDF files in `backend/data/docs/`
2. Restart the backend server
3. Documents will be automatically processed

### Configuration
Edit `backend/app/config.py` to customize:
- Ollama model and URL
- Chunk size and overlap
- File paths
- CORS origins

### Environment Variables
Create a `.env` file in the root directory:
```env
OLLAMA_BASE_URL=http://localhost:11434
MODEL_NAME=llama3
DOCS_PATH=./backend/data/docs
VECTOR_DB_PATH=./backend/data/vector_db
```

## 🚨 Troubleshooting

### Common Issues

**❌ Backend fails to start**
- ✅ Ensure Python virtual environment is activated
- ✅ Check if all dependencies are installed
- ✅ Verify Ollama is running

**❌ Frontend shows CORS errors**
- ✅ Ensure backend is running on port 8000
- ✅ Check CORS configuration in `config.py`

**❌ No AI responses**
- ✅ Verify Ollama is running: `ollama list`
- ✅ Check if Llama3 model is installed: `ollama pull llama3`
- ✅ Ensure documents are in `backend/data/docs/`

**❌ Slow responses**
- ✅ Local LLM inference can be slow
- ✅ Consider using a GPU for faster processing
- ✅ Reduce chunk size in configuration

### Getting Help

1. **Check the logs** in the terminal windows
2. **Visit API docs** at http://localhost:8000/docs
3. **Verify health** at http://localhost:8000/health
4. **Check GitHub issues** for known problems

## 🎯 Performance Tips

- **📊 Hardware**: 8GB+ RAM recommended for smooth operation
- **⚡ GPU**: NVIDIA GPU significantly speeds up inference
- **📁 Documents**: Keep PDFs under 50MB for faster processing
- **🔄 Chunks**: Adjust chunk size based on document complexity

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Submit a pull request with a clear description

## 🙏 Acknowledgments

- **LangChain** for the RAG framework
- **Ollama** for local LLM deployment
- **FastAPI** for the modern Python API
- **React** for the frontend framework
- **ChromaDB** for vector storage

---

**🎓 Built for KTU Students, by KTU Students** 

*Happy learning with your intelligent AI assistant!* 📖✨
