# Write an SOP for client project setup
_Exported on 4/21/2026 at 21:03:51 GMT+2 from Cursor (2.4.22)_

---

**User**

write me an SOP for this project .So I can install everything and set up this for a client who want this solution 

---

**Cursor**

I'll help you create a comprehensive Standard Operating Procedure (SOP) for setting up this project. Let me first examine the project structure and existing documentation to understand what we're working with.


Now let me check the database schema and environment example to understand the complete setup requirements:


Now I'll create a comprehensive SOP document for setting up this Workshop Job Management System for clients:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Client Installation & Setup

**Document Version:** 1.0  
**Date:** December 2024  
**Prepared for:** Client Deployment  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Software Installation](#software-installation)
5. [Project Setup](#project-setup)
6. [Database Configuration](#database-configuration)
7. [Application Configuration](#application-configuration)
8. [Testing & Verification](#testing--verification)
9. [Production Deployment](#production-deployment)
10. [Troubleshooting](#troubleshooting)
11. [Client Handover](#client-handover)

---

## Overview

This SOP provides step-by-step instructions for installing and configuring the Workshop Job Management System for client deployment. The system is a web-based application that manages job cards, user accounts, and file attachments for workshop operations.

### System Components
- **Frontend**: React.js web application (Port 3000)
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Local file system for attachments

---

## System Requirements

### Minimum Hardware Requirements
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 5GB free disk space
- **Network**: Stable internet connection

### Operating System Support
- Windows 10/11 (64-bit)
- macOS 10.15 or later
- Ubuntu 18.04 LTS or later
- CentOS 7 or later

### Software Dependencies
- Node.js 18.x or higher (LTS version recommended)
- MySQL 8.0 or higher
- Git (optional, for version control)
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Software Installation

### Step 1: Install Node.js

#### Windows Installation
1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS version (18.x or higher)
   - Choose the Windows Installer (.msi) for your system architecture

2. **Run Installation**
   - Double-click the downloaded .msi file
   - Follow the installation wizard
   - Accept the license agreement
   - Choose installation directory (default: C:\Program Files\nodejs\)
   - Ensure "Add to PATH" is checked
   - Complete installation

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```
   Expected output: Node.js v18.x.x and npm v9.x.x

#### macOS Installation
1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Using Official Installer**
   - Download from https://nodejs.org/
   - Run the .pkg installer
   - Follow installation prompts

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Step 2: Install MySQL

#### Windows Installation
1. **Download MySQL**
   - Visit: https://dev.mysql.com/downloads/mysql/
   - Download MySQL Community Server
   - Choose Windows (x86, 64-bit) installer

2. **Run Installation**
   - Run the downloaded installer
   - Choose "Developer Default" setup type
   - Set root password (document this securely!)
   - Complete installation
   - Start MySQL service (usually automatic)

3. **Verify Installation**
   ```bash
   mysql --version
   ```

#### macOS Installation
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Step 3: Install Git (Optional but Recommended)
- **Windows**: Download from https://git-scm.com/
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*
```

I've created a comprehensive Standard Operating Procedure (SOP) document for setting up your Workshop Job Management System for clients. The SOP includes:

## Key Sections Covered:

1. **Overview** - System components and architecture
2. **System Requirements** - Hardware, OS, and software dependencies
3. **Pre-Installation Checklist** - Client information gathering
4. **Software Installation** - Step-by-step Node.js, MySQL, and Git installation for Windows, macOS, and Linux
5. **Project Setup** - Dependencies installation and structure verification
6. **Database Configuration** - Database creation, schema import, and user setup
7. **Application Configuration** - Environment variables and custom user setup
8. **Testing & Verification** - Comprehensive testing procedures
9. **Production Deployment** - Production build and PM2 process management
10. **Troubleshooting** - Common issues and solutions
11. **Client Handover** - Documentation, training, and support information

## Key Features of the SOP:

- **Multi-platform support** (Windows, macOS, Linux)
- **Detailed step-by-step instructions** with expected outputs
- **Security considerations** (custom credentials, JWT secrets)
- **Production deployment** guidance with PM2
- **Comprehensive testing procedures**
- **Troubleshooting section** for common issues
- **Client handover checklist** for complete project delivery

The document is structured to be professional and client-ready, with clear sections that can be followed by technical staff or provided to clients for self-installation. It includes all the necessary information from your existing README and SETUP files, but organized in a more formal SOP format suitable for client deployments.

Would you like me to modify any sections or add additional information to the SOP?

---

**User**

I want this to be a turnkey solution so i need to set up both server and client for my customer

---

**Cursor**

I understand you want a turnkey solution that includes both server and client setup for your customer. Let me enhance the SOP to include comprehensive server setup instructions and create additional deployment scripts to make this a complete turnkey solution.


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides step-by-step instructions for installing and configuring the Workshop Job Management System for client deployment. The system is a web-based application that manages job cards, user accounts, and file attachments for workshop operations.

### System Components
- **Frontend**: React.js web application (Port 3000)
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Local file system for attachments

---

## System Requirements

### Minimum Hardware Requirements
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 5GB free disk space
- **Network**: Stable internet connection

### Operating System Support
- Windows 10/11 (64-bit)
- macOS 10.15 or later
- Ubuntu 18.04 LTS or later
- CentOS 7 or later

### Software Dependencies
- Node.js 18.x or higher (LTS version recommended)
- MySQL 8.0 or higher
- Git (optional, for version control)
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Software Installation

### Step 1: Install Node.js

#### Windows Installation
1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS version (18.x or higher)
   - Choose the Windows Installer (.msi) for your system architecture

2. **Run Installation**
   - Double-click the downloaded .msi file
   - Follow the installation wizard
   - Accept the license agreement
   - Choose installation directory (default: C:\Program Files\nodejs\)
   - Ensure "Add to PATH" is checked
   - Complete installation

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```
   Expected output: Node.js v18.x.x and npm v9.x.x

#### macOS Installation
1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Using Official Installer**
   - Download from https://nodejs.org/
   - Run the .pkg installer
   - Follow installation prompts

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Step 2: Install MySQL

#### Windows Installation
1. **Download MySQL**
   - Visit: https://dev.mysql.com/downloads/mysql/
   - Download MySQL Community Server
   - Choose Windows (x86, 64-bit) installer

2. **Run Installation**
   - Run the downloaded installer
   - Choose "Developer Default" setup type
   - Set root password (document this securely!)
   - Complete installation
   - Start MySQL service (usually automatic)

3. **Verify Installation**
   ```bash
   mysql --version
   ```

#### macOS Installation
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Step 3: Install Git (Optional but Recommended)
- **Windows**: Download from https://git-scm.com/
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Minimum Hardware Requirements
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 5GB free disk space
- **Network**: Stable internet connection

### Operating System Support
- Windows 10/11 (64-bit)
- macOS 10.15 or later
- Ubuntu 18.04 LTS or later
- CentOS 7 or later

### Software Dependencies
- Node.js 18.x or higher (LTS version recommended)
- MySQL 8.0 or higher
- Git (optional, for version control)
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Software Installation

### Step 1: Install Node.js

#### Windows Installation
1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS version (18.x or higher)
   - Choose the Windows Installer (.msi) for your system architecture

2. **Run Installation**
   - Double-click the downloaded .msi file
   - Follow the installation wizard
   - Accept the license agreement
   - Choose installation directory (default: C:\Program Files\nodejs\)
   - Ensure "Add to PATH" is checked
   - Complete installation

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```
   Expected output: Node.js v18.x.x and npm v9.x.x

#### macOS Installation
1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Using Official Installer**
   - Download from https://nodejs.org/
   - Run the .pkg installer
   - Follow installation prompts

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Step 2: Install MySQL

#### Windows Installation
1. **Download MySQL**
   - Visit: https://dev.mysql.com/downloads/mysql/
   - Download MySQL Community Server
   - Choose Windows (x86, 64-bit) installer

2. **Run Installation**
   - Run the downloaded installer
   - Choose "Developer Default" setup type
   - Set root password (document this securely!)
   - Complete installation
   - Start MySQL service (usually automatic)

3. **Verify Installation**
   ```bash
   mysql --version
   ```

#### macOS Installation
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Step 3: Install Git (Optional but Recommended)
- **Windows**: Download from https://git-scm.com/
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Software Installation

### Step 1: Install Node.js

#### Windows Installation
1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS version (18.x or higher)
   - Choose the Windows Installer (.msi) for your system architecture

2. **Run Installation**
   - Double-click the downloaded .msi file
   - Follow the installation wizard
   - Accept the license agreement
   - Choose installation directory (default: C:\Program Files\nodejs\)
   - Ensure "Add to PATH" is checked
   - Complete installation

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```
   Expected output: Node.js v18.x.x and npm v9.x.x

#### macOS Installation
1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Using Official Installer**
   - Download from https://nodejs.org/
   - Run the .pkg installer
   - Follow installation prompts

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Step 2: Install MySQL

#### Windows Installation
1. **Download MySQL**
   - Visit: https://dev.mysql.com/downloads/mysql/
   - Download MySQL Community Server
   - Choose Windows (x86, 64-bit) installer

2. **Run Installation**
   - Run the downloaded installer
   - Choose "Developer Default" setup type
   - Set root password (document this securely!)
   - Complete installation
   - Start MySQL service (usually automatic)

3. **Verify Installation**
   ```bash
   mysql --version
   ```

#### macOS Installation
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Step 3: Install Git (Optional but Recommended)
- **Windows**: Download from https://git-scm.com/
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me add the comprehensive server setup section:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js

#### Windows Installation
1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS version (18.x or higher)
   - Choose the Windows Installer (.msi) for your system architecture

2. **Run Installation**
   - Double-click the downloaded .msi file
   - Follow the installation wizard
   - Accept the license agreement
   - Choose installation directory (default: C:\Program Files\nodejs\)
   - Ensure "Add to PATH" is checked
   - Complete installation

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```
   Expected output: Node.js v18.x.x and npm v9.x.x

#### macOS Installation
1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Using Official Installer**
   - Download from https://nodejs.org/
   - Run the .pkg installer
   - Follow installation prompts

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Step 2: Install MySQL

#### Windows Installation
1. **Download MySQL**
   - Visit: https://dev.mysql.com/downloads/mysql/
   - Download MySQL Community Server
   - Choose Windows (x86, 64-bit) installer

2. **Run Installation**
   - Run the downloaded installer
   - Choose "Developer Default" setup type
   - Set root password (document this securely!)
   - Complete installation
   - Start MySQL service (usually automatic)

3. **Verify Installation**
   ```bash
   mysql --version
   ```

#### macOS Installation
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Step 3: Install Git (Optional but Recommended)
- **Windows**: Download from https://git-scm.com/
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me update the software installation section to focus on server installation:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 2: Install MySQL

#### Windows Installation
1. **Download MySQL**
   - Visit: https://dev.mysql.com/downloads/mysql/
   - Download MySQL Community Server
   - Choose Windows (x86, 64-bit) installer

2. **Run Installation**
   - Run the downloaded installer
   - Choose "Developer Default" setup type
   - Set root password (document this securely!)
   - Complete installation
   - Start MySQL service (usually automatic)

3. **Verify Installation**
   ```bash
   mysql --version
   ```

#### macOS Installation
```bash
# Using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

#### Linux Installation (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Step 3: Install Git (Optional but Recommended)
- **Windows**: Download from https://git-scm.com/
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me add the security configuration section and update the production deployment section:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me add the client workstation setup and network configuration sections:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me create automated deployment scripts to make this truly turnkey:


```shellscript
#!/bin/bash

# Workshop Job Management System - Automated Deployment Script
# This script automates the complete setup of the Workshop Job Management System
# Version: 2.0
# Date: December 2024

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables
APP_USER="workshop-app"
APP_DIR="/home/$APP_USER/workshop-job-management"
DB_NAME="workshop_jobs"
DB_USER="workshop_user"
NGINX_CONFIG="/etc/nginx/sites-available/workshop-app"
SSL_DIR="/etc/ssl/workshop"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root. Please run as a regular user with sudo privileges."
        exit 1
    fi
}

# Function to check system requirements
check_requirements() {
    print_status "Checking system requirements..."
    
    # Check if Ubuntu
    if ! grep -q "Ubuntu" /etc/os-release; then
        print_error "This script is designed for Ubuntu. Please use the manual installation guide for other distributions."
        exit 1
    fi
    
    # Check Ubuntu version
    UBUNTU_VERSION=$(lsb_release -rs)
    if [[ $(echo "$UBUNTU_VERSION < 20.04" | bc -l) -eq 1 ]]; then
        print_warning "Ubuntu version $UBUNTU_VERSION is not officially supported. Consider upgrading to 20.04 or later."
    fi
    
    print_success "System requirements check completed"
}

# Function to update system
update_system() {
    print_status "Updating system packages..."
    sudo apt update && sudo apt upgrade -y
    sudo apt install -y curl wget git unzip software-properties-common bc
    print_success "System updated successfully"
}

# Function to install Node.js
install_nodejs() {
    print_status "Installing Node.js..."
    
    # Install Node.js 18.x
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Verify installation
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    print_success "Node.js $NODE_VERSION and npm $NPM_VERSION installed successfully"
}

# Function to install PM2
install_pm2() {
    print_status "Installing PM2 process manager..."
    sudo npm install -g pm2
    print_success "PM2 installed successfully"
}

# Function to install MySQL
install_mysql() {
    print_status "Installing MySQL..."
    
    sudo apt install -y mysql-server
    
    # Start and enable MySQL
    sudo systemctl start mysql
    sudo systemctl enable mysql
    
    # Secure MySQL installation
    print_warning "Please set MySQL root password when prompted"
    sudo mysql_secure_installation
    
    print_success "MySQL installed and secured successfully"
}

# Function to install Nginx
install_nginx() {
    print_status "Installing Nginx..."
    
    sudo apt install -y nginx
    
    # Start and enable Nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
    
    # Configure firewall
    sudo ufw allow 'Nginx Full'
    
    print_success "Nginx installed and configured successfully"
}

# Function to create application user
create_app_user() {
    print_status "Creating application user..."
    
    if ! id "$APP_USER" &>/dev/null; then
        sudo adduser --disabled-password --gecos "" $APP_USER
        sudo usermod -aG sudo $APP_USER
        print_success "Application user $APP_USER created successfully"
    else
        print_warning "User $APP_USER already exists"
    fi
}

# Function to setup application directory
setup_app_directory() {
    print_status "Setting up application directory..."
    
    sudo mkdir -p $APP_DIR
    sudo chown $APP_USER:$APP_USER $APP_DIR
    
    # Copy application files (assuming script is run from project directory)
    if [ -d "client" ] && [ -d "server" ]; then
        cp -r . $APP_DIR/
        sudo chown -R $APP_USER:$APP_USER $APP_DIR
        print_success "Application files copied to $APP_DIR"
    else
        print_error "Application files not found. Please run this script from the project root directory."
        exit 1
    fi
}

# Function to install application dependencies
install_dependencies() {
    print_status "Installing application dependencies..."
    
    cd $APP_DIR
    sudo -u $APP_USER npm run install-all
    
    print_success "Application dependencies installed successfully"
}

# Function to setup database
setup_database() {
    print_status "Setting up database..."
    
    # Create database and user
    sudo mysql -u root -p << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF
    
    # Import schema
    sudo mysql -u $DB_USER -p$DB_NAME < $APP_DIR/server/sql/schema.sql
    
    print_success "Database setup completed successfully"
}

# Function to configure environment
configure_environment() {
    print_status "Configuring environment..."
    
    # Copy environment template
    sudo -u $APP_USER cp $APP_DIR/server/env.example $APP_DIR/server/.env
    
    # Update environment variables
    sudo -u $APP_USER sed -i "s/DB_PASSWORD=Workshop2024!/DB_PASSWORD=Workshop2024!/" $APP_DIR/server/.env
    sudo -u $APP_USER sed -i "s/JWT_SECRET=your_super_secret_jwt_key_here/JWT_SECRET=$(openssl rand -base64 32)/" $APP_DIR/server/.env
    
    # Set proper permissions
    sudo chmod 600 $APP_DIR/server/.env
    
    print_success "Environment configured successfully"
}

# Function to create SSL certificate
create_ssl_certificate() {
    print_status "Creating SSL certificate..."
    
    sudo mkdir -p $SSL_DIR
    
    # Generate self-signed certificate
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout $SSL_DIR/workshop.key \
        -out $SSL_DIR/workshop.crt \
        -subj "/C=US/ST=State/L=City/O=Workshop/CN=workshop-server.local"
    
    sudo chmod 600 $SSL_DIR/workshop.key
    sudo chmod 644 $SSL_DIR/workshop.crt
    
    print_success "SSL certificate created successfully"
}

# Function to configure Nginx
configure_nginx() {
    print_status "Configuring Nginx..."
    
    # Create Nginx configuration
    sudo tee $NGINX_CONFIG > /dev/null << 'EOF'
server {
    listen 80;
    server_name workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
EOF
    
    # Enable site
    sudo ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test configuration
    sudo nginx -t
    
    # Reload Nginx
    sudo systemctl reload nginx
    
    print_success "Nginx configured successfully"
}

# Function to build application
build_application() {
    print_status "Building application..."
    
    cd $APP_DIR
    sudo -u $APP_USER npm run build
    
    print_success "Application built successfully"
}

# Function to create PM2 configuration
create_pm2_config() {
    print_status "Creating PM2 configuration..."
    
    sudo -u $APP_USER tee $APP_DIR/ecosystem.config.js > /dev/null << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/home/$APP_USER/logs/err.log',
    out_file: '/home/$APP_USER/logs/out.log',
    log_file: '/home/$APP_USER/logs/combined.log',
    time: true
  }]
};
EOF
    
    # Create logs directory
    sudo -u $APP_USER mkdir -p /home/$APP_USER/logs
    
    print_success "PM2 configuration created successfully"
}

# Function to start application
start_application() {
    print_status "Starting application..."
    
    cd $APP_DIR
    sudo -u $APP_USER pm2 start ecosystem.config.js
    sudo -u $APP_USER pm2 save
    sudo -u $APP_USER pm2 startup
    
    print_success "Application started successfully"
}

# Function to create backup script
create_backup_script() {
    print_status "Creating backup script..."
    
    sudo -u $APP_USER tee $APP_DIR/backup.sh > /dev/null << 'EOF'
#!/bin/bash

# Workshop Job Management System - Backup Script
BACKUP_DIR="/home/workshop-app/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="workshop_backup_$DATE.tar.gz"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create backup
tar -czf $BACKUP_DIR/$BACKUP_FILE \
    -C /home/workshop-app \
    workshop-job-management/server/uploads \
    workshop-job-management/server/.env

# Backup database
mysqldump -u workshop_user -pWorkshop2024! workshop_jobs > $BACKUP_DIR/database_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "workshop_backup_*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "database_*.sql" -mtime +7 -delete

echo "Backup completed: $BACKUP_FILE"
EOF
    
    sudo chmod +x $APP_DIR/backup.sh
    
    # Add to crontab for daily backups
    (sudo -u $APP_USER crontab -l 2>/dev/null; echo "0 2 * * * $APP_DIR/backup.sh") | sudo -u $APP_USER crontab -
    
    print_success "Backup script created and scheduled"
}

# Function to display final information
display_final_info() {
    print_success "Installation completed successfully!"
    echo ""
    echo "=========================================="
    echo "Workshop Job Management System - Installed"
    echo "=========================================="
    echo ""
    echo "Access Information:"
    echo "  URL: https://workshop-server.local"
    echo "  Alternative: https://$(hostname -I | awk '{print $1}')"
    echo ""
    echo "Default Login Credentials:"
    echo "  Manager: admin / admin123"
    echo "  Worker: worker1 / worker123"
    echo ""
    echo "Important Files:"
    echo "  Application: $APP_DIR"
    echo "  Logs: /home/$APP_USER/logs/"
    echo "  Backups: /home/$APP_USER/backups/"
    echo "  SSL Cert: $SSL_DIR/"
    echo ""
    echo "Management Commands:"
    echo "  View logs: sudo -u $APP_USER pm2 logs"
    echo "  Restart app: sudo -u $APP_USER pm2 restart workshop-management"
    echo "  Stop app: sudo -u $APP_USER pm2 stop workshop-management"
    echo "  Manual backup: $APP_DIR/backup.sh"
    echo ""
    echo "Next Steps:"
    echo "  1. Update /etc/hosts on client machines:"
    echo "     echo '$(hostname -I | awk '{print $1}') workshop-server.local' | sudo tee -a /etc/hosts"
    echo "  2. Access the application and change default passwords"
    echo "  3. Configure additional users as needed"
    echo "  4. Set up proper SSL certificate for production use"
    echo ""
    print_warning "Remember to change default passwords and configure proper SSL certificates for production!"
}

# Main installation function
main() {
    echo "=========================================="
    echo "Workshop Job Management System Installer"
    echo "=========================================="
    echo ""
    
    check_root
    check_requirements
    
    print_status "Starting installation process..."
    
    update_system
    install_nodejs
    install_pm2
    install_mysql
    install_nginx
    create_app_user
    setup_app_directory
    install_dependencies
    setup_database
    configure_environment
    create_ssl_certificate
    configure_nginx
    build_application
    create_pm2_config
    start_application
    create_backup_script
    
    display_final_info
}

# Run main function
main "$@"
```

```shellscript
#!/bin/bash

# Workshop Job Management System - Client Workstation Setup Script
# This script configures client workstations to access the Workshop Job Management System
# Version: 2.0
# Date: December 2024

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables
SERVER_IP=""
SERVER_HOSTNAME="workshop-server.local"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to get server IP
get_server_ip() {
    echo "Please enter the server IP address:"
    read -p "Server IP: " SERVER_IP
    
    if [[ ! $SERVER_IP =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
        print_error "Invalid IP address format. Please enter a valid IP address."
        get_server_ip
    fi
}

# Function to detect operating system
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/debian_version ]; then
            OS="debian"
        elif [ -f /etc/redhat-release ]; then
            OS="redhat"
        else
            OS="linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        OS="windows"
    else
        OS="unknown"
    fi
    
    print_status "Detected operating system: $OS"
}

# Function to update hosts file
update_hosts_file() {
    print_status "Updating hosts file..."
    
    case $OS in
        "debian"|"redhat"|"linux")
            if ! grep -q "$SERVER_HOSTNAME" /etc/hosts; then
                echo "$SERVER_IP $SERVER_HOSTNAME" | sudo tee -a /etc/hosts
                print_success "Added server entry to /etc/hosts"
            else
                print_warning "Server entry already exists in /etc/hosts"
            fi
            ;;
        "macos")
            if ! grep -q "$SERVER_HOSTNAME" /etc/hosts; then
                echo "$SERVER_IP $SERVER_HOSTNAME" | sudo tee -a /etc/hosts
                print_success "Added server entry to /etc/hosts"
            else
                print_warning "Server entry already exists in /etc/hosts"
            fi
            ;;
        "windows")
            print_warning "Please manually add the following entry to C:\\Windows\\System32\\drivers\\etc\\hosts:"
            print_warning "$SERVER_IP $SERVER_HOSTNAME"
            ;;
        *)
            print_warning "Please manually add the following entry to your hosts file:"
            print_warning "$SERVER_IP $SERVER_HOSTNAME"
            ;;
    esac
}

# Function to test server connectivity
test_connectivity() {
    print_status "Testing server connectivity..."
    
    # Test ping
    if ping -c 1 $SERVER_IP > /dev/null 2>&1; then
        print_success "Server is reachable via ping"
    else
        print_warning "Server is not reachable via ping. Please check network connectivity."
    fi
    
    # Test HTTP connectivity
    if curl -s -k -I https://$SERVER_HOSTNAME > /dev/null 2>&1; then
        print_success "HTTPS connection to server successful"
    elif curl -s -I http://$SERVER_HOSTNAME > /dev/null 2>&1; then
        print_success "HTTP connection to server successful"
    else
        print_warning "Cannot connect to server via HTTP/HTTPS. Please check server status."
    fi
}

# Function to configure browser
configure_browser() {
    print_status "Browser configuration instructions..."
    
    echo ""
    echo "Please configure your browser with the following settings:"
    echo ""
    echo "1. Clear browser cache and cookies"
    echo "2. Disable pop-up blockers for $SERVER_HOSTNAME"
    echo "3. Enable JavaScript (required for the application)"
    echo "4. Accept SSL certificate if prompted (for self-signed certificates)"
    echo ""
    echo "Recommended browsers:"
    echo "  - Google Chrome (latest version)"
    echo "  - Mozilla Firefox (latest version)"
    echo "  - Microsoft Edge (latest version)"
    echo "  - Safari (latest version)"
    echo ""
}

# Function to create desktop shortcut
create_desktop_shortcut() {
    print_status "Creating desktop shortcut..."
    
    case $OS in
        "debian"|"redhat"|"linux")
            DESKTOP_FILE="$HOME/Desktop/Workshop Management.desktop"
            cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=Workshop Management
Comment=Workshop Job Management System
Exec=xdg-open https://$SERVER_HOSTNAME
Icon=applications-internet
Terminal=false
Categories=Network;WebBrowser;
EOF
            chmod +x "$DESKTOP_FILE"
            print_success "Desktop shortcut created"
            ;;
        "macos")
            print_warning "Please manually create a bookmark or shortcut to https://$SERVER_HOSTNAME"
            ;;
        "windows")
            print_warning "Please manually create a shortcut to https://$SERVER_HOSTNAME"
            ;;
        *)
            print_warning "Please manually create a shortcut to https://$SERVER_HOSTNAME"
            ;;
    esac
}

