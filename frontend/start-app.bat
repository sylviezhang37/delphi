@echo off
echo Starting Delphi App...
echo.

REM Start Expo development server
echo Starting Expo development server...
start /B npx expo start --web --open

REM Wait a moment for server to start
timeout /t 5 /nobreak >nul

REM Check if server is running
echo Checking server status...
netstat -an | findstr :19006 >nul
if %errorlevel% equ 0 (
    echo ✅ Server is running on http://localhost:19006
    echo Opening browser...
    start http://localhost:19006
) else (
    echo ❌ Server not detected, trying alternative port...
    netstat -an | findstr :19000 >nul
    if %errorlevel% equ 0 (
        echo ✅ Server is running on http://localhost:19000
        start http://localhost:19000
    ) else (
        echo ⚠️  Server may still be starting, please wait...
        echo You can manually open: http://localhost:19006
    )
)

echo.
echo Press any key to exit...
pause >nul