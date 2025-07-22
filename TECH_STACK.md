# GatherGuru2 Technology Stack

## Table of Contents
1. [Overview](#overview)
2. [Frontend Technologies](#frontend-technologies)
3. [Backend Technologies](#backend-technologies)
4. [Database & ORM](#database--orm)
5. [Authentication & Security](#authentication--security)
6. [Development Tools](#development-tools)
7. [Build Tools & Bundlers](#build-tools--bundlers)
8. [Styling & UI Libraries](#styling--ui-libraries)
9. [State Management](#state-management)
10. [HTTP Client & API](#http-client--api)
11. [Routing](#routing)
12. [Data Visualization](#data-visualization)
13. [Utilities & Helpers](#utilities--helpers)
14. [Code Quality & Linting](#code-quality--linting)
15. [Version Control](#version-control)
16. [Architecture Patterns](#architecture-patterns)

## Overview

GatherGuru2 is a modern, full-stack event management platform built with cutting-edge technologies. The application follows a client-server architecture with a React-based frontend and Node.js/Express backend, connected to a MongoDB database.

### Technology Stack Summary
- **Frontend**: React 19 + Vite + TypeScript
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT + bcryptjs
- **Styling**: Tailwind CSS + Material-UI
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **Database**: MongoDB with Mongoose ODM

## Frontend Technologies

### Core Framework
- **React 19.1.0** - Modern JavaScript library for building user interfaces
  - Latest version with concurrent features
  - Component-based architecture
  - Virtual DOM for efficient rendering
  - Hooks for state and side effects

### Build System
- **Vite 6.3.5** - Next-generation frontend build tool
  - Lightning-fast hot module replacement (HMR)
  - ES modules-based development server
  - Optimized production builds
  - Plugin system for extensibility

### TypeScript Support
- **@types/react 19.1.2** - TypeScript definitions for React
- **@types/react-dom 19.1.2** - TypeScript definitions for React DOM
- Provides type safety and better developer experience

## Backend Technologies

### Runtime Environment
- **Node.js** - JavaScript runtime built on Chrome's V8 engine
  - Event-driven, non-blocking I/O
  - Single-threaded event loop
  - Rich ecosystem of packages

### Web Framework
- **Express.js 4.18.2** - Fast, unopinionated web framework for Node.js
  - Minimal and flexible
  - Middleware support
  - RESTful API development
  - Route handling and middleware chaining

### Development Server
- **Nodemon 2.0.22** - Development tool that monitors file changes
  - Automatic server restart on file changes
  - Development workflow enhancement
  - Configurable file watching

## Database & ORM

### Database
- **MongoDB 7.0.3** - NoSQL document database
  - Flexible schema design
  - Horizontal scalability
  - Rich query language
  - JSON-like document storage

### Object Document Mapper (ODM)
- **Mongoose 7.0.3** - MongoDB object modeling for Node.js
  - Schema definition and validation
  - Middleware support (pre/post hooks)
  - Query building and population
  - Type casting and business logic

## Authentication & Security

### Password Hashing
- **bcryptjs 2.4.3** - Library for hashing passwords
  - Salt rounds for security
  - Adaptive hashing algorithm
  - Protection against rainbow table attacks

### JWT Authentication
- **jsonwebtoken 9.0.0** - JSON Web Token implementation
  - Stateless authentication
  - Token-based session management
  - Configurable expiration times
  - Secure token generation and verification

### Frontend JWT Handling
- **jwt-decode 4.0.0** - JWT token decoding utility
  - Client-side token parsing
  - User information extraction
  - Token validation helpers

## Development Tools

### Environment Management
- **dotenv 16.0.3** - Environment variable loader
  - Secure configuration management
  - Environment-specific settings
  - .env file support

### Cross-Origin Resource Sharing (CORS)
- **cors 2.8.5** - Express middleware for CORS
  - Cross-origin request handling
  - Configurable origins and methods
  - Credentials support

### Cookie Management
- **cookie-parser 1.4.6** - Cookie parsing middleware
  - HTTP cookie parsing
  - Signed cookie support
  - Session management

## Build Tools & Bundlers

### Frontend Build System
- **Vite** - Modern build tool with:
  - ES modules in development
  - Rollup for production builds
  - Plugin ecosystem
  - Optimized asset handling

### CSS Processing
- **PostCSS 8.5.3** - CSS transformation tool
  - Plugin-based CSS processing
  - Autoprefixer integration
  - CSS optimization

- **Autoprefixer 10.4.21** - CSS vendor prefixing
  - Automatic vendor prefix addition
  - Browser compatibility support
  - CSS standardization

## Styling & UI Libraries

### CSS Framework
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
  - Rapid UI development
  - Responsive design utilities
  - Customizable design system
  - JIT (Just-In-Time) compilation

### Material Design Components
- **@mui/material 7.1.0** - React Material-UI components
  - Material Design implementation
  - Comprehensive component library
  - Theme customization
  - Accessibility features

- **@mui/icons-material 7.1.0** - Material Design icons
  - Extensive icon library
  - Scalable vector graphics
  - Consistent design language

### CSS-in-JS
- **@emotion/react 11.14.0** - CSS-in-JS library
  - Component-based styling
  - Dynamic styles
  - Server-side rendering support

- **@emotion/styled 11.14.0** - Styled components for Emotion
  - CSS-in-JS with styled components
  - Theme integration
  - Dynamic prop-based styling

### Icon Libraries
- **react-icons 5.5.0** - Popular icon library
  - Multiple icon sets (Font Awesome, Material, etc.)
  - Tree-shaking support
  - Consistent API

## State Management

### Redux Toolkit
- **@reduxjs/toolkit 2.8.2** - Official Redux toolkit
  - Simplified Redux setup
  - Immutable update logic
  - Built-in DevTools
  - RTK Query for API calls

### React-Redux Integration
- **react-redux 9.2.0** - React bindings for Redux
  - Hooks-based API (useSelector, useDispatch)
  - Performance optimizations
  - Context-based state sharing

## HTTP Client & API

### HTTP Client
- **axios 1.9.0** - Promise-based HTTP client
  - Request/response interceptors
  - Automatic JSON transformation
  - Error handling
  - Request cancellation

### API Configuration
- **Base URL**: `http://localhost:5000/api`
- **CORS**: Enabled for development
- **Authentication**: Bearer token in headers
- **Content-Type**: application/json

## Routing

### Client-Side Routing
- **react-router-dom 7.6.1** - React routing library
  - Declarative routing
  - Nested routes support
  - Route protection
  - History management

### Route Structure
```
/ - User Login (default)
/user/* - User routes
/admin/* - Admin routes
/organizer/* - Organizer routes
/events/* - Public event routes
```

## Data Visualization

### Chart Libraries
- **recharts 2.15.3** - Composable charting library
  - React-based charts
  - Responsive design
  - Multiple chart types
  - Customizable themes

- **@nivo/bar 0.99.0** - Bar chart component
  - D3-based rendering
  - Interactive features
  - Customizable styling

- **@nivo/line 0.99.0** - Line chart component
  - Time series visualization
  - Smooth animations
  - Multiple data series

## Utilities & Helpers

### Date Manipulation
- **date-fns 4.1.0** - Modern JavaScript date utility library
  - Immutable date operations
  - Tree-shaking support
  - Locale support
  - Formatting and parsing

### Cookie Management (Frontend)
- **js-cookie 3.0.5** - JavaScript cookie handling
  - Simple cookie API
  - JSON support
  - Expiration handling

### Toast Notifications
- **react-hot-toast 2.5.2** - Toast notification library
  - Lightweight and customizable
  - Promise-based API
  - Multiple positions
  - Accessibility features

## Code Quality & Linting

### Linting
- **eslint 9.25.0** - JavaScript linting utility
  - Code quality enforcement
  - Style consistency
  - Error detection
  - Customizable rules

### ESLint Plugins
- **@eslint/js 9.25.0** - ESLint JavaScript configuration
- **eslint-plugin-react-hooks 5.2.0** - React Hooks linting rules
- **eslint-plugin-react-refresh 0.4.19** - React Refresh linting

### Global Variables
- **globals 16.0.0** - Global variables for ESLint
  - Browser globals
  - Node.js globals
  - Environment-specific globals

## Version Control

### Git
- **Repository**: Git-based version control
- **Branching Strategy**: Feature branch workflow
- **Commit Standards**: Conventional commits
- **Ignore Patterns**: Node modules, environment files

## Architecture Patterns

### Frontend Architecture
- **Component-Based**: Reusable UI components
- **Container/Presenter**: Separation of logic and presentation
- **Custom Hooks**: Shared stateful logic
- **Context API**: Global state for themes, auth

### Backend Architecture
- **MVC Pattern**: Model-View-Controller separation
- **Middleware Pattern**: Request processing pipeline
- **Route Separation**: Modular route organization
- **Service Layer**: Business logic abstraction

### Database Design
- **Document-Oriented**: MongoDB document structure
- **Schema Validation**: Mongoose schema definitions
- **Indexing Strategy**: Performance optimization
- **Data Relationships**: Population and references

## Development Workflow

### Development Environment
- **Hot Reload**: Vite HMR for frontend
- **Auto-restart**: Nodemon for backend
- **Environment Variables**: dotenv configuration
- **Debugging**: Browser DevTools + Node.js debugging

### Code Organization
```
Frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── redux/         # State management
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   └── assets/        # Static assets

Backend/
├── config/            # Configuration files
├── controllers/       # Route controllers
├── middleware/        # Custom middleware
├── models/           # Database models
└── routes/           # API routes
```

## Performance Optimizations

### Frontend
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Unused code elimination
- **Bundle Optimization**: Vite build optimization
- **Image Optimization**: WebP format support

### Backend
- **Database Indexing**: Query performance optimization
- **Caching Strategy**: Response caching
- **Compression**: Gzip compression
- **Connection Pooling**: Database connection management

## Security Measures

### Authentication
- **JWT Tokens**: Stateless authentication
- **Password Hashing**: bcryptjs with salt
- **Token Expiration**: Configurable timeouts
- **Route Protection**: Middleware-based access control

### Data Protection
- **Input Validation**: Request data sanitization
- **CORS Configuration**: Cross-origin security
- **Environment Variables**: Sensitive data protection
- **HTTPS**: Production SSL/TLS encryption

## Scalability Considerations

### Frontend
- **Component Reusability**: Modular design
- **State Management**: Centralized Redux store
- **Code Splitting**: Lazy loading strategies
- **Performance Monitoring**: Bundle analysis

### Backend
- **Database Optimization**: Indexing and queries
- **API Design**: RESTful principles
- **Error Handling**: Comprehensive error management
- **Logging**: Request and error logging

---

**Note**: This technology stack is designed for modern web development with a focus on performance, maintainability, and developer experience. The combination of React, Node.js, and MongoDB provides a robust foundation for building scalable event management applications. 