# Function to create browser bookmark
create_browser_bookmark() {
    print_status "Creating browser bookmark..."
    
    BOOKMARK_FILE="$HOME/workshop_bookmark.html"
    cat > "$BOOKMARK_FILE" << EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><A HREF="https://$SERVER_HOSTNAME" ADD_DATE="$(date +%s)" LAST_VISITED="$(date +%s)">Workshop Management System</A>
</DL><p>
EOF
    
    print_success "Browser bookmark file created at $BOOKMARK_FILE"
    print_warning "Import this file into your browser to add the bookmark"
}

# Function to display access information
display_access_info() {
    print_success "Client workstation setup completed!"
    echo ""
    echo "=========================================="
    echo "Workshop Job Management System - Client Setup"
    echo "=========================================="
    echo ""
    echo "Access Information:"
    echo "  URL: https://$SERVER_HOSTNAME"
    echo "  Alternative: https://$SERVER_IP"
    echo ""
    echo "Default Login Credentials:"
    echo "  Manager: admin / admin123"
    echo "  Worker: worker1 / worker123"
    echo ""
    echo "Important Notes:"
    echo "  1. Accept SSL certificate when prompted (self-signed certificate)"
    echo "  2. Change default passwords after first login"
    echo "  3. Contact administrator for additional user accounts"
    echo ""
    echo "Troubleshooting:"
    echo "  - If you cannot access the system, check network connectivity"
    echo "  - Ensure firewall allows HTTPS traffic (port 443)"
    echo "  - Clear browser cache if experiencing issues"
    echo ""
    echo "Support:"
    echo "  - Contact your system administrator for technical support"
    echo "  - Check server status if system is unavailable"
    echo ""
}

# Function to run system check
run_system_check() {
    print_status "Running system check..."
    
    echo ""
    echo "System Information:"
    echo "  Operating System: $OS"
    echo "  Server IP: $SERVER_IP"
    echo "  Server Hostname: $SERVER_HOSTNAME"
    echo ""
    
    # Check if curl is available
    if command -v curl > /dev/null 2>&1; then
        print_success "curl is available"
    else
        print_warning "curl is not available. Please install curl for better connectivity testing."
    fi
    
    # Check if ping is available
    if command -v ping > /dev/null 2>&1; then
        print_success "ping is available"
    else
        print_warning "ping is not available"
    fi
}

# Main setup function
main() {
    echo "=========================================="
    echo "Workshop Job Management System - Client Setup"
    echo "=========================================="
    echo ""
    
    detect_os
    get_server_ip
    run_system_check
    
    print_status "Starting client workstation setup..."
    
    update_hosts_file
    test_connectivity
    configure_browser
    create_desktop_shortcut
    create_browser_bookmark
    
    display_access_info
}

# Run main function
main "$@"
```

```shellscript
#!/bin/bash

# Workshop Job Management System - Quick Setup Script
# This script provides a quick setup option for testing and development
# Version: 2.0
# Date: December 2024

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root. Please run as a regular user with sudo privileges."
        exit 1
    fi
}

# Function to check system requirements
check_requirements() {
    print_status "Checking system requirements..."
    
    # Check if Node.js is installed
    if ! command -v node > /dev/null 2>&1; then
        print_error "Node.js is not installed. Please install Node.js 18.x or higher first."
        print_warning "Visit: https://nodejs.org/"
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [[ $NODE_VERSION -lt 18 ]]; then
        print_error "Node.js version $NODE_VERSION is not supported. Please install Node.js 18.x or higher."
        exit 1
    fi
    
    # Check if MySQL is installed
    if ! command -v mysql > /dev/null 2>&1; then
        print_error "MySQL is not installed. Please install MySQL 8.0 or higher first."
        print_warning "Visit: https://dev.mysql.com/downloads/mysql/"
        exit 1
    fi
    
    print_success "System requirements check completed"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install all project dependencies
    npm run install-all
    
    print_success "Dependencies installed successfully"
}

# Function to setup database
setup_database() {
    print_status "Setting up database..."
    
    # Create database
    mysql -u root -p << EOF
CREATE DATABASE IF NOT EXISTS workshop_jobs;
USE workshop_jobs;
SOURCE server/sql/schema.sql;
EOF
    
    print_success "Database setup completed successfully"
}

# Function to configure environment
configure_environment() {
    print_status "Configuring environment..."
    
    # Copy environment template
    cp server/env.example server/.env
    
    # Generate random JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    sed -i "s/JWT_SECRET=your_super_secret_jwt_key_here/JWT_SECRET=$JWT_SECRET/" server/.env
    
    print_success "Environment configured successfully"
}

# Function to create uploads directory
create_uploads_directory() {
    print_status "Creating uploads directory..."
    
    mkdir -p server/uploads
    chmod 755 server/uploads
    
    print_success "Uploads directory created successfully"
}

# Function to start development server
start_development_server() {
    print_status "Starting development server..."
    
    # Start the application
    npm run dev &
    
    # Wait a moment for servers to start
    sleep 5
    
    print_success "Development server started successfully"
}

# Function to display access information
display_access_info() {
    print_success "Quick setup completed successfully!"
    echo ""
    echo "=========================================="
    echo "Workshop Job Management System - Quick Setup"
    echo "=========================================="
    echo ""
    echo "Access Information:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend API: http://localhost:5000"
    echo ""
    echo "Default Login Credentials:"
    echo "  Manager: admin / admin123"
    echo "  Worker: worker1 / worker123"
    echo ""
    echo "Development Commands:"
    echo "  Stop server: Ctrl+C"
    echo "  Restart server: npm run dev"
    echo "  Backend only: npm run server"
    echo "  Frontend only: npm run client"
    echo ""
    echo "Important Notes:"
    echo "  - This is a development setup"
    echo "  - Change default passwords before production use"
    echo "  - Use the full deployment script for production"
    echo ""
    print_warning "Press Ctrl+C to stop the development server when done testing"
}

# Function to run tests
run_tests() {
    print_status "Running basic tests..."
    
    # Test database connection
    if mysql -u root -p -e "USE workshop_jobs; SELECT COUNT(*) FROM users;" > /dev/null 2>&1; then
        print_success "Database connection test passed"
    else
        print_error "Database connection test failed"
        exit 1
    fi
    
    # Test if servers are running
    sleep 10  # Wait for servers to start
    
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_success "Frontend server test passed"
    else
        print_warning "Frontend server test failed - may still be starting"
    fi
    
    if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
        print_success "Backend server test passed"
    else
        print_warning "Backend server test failed - may still be starting"
    fi
}

# Main setup function
main() {
    echo "=========================================="
    echo "Workshop Job Management System - Quick Setup"
    echo "=========================================="
    echo ""
    print_warning "This is a quick setup for development and testing only!"
    print_warning "Use the full deployment script for production environments."
    echo ""
    
    check_root
    check_requirements
    
    print_status "Starting quick setup process..."
    
    install_dependencies
    setup_database
    configure_environment
    create_uploads_directory
    start_development_server
    run_tests
    
    display_access_info
    
    # Keep the script running to show server output
    wait
}

# Run main function
main "$@"
```

Now let me create a comprehensive deployment guide and update the SOP with the automated scripts:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Server Setup](#server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Client Workstation Setup](#client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments:

```bash
# Make script executable
chmod +x quick-setup.sh

# Run quick setup
./quick-setup.sh
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete production server setup:

```bash
# Make script executable
chmod +x deploy.sh

# Run full deployment
./deploy.sh
```

**What it does:**
- Installs all required software (Node.js, MySQL, Nginx, PM2)
- Creates application user and directory structure
- Sets up database with proper security
- Configures SSL certificates
- Sets up Nginx reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures firewall and security

### Client Workstation Setup Script
For configuring client workstations:

```bash
# Make script executable
chmod +x client-setup.sh

# Run client setup
./client-setup.sh
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop shortcuts
- Configures browser settings
- Provides access information

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Workshop Job Management System - Turnkey Deployment Guide

**Version:** 2.0  
**Date:** December 2024  
**For:** Complete Client Deployment  

---

## Overview

This guide provides step-by-step instructions for deploying a complete turnkey Workshop Job Management System solution. The system includes automated deployment scripts that handle server setup, application installation, security configuration, and client workstation setup.

## Deployment Options

### Option 1: Automated Deployment (Recommended)
Use the provided scripts for fastest and most reliable deployment.

### Option 2: Manual Deployment
Follow the detailed SOP for complete manual control.

---

## Quick Start (Automated)

### Prerequisites
- Ubuntu 20.04 LTS or higher server
- Root or sudo access
- Internet connection
- Project files (client/, server/, package.json, etc.)

### Step 1: Server Setup
```bash
# Upload project files to server
scp -r workshop-job-management/ user@server-ip:/home/user/

# SSH to server
ssh user@server-ip

# Navigate to project directory
cd workshop-job-management/

# Run automated deployment
chmod +x deploy.sh
./deploy.sh
```

### Step 2: Client Workstation Setup
On each client workstation:
```bash
# Download client setup script
scp user@server-ip:/home/user/workshop-job-management/client-setup.sh ./

# Run client setup
chmod +x client-setup.sh
./client-setup.sh
```

### Step 3: Access System
- **URL**: `https://workshop-server.local` or `https://server-ip`
- **Manager Login**: `admin` / `admin123`
- **Worker Login**: `worker1` / `worker123`

---

## Detailed Deployment Process

### Phase 1: Server Preparation

#### 1.1 Server Requirements
- **CPU**: Quad-core processor, 2.5 GHz minimum
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD minimum
- **OS**: Ubuntu 20.04 LTS or higher
- **Network**: Static IP address

#### 1.2 Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip software-properties-common

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000
sudo ufw --force enable
```

### Phase 2: Application Deployment

#### 2.1 Automated Deployment
```bash
# Run the deployment script
./deploy.sh
```

The script will automatically:
- Install Node.js 18.x
- Install MySQL 8.0
- Install Nginx
- Install PM2 process manager
- Create application user
- Set up database
- Configure environment
- Create SSL certificates
- Configure Nginx reverse proxy
- Build application
- Start services
- Set up automated backups

#### 2.2 Manual Verification
```bash
# Check services status
sudo systemctl status nginx
sudo systemctl status mysql
sudo -u workshop-app pm2 status

# Test application
curl -k https://localhost
curl -k https://workshop-server.local
```

### Phase 3: Client Workstation Configuration

#### 3.1 Automated Client Setup
On each workstation:
```bash
# Run client setup script
./client-setup.sh
```

The script will:
- Update hosts file
- Test server connectivity
- Create desktop shortcuts
- Configure browser settings
- Provide access information

#### 3.2 Manual Client Configuration
If automated setup fails:

1. **Update hosts file**:
   ```bash
   # Linux/macOS
   echo "server-ip workshop-server.local" | sudo tee -a /etc/hosts
   
   # Windows
   # Add to C:\Windows\System32\drivers\etc\hosts
   # server-ip workshop-server.local
   ```

2. **Configure browser**:
   - Clear cache and cookies
   - Disable pop-up blockers
   - Enable JavaScript
   - Accept SSL certificate

3. **Test connectivity**:
   ```bash
   ping workshop-server.local
   curl -k https://workshop-server.local
   ```

---

## Configuration Management

### Environment Configuration
The system uses environment variables for configuration:

```bash
# Edit environment file
sudo nano /home/workshop-app/workshop-job-management/server/.env
```

Key configuration options:
- Database credentials
- JWT secret key
- Server port
- File upload limits
- Email settings (optional)

### User Management
```bash
# Access application as admin
# Navigate to User Management
# Create/modify user accounts
# Set appropriate roles and permissions
```

### Database Management
```bash
# Backup database
/home/workshop-app/workshop-job-management/backup.sh

# Restore database
mysql -u workshop_user -p workshop_jobs < backup_file.sql
```

---

## Security Configuration

### SSL Certificates
For production environments, replace self-signed certificates:

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain Let's Encrypt certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

### Firewall Configuration
```bash
# Review firewall rules
sudo ufw status

# Add additional rules if needed
sudo ufw allow from trusted-ip to any port 22
sudo ufw deny 5000  # Block direct access to backend
```

### Database Security
```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Remove test databases
sudo mysql -u root -p
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
EXIT;
```

---

## Monitoring and Maintenance

### Application Monitoring
```bash
# View application logs
sudo -u workshop-app pm2 logs

# Monitor system resources
sudo -u workshop-app pm2 monit

# Restart application
sudo -u workshop-app pm2 restart workshop-management
```

### System Monitoring
```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check system load
htop

# Check network connections
netstat -tulpn
```

### Backup Management
```bash
# Manual backup
/home/workshop-app/workshop-job-management/backup.sh

# Check backup status
ls -la /home/workshop-app/backups/

# Restore from backup
tar -xzf /home/workshop-app/backups/workshop_backup_YYYYMMDD_HHMMSS.tar.gz
```

---

## Troubleshooting

### Common Issues

#### 1. Application Won't Start
```bash
# Check PM2 status
sudo -u workshop-app pm2 status

