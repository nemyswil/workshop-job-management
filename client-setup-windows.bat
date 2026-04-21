@echo off
REM Workshop Job Management System - Windows Client Workstation Setup Script
REM This script configures client workstations to access the Workshop Job Management System
REM Version: 2.0
REM Date: December 2024

setlocal enabledelayedexpansion

REM Configuration variables
set SERVER_IP=
set SERVER_HOSTNAME=workshop-server.local

REM Colors for output
set INFO_PREFIX=[INFO]
set SUCCESS_PREFIX=[SUCCESS]
set WARNING_PREFIX=[WARNING]
set ERROR_PREFIX=[ERROR]

echo ==========================================
echo Workshop Job Management System - Client Setup
echo ==========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo %WARNING_PREFIX% This script should be run as Administrator for full functionality.
    echo %WARNING_PREFIX% Some features may not work without administrator privileges.
    echo.
)

REM Get server IP
echo Please enter the server IP address:
set /p SERVER_IP=Server IP: 

REM Validate IP format (basic check)
echo %SERVER_IP% | findstr /R "^[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*$" >nul
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Invalid IP address format. Please enter a valid IP address.
    pause
    exit /b 1
)

echo %INFO_PREFIX% Server IP: %SERVER_IP%
echo %INFO_PREFIX% Server Hostname: %SERVER_HOSTNAME%

REM Update hosts file
echo %INFO_PREFIX% Updating hosts file...
echo %SERVER_IP% %SERVER_HOSTNAME% >> C:\Windows\System32\drivers\etc\hosts
if %errorLevel% neq 0 (
    echo %WARNING_PREFIX% Failed to update hosts file. Please run as Administrator or manually add the following entry:
    echo %WARNING_PREFIX% %SERVER_IP% %SERVER_HOSTNAME%
) else (
    echo %SUCCESS_PREFIX% Added server entry to hosts file
)

REM Test connectivity
echo %INFO_PREFIX% Testing server connectivity...

REM Test ping
ping -n 1 %SERVER_IP% >nul 2>&1
if %errorLevel% equ 0 (
    echo %SUCCESS_PREFIX% Server is reachable via ping
) else (
    echo %WARNING_PREFIX% Server is not reachable via ping. Please check network connectivity.
)

REM Test HTTP connectivity
powershell -Command "try { Invoke-WebRequest -Uri 'http://%SERVER_HOSTNAME%' -UseBasicParsing -TimeoutSec 10 | Out-Null; Write-Host '[SUCCESS] HTTP connection to server successful' } catch { Write-Host '[WARNING] Cannot connect to server via HTTP. Please check server status.' }"

REM Create desktop shortcut
echo %INFO_PREFIX% Creating desktop shortcut...
set DESKTOP=%USERPROFILE%\Desktop
echo [InternetShortcut] > "%DESKTOP%\Workshop Management.url"
echo URL=http://%SERVER_HOSTNAME% >> "%DESKTOP%\Workshop Management.url"
echo IconFile=C:\Windows\System32\SHELL32.dll >> "%DESKTOP%\Workshop Management.url"
echo IconIndex=13 >> "%DESKTOP%\Workshop Management.url"

if exist "%DESKTOP%\Workshop Management.url" (
    echo %SUCCESS_PREFIX% Desktop shortcut created
) else (
    echo %WARNING_PREFIX% Failed to create desktop shortcut
)

REM Create Start Menu shortcut
echo %INFO_PREFIX% Creating Start Menu shortcut...
set START_MENU=%APPDATA%\Microsoft\Windows\Start Menu\Programs
echo [InternetShortcut] > "%START_MENU%\Workshop Management.url"
echo URL=http://%SERVER_HOSTNAME% >> "%START_MENU%\Workshop Management.url"
echo IconFile=C:\Windows\System32\SHELL32.dll >> "%START_MENU%\Workshop Management.url"
echo IconIndex=13 >> "%START_MENU%\Workshop Management.url"

if exist "%START_MENU%\Workshop Management.url" (
    echo %SUCCESS_PREFIX% Start Menu shortcut created
) else (
    echo %WARNING_PREFIX% Failed to create Start Menu shortcut
)

REM Configure browser settings
echo %INFO_PREFIX% Browser configuration instructions...
echo.
echo Please configure your browser with the following settings:
echo.
echo 1. Clear browser cache and cookies
echo 2. Disable pop-up blockers for %SERVER_HOSTNAME%
echo 3. Enable JavaScript (required for the application)
echo 4. Accept SSL certificate if prompted (for self-signed certificates)
echo.
echo Recommended browsers:
echo   - Google Chrome (latest version)
echo   - Mozilla Firefox (latest version)
echo   - Microsoft Edge (latest version)
echo.

REM Create browser bookmark file
echo %INFO_PREFIX% Creating browser bookmark...
set BOOKMARK_FILE=%USERPROFILE%\Desktop\workshop_bookmark.html
echo ^<!DOCTYPE NETSCAPE-Bookmark-file-1^> > "%BOOKMARK_FILE%"
echo ^<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"^> >> "%BOOKMARK_FILE%"
echo ^<TITLE^>Bookmarks^</TITLE^> >> "%BOOKMARK_FILE%"
echo ^<H1^>Bookmarks^</H1^> >> "%BOOKMARK_FILE%"
echo ^<DL^>^<p^> >> "%BOOKMARK_FILE%"
echo     ^<DT^>^<A HREF="http://%SERVER_HOSTNAME%" ADD_DATE="%date%" LAST_VISITED="%date%"^>Workshop Management System^</A^> >> "%BOOKMARK_FILE%"
echo ^</DL^>^<p^> >> "%BOOKMARK_FILE%"

if exist "%BOOKMARK_FILE%" (
    echo %SUCCESS_PREFIX% Browser bookmark file created at %BOOKMARK_FILE%
    echo %WARNING_PREFIX% Import this file into your browser to add the bookmark
) else (
    echo %WARNING_PREFIX% Failed to create browser bookmark file
)

REM Configure Windows Firewall (if running as admin)
net session >nul 2>&1
if %errorLevel% equ 0 (
    echo %INFO_PREFIX% Configuring Windows Firewall...
    netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
    netsh advfirewall firewall add rule name="Workshop Management HTTPS" dir=in action=allow protocol=TCP localport=443
    echo %SUCCESS_PREFIX% Windows Firewall configured
) else (
    echo %WARNING_PREFIX% Cannot configure Windows Firewall without administrator privileges
    echo %WARNING_PREFIX% Please ensure ports 80 and 443 are allowed through Windows Firewall
)

REM Display final information
echo.
echo %SUCCESS_PREFIX% Client workstation setup completed!
echo.
echo ==========================================
echo Workshop Job Management System - Client Setup
echo ==========================================
echo.
echo Access Information:
echo   URL: http://%SERVER_HOSTNAME%
echo   Alternative: http://%SERVER_IP%
echo.
echo Default Login Credentials:
echo   Manager: admin / admin123
echo   Worker: worker1 / worker123
echo.
echo Important Notes:
echo   1. Accept SSL certificate when prompted (self-signed certificate)
echo   2. Change default passwords after first login
echo   3. Contact administrator for additional user accounts
echo.
echo Troubleshooting:
echo   - If you cannot access the system, check network connectivity
echo   - Ensure firewall allows HTTP traffic (port 80)
echo   - Clear browser cache if experiencing issues
echo.
echo Support:
echo   - Contact your system administrator for technical support
echo   - Check server status if system is unavailable
echo.
pause
