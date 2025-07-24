@echo off
echo ================================================
echo     Setting up Ollama WSL Port Forwarding
echo ================================================

echo [Step 1] Getting WSL IP address...
for /f "tokens=*" %%i in ('wsl hostname -I') do set WSL_IP=%%i
echo WSL IP: %WSL_IP%

echo.
echo [Step 2] Setting up port forwarding (requires admin rights)...
echo This will forward localhost:11434 to WSL Ollama
echo.
echo Run this command as Administrator:
echo netsh interface portproxy add v4tov4 listenport=11434 listenaddress=0.0.0.0 connectport=11434 connectaddress=%WSL_IP%

echo.
echo [Step 3] Alternative: Configure Ollama in WSL to accept external connections
echo Run this in WSL terminal:
echo sudo pkill ollama
echo export OLLAMA_HOST=0.0.0.0:11434
echo ollama serve

echo.
echo [Step 4] Test the connection
echo After setting up, test with: curl http://localhost:11434

echo.
echo ================================================
echo Choose one option above and restart the backend
echo ================================================
pause