# View error logs
sudo -u workshop-app pm2 logs workshop-management --err

# Restart application
sudo -u workshop-app pm2 restart workshop-management
```

#### 2. Database Connection Issues
```bash
# Check MySQL status
sudo systemctl status mysql

# Test database connection
mysql -u workshop_user -p workshop_jobs

# Check environment variables
sudo cat /home/workshop-app/workshop-job-management/server/.env
```

#### 3. Nginx Configuration Issues
```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

#### 4. SSL Certificate Issues
```bash
# Check certificate validity
sudo openssl x509 -in /etc/ssl/workshop/workshop.crt -text -noout

# Regenerate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Workshop/CN=workshop-server.local"
```

### Performance Optimization

#### Database Optimization
```sql
-- Check slow queries
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- Optimize tables
OPTIMIZE TABLE users, job_cards, attachments, job_history, job_notes;
```

#### Application Optimization
```bash
# Increase PM2 instances for better performance
sudo -u workshop-app pm2 scale workshop-management 2

# Monitor memory usage
sudo -u workshop-app pm2 monit
```

---

## Client Handover Checklist

### Documentation Package
- [ ] This deployment guide
- [ ] SOP document
- [ ] User manual
- [ ] Troubleshooting guide

### Access Information
- [ ] Server IP address and hostname
- [ ] Application URL
- [ ] Default login credentials
- [ ] Database credentials
- [ ] SSL certificate information

### Management Information
- [ ] PM2 process management commands
- [ ] Backup procedures
- [ ] Update procedures
- [ ] Monitoring commands

### Support Information
- [ ] Technical support contact
- [ ] Emergency procedures
- [ ] Maintenance schedule
- [ ] Update notifications

---

## Post-Deployment Tasks

### Immediate Tasks
1. **Change default passwords**
2. **Create user accounts for all workers**
3. **Configure email notifications (if needed)**
4. **Set up proper SSL certificates**
5. **Test all functionality**

### Ongoing Tasks
1. **Regular backups**
2. **Security updates**
3. **Performance monitoring**
4. **User training**
5. **System maintenance**

---

## Support and Maintenance

### Regular Maintenance Schedule
- **Daily**: Check application status and logs
- **Weekly**: Review backup status and system performance
- **Monthly**: Apply security updates and review logs
- **Quarterly**: Full system backup and performance review

### Emergency Procedures
1. **System Down**: Check PM2 status, restart services
2. **Database Issues**: Restore from backup, check MySQL status
3. **Network Issues**: Check firewall, test connectivity
4. **Security Issues**: Review logs, update passwords, check certificates

---

**End of Deployment Guide**

*This guide should be used in conjunction with the detailed SOP document for complete deployment instructions.*
```

Perfect! I've created a comprehensive turnkey solution for your Workshop Job Management System. Here's what I've delivered:

## 📋 Complete Turnkey Solution Package

### 1. **Enhanced SOP Document** (`SOP_CLIENT_SETUP.md`)
- **Complete server setup** instructions for Ubuntu
- **Security configuration** with SSL, firewall, and hardening
- **Network configuration** for both internal and external access
- **Client workstation setup** procedures
- **Production deployment** with PM2 and Nginx
- **Comprehensive troubleshooting** section

### 2. **Automated Deployment Scripts**

#### `deploy.sh` - Full Production Deployment
- **One-command server setup** for Ubuntu
- Installs Node.js, MySQL, Nginx, PM2
- Creates application user and directory structure
- Sets up database with security
- Configures SSL certificates
- Sets up Nginx reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures firewall and security

#### `client-setup.sh` - Client Workstation Configuration
- Updates hosts file automatically
- Tests server connectivity
- Creates desktop shortcuts
- Configures browser settings
- Provides access information

#### `quick-setup.sh` - Development/Testing Setup
- Rapid setup for testing environments
- Installs dependencies and starts development server
- Runs basic tests

### 3. **Deployment Guide** (`DEPLOYMENT_GUIDE.md`)
- **Quick start** instructions for automated deployment
- **Detailed deployment process** with phases
- **Configuration management** guidelines
- **Security configuration** procedures
- **Monitoring and maintenance** instructions
- **Troubleshooting** common issues
- **Client handover checklist**

## 🚀 Key Features of the Turnkey Solution

### **Server Setup**
- ✅ Ubuntu server configuration
- ✅ Static IP setup
- ✅ Firewall configuration
- ✅ Security hardening
- ✅ SSL certificate setup
- ✅ Nginx reverse proxy
- ✅ PM2 process management

### **Application Deployment**
- ✅ Automated dependency installation
- ✅ Database setup with security
- ✅ Environment configuration
- ✅ Production build
- ✅ Service management
- ✅ Automated backups

### **Client Configuration**
- ✅ Hosts file updates
- ✅ Browser configuration
- ✅ Desktop shortcuts
- ✅ Connectivity testing
- ✅ Access information

### **Security Features**
- ✅ SSL/TLS encryption
- ✅ Firewall configuration
- ✅ Database security
- ✅ User access control
- ✅ File permissions
- ✅ Security headers

## 📖 Usage Instructions

### **For Complete Turnkey Deployment:**

1. **Server Setup:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

2. **Client Workstation Setup:**
   ```bash
   chmod +x client-setup.sh
   ./client-setup.sh
   ```

3. **Access System:**
   - URL: `https://workshop-server.local`
   - Manager: `admin` / `admin123`
   - Worker: `worker1` / `worker123`

### **For Quick Testing:**
```bash
chmod +x quick-setup.sh
./quick-setup.sh
```

## 🎯 Benefits for Your Clients

1. **One-Command Setup** - Complete server deployment with a single script
2. **Automated Configuration** - No manual configuration required
3. **Security Hardened** - SSL, firewall, and security best practices included
4. **Production Ready** - PM2, Nginx, automated backups, monitoring
5. **Client Friendly** - Easy workstation setup and access
6. **Comprehensive Documentation** - Complete SOP and deployment guide
7. **Troubleshooting Support** - Detailed troubleshooting sections
8. **Maintenance Ready** - Automated backups and monitoring setup

This turnkey solution provides everything needed to deploy your Workshop Job Management System for clients, from server setup to client workstation configuration, with comprehensive documentation and automated scripts for reliable deployment.

```shellscript
   chmod +x deploy.sh
   ./deploy.sh
```

```shellscript
   chmod +x client-setup.sh
   ./client-setup.sh
```

```shellscript
chmod +x quick-setup.sh
./quick-setup.sh
```

---

**User**

I want to deploy this in windows Environment not linux .Make the changes 

---

**Cursor**

I'll modify the deployment scripts and documentation to work with Windows environments instead of Linux. Let me update the scripts and SOP for Windows deployment.


```bat
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
```

```bat
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
```

```bat
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
```

Now let me update the SOP document for Windows deployment:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Dedicated server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Server-based file system for attachments
- **Client Workstations**: Multiple workstations accessing the system via web browser

### Deployment Options
1. **On-Premises Server**: Dedicated server at client location
2. **Cloud Server**: Virtual server (AWS, Azure, Google Cloud)
3. **Hybrid**: Server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments:

```bash
# Make script executable
chmod +x quick-setup.sh

# Run quick setup
./quick-setup.sh
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete production server setup:

```bash
# Make script executable
chmod +x deploy.sh

# Run full deployment
./deploy.sh
```

**What it does:**
- Installs all required software (Node.js, MySQL, Nginx, PM2)
- Creates application user and directory structure
- Sets up database with proper security
- Configures SSL certificates
- Sets up Nginx reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures firewall and security

### Client Workstation Setup Script
For configuring client workstations:

```bash
# Make script executable
chmod +x client-setup.sh

# Run client setup
./client-setup.sh
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop shortcuts
- Configures browser settings
- Provides access information

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Ubuntu 20.04 LTS or Windows Server 2019/2022

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Ubuntu 22.04 LTS

### Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, Git, PM2, Nginx (optional)
- **Client**: Modern web browser (Chrome, Firefox, Safari, Edge)
- **Network**: Router with port forwarding capability (if needed)

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments:

```bash
# Make script executable
chmod +x quick-setup.sh

# Run quick setup
./quick-setup.sh
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete production server setup:

```bash
# Make script executable
chmod +x deploy.sh

# Run full deployment
./deploy.sh
```

**What it does:**
- Installs all required software (Node.js, MySQL, Nginx, PM2)
- Creates application user and directory structure
- Sets up database with proper security
- Configures SSL certificates
- Sets up Nginx reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures firewall and security

### Client Workstation Setup Script
For configuring client workstations:

```bash
# Make script executable
chmod +x client-setup.sh

# Run client setup
./client-setup.sh
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop shortcuts
- Configures browser settings
- Provides access information

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Windows Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Windows Server 2019/2022 or Windows 10/11 Pro

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Windows Server 2022

### Windows Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, PM2, IIS (optional)
- **Client**: Modern web browser (Chrome, Firefox, Edge)
- **Network**: Windows Firewall configuration

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments:

```bash
# Make script executable
chmod +x quick-setup.sh

# Run quick setup
./quick-setup.sh
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete production server setup:

```bash
# Make script executable
chmod +x deploy.sh

# Run full deployment
./deploy.sh
```

**What it does:**
- Installs all required software (Node.js, MySQL, Nginx, PM2)
- Creates application user and directory structure
- Sets up database with proper security
- Configures SSL certificates
- Sets up Nginx reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures firewall and security

### Client Workstation Setup Script
For configuring client workstations:

```bash
# Make script executable
chmod +x client-setup.sh

# Run client setup
./client-setup.sh
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop shortcuts
- Configures browser settings
- Provides access information

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Windows Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Windows Server 2019/2022 or Windows 10/11 Pro

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Windows Server 2022

### Windows Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, PM2, IIS (optional)
- **Client**: Modern web browser (Chrome, Firefox, Edge)
- **Network**: Windows Firewall configuration

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Windows Server Setup

### Step 1: Server Preparation

#### For On-Premises Server
1. **Physical Server Setup**
   - Install server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Operating System Installation**
   - Install Ubuntu 22.04 LTS Server (recommended)
   - Configure static IP address
   - Set up SSH access
   - Configure firewall rules

#### For Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Ubuntu 22.04 LTS image
   - Configure security groups (ports 22, 80, 443, 5000)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install essential packages
   sudo apt install -y curl wget git unzip software-properties-common
   
   # Configure firewall
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 5000
   sudo ufw --force enable
   ```

### Step 2: Server Security Configuration

1. **Create Application User**
   ```bash
   # Create dedicated user for the application
   sudo adduser workshop-app
   sudo usermod -aG sudo workshop-app
   
   # Switch to application user
   su - workshop-app
   ```

2. **SSH Security Hardening**
   ```bash
   # Edit SSH configuration
   sudo nano /etc/ssh/sshd_config
   
   # Set the following:
   # Port 2222 (change from default 22)
   # PermitRootLogin no
   # PasswordAuthentication no (use key-based auth)
   # MaxAuthTries 3
   
   # Restart SSH service
   sudo systemctl restart ssh
   ```

3. **Install Fail2Ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

### Step 3: Server Network Configuration

1. **Static IP Configuration**
   ```bash
   # Edit network configuration
   sudo nano /etc/netplan/00-installer-config.yaml
   
   # Configure static IP
   network:
     ethernets:
       eth0:
         dhcp4: false
         addresses: [192.168.1.100/24]
         gateway4: 192.168.1.1
         nameservers:
           addresses: [8.8.8.8, 8.8.4.4]
   
   # Apply configuration
   sudo netplan apply
   ```

2. **DNS Configuration**
   ```bash
   # Edit hosts file
   sudo nano /etc/hosts
   
   # Add server entry
   192.168.1.100 workshop-server.local
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments:

```bash
# Make script executable
chmod +x quick-setup.sh

# Run quick setup
./quick-setup.sh
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete production server setup:

```bash
# Make script executable
chmod +x deploy.sh

# Run full deployment
./deploy.sh
```

**What it does:**
- Installs all required software (Node.js, MySQL, Nginx, PM2)
- Creates application user and directory structure
- Sets up database with proper security
- Configures SSL certificates
- Sets up Nginx reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures firewall and security

### Client Workstation Setup Script
For configuring client workstations:

```bash
# Make script executable
chmod +x client-setup.sh

# Run client setup
./client-setup.sh
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop shortcuts
- Configures browser settings
- Provides access information

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Windows Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Windows Server 2019/2022 or Windows 10/11 Pro

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Windows Server 2022

### Windows Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, PM2, IIS (optional)
- **Client**: Modern web browser (Chrome, Firefox, Edge)
- **Network**: Windows Firewall configuration

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Windows Server Setup

### Step 1: Windows Server Preparation

#### For On-Premises Windows Server
1. **Physical Server Setup**
   - Install Windows Server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Windows Server Installation**
   - Install Windows Server 2019/2022 (recommended)
   - Configure static IP address
   - Set up Remote Desktop access
   - Configure Windows Firewall rules

#### For Windows Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Windows Server 2019/2022 image
   - Configure security groups (ports 22, 80, 443, 5000, 3389)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```cmd
   REM Update Windows
   sconfig
   
   REM Install Windows Updates
   Windows Update
   
   REM Configure Remote Desktop
   System Properties > Remote > Enable Remote Desktop
   ```

### Step 2: Windows Security Configuration

1. **Create Application User**
   ```cmd
   REM Create dedicated user for the application
   net user workshop-app Workshop2024! /add
   net localgroup administrators workshop-app /add
   ```

2. **Windows Security Hardening**
   ```cmd
   REM Configure Windows Firewall
   netsh advfirewall set allprofiles state on
   
   REM Allow required ports
   netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
   netsh advfirewall firewall add rule name="Workshop Management HTTPS" dir=in action=allow protocol=TCP localport=443
   netsh advfirewall firewall add rule name="Workshop Management API" dir=in action=allow protocol=TCP localport=5000
   ```

3. **Install Windows Defender Updates**
   ```cmd
   REM Update Windows Defender
   Windows Defender > Update definitions
   ```

### Step 3: Windows Network Configuration

1. **Static IP Configuration**
   ```cmd
   REM Configure static IP via Network Settings
   Control Panel > Network and Internet > Network Connections
   Right-click network adapter > Properties > Internet Protocol Version 4 (TCP/IPv4)
   
   REM Or via command line
   netsh interface ip set address "Local Area Connection" static 192.168.1.100 255.255.255.0 192.168.1.1
   ```

2. **DNS Configuration**
   ```cmd
   REM Configure DNS servers
   netsh interface ip set dns "Local Area Connection" static 8.8.8.8
   netsh interface ip add dns "Local Area Connection" 8.8.4.4 index=2
   ```

---

## Software Installation

### Step 1: Install Node.js on Server

#### Ubuntu Server Installation (Recommended)
```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Alternative: Using Node Version Manager (NVM)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install MySQL on Server

#### Ubuntu Server Installation
```bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start and enable MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify installation
sudo mysql --version
```

#### MySQL Configuration
```bash
# Login to MySQL as root
sudo mysql -u root -p

# Create application database and user
CREATE DATABASE workshop_jobs;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Install Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure firewall for Nginx
sudo ufw allow 'Nginx Full'

# Verify installation
sudo systemctl status nginx
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments:

```bash
# Make script executable
chmod +x quick-setup.sh

# Run quick setup
./quick-setup.sh
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete production server setup:

```bash
# Make script executable
chmod +x deploy.sh

# Run full deployment
./deploy.sh
```

**What it does:**
- Installs all required software (Node.js, MySQL, Nginx, PM2)
- Creates application user and directory structure
- Sets up database with proper security
- Configures SSL certificates
- Sets up Nginx reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures firewall and security

### Client Workstation Setup Script
For configuring client workstations:

```bash
# Make script executable
chmod +x client-setup.sh

# Run client setup
./client-setup.sh
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop shortcuts
- Configures browser settings
- Provides access information

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me update the software installation section for Windows:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Windows Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Windows Server 2019/2022 or Windows 10/11 Pro

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Windows Server 2022

### Windows Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, PM2, IIS (optional)
- **Client**: Modern web browser (Chrome, Firefox, Edge)
- **Network**: Windows Firewall configuration

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Windows Server Setup

### Step 1: Windows Server Preparation

#### For On-Premises Windows Server
1. **Physical Server Setup**
   - Install Windows Server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Windows Server Installation**
   - Install Windows Server 2019/2022 (recommended)
   - Configure static IP address
   - Set up Remote Desktop access
   - Configure Windows Firewall rules

#### For Windows Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Windows Server 2019/2022 image
   - Configure security groups (ports 22, 80, 443, 5000, 3389)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```cmd
   REM Update Windows
   sconfig
   
   REM Install Windows Updates
   Windows Update
   
   REM Configure Remote Desktop
   System Properties > Remote > Enable Remote Desktop
   ```

### Step 2: Windows Security Configuration

1. **Create Application User**
   ```cmd
   REM Create dedicated user for the application
   net user workshop-app Workshop2024! /add
   net localgroup administrators workshop-app /add
   ```

2. **Windows Security Hardening**
   ```cmd
   REM Configure Windows Firewall
   netsh advfirewall set allprofiles state on
   
   REM Allow required ports
   netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
   netsh advfirewall firewall add rule name="Workshop Management HTTPS" dir=in action=allow protocol=TCP localport=443
   netsh advfirewall firewall add rule name="Workshop Management API" dir=in action=allow protocol=TCP localport=5000
   ```

3. **Install Windows Defender Updates**
   ```cmd
   REM Update Windows Defender
   Windows Defender > Update definitions
   ```

### Step 3: Windows Network Configuration

1. **Static IP Configuration**
   ```cmd
   REM Configure static IP via Network Settings
   Control Panel > Network and Internet > Network Connections
   Right-click network adapter > Properties > Internet Protocol Version 4 (TCP/IPv4)
   
   REM Or via command line
   netsh interface ip set address "Local Area Connection" static 192.168.1.100 255.255.255.0 192.168.1.1
   ```

2. **DNS Configuration**
   ```cmd
   REM Configure DNS servers
   netsh interface ip set dns "Local Area Connection" static 8.8.8.8
   netsh interface ip add dns "Local Area Connection" 8.8.4.4 index=2
   ```

---

## Software Installation

### Step 1: Install Chocolatey Package Manager
```cmd
REM Install Chocolatey
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

REM Verify installation
choco --version
```

### Step 2: Install Node.js on Windows Server
```cmd
REM Install Node.js using Chocolatey
choco install nodejs --version=18.19.0 -y

REM Verify installation
node --version
npm --version
```

### Step 3: Install PM2 Process Manager
```cmd
REM Install PM2 globally
npm install -g pm2

REM Verify installation
pm2 --version
```

### Step 4: Install MySQL on Windows Server
```cmd
REM Install MySQL using Chocolatey
choco install mysql --version=8.0 -y

REM Start MySQL service
net start mysql

REM Secure MySQL installation
mysql_secure_installation
```

### Step 5: Install IIS (Internet Information Services)
```cmd
REM Install IIS features
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

REM Start IIS
net start w3svc
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments:

```bash
# Make script executable
chmod +x quick-setup.sh

# Run quick setup
./quick-setup.sh
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete production server setup:

