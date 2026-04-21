@echo off
REM Workshop Job Management System - Windows Automated Deployment Script
REM This script automates the complete setup of the Workshop Job Management System on Windows
REM Version: 2.0
REM Date: December 2024

setlocal enabledelayedexpansion

REM Configuration variables
set APP_USER=workshop-app
set APP_DIR=C:\workshop-job-management
set DB_NAME=workshop_jobs
set DB_USER=workshop_user
set DB_PASSWORD=Workshop2024!
set NODE_VERSION=18.19.0
set MYSQL_VERSION=8.0

REM Colors for output (Windows doesn't support colors in batch, so we'll use text)
set INFO_PREFIX=[INFO]
set SUCCESS_PREFIX=[SUCCESS]
set WARNING_PREFIX=[WARNING]
set ERROR_PREFIX=[ERROR]

echo ==========================================
echo Workshop Job Management System Installer
echo ==========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% This script must be run as Administrator. Please right-click and select "Run as administrator".
    pause
    exit /b 1
)

echo %INFO_PREFIX% Starting Windows deployment process...

REM Check Windows version
for /f "tokens=4-5 delims=. " %%i in ('ver') do set VERSION=%%i.%%j
echo %INFO_PREFIX% Windows version: %VERSION%

REM Check if required tools are available
echo %INFO_PREFIX% Checking system requirements...

REM Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% PowerShell is required but not available.
    pause
    exit /b 1
)

REM Check if Chocolatey is installed
choco --version >nul 2>&1
if %errorLevel% neq 0 (
    echo %INFO_PREFIX% Installing Chocolatey package manager...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    if %errorLevel% neq 0 (
        echo %ERROR_PREFIX% Failed to install Chocolatey.
        pause
        exit /b 1
    )
    echo %SUCCESS_PREFIX% Chocolatey installed successfully
) else (
    echo %SUCCESS_PREFIX% Chocolatey is already installed
)

REM Install Node.js
echo %INFO_PREFIX% Installing Node.js...
choco install nodejs --version=%NODE_VERSION% -y
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to install Node.js.
    pause
    exit /b 1
)
echo %SUCCESS_PREFIX% Node.js installed successfully

REM Install MySQL
echo %INFO_PREFIX% Installing MySQL...
choco install mysql --version=%MYSQL_VERSION% -y
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to install MySQL.
    pause
    exit /b 1
)
echo %SUCCESS_PREFIX% MySQL installed successfully

REM Install PM2
echo %INFO_PREFIX% Installing PM2...
npm install -g pm2
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to install PM2.
    pause
    exit /b 1
)
echo %SUCCESS_PREFIX% PM2 installed successfully

REM Install IIS (for reverse proxy)
echo %INFO_PREFIX% Installing IIS...
dism /online /enable-feature /featurename:IIS-WebServerRole /all
dism /online /enable-feature /featurename:IIS-WebServer /all
dism /online /enable-feature /featurename:IIS-CommonHttpFeatures /all
dism /online /enable-feature /featurename:IIS-HttpErrors /all
dism /online /enable-feature /featurename:IIS-HttpLogging /all
dism /online /enable-feature /featurename:IIS-RequestFiltering /all
dism /online /enable-feature /featurename:IIS-StaticContent /all
dism /online /enable-feature /featurename:IIS-DefaultDocument /all
dism /online /enable-feature /featurename:IIS-DirectoryBrowsing /all
dism /online /enable-feature /featurename:IIS-ASPNET45 /all
echo %SUCCESS_PREFIX% IIS installed successfully

REM Create application directory
echo %INFO_PREFIX% Creating application directory...
if not exist "%APP_DIR%" mkdir "%APP_DIR%"
echo %SUCCESS_PREFIX% Application directory created

REM Copy application files
echo %INFO_PREFIX% Copying application files...
if exist "client" if exist "server" (
    xcopy /E /I /Y . "%APP_DIR%"
    echo %SUCCESS_PREFIX% Application files copied
) else (
    echo %ERROR_PREFIX% Application files not found. Please run this script from the project root directory.
    pause
    exit /b 1
)

