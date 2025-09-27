@echo off
title Delphi - AI Vision Assistant
color 0A

echo.
echo  ██████╗ ███████╗██╗     ██████╗ ██╗██████╗ ██╗
echo  ██╔══██╗██╔════╝██║     ██╔══██╗██║██╔══██╗██║
echo  ██║  ██║█████╗  ██║     ██████╔╝██║██████╔╝██║
echo  ██║  ██║██╔══╝  ██║     ██╔═══╝ ██║██╔═══╝ ██║
echo  ██████╔╝███████╗███████╗██║     ██║██║     ██║
echo  ╚═════╝ ╚══════╝╚══════╝╚═╝     ╚═╝╚═╝     ╚═╝
echo.
echo  AI Vision Assistant for the Blind
echo.

echo Starting development server...
echo.

REM Start Expo server
start /B npx expo start --web --open

REM Wait for server
timeout /t 3 /nobreak >nul

REM Open browser
echo Opening browser...
start http://localhost:19006

REM Also open preview
echo Opening preview...
start app-preview.html

echo.
echo ✅ Delphi app is starting!
echo.
echo 📱 React Native App: http://localhost:19006
echo 🖥️  Preview: app-preview.html
echo.
echo Press any key to exit...
pause >nul