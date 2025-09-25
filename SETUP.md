# Workshop Job Management System - Setup Guide

## Required Software Installation

### 1. Node.js and npm
- **Download**: https://nodejs.org/
- **Version**: Node.js 18.x or higher (LTS recommended)
- **Includes**: npm (Node Package Manager) comes with Node.js
- **Verify**: Run `node --version` and `npm --version` in terminal

### 2. MySQL Database
- **Download**: https://dev.mysql.com/downloads/mysql/
- **Alternative**: XAMPP (includes MySQL, Apache, PHP) - https://www.apachefriends.org/
- **Version**: MySQL 8.0 or higher
- **Setup**: 
  - Create a root password during installation
  - Start MySQL service
  - Verify: Run `mysql --version` in terminal

### 3. Git (Optional but recommended)
- **Download**: https://git-scm.com/
- **Purpose**: Version control and easy project management

## Installation Steps

### Step 1: Install Node.js
1. Download Node.js from the official website
2. Run the installer and follow the setup wizard
3. Restart your terminal/command prompt
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install MySQL
1. Download MySQL Community Server
2. Run the installer
3. Choose "Developer Default" setup type
4. Set root password (remember this!)
5. Complete installation
6. Start MySQL service (usually starts automatically)

### Step 3: Setup Database
1. Open MySQL Command Line Client or MySQL Workbench
2. Run the SQL script to create the database:
   ```sql
   -- Copy and paste the contents of server/sql/schema.sql
   ```

### Step 4: Install Project Dependencies
1. Open terminal in project root directory
2. Run the following commands:
   ```bash
   # Install root dependencies
   npm install
   
   # Install all project dependencies
   npm run install-all
   ```

### Step 5: Environment Configuration
1. Copy `server/env.example` to `server/.env`
2. Update the database credentials in `server/.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=workshop_jobs
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

## Running the Application

### Development Mode
```bash
# Start both frontend and backend
npm run dev
```

### Individual Services
```bash
# Backend only (port 5000)
npm run server

# Frontend only (port 3000)
npm run client
```

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:3306 (MySQL default)

## Default Login Credentials

- **Manager**: 
  - Username: `admin`
  - Password: `admin123`

- **Workers**:
  - Username: `worker1`, `worker2`, `worker3`
  - Password: `worker123`

## Troubleshooting

### Common Issues

1. **Port already in use**:
   - Change ports in `server/.env` and `client/package.json`

2. **Database connection failed**:
   - Check MySQL service is running
   - Verify credentials in `server/.env`
   - Ensure database `workshop_jobs` exists

3. **Module not found errors**:
   - Run `npm run install-all` to install all dependencies

4. **Permission errors**:
   - Run terminal as administrator (Windows)
   - Check file permissions for uploads folder

### System Requirements

- **OS**: Windows 10/11, macOS, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Next Steps

1. Complete the software installation above
2. Run the database setup script
3. Start the application with `npm run dev`
4. Access the system at http://localhost:3000
5. Login with the default credentials
6. Begin creating job cards and managing your workshop!
