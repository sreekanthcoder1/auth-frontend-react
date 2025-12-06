@echo off
echo Starting React Frontend in Development Mode...

REM Check if node_modules exists
if not exist "node_modules" (
    echo node_modules not found, installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js not found in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo npm not found in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Frontend Configuration:
echo - Development Server: http://localhost:5173
echo - Backend API: http://localhost:8080
echo.

REM Start the development server
echo Starting Vite development server...
npm run dev

pause