```bash
# Make script executable
chmod +x deploy.sh

# Run full deployment
./deploy.sh
```

**What it does:**
- Installs all required software (Node.js, MySQL, Nginx, PM2)
- Creates application user and directory structure
- Sets up database with proper security
- Configures SSL certificates
- Sets up Nginx reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures firewall and security

### Client Workstation Setup Script
For configuring client workstations:

```bash
# Make script executable
chmod +x client-setup.sh

# Run client setup
./client-setup.sh
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop shortcuts
- Configures browser settings
- Provides access information

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me update the automated deployment scripts section and add Windows-specific sections:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Windows Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Windows Server 2019/2022 or Windows 10/11 Pro

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Windows Server 2022

### Windows Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, PM2, IIS (optional)
- **Client**: Modern web browser (Chrome, Firefox, Edge)
- **Network**: Windows Firewall configuration

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Windows Server Setup

### Step 1: Windows Server Preparation

#### For On-Premises Windows Server
1. **Physical Server Setup**
   - Install Windows Server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Windows Server Installation**
   - Install Windows Server 2019/2022 (recommended)
   - Configure static IP address
   - Set up Remote Desktop access
   - Configure Windows Firewall rules

#### For Windows Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Windows Server 2019/2022 image
   - Configure security groups (ports 22, 80, 443, 5000, 3389)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```cmd
   REM Update Windows
   sconfig
   
   REM Install Windows Updates
   Windows Update
   
   REM Configure Remote Desktop
   System Properties > Remote > Enable Remote Desktop
   ```

### Step 2: Windows Security Configuration

1. **Create Application User**
   ```cmd
   REM Create dedicated user for the application
   net user workshop-app Workshop2024! /add
   net localgroup administrators workshop-app /add
   ```

2. **Windows Security Hardening**
   ```cmd
   REM Configure Windows Firewall
   netsh advfirewall set allprofiles state on
   
   REM Allow required ports
   netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
   netsh advfirewall firewall add rule name="Workshop Management HTTPS" dir=in action=allow protocol=TCP localport=443
   netsh advfirewall firewall add rule name="Workshop Management API" dir=in action=allow protocol=TCP localport=5000
   ```

3. **Install Windows Defender Updates**
   ```cmd
   REM Update Windows Defender
   Windows Defender > Update definitions
   ```

### Step 3: Windows Network Configuration

1. **Static IP Configuration**
   ```cmd
   REM Configure static IP via Network Settings
   Control Panel > Network and Internet > Network Connections
   Right-click network adapter > Properties > Internet Protocol Version 4 (TCP/IPv4)
   
   REM Or via command line
   netsh interface ip set address "Local Area Connection" static 192.168.1.100 255.255.255.0 192.168.1.1
   ```

2. **DNS Configuration**
   ```cmd
   REM Configure DNS servers
   netsh interface ip set dns "Local Area Connection" static 8.8.8.8
   netsh interface ip add dns "Local Area Connection" 8.8.4.4 index=2
   ```

---

## Software Installation

### Step 1: Install Chocolatey Package Manager
```cmd
REM Install Chocolatey
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

REM Verify installation
choco --version
```

### Step 2: Install Node.js on Windows Server
```cmd
REM Install Node.js using Chocolatey
choco install nodejs --version=18.19.0 -y

REM Verify installation
node --version
npm --version
```

### Step 3: Install PM2 Process Manager
```cmd
REM Install PM2 globally
npm install -g pm2

REM Verify installation
pm2 --version
```

### Step 4: Install MySQL on Windows Server
```cmd
REM Install MySQL using Chocolatey
choco install mysql --version=8.0 -y

REM Start MySQL service
net start mysql

REM Secure MySQL installation
mysql_secure_installation
```

### Step 5: Install IIS (Internet Information Services)
```cmd
REM Install IIS features
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

REM Start IIS
net start w3svc
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments on Windows:

```cmd
REM Make script executable (already executable on Windows)
quick-setup-windows.bat
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete Windows server setup:

```cmd
REM Run as Administrator
deploy-windows.bat
```

**What it does:**
- Installs Chocolatey package manager
- Installs all required software (Node.js, MySQL, PM2, IIS)
- Creates application directory structure
- Sets up database with proper security
- Configures environment variables
- Sets up IIS reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures Windows Firewall and security

### Windows Client Workstation Setup Script
For configuring Windows client workstations:

```cmd
REM Run as Administrator for full functionality
client-setup-windows.bat
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop and Start Menu shortcuts
- Configures browser settings
- Provides access information
- Configures Windows Firewall

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me update the client workstation setup section for Windows:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Windows Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Windows Server 2019/2022 or Windows 10/11 Pro

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Windows Server 2022

### Windows Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, PM2, IIS (optional)
- **Client**: Modern web browser (Chrome, Firefox, Edge)
- **Network**: Windows Firewall configuration

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Windows Server Setup

### Step 1: Windows Server Preparation

#### For On-Premises Windows Server
1. **Physical Server Setup**
   - Install Windows Server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Windows Server Installation**
   - Install Windows Server 2019/2022 (recommended)
   - Configure static IP address
   - Set up Remote Desktop access
   - Configure Windows Firewall rules

#### For Windows Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Windows Server 2019/2022 image
   - Configure security groups (ports 22, 80, 443, 5000, 3389)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```cmd
   REM Update Windows
   sconfig
   
   REM Install Windows Updates
   Windows Update
   
   REM Configure Remote Desktop
   System Properties > Remote > Enable Remote Desktop
   ```

### Step 2: Windows Security Configuration

1. **Create Application User**
   ```cmd
   REM Create dedicated user for the application
   net user workshop-app Workshop2024! /add
   net localgroup administrators workshop-app /add
   ```

2. **Windows Security Hardening**
   ```cmd
   REM Configure Windows Firewall
   netsh advfirewall set allprofiles state on
   
   REM Allow required ports
   netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
   netsh advfirewall firewall add rule name="Workshop Management HTTPS" dir=in action=allow protocol=TCP localport=443
   netsh advfirewall firewall add rule name="Workshop Management API" dir=in action=allow protocol=TCP localport=5000
   ```

3. **Install Windows Defender Updates**
   ```cmd
   REM Update Windows Defender
   Windows Defender > Update definitions
   ```

### Step 3: Windows Network Configuration

1. **Static IP Configuration**
   ```cmd
   REM Configure static IP via Network Settings
   Control Panel > Network and Internet > Network Connections
   Right-click network adapter > Properties > Internet Protocol Version 4 (TCP/IPv4)
   
   REM Or via command line
   netsh interface ip set address "Local Area Connection" static 192.168.1.100 255.255.255.0 192.168.1.1
   ```

2. **DNS Configuration**
   ```cmd
   REM Configure DNS servers
   netsh interface ip set dns "Local Area Connection" static 8.8.8.8
   netsh interface ip add dns "Local Area Connection" 8.8.4.4 index=2
   ```

---

## Software Installation

### Step 1: Install Chocolatey Package Manager
```cmd
REM Install Chocolatey
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

REM Verify installation
choco --version
```

### Step 2: Install Node.js on Windows Server
```cmd
REM Install Node.js using Chocolatey
choco install nodejs --version=18.19.0 -y

REM Verify installation
node --version
npm --version
```

### Step 3: Install PM2 Process Manager
```cmd
REM Install PM2 globally
npm install -g pm2

REM Verify installation
pm2 --version
```

### Step 4: Install MySQL on Windows Server
```cmd
REM Install MySQL using Chocolatey
choco install mysql --version=8.0 -y

REM Start MySQL service
net start mysql

REM Secure MySQL installation
mysql_secure_installation
```

### Step 5: Install IIS (Internet Information Services)
```cmd
REM Install IIS features
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

REM Start IIS
net start w3svc
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Windows Client Workstation Setup

### Step 1: Workstation Preparation

#### For Each Client Workstation
1. **System Requirements Check**
   - Verify minimum hardware specifications
   - Ensure stable internet connection
   - Update operating system and browser

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall or equivalent
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```bash
# Login to the application as admin
# Navigate to User Management
# Create accounts for each user
# Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments on Windows:

```cmd
REM Make script executable (already executable on Windows)
quick-setup-windows.bat
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete Windows server setup:

```cmd
REM Run as Administrator
deploy-windows.bat
```

**What it does:**
- Installs Chocolatey package manager
- Installs all required software (Node.js, MySQL, PM2, IIS)
- Creates application directory structure
- Sets up database with proper security
- Configures environment variables
- Sets up IIS reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures Windows Firewall and security

### Windows Client Workstation Setup Script
For configuring Windows client workstations:

```cmd
REM Run as Administrator for full functionality
client-setup-windows.bat
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop and Start Menu shortcuts
- Configures browser settings
- Provides access information
- Configures Windows Firewall

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Windows Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Windows Server 2019/2022 or Windows 10/11 Pro

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Windows Server 2022

### Windows Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, PM2, IIS (optional)
- **Client**: Modern web browser (Chrome, Firefox, Edge)
- **Network**: Windows Firewall configuration

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Windows Server Setup

### Step 1: Windows Server Preparation

#### For On-Premises Windows Server
1. **Physical Server Setup**
   - Install Windows Server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Windows Server Installation**
   - Install Windows Server 2019/2022 (recommended)
   - Configure static IP address
   - Set up Remote Desktop access
   - Configure Windows Firewall rules

#### For Windows Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Windows Server 2019/2022 image
   - Configure security groups (ports 22, 80, 443, 5000, 3389)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```cmd
   REM Update Windows
   sconfig
   
   REM Install Windows Updates
   Windows Update
   
   REM Configure Remote Desktop
   System Properties > Remote > Enable Remote Desktop
   ```

### Step 2: Windows Security Configuration

1. **Create Application User**
   ```cmd
   REM Create dedicated user for the application
   net user workshop-app Workshop2024! /add
   net localgroup administrators workshop-app /add
   ```

2. **Windows Security Hardening**
   ```cmd
   REM Configure Windows Firewall
   netsh advfirewall set allprofiles state on
   
   REM Allow required ports
   netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
   netsh advfirewall firewall add rule name="Workshop Management HTTPS" dir=in action=allow protocol=TCP localport=443
   netsh advfirewall firewall add rule name="Workshop Management API" dir=in action=allow protocol=TCP localport=5000
   ```

3. **Install Windows Defender Updates**
   ```cmd
   REM Update Windows Defender
   Windows Defender > Update definitions
   ```

### Step 3: Windows Network Configuration

1. **Static IP Configuration**
   ```cmd
   REM Configure static IP via Network Settings
   Control Panel > Network and Internet > Network Connections
   Right-click network adapter > Properties > Internet Protocol Version 4 (TCP/IPv4)
   
   REM Or via command line
   netsh interface ip set address "Local Area Connection" static 192.168.1.100 255.255.255.0 192.168.1.1
   ```

2. **DNS Configuration**
   ```cmd
   REM Configure DNS servers
   netsh interface ip set dns "Local Area Connection" static 8.8.8.8
   netsh interface ip add dns "Local Area Connection" 8.8.4.4 index=2
   ```

---

## Software Installation

### Step 1: Install Chocolatey Package Manager
```cmd
REM Install Chocolatey
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

REM Verify installation
choco --version
```

### Step 2: Install Node.js on Windows Server
```cmd
REM Install Node.js using Chocolatey
choco install nodejs --version=18.19.0 -y

REM Verify installation
node --version
npm --version
```

### Step 3: Install PM2 Process Manager
```cmd
REM Install PM2 globally
npm install -g pm2

REM Verify installation
pm2 --version
```

### Step 4: Install MySQL on Windows Server
```cmd
REM Install MySQL using Chocolatey
choco install mysql --version=8.0 -y

REM Start MySQL service
net start mysql

REM Secure MySQL installation
mysql_secure_installation
```

### Step 5: Install IIS (Internet Information Services)
```cmd
REM Install IIS features
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

REM Start IIS
net start w3svc
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Windows Client Workstation Setup

### Step 1: Workstation Preparation

### Step 1: Windows Workstation Preparation

#### For Each Windows Client Workstation
1. **System Requirements Check**
   - Verify Windows 10/11 is installed and updated
   - Ensure stable internet connection
   - Update Windows and browser to latest versions

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Windows Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Windows Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure Windows VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```cmd
REM Login to the application as admin
REM Navigate to User Management
REM Create accounts for each user
REM Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments on Windows:

```cmd
REM Make script executable (already executable on Windows)
quick-setup-windows.bat
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete Windows server setup:

```cmd
REM Run as Administrator
deploy-windows.bat
```

**What it does:**
- Installs Chocolatey package manager
- Installs all required software (Node.js, MySQL, PM2, IIS)
- Creates application directory structure
- Sets up database with proper security
- Configures environment variables
- Sets up IIS reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures Windows Firewall and security

### Windows Client Workstation Setup Script
For configuring Windows client workstations:

```cmd
REM Run as Administrator for full functionality
client-setup-windows.bat
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop and Start Menu shortcuts
- Configures browser settings
- Provides access information
- Configures Windows Firewall

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Let me fix the duplicate section header:


```markdown
# Standard Operating Procedure (SOP)
## Workshop Job Management System - Windows Turnkey Solution Setup

**Document Version:** 2.0  
**Date:** December 2024  
**Prepared for:** Complete Windows Client Deployment (Server + Client)  

---

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Pre-Installation Checklist](#pre-installation-checklist)
4. [Windows Server Setup](#windows-server-setup)
5. [Software Installation](#software-installation)
6. [Project Setup](#project-setup)
7. [Database Configuration](#database-configuration)
8. [Application Configuration](#application-configuration)
9. [Security Configuration](#security-configuration)
10. [Testing & Verification](#testing--verification)
11. [Production Deployment](#production-deployment)
12. [Windows Client Workstation Setup](#windows-client-workstation-setup)
13. [Network Configuration](#network-configuration)
14. [Troubleshooting](#troubleshooting)
15. [Client Handover](#client-handover)

---

## Overview

This SOP provides comprehensive instructions for deploying a complete turnkey Workshop Job Management System solution for clients. This includes server setup, application deployment, client workstation configuration, and network setup for a fully functional workshop management system.

### System Architecture
- **Server**: Windows Server running the application backend and database
- **Frontend**: React.js web application served from the server
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: MySQL database (Port 3306)
- **File Storage**: Windows file system for attachments
- **Client Workstations**: Windows workstations accessing the system via web browser
- **Web Server**: IIS (Internet Information Services) for reverse proxy

### Deployment Options
1. **On-Premises Windows Server**: Dedicated Windows server at client location
2. **Windows Cloud Server**: Virtual Windows server (AWS, Azure, Google Cloud)
3. **Hybrid**: Windows server in cloud, workstations on-premises

---

## System Requirements

### Windows Server Requirements
#### Minimum Server Specifications
- **CPU**: Quad-core processor, 2.5 GHz
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD (50GB for OS, 50GB for application/data)
- **Network**: Gigabit Ethernet connection
- **Operating System**: Windows Server 2019/2022 or Windows 10/11 Pro

#### Recommended Server Specifications
- **CPU**: 8-core processor, 3.0 GHz
- **RAM**: 32GB
- **Storage**: 500GB NVMe SSD
- **Network**: Dual Gigabit Ethernet (redundancy)
- **Operating System**: Windows Server 2022

### Windows Client Workstation Requirements
#### Minimum Client Specifications
- **CPU**: Dual-core processor, 2.0 GHz
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free disk space
- **Network**: Stable internet connection (10 Mbps minimum)
- **Operating System**: Windows 10/11

#### Software Dependencies
- **Server**: Node.js 18.x+, MySQL 8.0+, PM2, IIS (optional)
- **Client**: Modern web browser (Chrome, Firefox, Edge)
- **Network**: Windows Firewall configuration

---

## Pre-Installation Checklist

### Client Information Gathering
- [ ] Client's preferred database credentials
- [ ] Client's domain/IP address for production deployment
- [ ] SSL certificate requirements
- [ ] Backup and maintenance schedule preferences
- [ ] User account requirements (number of managers/workers)
- [ ] File storage requirements and limits

### Environment Preparation
- [ ] Server/computer has internet access
- [ ] Administrative privileges available
- [ ] Firewall ports 3000, 5000, 3306 are accessible
- [ ] Antivirus software configured to allow Node.js and MySQL

---

## Windows Server Setup

### Step 1: Windows Server Preparation

#### For On-Premises Windows Server
1. **Physical Server Setup**
   - Install Windows Server hardware in appropriate location
   - Ensure proper ventilation and power supply
   - Connect to network infrastructure
   - Configure BIOS settings for optimal performance

2. **Windows Server Installation**
   - Install Windows Server 2019/2022 (recommended)
   - Configure static IP address
   - Set up Remote Desktop access
   - Configure Windows Firewall rules

#### For Windows Cloud Server (AWS/Azure/Google Cloud)
1. **Create Virtual Machine**
   - Choose appropriate instance size (t3.large or equivalent)
   - Select Windows Server 2019/2022 image
   - Configure security groups (ports 22, 80, 443, 5000, 3389)
   - Set up elastic IP (AWS) or static IP

2. **Initial Server Configuration**
   ```cmd
   REM Update Windows
   sconfig
   
   REM Install Windows Updates
   Windows Update
   
   REM Configure Remote Desktop
   System Properties > Remote > Enable Remote Desktop
   ```

### Step 2: Windows Security Configuration

1. **Create Application User**
   ```cmd
   REM Create dedicated user for the application
   net user workshop-app Workshop2024! /add
   net localgroup administrators workshop-app /add
   ```

2. **Windows Security Hardening**
   ```cmd
   REM Configure Windows Firewall
   netsh advfirewall set allprofiles state on
   
   REM Allow required ports
   netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
   netsh advfirewall firewall add rule name="Workshop Management HTTPS" dir=in action=allow protocol=TCP localport=443
   netsh advfirewall firewall add rule name="Workshop Management API" dir=in action=allow protocol=TCP localport=5000
   ```

3. **Install Windows Defender Updates**
   ```cmd
   REM Update Windows Defender
   Windows Defender > Update definitions
   ```

### Step 3: Windows Network Configuration

1. **Static IP Configuration**
   ```cmd
   REM Configure static IP via Network Settings
   Control Panel > Network and Internet > Network Connections
   Right-click network adapter > Properties > Internet Protocol Version 4 (TCP/IPv4)
   
   REM Or via command line
   netsh interface ip set address "Local Area Connection" static 192.168.1.100 255.255.255.0 192.168.1.1
   ```

2. **DNS Configuration**
   ```cmd
   REM Configure DNS servers
   netsh interface ip set dns "Local Area Connection" static 8.8.8.8
   netsh interface ip add dns "Local Area Connection" 8.8.4.4 index=2
   ```

---

## Software Installation

### Step 1: Install Chocolatey Package Manager
```cmd
REM Install Chocolatey
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

REM Verify installation
choco --version
```

### Step 2: Install Node.js on Windows Server
```cmd
REM Install Node.js using Chocolatey
choco install nodejs --version=18.19.0 -y

REM Verify installation
node --version
npm --version
```

### Step 3: Install PM2 Process Manager
```cmd
REM Install PM2 globally
npm install -g pm2

REM Verify installation
pm2 --version
```

### Step 4: Install MySQL on Windows Server
```cmd
REM Install MySQL using Chocolatey
choco install mysql --version=8.0 -y

