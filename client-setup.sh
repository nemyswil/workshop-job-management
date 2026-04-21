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
