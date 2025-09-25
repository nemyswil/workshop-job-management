# Workshop Job Management System

A comprehensive web-based job management system designed for small-scale workshop operations. This system streamlines the process of creating, assigning, tracking, and completing job cards within a workshop environment.

## 🚀 Features

### For Managers
- **Job Management**: Create, edit, and track job cards with detailed information
- **User Management**: Add, edit, and manage worker accounts
- **Real-time Updates**: Monitor job progress with live status updates
- **File Attachments**: Upload and manage job-related files and drawings
- **Reporting**: View job statistics and worker performance
- **Priority Management**: Set job priorities (Low, Medium, High, Urgent)
- **Due Date Tracking**: Monitor deadlines and overdue jobs

### For Workers
- **Job Dashboard**: View assigned jobs with clear status indicators
- **Job Details**: Access complete job information, descriptions, and attachments
- **Status Updates**: Mark jobs as in-progress, completed, or closed
- **File Access**: Download and view job attachments
- **Notes**: Add notes and comments to jobs
- **Real-time Notifications**: Receive updates when jobs are assigned or modified

### System Features
- **Authentication**: Secure login with role-based access control
- **Real-time Updates**: WebSocket integration for live updates
- **File Management**: Secure file upload and download system
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Activity Logging**: Complete audit trail of all job activities
- **Data Validation**: Comprehensive input validation and error handling

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MySQL** database with connection pooling
- **JWT** authentication
- **Socket.io** for real-time updates
- **Multer** for file uploads
- **bcryptjs** for password hashing

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Axios** for API communication
- **React Toastify** for notifications
- **React Icons** for UI icons
- **Styled Components** for styling

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **Git** (optional, for version control)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd workshop-job-management
```

### 2. Install Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

### 3. Database Setup
1. Start your MySQL service
2. Create a new database:
   ```sql
   CREATE DATABASE workshop_jobs;
   ```
3. Run the schema file:
   ```bash
   mysql -u root -p workshop_jobs < server/sql/schema.sql
   ```

### 4. Environment Configuration
1. Copy the environment example file:
   ```bash
   cp server/env.example server/.env
   ```
2. Update `server/.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=workshop_jobs
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

### 5. Start the Application
```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔐 Default Login Credentials

### Manager Account
- **Username**: `admin`
- **Password**: `admin123`

### Worker Accounts
- **Username**: `worker1` / **Password**: `worker123`
- **Username**: `worker2` / **Password**: `worker123`
- **Username**: `worker3` / **Password**: `worker123`

## 📁 Project Structure

```
workshop-job-management/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── sql/              # Database schema
│   ├── uploads/          # File uploads directory
│   └── package.json
├── package.json           # Root package.json
├── README.md
└── SETUP.md
```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install-all` - Install dependencies for all packages
- `npm run build` - Build the frontend for production
- `npm start` - Start the production server

### Server Only
- `npm run server` - Start only the backend server
- `cd server && npm run dev` - Start backend with nodemon

### Client Only
- `npm run client` - Start only the frontend
- `cd client && npm start` - Start React development server

## 🗄️ Database Schema

The system uses the following main entities:

- **users** - User accounts (managers and workers)
- **job_cards** - Job information and status
- **attachments** - File attachments for jobs
- **job_history** - Activity log for jobs
- **job_notes** - Comments and notes on jobs

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- Secure file upload handling
- CORS protection
- Helmet.js security headers

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🚀 Deployment

### Production Build
```bash
# Build the frontend
npm run build

# Start production server
npm start
```

### Environment Variables for Production
Ensure to set the following environment variables:
- `NODE_ENV=production`
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`
- `PORT` (optional, defaults to 5000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the SETUP.md file for detailed installation instructions
2. Review the API documentation in the server routes
3. Check the browser console for client-side errors
4. Check the server logs for backend errors

## 🔄 Real-time Features

The system includes real-time updates using WebSockets:
- Job status changes
- New job assignments
- File uploads
- Note additions
- User activity

## 📊 Reporting Features

Managers can view:
- Job completion statistics
- Worker performance metrics
- Overdue job alerts
- Daily/weekly job summaries
- File upload statistics

---

**Built with ❤️ for workshop management efficiency**