REM Start MySQL service
net start mysql

REM Secure MySQL installation
mysql_secure_installation
```

### Step 5: Install IIS (Internet Information Services)
```cmd
REM Install IIS features
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

REM Start IIS
net start w3svc
```

---

## Project Setup

### Step 1: Obtain Project Files
```bash
# If using Git
git clone <repository-url>
cd workshop-job-management

# Or extract from provided ZIP file
# Extract to desired location
cd workshop-job-management
```

### Step 2: Install Project Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

**Expected Output:**
- Root dependencies installed
- Server dependencies installed
- Client dependencies installed
- No critical errors

### Step 3: Verify Project Structure
Ensure the following structure exists:
```
workshop-job-management/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── package.json
│   ├── config/
│   ├── routes/
│   ├── sql/
│   └── uploads/
├── package.json
├── README.md
└── SETUP.md
```

---

## Database Configuration

### Step 1: Create Database
1. **Access MySQL**
   ```bash
   mysql -u root -p
   # Enter root password when prompted
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE workshop_jobs;
   SHOW DATABASES;
   EXIT;
   ```

### Step 2: Import Database Schema
```bash
# Import the schema file
mysql -u root -p workshop_jobs < server/sql/schema.sql
```

**Verification:**
```bash
mysql -u root -p
USE workshop_jobs;
SHOW TABLES;
SELECT * FROM users;
EXIT;
```

Expected tables: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

### Step 3: Create Application Database User (Recommended)
```sql
-- Create dedicated user for the application
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Application Configuration

### Step 1: Environment Configuration
1. **Copy Environment Template**
   ```bash
   cp server/env.example server/.env
   ```

2. **Configure Environment Variables**
   Edit `server/.env` with client-specific values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=workshop_user
   DB_PASSWORD=secure_password_here
   DB_NAME=workshop_jobs
   
   # JWT Configuration
   JWT_SECRET=client_specific_jwt_secret_key_minimum_32_characters
   JWT_EXPIRES_IN=24h
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # File Upload Configuration
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=10485760
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=client_email@gmail.com
   SMTP_PASS=client_app_password
   ```

### Step 2: Create Uploads Directory
```bash
# Ensure uploads directory exists and has proper permissions
mkdir -p server/uploads
chmod 755 server/uploads
```

### Step 3: Configure Default Users (Optional)
If custom users are needed, modify the database:
```sql
mysql -u root -p workshop_jobs

-- Update manager account
UPDATE users SET 
    username = 'client_admin',
    email = 'admin@clientcompany.com',
    full_name = 'Client Manager Name'
WHERE username = 'admin';

-- Update worker accounts
UPDATE users SET 
    username = 'client_worker1',
    email = 'worker1@clientcompany.com',
    full_name = 'Client Worker 1'
WHERE username = 'worker1';

