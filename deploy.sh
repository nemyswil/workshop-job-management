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
