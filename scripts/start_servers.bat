@echo off
echo ================================================
echo        KTU AI Assistant - Starting Servers
echo ================================================
echo.

echo [Step 1] Starting Backend Server...
echo Starting FastAPI backend on http://localhost:8000
start "KTU AI Backend" cmd /k "cd /d %~dp0..\backend && venv\Scripts\activate && python server.py"

echo.
echo [Step 2] Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo.
echo [Step 3] Starting Frontend Development Server...
echo Starting React frontend on http://localhost:5173
start "KTU AI Frontend" cmd /k "cd /d %~dp0..\frontend && npm run dev"

echo.
echo ================================================
echo           🚀 KTU AI Assistant Started! 🚀
echo ================================================
echo.
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend:  http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Both servers are starting in separate windows.
echo Close those windows to stop the servers.
echo.
echo ✅ System Status:
echo - Backend: FastAPI + LangChain + Ollama + ChromaDB
echo - Frontend: React + TypeScript + Tailwind CSS
echo - AI Model: Llama3 (via Ollama)
echo.
echo Happy learning with your KTU AI Assistant! 📖✨
echo.
pause