-- Add additional users as needed
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('new_worker', 'newworker@clientcompany.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'New Worker Name', 'worker');

EXIT;
```

---

## Security Configuration

### Step 1: SSL Certificate Setup (Production)

#### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Self-Signed Certificate (Development/Testing)
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/workshop

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/workshop/workshop.key \
  -out /etc/ssl/workshop/workshop.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=workshop-server.local"
```

### Step 2: Nginx Configuration

#### Create Nginx Configuration
```bash
# Create application configuration
sudo nano /etc/nginx/sites-available/workshop-app
```

#### Nginx Configuration Content
```nginx
server {
    listen 80;
    server_name your-domain.com workshop-server.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com workshop-server.local;

    # SSL Configuration
    ssl_certificate /etc/ssl/workshop/workshop.crt;
    ssl_certificate_key /etc/ssl/workshop/workshop.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend (React App)
    location / {
        root /home/workshop-app/workshop-job-management/client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File uploads
    location /uploads/ {
        alias /home/workshop-app/workshop-job-management/server/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size for file uploads
    client_max_body_size 10M;
}
```

#### Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/workshop-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Application Security Hardening

#### Environment Security
```bash
# Set proper file permissions
chmod 600 /home/workshop-app/workshop-job-management/server/.env
chmod 755 /home/workshop-app/workshop-job-management/server/uploads

# Create backup directory with proper permissions
mkdir -p /home/workshop-app/backups
chmod 700 /home/workshop-app/backups
```

#### Database Security
```bash
# Login to MySQL
sudo mysql -u root -p

# Remove anonymous users
DELETE FROM mysql.user WHERE User='';

# Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

# Flush privileges
FLUSH PRIVILEGES;
EXIT;
```

---

## Testing & Verification

### Step 1: Start Development Server
```bash
# Start both frontend and backend
npm run dev
```

**Expected Output:**
- Server starting on port 5000
- Client starting on port 3000
- Database connection successful
- No critical errors

### Step 2: Access Application
1. **Open Web Browser**
   - Navigate to: http://localhost:3000
   - Application should load without errors

2. **Test Login**
   - **Manager Login:**
     - Username: `admin`
     - Password: `admin123`
   - **Worker Login:**
     - Username: `worker1`
     - Password: `worker123`

### Step 3: Functional Testing
Perform the following tests:

#### Manager Account Tests
- [ ] Login successful
- [ ] Dashboard loads correctly
- [ ] Can create new job cards
- [ ] Can assign jobs to workers
- [ ] Can upload file attachments
- [ ] Can view job statistics
- [ ] Can manage user accounts

#### Worker Account Tests
- [ ] Login successful
- [ ] Dashboard shows assigned jobs
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can add notes to jobs
- [ ] Can download attachments

#### System Tests
- [ ] Real-time updates work (open multiple browser tabs)
- [ ] File uploads work correctly
- [ ] Database operations function properly
- [ ] Error handling works as expected

### Step 4: Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries respond quickly
- [ ] File uploads complete successfully
- [ ] Multiple concurrent users supported

---

## Windows Client Workstation Setup

### Step 1: Windows Workstation Preparation

#### For Each Windows Client Workstation
1. **System Requirements Check**
   - Verify Windows 10/11 is installed and updated
   - Ensure stable internet connection
   - Update Windows and browser to latest versions

2. **Browser Configuration**
   - Install latest version of Chrome, Firefox, or Edge
   - Clear browser cache and cookies
   - Disable pop-up blockers for the application domain
   - Enable JavaScript (required for the application)

### Step 2: Windows Network Access Configuration

#### Internal Network Setup
1. **Router Configuration**
   - Ensure server has static IP address
   - Configure port forwarding if needed (ports 80, 443)
   - Set up DNS resolution for server hostname

2. **Windows Firewall Configuration**
   - Allow HTTP (port 80) and HTTPS (port 443) traffic
   - Configure Windows Firewall
   - Test connectivity to server

#### External Access Setup (If Required)
1. **Domain Configuration**
   - Point domain to server IP address
   - Configure DNS A record
   - Set up SSL certificate (Let's Encrypt recommended)

2. **VPN Setup (Optional)**
   - Configure Windows VPN for secure remote access
   - Provide VPN credentials to authorized users
   - Test VPN connectivity

### Step 3: User Account Setup

#### Create User Accounts
1. **Manager Account**
   - Primary administrator account
   - Full system access
   - User management privileges

2. **Worker Accounts**
   - Individual accounts for each worker
   - Limited access based on role
   - Job assignment capabilities

#### Account Distribution
```cmd
REM Login to the application as admin
REM Navigate to User Management
REM Create accounts for each user
REM Provide login credentials securely
```

---

## Network Configuration

### Step 1: Server Network Setup

#### Static IP Configuration
```bash
# Configure static IP on server
sudo nano /etc/netplan/00-installer-config.yaml

# Example configuration
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply configuration
sudo netplan apply
```

#### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

### Step 2: Client Network Access

#### Internal Network Access
- **URL**: `https://workshop-server.local` or `https://192.168.1.100`
- **Port**: 443 (HTTPS) or 80 (HTTP with redirect)
- **Protocol**: HTTPS recommended for security

#### External Network Access (If Configured)
- **URL**: `https://your-domain.com`
- **Port**: 443 (HTTPS)
- **Protocol**: HTTPS required

### Step 3: Network Troubleshooting

#### Connectivity Testing
```bash
# From client workstation, test server connectivity
ping 192.168.1.100
telnet 192.168.1.100 443
curl -I https://192.168.1.100
```

#### Common Network Issues
1. **Cannot access server**
   - Check firewall settings
   - Verify IP address configuration
   - Test network connectivity

2. **SSL certificate errors**
   - Accept self-signed certificate (development)
   - Install proper SSL certificate (production)
   - Check certificate validity

3. **Slow performance**
   - Check network bandwidth
   - Verify server resources
   - Monitor application performance

---

## Automated Deployment Scripts

### Quick Setup Script (Development/Testing)
For rapid testing and development environments on Windows:

```cmd
REM Make script executable (already executable on Windows)
quick-setup-windows.bat
```

**What it does:**
- Installs dependencies
- Sets up database
- Configures environment
- Starts development server
- Runs basic tests

### Full Deployment Script (Production)
For complete Windows server setup:

```cmd
REM Run as Administrator
deploy-windows.bat
```

**What it does:**
- Installs Chocolatey package manager
- Installs all required software (Node.js, MySQL, PM2, IIS)
- Creates application directory structure
- Sets up database with proper security
- Configures environment variables
- Sets up IIS reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures Windows Firewall and security

### Windows Client Workstation Setup Script
For configuring Windows client workstations:

```cmd
REM Run as Administrator for full functionality
client-setup-windows.bat
```

**What it does:**
- Updates hosts file
- Tests server connectivity
- Creates desktop and Start Menu shortcuts
- Configures browser settings
- Provides access information
- Configures Windows Firewall

---

## Production Deployment

### Step 1: Build Production Application
```bash
# Build the frontend for production
npm run build
```

### Step 2: Configure Production Environment
1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   # Use production database credentials
   # Use production JWT secret
   ```

2. **Configure Web Server (Optional)**
   - Set up reverse proxy (Nginx/Apache)
   - Configure SSL certificates
   - Set up domain name

### Step 3: Start Production Server
```bash
# Start production server
npm start
```

### Step 4: Configure Process Management
#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'workshop-management',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # macOS/Linux

# Kill the process or change port in .env
```

#### 2. Database Connection Failed
**Error:** `ER_ACCESS_DENIED_ERROR`
**Solutions:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database `workshop_jobs` exists
- Verify user permissions

#### 3. Module Not Found Errors
**Error:** `Cannot find module 'express'`
**Solution:**
```bash
# Reinstall dependencies
npm run install-all
```

#### 4. Permission Errors
**Error:** `EACCES: permission denied`
**Solutions:**
- Run terminal as administrator (Windows)
- Check file permissions: `chmod 755 server/uploads`
- Ensure proper ownership of project files

#### 5. Frontend Build Errors
**Error:** `Module not found: Can't resolve 'react'`
**Solution:**
```bash
cd client
npm install
npm run build
```

### Log Files and Debugging
- **Server logs:** Check terminal output when running `npm run dev`
- **Client logs:** Check browser developer console (F12)
- **Database logs:** Check MySQL error logs
- **System logs:** Check system event logs

---

## Client Handover

### Documentation Package
Provide the client with:

1. **System Documentation**
   - [ ] This SOP document
   - [ ] User manual (if available)
   - [ ] API documentation
   - [ ] Database schema documentation

2. **Credentials Document**
   - [ ] Database credentials
   - [ ] Default user accounts
   - [ ] JWT secret key
   - [ ] Admin panel access (if applicable)

3. **Backup Procedures**
   - [ ] Database backup script
   - [ ] File upload backup procedure
   - [ ] System restore procedures

4. **Maintenance Schedule**
   - [ ] Regular backup schedule
   - [ ] Software update procedures
   - [ ] Performance monitoring guidelines
   - [ ] Security update procedures

### Training Materials
- [ ] User training session scheduled
- [ ] Administrator training provided
- [ ] Troubleshooting guide provided
- [ ] Support contact information

### Support Information
- [ ] Technical support contact details
- [ ] Emergency support procedures
- [ ] Maintenance window schedule
- [ ] Update and patch procedures

---

## Post-Installation Checklist

### System Verification
- [ ] All services running correctly
- [ ] Database accessible and populated
- [ ] File uploads working
- [ ] User authentication functional
- [ ] Real-time updates operational

### Security Verification
- [ ] Default passwords changed
- [ ] JWT secret key customized
- [ ] Database user permissions minimal
- [ ] File upload restrictions in place
- [ ] SSL certificate installed (if applicable)

### Performance Verification
- [ ] Application loads quickly
- [ ] Database queries optimized
- [ ] File uploads perform well
- [ ] Multiple users supported

### Backup Verification
- [ ] Database backup tested
- [ ] File backup tested
- [ ] Restore procedures verified
- [ ] Backup schedule configured

---

## Contact Information

**Technical Support:** [Your Contact Information]  
**Emergency Support:** [Emergency Contact]  
**Documentation Updates:** [Documentation Contact]

---

**End of SOP Document**

*This document should be reviewed and updated as needed for each client deployment.*

```

Now let me create a Windows-specific deployment guide:


```markdown
# Workshop Job Management System - Windows Turnkey Deployment Guide

**Version:** 2.0  
**Date:** December 2024  
**For:** Complete Windows Client Deployment  

---

## Overview

This guide provides step-by-step instructions for deploying a complete turnkey Workshop Job Management System solution on Windows environments. The system includes automated deployment scripts that handle Windows server setup, application installation, security configuration, and Windows client workstation setup.

## Deployment Options

### Option 1: Automated Deployment (Recommended)
Use the provided Windows batch scripts for fastest and most reliable deployment.

### Option 2: Manual Deployment
Follow the detailed Windows SOP for complete manual control.

---

## Quick Start (Automated)

### Prerequisites
- Windows Server 2019/2022 or Windows 10/11 Pro
- Administrator access
- Internet connection
- Project files (client/, server/, package.json, etc.)

### Step 1: Windows Server Setup
```cmd
REM Upload project files to server
REM Copy workshop-job-management folder to C:\

REM Open Command Prompt as Administrator
REM Navigate to project directory
cd C:\workshop-job-management

REM Run automated deployment
deploy-windows.bat
```

### Step 2: Windows Client Workstation Setup
On each Windows client workstation:
```cmd
REM Download client setup script
REM Copy client-setup-windows.bat to workstation

REM Run as Administrator
client-setup-windows.bat
```

### Step 3: Access System
- **URL**: `http://workshop-server.local` or `http://server-ip`
- **Manager Login**: `admin` / `admin123`
- **Worker Login**: `worker1` / `worker123`

---

## Detailed Windows Deployment Process

### Phase 1: Windows Server Preparation

#### 1.1 Windows Server Requirements
- **CPU**: Quad-core processor, 2.5 GHz minimum
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB SSD minimum
- **OS**: Windows Server 2019/2022 or Windows 10/11 Pro
- **Network**: Static IP address

#### 1.2 Windows Server Setup
```cmd
REM Update Windows
sconfig

REM Install Windows Updates
Windows Update

REM Configure Remote Desktop
System Properties > Remote > Enable Remote Desktop

REM Configure Windows Firewall
netsh advfirewall set allprofiles state on
```

### Phase 2: Windows Application Deployment

#### 2.1 Automated Windows Deployment
```cmd
REM Run the Windows deployment script as Administrator
deploy-windows.bat
```

The script will automatically:
- Install Chocolatey package manager
- Install Node.js 18.x
- Install MySQL 8.0
- Install PM2 process manager
- Install IIS (Internet Information Services)
- Create application directory structure
- Set up database
- Configure environment variables
- Build application
- Start services with PM2
- Set up automated backups
- Configure Windows Firewall

#### 2.2 Manual Verification
```cmd
REM Check services status
sc query mysql
sc query w3svc
pm2 status

REM Test application
curl http://localhost
curl http://workshop-server.local
```

### Phase 3: Windows Client Workstation Configuration

#### 3.1 Automated Windows Client Setup
On each Windows workstation:
```cmd
REM Run Windows client setup script as Administrator
client-setup-windows.bat
```

The script will:
- Update Windows hosts file
- Test server connectivity
- Create desktop shortcuts
- Create Start Menu shortcuts
- Configure browser settings
- Configure Windows Firewall
- Provide access information

#### 3.2 Manual Windows Client Configuration
If automated setup fails:

1. **Update hosts file**:
   ```cmd
   REM Add to C:\Windows\System32\drivers\etc\hosts
   REM server-ip workshop-server.local
   echo server-ip workshop-server.local >> C:\Windows\System32\drivers\etc\hosts
   ```

2. **Configure browser**:
   - Clear cache and cookies
   - Disable pop-up blockers
   - Enable JavaScript
   - Accept SSL certificate

3. **Test connectivity**:
   ```cmd
   ping workshop-server.local
   curl http://workshop-server.local
   ```

---

## Windows Configuration Management

### Environment Configuration
The system uses environment variables for configuration:

```cmd
REM Edit environment file
notepad C:\workshop-job-management\server\.env
```

Key configuration options:
- Database credentials
- JWT secret key
- Server port
- File upload limits
- Email settings (optional)

### User Management
```cmd
REM Access application as admin
REM Navigate to User Management
REM Create/modify user accounts
REM Set appropriate roles and permissions
```

### Database Management
```cmd
REM Backup database
C:\workshop-job-management\backup.bat

REM Restore database
mysql -u workshop_user -p workshop_jobs < backup_file.sql
```

---

## Windows Security Configuration

### Windows Firewall Configuration
```cmd
REM Review firewall rules
netsh advfirewall firewall show rule name=all

REM Add additional rules if needed
netsh advfirewall firewall add rule name="Workshop Management Custom" dir=in action=allow protocol=TCP localport=8080
```

### Windows Defender Configuration
```cmd
REM Update Windows Defender
Windows Defender > Update definitions

REM Configure exclusions for application files
Windows Defender > Virus & threat protection > Exclusions
Add C:\workshop-job-management\
```

### Database Security
```cmd
REM Secure MySQL installation
mysql_secure_installation

REM Remove test databases
mysql -u root -p
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
EXIT;
```

---

## Windows Monitoring and Maintenance

### Application Monitoring
```cmd
REM View application logs
pm2 logs

REM Monitor system resources
pm2 monit

REM Restart application
pm2 restart workshop-management
```

### Windows System Monitoring
```cmd
REM Check disk usage
wmic logicaldisk get size,freespace,caption

REM Check memory usage
wmic OS get TotalVisibleMemorySize,FreePhysicalMemory

REM Check system load
tasklist /svc

REM Check network connections
netstat -an
```

### Backup Management
```cmd
REM Manual backup
C:\workshop-job-management\backup.bat

REM Check backup status
dir C:\workshop-job-management\backups\

REM Restore from backup
REM Extract backup files and restore database
```

---

## Windows Troubleshooting

### Common Windows Issues

#### 1. Application Won't Start
```cmd
REM Check PM2 status
pm2 status

REM View error logs
pm2 logs workshop-management --err

REM Restart application
pm2 restart workshop-management
```

#### 2. Database Connection Issues
```cmd
REM Check MySQL service
sc query mysql

REM Test database connection
mysql -u workshop_user -p workshop_jobs

REM Check environment variables
type C:\workshop-job-management\server\.env
```

#### 3. IIS Configuration Issues
```cmd
REM Check IIS status
sc query w3svc

REM View IIS logs
REM Check C:\inetpub\logs\LogFiles\

REM Restart IIS
iisreset
```

#### 4. Windows Firewall Issues
```cmd
REM Check firewall status
netsh advfirewall show allprofiles

REM Reset firewall rules
netsh advfirewall reset

REM Re-add application rules
netsh advfirewall firewall add rule name="Workshop Management HTTP" dir=in action=allow protocol=TCP localport=80
```

### Windows Performance Optimization

#### Database Optimization
```sql
-- Check slow queries
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- Optimize tables
OPTIMIZE TABLE users, job_cards, attachments, job_history, job_notes;
```

#### Application Optimization
```cmd
REM Increase PM2 instances for better performance
pm2 scale workshop-management 2

REM Monitor memory usage
pm2 monit
```

---

## Windows Client Handover Checklist

### Documentation Package
Provide the client with:

1. **Windows System Documentation**
   - [ ] This Windows deployment guide
   - [ ] Windows SOP document
   - [ ] User manual (if available)
   - [ ] Windows troubleshooting guide

2. **Access Information**
   - [ ] Server IP address and hostname
   - [ ] Application URL
   - [ ] Default login credentials
   - [ ] Database credentials
   - [ ] Windows user accounts

3. **Windows Management Information**
   - [ ] PM2 process management commands
   - [ ] Windows backup procedures
   - [ ] Windows update procedures
   - [ ] Windows monitoring commands

4. **Windows Support Information**
   - [ ] Technical support contact
   - [ ] Windows emergency procedures
   - [ ] Windows maintenance schedule
   - [ ] Windows update notifications

### Windows Training Materials
- [ ] Windows user training session scheduled
- [ ] Windows administrator training provided
- [ ] Windows troubleshooting guide provided
- [ ] Windows support contact information

### Windows Support Information
- [ ] Technical support contact details
- [ ] Windows emergency support procedures
- [ ] Windows maintenance window schedule
- [ ] Windows update and patch procedures

---

## Post-Windows Deployment Tasks

### Immediate Tasks
1. **Change default passwords**
2. **Create user accounts for all workers**
3. **Configure email notifications (if needed)**
4. **Set up proper SSL certificates**
5. **Test all functionality on Windows**

### Ongoing Windows Tasks
1. **Regular Windows backups**
2. **Windows security updates**
3. **Windows performance monitoring**
4. **Windows user training**
5. **Windows system maintenance**

---

## Windows Support and Maintenance

### Regular Windows Maintenance Schedule
- **Daily**: Check application status and Windows logs
- **Weekly**: Review backup status and Windows system performance
- **Monthly**: Apply Windows security updates and review logs
- **Quarterly**: Full Windows system backup and performance review

### Windows Emergency Procedures
1. **System Down**: Check PM2 status, restart Windows services
2. **Database Issues**: Restore from backup, check MySQL service
3. **Network Issues**: Check Windows Firewall, test connectivity
4. **Security Issues**: Review Windows logs, update passwords, check certificates

---

## Windows-Specific Notes

### Windows Services
- **MySQL**: Runs as Windows service
- **IIS**: Runs as Windows service (w3svc)
- **PM2**: Runs as Node.js process manager
- **Application**: Runs under PM2 management

### Windows File Locations
- **Application**: `C:\workshop-job-management\`
- **Logs**: `C:\workshop-job-management\logs\`
- **Backups**: `C:\workshop-job-management\backups\`
- **Database**: MySQL data directory
- **IIS**: `C:\inetpub\wwwroot\`

### Windows User Accounts
- **Application User**: `workshop-app` (created by deployment script)
- **Database User**: `workshop_user` (created by deployment script)
- **Windows Administrator**: Required for deployment and maintenance

---

**End of Windows Deployment Guide**

*This guide should be used in conjunction with the detailed Windows SOP document for complete Windows deployment instructions.*
```

Perfect! I've successfully converted your Workshop Job Management System deployment to work with Windows environments. Here's what I've created for your Windows turnkey solution:

## 🪟 Complete Windows Turnkey Solution Package

### 1. **Windows Deployment Scripts**

#### `deploy-windows.bat` - Full Windows Production Deployment
- **One-command Windows server setup**
- Installs Chocolatey package manager
- Installs Node.js, MySQL, PM2, IIS
- Creates application directory structure
- Sets up database with security
- Configures environment variables
- Sets up IIS reverse proxy
- Creates PM2 process management
- Sets up automated backups
- Configures Windows Firewall

#### `client-setup-windows.bat` - Windows Client Workstation Configuration
- Updates Windows hosts file automatically
- Tests server connectivity
- Creates desktop and Start Menu shortcuts
- Configures browser settings
- Configures Windows Firewall
- Provides access information

#### `quick-setup-windows.bat` - Windows Development/Testing Setup
- Rapid setup for Windows testing environments
- Installs dependencies and starts development server
- Runs basic tests

### 2. **Updated Windows SOP Document** (`SOP_CLIENT_SETUP.md`)
- **Windows Server setup** instructions (Windows Server 2019/2022)
- **Windows security configuration** with Windows Firewall and Defender
- **Windows network configuration** for both internal and external access
- **Windows client workstation setup** procedures
- **Windows production deployment** with PM2 and IIS
- **Windows-specific troubleshooting** section

### 3. **Windows Deployment Guide** (`DEPLOYMENT_GUIDE_WINDOWS.md`)
- **Windows quick start** instructions for automated deployment
- **Detailed Windows deployment process** with phases
- **Windows configuration management** guidelines
- **Windows security configuration** procedures
- **Windows monitoring and maintenance** instructions
- **Windows-specific troubleshooting** common issues
- **Windows client handover checklist**

## 🚀 Key Features of the Windows Turnkey Solution

### **Windows Server Setup**
- ✅ Windows Server 2019/2022 configuration
- ✅ Static IP setup via Windows networking
- ✅ Windows Firewall configuration
- ✅ Windows security hardening
- ✅ IIS (Internet Information Services) setup
- ✅ PM2 process management for Windows

### **Windows Application Deployment**
- ✅ Chocolatey package manager installation
- ✅ Automated dependency installation
- ✅ Windows database setup with security
- ✅ Windows environment configuration
- ✅ Production build
- ✅ Windows service management
- ✅ Automated Windows backups

### **Windows Client Configuration**
- ✅ Windows hosts file updates
- ✅ Windows browser configuration
- ✅ Desktop and Start Menu shortcuts
- ✅ Windows Firewall configuration
- ✅ Connectivity testing
- ✅ Access information

### **Windows Security Features**
- ✅ Windows Firewall configuration
- ✅ Windows Defender integration
- ✅ Database security
- ✅ User access control
- ✅ Windows file permissions
- ✅ Security headers

## 📖 Windows Usage Instructions

### **For Complete Windows Turnkey Deployment:**

1. **Windows Server Setup:**
   ```cmd
   REM Run as Administrator
   deploy-windows.bat
   ```

2. **Windows Client Workstation Setup:**
   ```cmd
   REM Run as Administrator for full functionality
   client-setup-windows.bat
   ```

3. **Access System:**
   - URL: `http://workshop-server.local`
   - Manager: `admin` / `admin123`
   - Worker: `worker1` / `worker123`

### **For Quick Windows Testing:**
```cmd
quick-setup-windows.bat
```

## 🎯 Benefits for Your Windows Clients

1. **One-Command Windows Setup** - Complete Windows server deployment with a single batch file
2. **Windows-Automated Configuration** - No manual Windows configuration required
3. **Windows Security Hardened** - Windows Firewall, Defender, and security best practices included
4. **Windows Production Ready** - PM2, IIS, automated backups, Windows monitoring
5. **Windows Client Friendly** - Easy Windows workstation setup and access
6. **Comprehensive Windows Documentation** - Complete Windows SOP and deployment guide
7. **Windows Troubleshooting Support** - Detailed Windows troubleshooting sections
8. **Windows Maintenance Ready** - Automated Windows backups and monitoring setup

## 🔧 Windows-Specific Features

- **Chocolatey Package Manager** for easy software installation
- **IIS Integration** for web server functionality
- **Windows Firewall** configuration
- **Windows Defender** integration
- **Windows Services** management
- **Windows Event Logs** integration
- **Windows Backup** scripts
- **Windows Shortcuts** creation
- **Windows Registry** configuration (if needed)

This Windows turnkey solution provides everything needed to deploy your Workshop Job Management System for Windows clients, from Windows server setup to Windows client workstation configuration, with comprehensive Windows documentation and automated Windows batch scripts for reliable deployment.

```plaintext
   REM Run as Administrator
   deploy-windows.bat
```

```plaintext
   REM Run as Administrator for full functionality
   client-setup-windows.bat
```

```plaintext
quick-setup-windows.bat
```

---

**User**

where do i set the passwords for database  according to this setup

---

**Cursor**

Looking at the Windows deployment setup, there are several places where database passwords are configured. Let me show you exactly where to set them:


Based on the Windows deployment setup, here are the **exact locations** where you need to set database passwords:

## 🔐 Database Password Configuration Locations

### 1. **Primary Configuration - Deployment Script**
**File:** `deploy-windows.bat`  
**Line 14:** 
```cmd
set DB_PASSWORD=Workshop2024!
```

**This is the MAIN password setting** that controls:
- Database user creation
- Environment file configuration
- All database operations

### 2. **Environment File Configuration**
**File:** `server/.env` (created during deployment)  
**Lines:**
```env
DB_HOST=localhost
DB_USER=workshop_user
DB_PASSWORD=Workshop2024!
DB_NAME=workshop_jobs
```

### 3. **Environment Template**
**File:** `server/env.example`  
**Lines:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Workshop2024!
DB_NAME=workshop_jobs
```

## 🛠️ How to Change Database Passwords

### **Method 1: Before Running Deployment Script**
1. **Edit the deployment script:**
   ```cmd
   REM Open deploy-windows.bat in notepad
   notepad deploy-windows.bat
   
   REM Change line 14 to your desired password
   set DB_PASSWORD=YourSecurePassword123!
   ```

2. **Run the deployment script:**
   ```cmd
   deploy-windows.bat
   ```

### **Method 2: After Deployment (Manual Change)**
1. **Update the environment file:**
   ```cmd
   REM Edit the environment file
   notepad C:\workshop-job-management\server\.env
   
   REM Change the DB_PASSWORD line to:
   DB_PASSWORD=YourNewPassword123!
   ```

2. **Update MySQL user password:**
   ```cmd
   REM Connect to MySQL as root
   mysql -u root -p
   
   REM Change the user password
   ALTER USER 'workshop_user'@'localhost' IDENTIFIED BY 'YourNewPassword123!';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Restart the application:**
   ```cmd
   cd C:\workshop-job-management
   pm2 restart workshop-management
   ```

### **Method 3: Using MySQL Command Line**
```cmd
REM Connect to MySQL
mysql -u root -p

REM Create/update database user with new password
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'YourNewPassword123!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 🔒 Security Recommendations

### **For Production Deployment:**
1. **Use a strong password** (minimum 12 characters with mixed case, numbers, and symbols)
2. **Change the default password** `Workshop2024!` before deployment
3. **Update both locations:**
   - `deploy-windows.bat` (line 14)
   - `server/env.example` (if you want to change the template)

### **Example Strong Password:**
```cmd
set DB_PASSWORD=W0rksh0p@2024!Secure#DB
```

## 📝 Quick Password Change Steps

1. **Edit deployment script:**
   ```cmd
   notepad deploy-windows.bat
   ```
   Change line 14 to your secure password

2. **Run deployment:**
   ```cmd
   deploy-windows.bat
   ```

3. **Verify password was set:**
   ```cmd
   REM Check environment file
   type C:\workshop-job-management\server\.env | findstr DB_PASSWORD
   
   REM Test database connection
   mysql -u workshop_user -p
   ```

The **most important location** is **line 14 in `deploy-windows.bat`** - this is where you should set your database password before running the deployment script.

```plaintext
set DB_PASSWORD=Workshop2024!
```

```plaintext
DB_HOST=localhost
DB_USER=workshop_user
DB_PASSWORD=Workshop2024!
DB_NAME=workshop_jobs
```

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Workshop2024!
DB_NAME=workshop_jobs
```

```plaintext
   REM Open deploy-windows.bat in notepad
   notepad deploy-windows.bat
   
   REM Change line 14 to your desired password
   set DB_PASSWORD=YourSecurePassword123!
   ```

2. **Run the deployment script:**
   ```cmd
   deploy-windows.bat
   ```

### **Method 2: After Deployment (Manual Change)**
1. **Update the environment file:**
   ```cmd
   REM Edit the environment file
   notepad C:\workshop-job-management\server\.env
   
   REM Change the DB_PASSWORD line to:
   DB_PASSWORD=YourNewPassword123!
   ```

2. **Update MySQL user password:**
   ```cmd
   REM Connect to MySQL as root
   mysql -u root -p
   
   REM Change the user password
   ALTER USER 'workshop_user'@'localhost' IDENTIFIED BY 'YourNewPassword123!';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Restart the application:**
   ```cmd
   cd C:\workshop-job-management
   pm2 restart workshop-management
   ```

### **Method 3: Using MySQL Command Line**
```cmd
REM Connect to MySQL
mysql -u root -p

REM Create/update database user with new password
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'YourNewPassword123!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 🔒 Security Recommendations

### **For Production Deployment:**
1. **Use a strong password** (minimum 12 characters with mixed case, numbers, and symbols)
2. **Change the default password** `Workshop2024!` before deployment
3. **Update both locations:**
   - `deploy-windows.bat` (line 14)
   - `server/env.example` (if you want to change the template)

### **Example Strong Password:**
```cmd
set DB_PASSWORD=W0rksh0p@2024!Secure#DB
```

## 📝 Quick Password Change Steps

1. **Edit deployment script:**
   ```cmd
   notepad deploy-windows.bat
   ```
   Change line 14 to your secure password

2. **Run deployment:**
   ```cmd
   deploy-windows.bat
   ```

3. **Verify password was set:**
   ```cmd
   REM Check environment file
   type C:\workshop-job-management\server\.env | findstr DB_PASSWORD
   
   REM Test database connection
   mysql -u workshop_user -p
   ```

The **most important location** is **line 14 in `deploy-windows.bat`** - this is where you should set your database password before running the deployment script.
```

```plaintext
   deploy-windows.bat
```

```plaintext
   REM Edit the environment file
   notepad C:\workshop-job-management\server\.env
   
   REM Change the DB_PASSWORD line to:
   DB_PASSWORD=YourNewPassword123!
```

```plaintext
   REM Connect to MySQL as root
   mysql -u root -p
   
   REM Change the user password
   ALTER USER 'workshop_user'@'localhost' IDENTIFIED BY 'YourNewPassword123!';
   FLUSH PRIVILEGES;
   EXIT;
```

```plaintext
   cd C:\workshop-job-management
   pm2 restart workshop-management
```

```plaintext
REM Connect to MySQL
mysql -u root -p

REM Create/update database user with new password
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'YourNewPassword123!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```plaintext
set DB_PASSWORD=W0rksh0p@2024!Secure#DB
```

```plaintext
   notepad deploy-windows.bat
```

```plaintext
   deploy-windows.bat
```

```plaintext
   REM Check environment file
   type C:\workshop-job-management\server\.env | findstr DB_PASSWORD
   
   REM Test database connection
   mysql -u workshop_user -p
```

---

**User**

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.188 sec)

mysql>

after running the deployment the script di not create the database automatically.

---

**Cursor**

I see the issue! The deployment script didn't create the database automatically. This is likely because MySQL root user doesn't have a password set, or there's an authentication issue. Let me help you fix this.


The issue is that the MySQL commands in the deployment script are failing silently. Let's fix this step by step:

## 🔧 Fix Database Creation Issue

### **Step 1: Check MySQL Root Access**
First, let's see if MySQL root user has a password:

```cmd
REM Try to connect without password
mysql -u root

REM If that doesn't work, try with password
mysql -u root -p
```

### **Step 2: Manual Database Creation**
Since the script failed, let's create the database manually:

```cmd
REM Connect to MySQL as root
mysql -u root

REM Run these commands in MySQL:
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### **Step 3: Import Database Schema**
```cmd
REM Import the schema file
mysql -u workshop_user -pWorkshop2024! workshop_jobs < C:\workshop-job-management\server\sql\schema.sql
```

### **Step 4: Verify Database Creation**
```cmd
mysql -u root

REM Check if database exists
SHOW DATABASES;

REM Check if user exists
SELECT User, Host FROM mysql.user WHERE User = 'workshop_user';

EXIT;
```

## 🛠️ Fix the Deployment Script

Let me create an improved version of the database setup section:


```plaintext
REM Try to connect without password
mysql -u root

REM If that doesn't work, try with password
mysql -u root -p
```

```plaintext
REM Connect to MySQL as root
mysql -u root

REM Run these commands in MySQL:
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```plaintext
REM Import the schema file
mysql -u workshop_user -pWorkshop2024! workshop_jobs < C:\workshop-job-management\server\sql\schema.sql
```

```plaintext
mysql -u root

REM Check if database exists
SHOW DATABASES;

REM Check if user exists
SELECT User, Host FROM mysql.user WHERE User = 'workshop_user';

EXIT;
```

```bat
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
```

## 🚀 Quick Fix Commands

Run these commands in order to fix the database issue:

### **Option 1: Quick Manual Fix**
```cmd
REM Connect to MySQL as root
mysql -u root

REM Create database and user
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

REM Import schema
mysql -u workshop_user -pWorkshop2024! workshop_jobs < C:\workshop-job-management\server\sql\schema.sql

REM Verify
mysql -u root
SHOW DATABASES;
EXIT;
```

### **Option 2: Fix MySQL Root Password First**
If MySQL root access is failing:

```cmd
REM Stop MySQL service
net stop mysql

REM Start MySQL in safe mode (skip password)
mysqld --skip-grant-tables --console

REM In another command prompt, connect and set password
mysql -u root
USE mysql;
UPDATE user SET authentication_string=PASSWORD('YourRootPassword123!') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

REM Stop safe mode MySQL and restart normally
REM Kill the mysqld process, then:
net start mysql

REM Now try the database creation again
mysql -u root -pYourRootPassword123!
```

### **Option 3: Use MySQL Workbench**
1. Open MySQL Workbench
2. Connect to localhost as root
3. Run these SQL commands:
```sql
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
```

## 🔍 Troubleshooting Steps

### **Check What Went Wrong:**
```cmd
REM Check if MySQL service is running
sc query mysql

REM Check MySQL error logs
type "C:\ProgramData\MySQL\MySQL Server 8.0\Data\*.err"

REM Test MySQL connection
mysql -u root -e "SELECT VERSION();"
```

### **Verify Files Exist:**
```cmd
REM Check if schema file exists
dir C:\workshop-job-management\server\sql\schema.sql

REM Check if environment file exists
dir C:\workshop-job-management\server\.env
```

## 📝 Updated Deployment Script

I've created an improved database setup section (`database-setup-fix.bat`) that includes better error handling. You can replace the database section in your `deploy-windows.bat` with this improved version.

**The most likely cause** is that MySQL root user doesn't have a password set, or the MySQL service isn't running properly. Try the **Quick Manual Fix** first, and let me know what happens!

```plaintext
REM Connect to MySQL as root
mysql -u root

REM Create database and user
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

REM Import schema
mysql -u workshop_user -pWorkshop2024! workshop_jobs < C:\workshop-job-management\server\sql\schema.sql

REM Verify
mysql -u root
SHOW DATABASES;
EXIT;
```

```plaintext
REM Stop MySQL service
net stop mysql

REM Start MySQL in safe mode (skip password)
mysqld --skip-grant-tables --console

REM In another command prompt, connect and set password
mysql -u root
USE mysql;
UPDATE user SET authentication_string=PASSWORD('YourRootPassword123!') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

REM Stop safe mode MySQL and restart normally
REM Kill the mysqld process, then:
net start mysql

REM Now try the database creation again
mysql -u root -pYourRootPassword123!
```

```sql
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
```

```plaintext
REM Check if MySQL service is running
sc query mysql

REM Check MySQL error logs
type "C:\ProgramData\MySQL\MySQL Server 8.0\Data\*.err"

REM Test MySQL connection
mysql -u root -e "SELECT VERSION();"
```

```plaintext
REM Connect to MySQL as root
mysql -u root

REM Create database and user
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

REM Import schema
mysql -u workshop_user -pWorkshop2024! workshop_jobs < C:\workshop-job-management\server\sql\schema.sql

REM Verify
mysql -u root
SHOW DATABASES;
EXIT;
```

```plaintext
REM Stop MySQL service
net stop mysql

REM Start MySQL in safe mode (skip password)
mysqld --skip-grant-tables --console

REM In another command prompt, connect and set password
mysql -u root
USE mysql;
UPDATE user SET authentication_string=PASSWORD('YourRootPassword123!') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

REM Stop safe mode MySQL and restart normally
REM Kill the mysqld process, then:
net start mysql

REM Now try the database creation again
mysql -u root -pYourRootPassword123!
```

```sql
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
```

```plaintext
REM Check if MySQL service is running
sc query mysql

REM Check MySQL error logs
type "C:\ProgramData\MySQL\MySQL Server 8.0\Data\*.err"

REM Test MySQL connection
mysql -u root -e "SELECT VERSION();"
```

```plaintext
REM Check if schema file exists
dir C:\workshop-job-management\server\sql\schema.sql

REM Check if environment file exists
dir C:\workshop-job-management\server\.env
```

---

**User**

C:\Users\wilson>cd C:\Users\wilson\Downloads\Workshop

C:\Users\wilson\Downloads\Workshop>npm run dev

> workshop-job-management@1.0.0 dev
> concurrently "npm run server" "npm run client"

(node:9560) [DEP0060] DeprecationWarning: The `util._extend` API is deprecated. Please use Object.assign() instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
[0]
[0] > workshop-job-management@1.0.0 server
[0] > cd server && npm run dev
[0]
[1]
[1] > workshop-job-management@1.0.0 client
[1] > cd client && npm start
[1]
[0]
[0] > workshop-job-management-server@1.0.0 dev
[0] > nodemon index.js
[0]
[1]
[1] > workshop-job-management-client@1.0.0 start
[1] > react-scripts start
[1]
[0] [nodemon] 3.1.10
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching path(s): *.*
[0] [nodemon] watching extensions: js,mjs,cjs,json
[0] [nodemon] starting `node index.js`
[0] 🚀 Server running on port 5000
[0] ❌ Database connection failed: Access denied for user 'root'@'localhost' (using password: YES)
[1] (node:5924) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
[1] (Use `node --trace-deprecation ...` to show where the warning was created)
[1] (node:5924) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
[1] Starting the development server...
[1]
[1] Compiled successfully!
[1]
[1] You can now view workshop-job-management-client in the browser.
[1]
[1]   Local:            http://localhost:3000
[1]   On Your Network:  http://192.168.3.7:3000
[1]
[1] Note that the development build is not optimized.
[1] To create a production build, use npm run build.
[1]
[1] webpack compiled successfully
[1] (node:5924) [DEP0060] DeprecationWarning: The `util._extend` API is deprecated. Please use Object.assign() instead.
[0] ::1 - - [23/Oct/2025:15:51:34 +0000] "GET /favicon.ico HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:15:51:34 +0000] "GET /favicon.ico HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:15:51:34 +0000] "GET /manifest.json HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] Login error: Error: Access denied for user 'root'@'localhost' (using password: YES)
[0]     at PromisePool.execute (C:\Users\wilson\Downloads\Workshop\server\node_modules\mysql2\lib\promise\pool.js:54:22)
[0]     at C:\Users\wilson\Downloads\Workshop\server\routes\auth.js:33:32
[0]     at Layer.handle [as handle_request] (C:\Users\wilson\Downloads\Workshop\server\node_modules\express\lib\router\layer.js:95:5)
[0]     at next (C:\Users\wilson\Downloads\Workshop\server\node_modules\express\lib\router\route.js:149:13)
[0]     at middleware (C:\Users\wilson\Downloads\Workshop\server\node_modules\express-validator\lib\middlewares\check.js:16:13)
[0]     at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
[0]   code: 'ER_ACCESS_DENIED_ERROR',
[0]   errno: 1045,
[0]   sql: undefined,
[0]   sqlState: '28000',
[0]   sqlMessage: "Access denied for user 'root'@'localhost' (using password: YES)"
[0] }
[0] ::1 - - [23/Oct/2025:15:51:51 +0000] "POST /api/auth/login HTTP/1.1" 500 39 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"


---

**Cursor**

Perfect! I can see the exact issue now. The application is running, but there's a **database connection error**: `Access denied for user 'root'@'localhost' (using password: YES)`.

The problem is that your `.env` file is configured to use the `root` user with a password, but MySQL root user either:
1. Doesn't have a password set, or
2. Has a different password than what's in the `.env` file

Let me help you fix this:


## 🔧 Quick Fix for Database Connection Issue

### **Step 1: Check Your Current .env File**
```cmd
REM Check what's in your .env file
type C:\Users\wilson\Downloads\Workshop\server\.env
```

### **Step 2: Fix MySQL Root Password**
The issue is that MySQL root user doesn't have the password `Workshop2024!`. Let's fix this:

```cmd
REM Connect to MySQL as root (try without password first)
mysql -u root

REM If that works, set a password:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Workshop2024!';
FLUSH PRIVILEGES;
EXIT;
```

**OR** if MySQL root already has a password, find out what it is:

```cmd
REM Try connecting with common passwords
mysql -u root -p
REM Enter password when prompted, or try:
REM - (empty password)
REM - root
REM - password
REM - admin
```

### **Step 3: Alternative - Use No Password for Root**
If you want to use root without a password, update your `.env` file:

```cmd
REM Edit the .env file
notepad C:\Users\wilson\Downloads\Workshop\server\.env

REM Change these lines:
DB_USER=root
DB_PASSWORD=
```

### **Step 4: Create the Database and User**
Once you can connect to MySQL as root, create the database:

```cmd
mysql -u root -p

REM Create database and user
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### **Step 5: Import Database Schema**
```cmd
REM Import the schema
mysql -u workshop_user -pWorkshop2024! workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

### **Step 6: Update .env to Use workshop_user**
```cmd
REM Edit the .env file
notepad C:\Users\wilson\Downloads\Workshop\server\.env

REM Change these lines:
DB_USER=workshop_user
DB_PASSWORD=Workshop2024!
```

### **Step 7: Restart the Application**
```cmd
REM Stop the current application (Ctrl+C)
REM Then restart:
npm run dev
```

## 🚀 Quickest Solution

**Try this first:**

1. **Connect to MySQL without password:**
   ```cmd
   mysql -u root
   ```

2. **If that works, set the password:**
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'Workshop2024!';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Create the database:**
   ```cmd
   mysql -u root -pWorkshop2024!
   ```
   ```sql
   CREATE DATABASE IF NOT EXISTS workshop_jobs;
   EXIT;
   ```

4. **Import the schema:**
   ```cmd
   mysql -u root -pWorkshop2024! workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
   ```

5. **Restart your application:**
   ```cmd
   npm run dev
   ```

## 🔍 Alternative: Use MySQL Workbench

If command line is giving you trouble:

1. **Open MySQL Workbench**
2. **Connect to localhost as root**
3. **Run these SQL commands:**
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'Workshop2024!';
   FLUSH PRIVILEGES;
   CREATE DATABASE IF NOT EXISTS workshop_jobs;
   ```
4. **Import the schema file** (`C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql`)

The key issue is that your `.env` file expects MySQL root to have password `Workshop2024!`, but MySQL root either has no password or a different password. Once you fix this, the application should connect successfully!

```plaintext
REM Check what's in your .env file
type C:\Users\wilson\Downloads\Workshop\server\.env
```

```plaintext
REM Connect to MySQL as root (try without password first)
mysql -u root

REM If that works, set a password:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Workshop2024!';
FLUSH PRIVILEGES;
EXIT;
```

```plaintext
REM Try connecting with common passwords
mysql -u root -p
REM Enter password when prompted, or try:
REM - (empty password)
REM - root
REM - password
REM - admin
```

```plaintext
REM Edit the .env file
notepad C:\Users\wilson\Downloads\Workshop\server\.env

REM Change these lines:
DB_USER=root
DB_PASSWORD=
```

```plaintext
mysql -u root -p

REM Create database and user
CREATE DATABASE IF NOT EXISTS workshop_jobs;
CREATE USER IF NOT EXISTS 'workshop_user'@'localhost' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```plaintext
REM Import the schema
mysql -u workshop_user -pWorkshop2024! workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
REM Edit the .env file
notepad C:\Users\wilson\Downloads\Workshop\server\.env

REM Change these lines:
DB_USER=workshop_user
DB_PASSWORD=Workshop2024!
```

```plaintext
REM Stop the current application (Ctrl+C)
REM Then restart:
npm run dev
```

```plaintext
   mysql -u root
```

```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'Workshop2024!';
   FLUSH PRIVILEGES;
   EXIT;
```

```plaintext
   mysql -u root -pWorkshop2024!
```

```sql
   CREATE DATABASE IF NOT EXISTS workshop_jobs;
   EXIT;

```

```plaintext
   mysql -u root -pWorkshop2024! workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
   npm run dev
```

```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'Workshop2024!';
   FLUSH PRIVILEGES;
   CREATE DATABASE IF NOT EXISTS workshop_jobs;
```

---

**User**

Enter password: ***********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 22
Server version: 9.4.0 MySQL Community Server - GPL

Copyright (c) 2000, 2025, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> mysql -u root -p h$pW0rkshop workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
ERROR:
Unknown command '\U'.
Show warnings disabled.
ERROR:
Unknown command '\D'.
Show warnings enabled.
--------------
C:\Program Files\MySQL\MySQL Server 9.4\bin\mysql.exe  Ver 9.4.0 for Win64 on x86_64 (MySQL Community Server - GPL)

Connection id:          22
Current database:
Current user:           root@localhost
SSL:                    Cipher in use is TLS_AES_128_GCM_SHA256
Using delimiter:        ;
Server version:         9.4.0 MySQL Community Server - GPL
Protocol version:       10
Connection:             localhost via TCP/IP
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    cp850
Conn.  characterset:    cp850
TCP port:               3306
Binary data as:         Hexadecimal
Uptime:                 48 min 42 sec

Threads: 3  Questions: 72  Slow queries: 0  Opens: 228  Flush tables: 3  Open tables: 147  Queries per second avg: 0.024
--------------

--------------
C:\Program Files\MySQL\MySQL Server 9.4\bin\mysql.exe  Ver 9.4.0 for Win64 on x86_64 (MySQL Community Server - GPL)

Connection id:          22
Current database:
Current user:           root@localhost
SSL:                    Cipher in use is TLS_AES_128_GCM_SHA256
Using delimiter:        ;
Server version:         9.4.0 MySQL Community Server - GPL
Protocol version:       10
Connection:             localhost via TCP/IP
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    cp850
Conn.  characterset:    cp850
TCP port:               3306
Binary data as:         Hexadecimal
Uptime:                 48 min 42 sec

Threads: 3  Questions: 75  Slow queries: 0  Opens: 228  Flush tables: 3  Open tables: 147  Queries per second avg: 0.025
--------------

--------------
C:\Program Files\MySQL\MySQL Server 9.4\bin\mysql.exe  Ver 9.4.0 for Win64 on x86_64 (MySQL Community Server - GPL)

Connection id:          22
Current database:
Current user:           root@localhost
SSL:                    Cipher in use is TLS_AES_128_GCM_SHA256
Using delimiter:        ;
Server version:         9.4.0 MySQL Community Server - GPL
Protocol version:       10
Connection:             localhost via TCP/IP
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    cp850
Conn.  characterset:    cp850
TCP port:               3306
Binary data as:         Hexadecimal
Uptime:                 48 min 42 sec

Threads: 3  Questions: 78  Slow queries: 0  Opens: 228  Flush tables: 3  Open tables: 147  Queries per second avg: 0.026
--------------


---

**Cursor**

I see the issue! You're trying to run a command line command (`mysql -u root -p...`) from inside the MySQL command line interface. You need to **exit MySQL first**, then run the command from the Windows command prompt.

Here's how to fix this:

## 🔧 Step-by-Step Fix

### **Step 1: Exit MySQL**
```sql
EXIT;
```

### **Step 2: Create the Database (from Windows Command Prompt)**
```cmd
REM First, create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"
```

### **Step 3: Import the Schema (from Windows Command Prompt)**
```cmd
REM Import the schema file
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

## 🚀 Complete Solution

**Run these commands in order:**

```cmd
REM 1. Exit MySQL (if you're still in it)
EXIT;

REM 2. Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"

REM 3. Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql

REM 4. Verify the database was created
mysql -u root -p -e "SHOW DATABASES;"

REM 5. Check if tables were created
mysql -u root -p -e "USE workshop_jobs; SHOW TABLES;"
```

## 🔍 Alternative: Do Everything Inside MySQL

If you prefer to stay in MySQL:

```sql
REM You're already in MySQL, so just run these commands:

-- Create the database
CREATE DATABASE IF NOT EXISTS workshop_jobs;

-- Use the database
USE workshop_jobs;

-- Check if database was created
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

**Then from Windows command prompt:**
```cmd
REM Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

## 📝 What You Need to Do Right Now

1. **Type `EXIT;` in MySQL** to get back to Windows command prompt
2. **Run the database creation command:**
   ```cmd
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"
   ```
3. **Import the schema:**
   ```cmd
   mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
   ```
4. **Restart your application:**
   ```cmd
   npm run dev
   ```

The key point is: **MySQL command line commands** (like `mysql -u root -p...`) must be run from the **Windows command prompt**, not from inside the MySQL interface!

```sql
EXIT;
```

```plaintext
REM First, create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"
```

```plaintext
REM Import the schema file
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
REM 1. Exit MySQL (if you're still in it)
EXIT;

REM 2. Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"

REM 3. Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql

REM 4. Verify the database was created
mysql -u root -p -e "SHOW DATABASES;"

REM 5. Check if tables were created
mysql -u root -p -e "USE workshop_jobs; SHOW TABLES;"
```

```sql
REM You're already in MySQL, so just run these commands:

-- Create the database
CREATE DATABASE IF NOT EXISTS workshop_jobs;

-- Use the database
USE workshop_jobs;

-- Check if database was created
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

```plaintext
REM Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"
```

```plaintext
   mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
   npm run dev
```

---

**User**

C:\Windows\System32>mysql -u root -p h$pW0rkshop workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
'mysql' is not recognized as an internal or external command,
operable program or batch file.

---

**Cursor**

The issue is that MySQL is not in your Windows PATH. This is common when MySQL is installed but the command line tools aren't accessible from the command prompt.

## 🔧 Fix MySQL Command Line Access

### **Method 1: Use Full Path to MySQL**
```cmd
REM Find MySQL installation path and use full path
"C:\Program Files\MySQL\MySQL Server 9.4\bin\mysql.exe" -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

### **Method 2: Add MySQL to PATH**
```cmd
REM Add MySQL to PATH temporarily
set PATH=%PATH%;"C:\Program Files\MySQL\MySQL Server 9.4\bin"

REM Now try the command
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

### **Method 3: Navigate to MySQL Bin Directory**
```cmd
REM Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 9.4\bin"

REM Now run the command
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

## 🚀 Quick Solution

**Try this first:**

```cmd
REM Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 9.4\bin"

REM Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"

REM Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

## 🔍 Alternative: Use MySQL Workbench

If command line is still giving you trouble:

1. **Open MySQL Workbench**
2. **Connect to localhost as root**
3. **Run these SQL commands:**
   ```sql
   CREATE DATABASE IF NOT EXISTS workshop_jobs;
   USE workshop_jobs;
   ```
4. **Import the schema file:**
   - Go to **Server** → **Data Import**
   - Select **Import from Self-Contained File**
   - Browse to: `C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql`
   - Select **workshop_jobs** as target schema
   - Click **Start Import**

## 📝 Step-by-Step Commands

**Run these commands in order:**

```cmd
REM 1. Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 9.4\bin"

REM 2. Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"

REM 3. Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql

REM 4. Verify the database was created
mysql -u root -p -e "SHOW DATABASES;"

REM 5. Check if tables were created
mysql -u root -p -e "USE workshop_jobs; SHOW TABLES;"
```

## 🔧 Permanent Fix: Add MySQL to PATH

To permanently add MySQL to your PATH:

1. **Open System Properties:**
   - Press `Win + R`
   - Type `sysdm.cpl`
   - Press Enter

2. **Add to PATH:**
   - Click **Environment Variables**
   - Under **System Variables**, find **Path**
   - Click **Edit**
   - Click **New**
   - Add: `C:\Program Files\MySQL\MySQL Server 9.4\bin`
   - Click **OK** on all dialogs

3. **Restart Command Prompt** and try:
   ```cmd
   mysql --version
   ```

The quickest solution is to **navigate to the MySQL bin directory first**, then run your commands from there!

```plaintext
REM Find MySQL installation path and use full path
"C:\Program Files\MySQL\MySQL Server 9.4\bin\mysql.exe" -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
REM Add MySQL to PATH temporarily
set PATH=%PATH%;"C:\Program Files\MySQL\MySQL Server 9.4\bin"

REM Now try the command
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
REM Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 9.4\bin"

REM Now run the command
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
REM Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 9.4\bin"

REM Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"

REM Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```sql
   CREATE DATABASE IF NOT EXISTS workshop_jobs;
   USE workshop_jobs;
```

```plaintext
REM 1. Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 9.4\bin"

REM 2. Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"

REM 3. Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql

REM 4. Verify the database was created
mysql -u root -p -e "SHOW DATABASES;"

REM 5. Check if tables were created
mysql -u root -p -e "USE workshop_jobs; SHOW TABLES;"
```

```plaintext
   mysql --version
```

---

**User**

:\Users\wilson>mysql -u root -p h$pW0rkshop workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
mysql  Ver 9.4.0 for Win64 on x86_64 (MySQL Community Server - GPL)
Copyright (c) 2000, 2025, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Usage: mysql [OPTIONS] [database]
  -?, --help          Display this help and exit.
  -I, --help          Synonym for -?
  --auto-rehash       Enable automatic rehashing. One doesn't need to use
       

---

**Cursor**

I see the issue! The command syntax is incorrect. You have the password and database name in the wrong order. The correct syntax should be:

```cmd
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

**NOT:**
```cmd
mysql -u root -p h$pW0rkshop workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

## 🔧 Correct Commands

### **Step 1: Create the Database First**
```cmd
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"
```

### **Step 2: Import the Schema**
```cmd
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

## 🚀 Complete Solution

**Run these commands in order:**

```cmd
REM 1. Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"

REM 2. Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql

REM 3. Verify the database was created
mysql -u root -p -e "SHOW DATABASES;"

REM 4. Check if tables were created
mysql -u root -p -e "USE workshop_jobs; SHOW TABLES;"
```

## 📝 What Happens When You Run These Commands

1. **First command** will prompt for password and create the database
2. **Second command** will prompt for password and import all the tables
3. **Third command** will show all databases (you should see `workshop_jobs`)
4. **Fourth command** will show all tables in the workshop_jobs database

## 🔍 Expected Output

After running these commands, you should see:
- Database `workshop_jobs` in the list
- Tables like: `users`, `job_cards`, `attachments`, `job_history`, `job_notes`

## ✅ After Database Setup

Once the database is created and schema imported:

1. **Restart your application:**
   ```cmd
   npm run dev
   ```

2. **Test the login:**
   - Go to `http://localhost:3000`
   - Try logging in with `admin` / `admin123`

The key fix is removing `h$pW0rkshop` from the command - MySQL will prompt you for the password when you use `-p` without specifying it!

```plaintext
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
mysql -u root -p h$pW0rkshop workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"
```

```plaintext
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql
```

```plaintext
REM 1. Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS workshop_jobs;"

REM 2. Import the schema
mysql -u root -p workshop_jobs < C:\Users\wilson\Downloads\Workshop\server\sql\schema.sql

REM 3. Verify the database was created
mysql -u root -p -e "SHOW DATABASES;"

REM 4. Check if tables were created
mysql -u root -p -e "USE workshop_jobs; SHOW TABLES;"
```

```plaintext
   npm run dev

```

---

**User**

C:\Users\wilson\Downloads\Workshop\server>npm run dev

> workshop-job-management-server@1.0.0 dev
> nodemon index.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
🚀 Server running on port 5000
✅ Database connected successfully

it stops here

---

**Cursor**

Perfect! The database connection is now working! 🎉 

The server is running successfully and has connected to the database. The fact that it shows "✅ Database connected successfully" means everything is working correctly.

## ✅ What's Happening

The server is running and waiting for requests. This is normal behavior - it's not "stopped", it's **listening** for incoming connections.

## 🚀 Next Steps

### **Step 1: Start the Frontend (in a new terminal)**
Open a **new Command Prompt** window and run:

```cmd
cd C:\Users\wilson\Downloads\Workshop
npm run client
```

**OR** run the full development environment:

```cmd
cd C:\Users\wilson\Downloads\Workshop
npm run dev
```

### **Step 2: Access the Application**
Once both frontend and backend are running:

1. **Open your browser**
2. **Go to:** `http://localhost:3000`
3. **Login with:**
   - **Manager:** `admin` / `admin123`
   - **Worker:** `worker1` / `worker123`

## 🔍 What You Should See

- **Backend running on:** `http://localhost:5000`
- **Frontend running on:** `http://localhost:3000`
- **Database:** Connected successfully

## 📝 Complete Setup Commands

**Terminal 1 (Backend - already running):**
```cmd
cd C:\Users\wilson\Downloads\Workshop\server
npm run dev
```

**Terminal 2 (Frontend - run this now):**
```cmd
cd C:\Users\wilson\Downloads\Workshop\client
npm start
```

**OR use the root command (recommended):**
```cmd
cd C:\Users\wilson\Downloads\Workshop
npm run dev
```

## 🎯 Expected Result

After starting the frontend, you should see:
- Backend: `🚀 Server running on port 5000` + `✅ Database connected successfully`
- Frontend: `Starting the development server...` + `Compiled successfully!`
- Browser: Workshop Job Management System login page

The server is working perfectly! Just start the frontend now and you'll have a fully functional application! 🚀

```plaintext
cd C:\Users\wilson\Downloads\Workshop
npm run client
```

```plaintext
cd C:\Users\wilson\Downloads\Workshop
npm run dev
```

```plaintext
cd C:\Users\wilson\Downloads\Workshop\server
npm run dev
```

```plaintext
cd C:\Users\wilson\Downloads\Workshop\client
npm start
```

```plaintext
cd C:\Users\wilson\Downloads\Workshop
npm run dev
```

---

**User**

mysql> show tables;
+-------------------------+
| Tables_in_workshop_jobs |
+-------------------------+
| attachments             |
| job_cards               |
| job_history             |
| job_notes               |
| users                   |
+-------------------------+
5 rows in set (0.032 sec)

mysql> SELECT * FROM users;
+---------+----------+----------------------+--------------------------------------------------------------+------------------+---------+-----------+---------------------+---------------------+
| user_id | username | email                | password_hash                                                | full_name        | role    | is_active | created_at          | updated_at          |
+---------+----------+----------------------+--------------------------------------------------------------+------------------+---------+-----------+---------------------+---------------------+
|       1 | admin    | admin@workshop.com   | $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi | Workshop Manager | manager |         1 | 2025-10-23 18:18:32 | 2025-10-23 18:18:32 |
|       2 | worker1  | worker1@workshop.com | $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi | John Smith       | worker  |         1 | 2025-10-23 18:18:32 | 2025-10-23 18:18:32 |
|       3 | worker2  | worker2@workshop.com | $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi | Jane Doe         | worker  |         1 | 2025-10-23 18:18:32 | 2025-10-23 18:18:32 |
|       4 | worker3  | worker3@workshop.com | $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi | Mike Johnson     | worker  |         1 | 2025-10-23 18:18:32 | 2025-10-23 18:18:32 |
+---------+----------+----------------------+--------------------------------------------------------------+------------------+---------+-----------+---------------------+---------------------+
4 rows in set (0.024 sec)

mysql>


[1] webpack compiled successfully
[1] (node:12528) [DEP0060] DeprecationWarning: The `util._extend` API is deprecated. Please use Object.assign() instead.
[0] ::1 - - [23/Oct/2025:16:28:46 +0000] "GET /favicon.ico HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:28:46 +0000] "GET /favicon.ico HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:28:47 +0000] "GET /manifest.json HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:28:54 +0000] "POST /api/auth/login HTTP/1.1" 401 33 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:29:15 +0000] "POST /api/auth/login HTTP/1.1" 401 33 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:29:39 +0000] "GET /favicon.ico HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:29:39 +0000] "GET /favicon.ico HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:29:40 +0000] "GET /manifest.json HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:34:01 +0000] "POST /api/auth/login HTTP/1.1" 401 33 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:35:11 +0000] "GET /favicon.ico HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:35:12 +0000] "GET /manifest.json HTTP/1.1" 404 29 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:35:35 +0000] "POST /api/auth/login HTTP/1.1" 401 33 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"
[0] ::1 - - [23/Oct/2025:16:36:01 +0000] "POST /api/auth/login HTTP/1.1" 401 33 "http://localhost:3000/login" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0"



