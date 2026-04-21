REM Improved Database Setup Section for deploy-windows.bat
REM Replace the existing database setup section (lines 147-161) with this:

REM Create database and user
echo %INFO_PREFIX% Setting up database...

REM Check if MySQL root has password
echo %INFO_PREFIX% Testing MySQL root access...
mysql -u root -e "SELECT 1;" >nul 2>&1
if %errorLevel% neq 0 (
    echo %WARNING_PREFIX% MySQL root access failed. Please set MySQL root password.
    echo %INFO_PREFIX% Run: mysql_secure_installation
    pause
    exit /b 1
)

REM Create database
echo %INFO_PREFIX% Creating database...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS %DB_NAME%;"
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to create database.
    pause
    exit /b 1
)

REM Create user
echo %INFO_PREFIX% Creating database user...
mysql -u root -e "CREATE USER IF NOT EXISTS '%DB_USER%'@'localhost' IDENTIFIED BY '%DB_PASSWORD%';"
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to create database user.
    pause
    exit /b 1
)

REM Grant privileges
echo %INFO_PREFIX% Granting privileges...
mysql -u root -e "GRANT ALL PRIVILEGES ON %DB_NAME%.* TO '%DB_USER%'@'localhost';"
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to grant privileges.
    pause
    exit /b 1
)

REM Flush privileges
mysql -u root -e "FLUSH PRIVILEGES;"
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to flush privileges.
    pause
    exit /b 1
)

REM Import database schema
echo %INFO_PREFIX% Importing database schema...
mysql -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < "%APP_DIR%\server\sql\schema.sql"
if %errorLevel% neq 0 (
    echo %ERROR_PREFIX% Failed to import database schema.
    echo %WARNING_PREFIX% Please check if schema file exists: %APP_DIR%\server\sql\schema.sql
    pause
    exit /b 1
)

echo %SUCCESS_PREFIX% Database setup completed

