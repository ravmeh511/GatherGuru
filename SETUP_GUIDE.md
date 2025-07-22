# GatherGuru2 Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Installation Steps](#installation-steps)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Running the Application](#running-the-application)
7. [Troubleshooting](#troubleshooting)
8. [Development Workflow](#development-workflow)

## Prerequisites

Before setting up GatherGuru2, ensure you have the following installed on your system:

### Required Software
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (v5.0 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### Optional Software
- **MongoDB Compass** (GUI for MongoDB) - [Download here](https://www.mongodb.com/try/download/compass)
- **Postman** or **Insomnia** (API testing)
- **VS Code** (recommended editor)

### Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version

# Check MongoDB (if installed locally)
mongod --version
```

## Project Overview

GatherGuru2 is a full-stack event management platform with the following architecture:

- **Frontend**: React 19 with Vite, Redux Toolkit, Material-UI, and Tailwind CSS
- **Backend**: Node.js/Express with MongoDB
- **Authentication**: JWT-based authentication with role-based access
- **Database**: MongoDB with Mongoose ODM

### Project Structure
```
GatherGuru2/
├── Backend/                 # Node.js/Express API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── Frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## Installation Steps

### 1. Clone the Repository
```bash
# Clone the repository
git clone <repository-url>
cd GatherGuru2

# Or if you already have the project locally
cd GatherGuru2
```

### 2. Install Backend Dependencies
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Verify installation
npm list --depth=0
```

### 3. Install Frontend Dependencies
```bash
# Navigate to frontend directory
cd ../Frontend

# Install dependencies
npm install

# Verify installation
npm list --depth=0
```

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `Backend/` directory:

```bash
# Navigate to backend directory
cd Backend

# Create .env file
touch .env
```

Add the following environment variables to `Backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/gatherguru

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=24h

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Optional: MongoDB Atlas (if using cloud database)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gatherguru?retryWrites=true&w=majority
```

### Frontend Environment Variables

Create a `.env` file in the `Frontend/` directory:

```bash
# Navigate to frontend directory
cd Frontend

# Create .env file
touch .env
```

Add the following environment variables to `Frontend/.env`:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Environment
VITE_NODE_ENV=development
```

## Database Setup

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Edition**
   - Follow the [official MongoDB installation guide](https://docs.mongodb.com/manual/installation/)
   - For Windows: Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

2. **Start MongoDB Service**
   ```bash
   # Windows (run as administrator)
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb-community
   ```

3. **Verify MongoDB Connection**
   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # Or for older versions
   mongo
   ```

### Option 2: MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Choose the free tier (M0)
   - Select your preferred cloud provider and region
   - Create the cluster

3. **Configure Database Access**
   - Create a database user with read/write permissions
   - Note down the username and password

4. **Configure Network Access**
   - Add your IP address to the IP whitelist
   - Or allow access from anywhere (0.0.0.0/0) for development

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Update the `MONGO_URI` in your backend `.env` file

### Database Initialization

The database will be automatically initialized when you first run the backend server. The application will create the necessary collections and indexes.

## Running the Application

### 1. Start the Backend Server

```bash
# Navigate to backend directory
cd Backend

# Start in development mode (with auto-restart)
npm run dev

# Or start in production mode
npm start
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected
```

### 2. Start the Frontend Development Server

Open a new terminal window:

```bash
# Navigate to frontend directory
cd Frontend

# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v6.3.5  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 3. Access the Application

- **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser
- **Backend API**: Available at [http://localhost:5000/api](http://localhost:5000/api)

## Available Scripts

### Backend Scripts
```bash
cd Backend

# Development mode (with auto-restart)
npm run dev

# Production mode
npm start

# Install dependencies
npm install
```

### Frontend Scripts
```bash
cd Frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Install dependencies
npm install
```

## User Roles and Access

The application supports multiple user roles:

1. **Admin Users**
   - Access: `/admin/login`
   - Full system access and user management

2. **Organizers**
   - Access: `/organizer/login` or `/organizer/register`
   - Event creation and management

3. **Regular Users**
   - Access: `/user/login` or `/user/signup`
   - Event browsing and ticket purchasing

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Check what's using the port
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000

# Kill the process
# Windows (replace PID with actual process ID)
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

#### 2. MongoDB Connection Issues
```bash
# Check if MongoDB is running
# Windows
sc query MongoDB

# macOS/Linux
sudo systemctl status mongod

# Test MongoDB connection
mongosh --eval "db.runCommand('ping')"
```

#### 3. Node Modules Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. CORS Issues
- Ensure the `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that the frontend is running on the correct port (3000)

#### 5. JWT Token Issues
- Verify `JWT_SECRET` is set in backend `.env`
- Check token expiration settings

### Error Logs

#### Backend Logs
- Check the terminal where the backend is running
- Look for MongoDB connection errors
- Verify environment variables are loaded correctly

#### Frontend Logs
- Open browser developer tools (F12)
- Check the Console tab for JavaScript errors
- Check the Network tab for API request failures

## Development Workflow

### 1. Code Structure
- **Backend**: Follow MVC pattern with controllers, models, and routes
- **Frontend**: Component-based architecture with Redux for state management

### 2. API Development
- All API endpoints are prefixed with `/api`
- Authentication is handled via JWT tokens
- CORS is configured for local development

### 3. Database Changes
- Update models in `Backend/models/`
- Add new routes in `Backend/routes/`
- Implement controllers in `Backend/controllers/`

### 4. Frontend Changes
- Add new components in `Frontend/src/components/`
- Create new pages in `Frontend/src/pages/`
- Update Redux slices in `Frontend/src/redux/`

### 5. Testing
```bash
# Backend testing (when implemented)
cd Backend
npm test

# Frontend testing (when implemented)
cd Frontend
npm test
```

## Deployment Considerations

### Environment Variables for Production
- Use strong, unique JWT secrets
- Configure proper CORS origins
- Use environment-specific MongoDB URIs
- Set appropriate NODE_ENV values

### Security Best Practices
- Never commit `.env` files to version control
- Use HTTPS in production
- Implement proper input validation
- Set up rate limiting for API endpoints

## Support and Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

### Team Contact
- For technical issues: Check the project repository
- For feature requests: Create an issue in the repository

---

**Note**: This setup guide assumes you're working in a development environment. For production deployment, additional configuration and security measures will be required. 