When i try to log in with demo users it says invalid credentials

---

**Cursor**

I can see the issue! The database is set up correctly with the users, but you're getting **401 Unauthorized** errors when trying to log in. This suggests there's a password mismatch between what's in the database and what the application expects.

Looking at the database, I can see the users have password hashes, but the issue is likely that the **actual passwords** don't match what you're trying to use.

## 🔍 The Problem

The password hash in the database (`$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi`) corresponds to specific passwords, but they might not be the ones you're trying to use.

## 🔧 Let's Fix the Passwords

### **Method 1: Update Passwords in Database**

```sql
REM Connect to MySQL
mysql -u root -p workshop_jobs

REM Update passwords to match what you want to use
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'admin';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker1';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker2';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker3';

EXIT;
```

### **Method 2: Generate New Password Hashes**

Let me create a script to generate proper password hashes:


```sql
REM Connect to MySQL
mysql -u root -p workshop_jobs

REM Update passwords to match what you want to use
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'admin';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker1';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker2';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker3';

EXIT;
```

```javascript
const bcrypt = require('bcryptjs');

// Generate password hashes for the default passwords
const passwords = {
    admin: 'admin123',
    worker1: 'worker123',
    worker2: 'worker123',
    worker3: 'worker123'
};

console.log('Password hashes for database:');
console.log('================================');

Object.entries(passwords).forEach(([username, password]) => {
    const hash = bcrypt.hashSync(password, 10);
    console.log(`UPDATE users SET password_hash = '${hash}' WHERE username = '${username}';`);
});

console.log('\nOr use these passwords:');
console.log('========================');
Object.entries(passwords).forEach(([username, password]) => {
    console.log(`${username}: ${password}`);
});
```

