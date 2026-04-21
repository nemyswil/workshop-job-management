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
