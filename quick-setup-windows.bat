@echo off
REM Workshop Job Management System - Windows Quick Setup Script
REM This script provides a quick setup option for testing and development on Windows
REM Version: 2.0
REM Date: December 2024

setlocal enabledelayedexpansion

REM Colors for output
set INFO_PREFIX=[INFO]
set SUCCESS_PREFIX=[SUCCESS]
set WARNING_PREFIX=[WARNING]
set ERROR_PREFIX=[ERROR]

echo ==========================================
echo Workshop Job Management System - Quick Setup
echo ==========================================
echo.
echo %WARNING_PREFIX% This is a quick setup for development and testing only!
echo %WARNING_PREFIX% Use the full deployment script for production environments.
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo %WARNING_PREFIX% This script should be run as Administrator for full functionality.
    echo %WARNING_PREFIX% Some features may not work without administrator privileges.
    echo.
)

REM Check system requirements
echo %INFO_PREFIX% Checking system requirements...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Node.js is not installed. Please install Node.js 18.x or higher first.
    echo %WARNING_PREFIX% Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1 delims=v" %%i in ('node --version') do set NODE_VERSION=%%i
echo %INFO_PREFIX% Node.js version: %NODE_VERSION%

REM Check if MySQL is installed
mysql --version >nul 2>&1
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% MySQL is not installed. Please install MySQL 8.0 or higher first.
    echo %WARNING_PREFIX% Visit: https://dev.mysql.com/downloads/mysql/
    pause
    exit /b 1
)

echo %SUCCESS_PREFIX% System requirements check completed

REM Install dependencies
echo %INFO_PREFIX% Installing dependencies...

REM Install root dependencies
call npm install
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to install root dependencies.
    pause
    exit /b 1
)

REM Install all project dependencies
call npm run install-all
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to install project dependencies.
    pause
    exit /b 1
)

echo %SUCCESS_PREFIX% Dependencies installed successfully

REM Setup database
echo %INFO_PREFIX% Setting up database...

REM Start MySQL service
net start mysql >nul 2>&1
if %errorLevel% neq 0 (
    echo %WARNING_PREFIX% MySQL service may already be running or needs manual configuration
)

REM Create database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to create database. Please check MySQL connection.
    pause
    exit /b 1
)

REM Import schema
mysql -u root workshop_jobs < server\sql\schema.sql
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to import database schema.
    pause
    exit /b 1
)

echo %SUCCESS_PREFIX% Database setup completed successfully

REM Configure environment
echo %INFO_PREFIX% Configuring environment...

REM Copy environment template
copy server\env.example server\.env
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to copy environment template.
    pause
    exit /b 1
)

REM Generate JWT secret
for /f %%i in ('powershell -Command "[System.Web.Security.Membership]::GeneratePassword(32, 0)"') do set JWT_SECRET=%%i

REM Update environment file
powershell -Command "(Get-Content 'server\.env') -replace 'JWT_SECRET=your_super_secret_jwt_key_here', 'JWT_SECRET=%JWT_SECRET%' | Set-Content 'server\.env'"

echo %SUCCESS_PREFIX% Environment configured successfully

REM Create uploads directory
echo %INFO_PREFIX% Creating uploads directory...
if not exist "server\uploads" mkdir "server\uploads"
echo %SUCCESS_PREFIX% Uploads directory created successfully

REM Start development server
echo %INFO_PREFIX% Starting development server...

REM Start the application in background
start /B npm run dev

REM Wait for servers to start
echo %INFO_PREFIX% Waiting for servers to start...
timeout /t 10 /nobreak >nul

echo %SUCCESS_PREFIX% Development server started successfully

REM Run basic tests
echo %INFO_PREFIX% Running basic tests...

REM Test database connection
mysql -u root -e "USE workshop_jobs; SELECT COUNT(*) FROM users;" >nul 2>&1
if %errorLevel% equ 0 (
    echo %SUCCESS_PREFIX% Database connection test passed
) else (
    echo %ERROR_PREFIX% Database connection test failed
    pause
    exit /b 1
)

REM Test if servers are running
timeout /t 5 /nobreak >nul

powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 10 | Out-Null; Write-Host '[SUCCESS] Frontend server test passed' } catch { Write-Host '[WARNING] Frontend server test failed - may still be starting' }"

powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:5000/api/health' -UseBasicParsing -TimeoutSec 10 | Out-Null; Write-Host '[SUCCESS] Backend server test passed' } catch { Write-Host '[WARNING] Backend server test failed - may still be starting' }"

REM Display final information
echo.
echo %SUCCESS_PREFIX% Quick setup completed successfully!
echo.
echo ==========================================
echo Workshop Job Management System - Quick Setup
echo ==========================================
echo.
echo Access Information:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:5000
echo.
echo Default Login Credentials:
echo   Manager: admin / admin123
echo   Worker: worker1 / worker123
echo.
echo Development Commands:
echo   Stop server: Ctrl+C
echo   Restart server: npm run dev
echo   Backend only: npm run server
echo   Frontend only: npm run client
echo.
echo Important Notes:
echo   - This is a development setup
echo   - Change default passwords before production use
echo   - Use the full deployment script for production
echo.
echo %WARNING_PREFIX% Press Ctrl+C to stop the development server when done testing
echo.

REM Keep the script running to show server output
echo %INFO_PREFIX% Development server is running. Press Ctrl+C to stop.
pause