REM Install application dependencies
echo %INFO_PREFIX% Installing application dependencies...
cd /d "%APP_DIR%"
call npm run install-all
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to install application dependencies.
    pause
    exit /b 1
)
echo %SUCCESS_PREFIX% Application dependencies installed

REM Setup MySQL service
echo %INFO_PREFIX% Setting up MySQL service...
net start mysql
if %errorLevel% neq 0 (
    echo %WARNING_PREFIX% MySQL service may already be running or needs manual configuration
)

REM Create database and user
echo %INFO_PREFIX% Setting up database...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS %DB_NAME%;"
mysql -u root -e "CREATE USER IF NOT EXISTS '%DB_USER%'@'localhost' IDENTIFIED BY '%DB_PASSWORD%';"
mysql -u root -e "GRANT ALL PRIVILEGES ON %DB_NAME%.* TO '%DB_USER%'@'localhost';"
mysql -u root -e "FLUSH PRIVILEGES;"

REM Import database schema
mysql -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < "%APP_DIR%\server\sql\schema.sql"
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to import database schema.
    pause
    exit /b 1
)
echo %SUCCESS_PREFIX% Database setup completed

REM Configure environment
echo %INFO_PREFIX% Configuring environment...
copy "%APP_DIR%\server\env.example" "%APP_DIR%\server\.env"

REM Generate JWT secret
for /f %%i in ('powershell -Command "[System.Web.Security.Membership]::GeneratePassword(32, 0)"') do set JWT_SECRET=%%i

REM Update environment file
powershell -Command "(Get-Content '%APP_DIR%\server\.env') -replace 'DB_PASSWORD=Workshop2024!', 'DB_PASSWORD=%DB_PASSWORD%' | Set-Content '%APP_DIR%\server\.env'"
powershell -Command "(Get-Content '%APP_DIR%\server\.env') -replace 'JWT_SECRET=your_super_secret_jwt_key_here', 'JWT_SECRET=%JWT_SECRET%' | Set-Content '%APP_DIR%\server\.env'"

echo %SUCCESS_PREFIX% Environment configured

REM Create uploads directory
echo %INFO_PREFIX% Creating uploads directory...
if not exist "%APP_DIR%\server\uploads" mkdir "%APP_DIR%\server\uploads"
echo %SUCCESS_PREFIX% Uploads directory created

REM Build application
echo %INFO_PREFIX% Building application...
call npm run build
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to build application.
    pause
    exit /b 1
)
echo %SUCCESS_PREFIX% Application built successfully

REM Create PM2 configuration
echo %INFO_PREFIX% Creating PM2 configuration...
echo module.exports = { > "%APP_DIR%\ecosystem.config.js"
echo   apps: [{ >> "%APP_DIR%\ecosystem.config.js"
echo     name: 'workshop-management', >> "%APP_DIR%\ecosystem.config.js"
echo     script: 'server/index.js', >> "%APP_DIR%\ecosystem.config.js"
echo     instances: 1, >> "%APP_DIR%\ecosystem.config.js"
echo     autorestart: true, >> "%APP_DIR%\ecosystem.config.js"
echo     watch: false, >> "%APP_DIR%\ecosystem.config.js"
echo     max_memory_restart: '1G', >> "%APP_DIR%\ecosystem.config.js"
echo     env: { >> "%APP_DIR%\ecosystem.config.js"
echo       NODE_ENV: 'production' >> "%APP_DIR%\ecosystem.config.js"
echo     }, >> "%APP_DIR%\ecosystem.config.js"
echo     error_file: 'C:\workshop-job-management\logs\err.log', >> "%APP_DIR%\ecosystem.config.js"
echo     out_file: 'C:\workshop-job-management\logs\out.log', >> "%APP_DIR%\ecosystem.config.js"
echo     log_file: 'C:\workshop-job-management\logs\combined.log', >> "%APP_DIR%\ecosystem.config.js"
echo     time: true >> "%APP_DIR%\ecosystem.config.js"
echo   }] >> "%APP_DIR%\ecosystem.config.js"
echo }; >> "%APP_DIR%\ecosystem.config.js"

