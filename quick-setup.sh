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
