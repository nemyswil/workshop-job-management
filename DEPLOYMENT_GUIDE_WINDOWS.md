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
