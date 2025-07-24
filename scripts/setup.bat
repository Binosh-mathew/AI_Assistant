@echo off
echo ================================================
echo        KTU AI Assistant - Development Setup
echo ================================================
echo.

echo [1/4] Setting up Backend Python Environment...
cd /d "%~dp0..\backend"
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing backend dependencies...
pip install -r requirements.txt
echo Backend setup complete!
echo.

echo [2/4] Setting up Frontend Node Environment...
cd /d "%~dp0..\frontend"
echo Installing frontend dependencies...
npm install
echo Frontend setup complete!
echo.

echo [3/4] Environment Check...
echo - Backend: %~dp0..\backend\venv\Scripts\python.exe
echo - Frontend: %~dp0..\frontend\node_modules
echo - Documents: %~dp0..\backend\data\docs\
echo.

echo [4/4] Setup Complete!
echo.
echo To start the application:
echo 1. Run: scripts\start_servers.bat
echo 2. Open: http://localhost:5173
echo.
echo Project structure:
echo - backend/     - FastAPI server and AI logic
echo - frontend/    - React TypeScript interface  
echo - scripts/     - Utility scripts
echo.
pause
