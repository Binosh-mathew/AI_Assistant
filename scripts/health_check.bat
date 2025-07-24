@echo off
echo ================================================
echo         KTU AI Assistant - Health Check
echo ================================================
echo.

echo [1/4] Checking Backend Status...
echo Testing backend server at http://localhost:8000
curl -s http://localhost:8000/health > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Backend: RUNNING
) else (
    echo ❌ Backend: NOT RUNNING
)
echo.

echo [2/4] Checking Frontend Status...
echo Testing frontend server at http://localhost:5173
curl -s http://localhost:5173 > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Frontend: RUNNING
) else (
    echo ❌ Frontend: NOT RUNNING
)
echo.

echo [3/4] Checking Dependencies...
echo Checking Python environment...
if exist "%~dp0..\backend\venv\Scripts\python.exe" (
    echo ✅ Python Virtual Environment: EXISTS
) else (
    echo ❌ Python Virtual Environment: MISSING
    echo Run: scripts\setup.bat
)

echo Checking Node.js dependencies...
if exist "%~dp0..\frontend\node_modules" (
    echo ✅ Node.js Dependencies: INSTALLED
) else (
    echo ❌ Node.js Dependencies: MISSING
    echo Run: scripts\setup.bat
)
echo.

echo [4/4] Checking Ollama...
echo Testing Ollama at http://localhost:11434
curl -s http://localhost:11434/api/tags > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Ollama: RUNNING
) else (
    echo ❌ Ollama: NOT RUNNING
    echo Start Ollama: ollama serve
)
echo.

echo ================================================
echo                 Health Summary
echo ================================================
echo.
echo 🎯 Access Points:
echo - Frontend: http://localhost:5173
echo - Backend:  http://localhost:8000
echo - API Docs: http://localhost:8000/docs
echo - Health:   http://localhost:8000/health
echo.
echo 🛠️ If any service is down:
echo 1. Run: scripts\setup.bat (for dependencies)
echo 2. Run: scripts\start_servers.bat (to start services)
echo 3. Start Ollama: ollama serve (for AI functionality)
echo.
pause
