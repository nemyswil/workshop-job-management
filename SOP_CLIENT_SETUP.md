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
