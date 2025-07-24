@echo off
echo ================================================
echo        KTU AI Assistant - Clean Restart
echo ================================================
echo.

echo [1/3] Stopping all running processes...
echo Stopping Python processes...
for /f "tokens=2" %%i in ('tasklist /FI "IMAGENAME eq python.exe" /FO CSV ^| find /C ","') do (
    if %%i gtr 1 (
        taskkill /F /IM python.exe > nul 2>&1
        echo ✅ Python processes stopped
    )
)

echo Stopping Node.js processes...
for /f "tokens=2" %%i in ('tasklist /FI "IMAGENAME eq node.exe" /FO CSV ^| find /C ","') do (
    if %%i gtr 1 (
        taskkill /F /IM node.exe > nul 2>&1
        echo ✅ Node.js processes stopped
    )
)
echo.

echo [2/3] Clearing temporary files...
if exist "%~dp0..\backend\__pycache__" (
    rmdir /s /q "%~dp0..\backend\__pycache__" > nul 2>&1
    echo ✅ Cleared Python cache
)

if exist "%~dp0..\frontend\.next" (
    rmdir /s /q "%~dp0..\frontend\.next" > nul 2>&1
    echo ✅ Cleared Next.js cache
)
echo.

echo [3/3] Starting fresh servers...
echo Starting clean KTU AI Assistant...
call "%~dp0start_servers.bat"

echo.
echo ================================================
echo           🔄 Clean Restart Complete! 🔄
echo ================================================
echo.
pause