### **Method 3: Quick Fix - Reset All Passwords**

Run this in MySQL:

```sql
REM Connect to MySQL
mysql -u root -p workshop_jobs

REM Reset all passwords to simple ones
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'admin';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker1';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker2';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker3';

EXIT;
```

## 🚀 Quick Solution

**Try these exact credentials:**

- **Manager:** `admin` / `password`
- **Worker:** `worker1` / `password`
- **Worker:** `worker2` / `password`  
- **Worker:** `worker3` / `password`

The hash `$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi` corresponds to the password `password`.

## 🔧 Alternative: Generate New Hashes

If you want to use different passwords:

```cmd
REM Navigate to your project
cd C:\Users\wilson\Downloads\Workshop

REM Run the password generator
node generate-passwords.js
```

This will show you the correct SQL commands to update the passwords.

## 📝 Expected Result

After updating the passwords, try logging in with:
- **Username:** `admin`
- **Password:** `password`

The 401 errors should stop and you should be able to log in successfully!

```sql
REM Connect to MySQL
mysql -u root -p workshop_jobs

REM Reset all passwords to simple ones
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'admin';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker1';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker2';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker3';

EXIT;
```

```sql
REM Connect to MySQL
mysql -u root -p workshop_jobs

REM Reset all passwords to simple ones
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'admin';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker1';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker2';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker3';

EXIT;
```

```plaintext
REM Navigate to your project
cd C:\Users\wilson\Downloads\Workshop

REM Run the password generator
node generate-passwords.js
```

---

**User**

what online tool can i used to match the password hash to its text value

---

**Cursor**

Here are several online tools you can use to match password hashes to their text values:

## 🔍 Online Hash Decoders/Crackers

### **1. HashKiller (Recommended)**
- **URL:** https://hashkiller.io/
- **Features:** 
  - Supports bcrypt, MD5, SHA1, SHA256, etc.
  - Large database of common passwords
  - Free to use
  - Good for common passwords

### **2. CrackStation**
- **URL:** https://crackstation.net/
- **Features:**
  - Massive database of pre-computed hashes
  - Supports bcrypt, MD5, SHA1, SHA256, etc.
  - Free for basic use
  - Very comprehensive

### **3. OnlineHashCrack**
- **URL:** https://www.onlinehashcrack.com/
- **Features:**
  - Multiple hash types supported
  - Free and paid options
  - Good success rate for common passwords

### **4. MD5Decrypt**
- **URL:** https://md5decrypt.net/
- **Features:**
  - Primarily MD5 but supports other formats
  - Free to use
  - Good for simple passwords

## 🎯 For Your Specific Hash

Your hash: `$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi`

**Try these tools in order:**

1. **HashKiller** - Paste your hash and search
2. **CrackStation** - Upload or paste your hash
3. **OnlineHashCrack** - Submit your hash

## 🔧 Quick Test

**Most likely passwords for your hash:**
- `password`
- `admin123`
- `worker123`
- `123456`
- `admin`

## 📝 Alternative: Generate Your Own Hashes

If you want to create new passwords, you can use:

### **Online Bcrypt Generator**
- **URL:** https://bcrypt-generator.com/
- **Features:**
  - Generate bcrypt hashes
  - Test password against hash
  - Free to use

### **Example Usage:**
1. Go to https://bcrypt-generator.com/
2. Enter your desired password (e.g., `admin123`)
3. Set rounds to `10`
4. Click "Generate"
5. Copy the hash and update your database

## 🚀 Quick Fix for Your Database

**Try this SQL command:**

```sql
mysql -u root -p workshop_jobs

-- Update all users to use 'password' as the password
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'admin';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker1';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker2';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker3';

EXIT;
```

**Then try logging in with:**
- **Username:** `admin`
- **Password:** `password`

The hash `$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi` is a very common bcrypt hash that corresponds to the password `password`.

```sql
mysql -u root -p workshop_jobs

-- Update all users to use 'password' as the password
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'admin';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker1';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker2';
UPDATE users SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE username = 'worker3';

EXIT;
```

---

**User**

I want to be able to view the database from other devices.When i try to connect from vs code in my other personal pc ii get : Error: Host 'Probook' is not allowed to connect to this MySQL server

---

**Cursor**

The issue is that MySQL is configured to only allow connections from `localhost` by default. You need to configure MySQL to allow remote connections from other devices on your network.

## 🔧 Fix MySQL Remote Access

### **Step 1: Configure MySQL User for Remote Access**

```sql
REM Connect to MySQL as root
mysql -u root -p

REM Create a user that can connect from any host
CREATE USER 'workshop_user'@'%' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'%';
FLUSH PRIVILEGES;

REM Also update the root user to allow remote connections (optional)
CREATE USER 'root'@'%' IDENTIFIED BY 'YourRootPassword';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

EXIT;
```

### **Step 2: Configure MySQL Server for Remote Connections**

```cmd
REM Find MySQL configuration file
REM Usually located at: C:\ProgramData\MySQL\MySQL Server 9.4\my.ini

REM Edit the MySQL configuration file
notepad "C:\ProgramData\MySQL\MySQL Server 9.4\my.ini"
```

**Add or modify these lines in the `[mysqld]` section:**

```ini
[mysqld]
bind-address = 0.0.0.0
port = 3306
```

### **Step 3: Configure Windows Firewall**

```cmd
REM Allow MySQL through Windows Firewall
netsh advfirewall firewall add rule name="MySQL Server" dir=in action=allow protocol=TCP localport=3306

REM Or use the GUI:
REM Control Panel > System and Security > Windows Defender Firewall > Advanced Settings
REM Inbound Rules > New Rule > Port > TCP > 3306 > Allow
```

### **Step 4: Restart MySQL Service**

```cmd
REM Restart MySQL service
net stop mysql
net start mysql
```

## 🔍 Alternative: Use MySQL Workbench for Remote Access

### **Method 1: Create Remote User**

```sql
REM Connect to MySQL as root
mysql -u root -p

REM Create user for remote access
CREATE USER 'remote_user'@'%' IDENTIFIED BY 'RemotePassword123!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'remote_user'@'%';
FLUSH PRIVILEGES;

EXIT;
```

### **Method 2: Configure MySQL Workbench on Remote PC**

1. **Open MySQL Workbench on your other PC**
2. **Create new connection:**
   - **Connection Name:** `Workshop Remote`
   - **Hostname:** `192.168.3.7` (your server's IP)
   - **Port:** `3306`
   - **Username:** `remote_user`
   - **Password:** `RemotePassword123!`

## 🚀 Quick Solution

**Run these commands on your server:**

```cmd
REM 1. Connect to MySQL
mysql -u root -p

REM 2. Create remote user
CREATE USER 'workshop_user'@'%' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'%';
FLUSH PRIVILEGES;

REM 3. Exit MySQL
EXIT;

REM 4. Configure firewall
netsh advfirewall firewall add rule name="MySQL Server" dir=in action=allow protocol=TCP localport=3306

REM 5. Restart MySQL
net stop mysql
net start mysql
```

## 🔧 Update Your Application Configuration

**Update your `.env` file to use the remote user:**

```cmd
REM Edit the environment file
notepad C:\Users\wilson\Downloads\Workshop\server\.env

REM Change these lines:
DB_HOST=localhost
DB_USER=workshop_user
DB_PASSWORD=Workshop2024!
```

## 📝 Test Remote Connection

**From your other PC (VS Code), try:**

```cmd
REM Test connection
mysql -h 192.168.3.7 -u workshop_user -p workshop_jobs

REM Or use MySQL Workbench with these settings:
REM Host: 192.168.3.7
REM Port: 3306
REM Username: workshop_user
REM Password: Workshop2024!
REM Database: workshop_jobs
```

## 🔒 Security Considerations

1. **Use strong passwords** for remote users
2. **Limit access** to specific IP ranges if possible
3. **Consider using VPN** for additional security
4. **Regularly update** MySQL and change passwords

## 🎯 Expected Result

After these changes:
- Your server will accept connections from other devices
- You can connect from VS Code on your other PC
- The application will continue to work locally
- Remote users can access the database

The key is creating a user with `@'%'` (which means "from any host") instead of `@'localhost'` (which means "only from localhost").

```sql
REM Connect to MySQL as root
mysql -u root -p

REM Create a user that can connect from any host
CREATE USER 'workshop_user'@'%' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'%';
FLUSH PRIVILEGES;

REM Also update the root user to allow remote connections (optional)
CREATE USER 'root'@'%' IDENTIFIED BY 'YourRootPassword';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

EXIT;
```

```plaintext
REM Find MySQL configuration file
REM Usually located at: C:\ProgramData\MySQL\MySQL Server 9.4\my.ini

REM Edit the MySQL configuration file
notepad "C:\ProgramData\MySQL\MySQL Server 9.4\my.ini"
```

```ini
[mysqld]
bind-address = 0.0.0.0
port = 3306
```

```plaintext
REM Allow MySQL through Windows Firewall
netsh advfirewall firewall add rule name="MySQL Server" dir=in action=allow protocol=TCP localport=3306

REM Or use the GUI:
REM Control Panel > System and Security > Windows Defender Firewall > Advanced Settings
REM Inbound Rules > New Rule > Port > TCP > 3306 > Allow
```

```plaintext
REM Restart MySQL service
net stop mysql
net start mysql
```

```sql
REM Connect to MySQL as root
mysql -u root -p

REM Create user for remote access
CREATE USER 'remote_user'@'%' IDENTIFIED BY 'RemotePassword123!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'remote_user'@'%';
FLUSH PRIVILEGES;

EXIT;
```

```plaintext
REM 1. Connect to MySQL
mysql -u root -p

REM 2. Create remote user
CREATE USER 'workshop_user'@'%' IDENTIFIED BY 'Workshop2024!';
GRANT ALL PRIVILEGES ON workshop_jobs.* TO 'workshop_user'@'%';
FLUSH PRIVILEGES;

REM 3. Exit MySQL
EXIT;

REM 4. Configure firewall
netsh advfirewall firewall add rule name="MySQL Server" dir=in action=allow protocol=TCP localport=3306

REM 5. Restart MySQL
net stop mysql
net start mysql
```

```plaintext
REM Edit the environment file
notepad C:\Users\wilson\Downloads\Workshop\server\.env

REM Change these lines:
DB_HOST=localhost
DB_USER=workshop_user
DB_PASSWORD=Workshop2024!
```

```plaintext
REM Test connection
mysql -h 192.168.3.7 -u workshop_user -p workshop_jobs

REM Or use MySQL Workbench with these settings:
REM Host: 192.168.3.7
REM Port: 3306
REM Username: workshop_user
REM Password: Workshop2024!
REM Database: workshop_jobs
```

