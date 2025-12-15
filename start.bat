@echo off
echo Starting Paskibra Scoring System...
echo.

echo [1/2] Starting Backend Server...
start "Paskibra Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server...
start "Paskibra Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers Started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to stop all servers...
pause >nul

taskkill /FI "WindowTitle eq Paskibra Backend*" /T /F >nul 2>&1
taskkill /FI "WindowTitle eq Paskibra Frontend*" /T /F >nul 2>&1

echo.
echo All servers stopped.
pause
