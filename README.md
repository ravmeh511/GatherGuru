# GatherGuru - Event Management Platform

## Project Overview
GatherGuru is a modern event management platform designed to streamline the process of creating, managing, and attending events. The platform provides a comprehensive solution for event organizers and attendees, featuring advanced ticketing, venue management, and analytics capabilities.

## Features
- **Event Management**
  - Create and manage events with detailed information
  - Multiple ticket types and pricing options
  - Custom fields for event-specific data
  - Schedule management with multiple sessions
  - Media uploads for event images

- **Ticketing System**
  - Multiple ticket categories
  - Early bird pricing
  - QR code-based tickets
  - Ticket transfer capabilities
  - Real-time availability tracking

- **Venue Management**
  - Detailed venue information
  - Business hours management
  - Capacity tracking
  - Amenities listing
  - Location services

- **User Management**
  - Role-based access control
  - Email and phone verification
  - Multiple address support
  - Payment method management
  - User preferences

- **Analytics & Reporting**
  - Event performance metrics
  - Ticket sales tracking
  - Revenue analytics
  - Social media sharing stats
  - Conversion rate monitoring

## Technology Stack
- **Frontend**
  - React 18 with TypeScript
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - Responsive design

- **Backend**
  - Node.js/Express
  - MongoDB database
  - TypeScript
  - RESTful API architecture

- **DevOps**
  - Docker containerization
  - AWS cloud services
  - CI/CD pipeline
  - Automated testing

## Database Schema
The application uses a comprehensive database schema with the following key entities:
- Users and authentication
- Events and tickets
- Venues and locations
- Orders and payments
- Reviews and analytics
- Categories and tags
- User preferences and notifications

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Docker (optional)
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/gatherguru.git
   cd gatherguru
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Backend
   cp .env.example .env
   # Frontend
   cp .env.example .env
   ```

4. Start the development servers:
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend
   cd frontend
   npm start
   done
   ```

## Project Structure
```
gatherguru/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── public/
│   └── package.json
└── README.md
```

## API Documentation
The API documentation is available at `/api/docs` when running the development server. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing
```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Deployment
The application can be deployed using Docker:
```bash
# Build and run with Docker
docker-compose up --build
```



## Team
- Ravi Mehta (Full Stack Developer)
- Sairaj Patel (Backend Developer)
- Bhavin Patel (Team Lead & Frontend Developer)

## Contact
For any queries or support, please contact:
- Email: support@gatherguru.com
- Website: https://gatherguru.com

## Acknowledgments
- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their valuable tools and libraries 