REM Create logs directory
if not exist "%APP_DIR%\logs" mkdir "%APP_DIR%\logs"
echo %SUCCESS_PREFIX% PM2 configuration created

REM Start application
echo %INFO_PREFIX% Starting application...
cd /d "%APP_DIR%"
pm2 start ecosystem.config.js
pm2 save
pm2 startup
echo %SUCCESS_PREFIX% Application started successfully

REM Configure Windows Firewall
echo %INFO_PREFIX% Configuring Windows Firewall...
netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
netsh advfirewall firewall add rule name="Workshop Management HTTPS" dir=in action=allow protocol=TCP localport=443
netsh advfirewall firewall add rule name="Workshop Management API" dir=in action=allow protocol=TCP localport=5000
echo %SUCCESS_PREFIX% Windows Firewall configured

REM Create backup script
echo %INFO_PREFIX% Creating backup script...
echo @echo off > "%APP_DIR%\backup.bat"
echo set BACKUP_DIR=C:\workshop-job-management\backups >> "%APP_DIR%\backup.bat"
echo set DATE=%%date:~-4,4%%%%date:~-10,2%%%%date:~-7,2%%_%%time:~0,2%%%%time:~3,2%%%%time:~6,2%% >> "%APP_DIR%\backup.bat"
echo set DATE=%%DATE: =0%% >> "%APP_DIR%\backup.bat"
echo set BACKUP_FILE=workshop_backup_%%DATE%%.zip >> "%APP_DIR%\backup.bat"
echo. >> "%APP_DIR%\backup.bat"
echo if not exist %%BACKUP_DIR%% mkdir %%BACKUP_DIR%% >> "%APP_DIR%\backup.bat"
echo. >> "%APP_DIR%\backup.bat"
echo powershell -Command "Compress-Archive -Path 'C:\workshop-job-management\server\uploads' -DestinationPath '%%BACKUP_DIR%%\%%BACKUP_FILE%%'" >> "%APP_DIR%\backup.bat"
echo mysqldump -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% > %%BACKUP_DIR%%\database_%%DATE%%.sql >> "%APP_DIR%\backup.bat"
echo. >> "%APP_DIR%\backup.bat"
echo echo Backup completed: %%BACKUP_FILE%% >> "%APP_DIR%\backup.bat"

REM Create backup directory
if not exist "%APP_DIR%\backups" mkdir "%APP_DIR%\backups"
echo %SUCCESS_PREFIX% Backup script created

REM Display final information
echo.
echo %SUCCESS_PREFIX% Installation completed successfully!
echo.
echo ==========================================
echo Workshop Job Management System - Installed
echo ==========================================
echo.
echo Access Information:
echo   URL: http://localhost
echo   Alternative: http://%COMPUTERNAME%
echo.
echo Default Login Credentials:
echo   Manager: admin / admin123
echo   Worker: worker1 / worker123
echo.
echo Important Files:
echo   Application: %APP_DIR%
echo   Logs: %APP_DIR%\logs\
echo   Backups: %APP_DIR%\backups\
echo.
echo Management Commands:
echo   View logs: pm2 logs
echo   Restart app: pm2 restart workshop-management
echo   Stop app: pm2 stop workshop-management
echo   Manual backup: %APP_DIR%\backup.bat
echo.
echo Next Steps:
echo   1. Configure IIS for reverse proxy (optional)
echo   2. Access the application and change default passwords
echo   3. Configure additional users as needed
echo   4. Set up SSL certificate for production use
echo.
echo %WARNING_PREFIX% Remember to change default passwords and configure proper SSL certificates for production!
echo.
pause
