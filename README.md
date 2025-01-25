# E-commerce API

A comprehensive, production-ready RESTful API built with Node.js and Express.js for powering modern e-commerce platforms. This backend service provides a complete suite of features for managing users, products, shopping carts, orders, and customer communications.

## Author

**Elmehdi REZOUG**
- GitHub: [elmehdi-rezoug](https://github.com/elmehdi-rezoug)
- LinkedIn: [elmehdi-rezoug](https://www.linkedin.com/in/elmehdi-rezoug)
- Email: elmehdirezoug100@gmail.com

## Deployment
- API URL:
[![Deploy on Railway](https://railway.app/button.svg)](https://e-commerce-api-production-3318.up.railway.app)

## Overview

This API serves as a robust backend infrastructure for e-commerce applications, implementing industry best practices and modern security standards. It's designed to handle everything from user authentication to order processing, with careful attention to data validation, error handling, and secure operations.

### Key Features

#### Authentication & Authorization
- Secure JWT-based authentication system
- Role-based access control (Admin/User)
- Password encryption using bcrypt with salt rounds
- Token-based session management
- Secure password reset functionality

#### User Management
- Complete user profile management
- Email validation
- Password strength requirements
- Session handling

#### Admin Management
- Manage admin profiles with CRUD operations
- Secure admin login with JWT authentication
- Role-specific access using middleware
- Password encryption for admin accounts

#### Product Management
- Comprehensive product catalog system
- Category management
- Price management

#### Shopping Cart System
- Real-time cart management
- Multi-product cart support
- Automatic price calculation
- Cart persistence
- Product availability validation

#### Order Processing
- Complete order lifecycle management
- Multiple payment status handling
- Date-based order organization
- Cart to order conversion

#### Messaging System
- User-to-admin communication
- User association with messages

## Technical Implementation

### Architecture
- RESTful API design principles
- MVC (Model-View-Controller) architecture
- Modular routing system
- Middleware-based request processing
- Environmental configuration management

### Database Design
- MongoDB with Mongoose
- Structured data models with validation
- Referential integrity using MongoDB references
- Indexed fields for optimal performance
- Data validation at model level

### Security Features
- HTTP request logging with Morgan
- Input sanitization
- Environment variable security
- JWT implementation
### API Design
- Consistent RESTful endpoints
- Standardized response formats
- Comprehensive error handling
- Status code adherence
- Query parameter support

### Performance Optimization
- Asynchronous operations
- Promise-based architecture
- Efficient database queries
- Proper indexing
- Connection pooling

## Technical Stack

### Core Dependencies
```json
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.4",
    "morgan": "^1.10.0",
    "validator": "^13.12.0"
  }
}
```

## API Endpoints

### Authentication
- POST `/api/users/login` - User login
- POST `/api/admins/login` - Admin login

### Users
- GET `/api/users` - Get all users (Admin only)
- GET `/api/users/:id` - Get user by ID (Admin or authenticated user)
- POST `/api/users` - Register new user (Anyone)
- PATCH `/api/users/:id` - Update user (Admin or authenticated user)
- DELETE `/api/users/:id` - Delete user (Admin or authenticated user)

### Admins
- GET `/api/admins` - Get all admins (Admin only)
- GET `/api/admins/:id` - Get admin by ID (Admin only)
- POST `/api/admins` - Register new admin
- PATCH `/api/admins/:id` - Update admin (Admin only)
- DELETE `/api/admins/:id` - Delete admin (Admin only)

### Products
- GET `/api/products` - Get all products (Anyone)
- GET `/api/products/:id` - Get product by ID (Anyone)
- POST `/api/products` - Create product (Admin only)
- PATCH `/api/products/:id` - Update product (Admin only)
- DELETE `/api/products/:id` - Delete product (Admin only)

### Carts
- GET `/api/carts` - Get all carts (Admin only)
- GET `/api/carts/:id` - Get cart by ID (Admin or cart owner)
- POST `/api/carts` - Create cart (Admin or authenticated user)
- PATCH `/api/carts/:id` - Update cart (Admin or cart owner)
- DELETE `/api/carts/:id` - Delete cart (Admin or cart owner)

### Orders
- GET `/api/orders` - Get all orders (Admin only)
- GET `/api/orders/:id` - Get order by ID (Admin or order owner)
- POST `/api/orders` - Create order (Admin or authenticated user)
- PATCH `/api/orders/:id` - Update order status (Admin only)
- DELETE `/api/orders/:id` - Delete order (Admin only)

### Messages
- GET `/api/messages` - Get all messages (Admin only)
- GET `/api/messages/:id` - Get message by ID (Admin or message owner)
- POST `/api/messages` - Create message (Admin or authenticated user)
- PATCH `/api/messages/:id` - Update message (Admin only)
- DELETE `/api/messages/:id` - Delete message (Admin only)

## Data Models

### User
- firstName: String
- lastName: String
- email: String (required, unique, validated as an email)
- password: String (required, validated by a strong password validator)

### Admin
- email: String (required, unique, validated as an email)
- password: String (required, validated by a strong password validator)

### Product
- name: String (required, unique)
- category: String (required, values: "Clothing", "Electronics", "Furniture", "Books")
- image: String (required)
- price: Number (required)

### Cart
- totalPrice: Number
- userId: ObjectId (reference to the "User" model, required)
- products: Array of ObjectId (references to the "Product" model)

### Order
- totalPrice: Number (required)
- paymentStatus: String (enum: "Pending", "Completed", "Failed", default: "Pending")
- userId: ObjectId (reference to the "User" model, required)
- products: Array of ObjectId (references to the "Product" model, required)
- carts: Array of ObjectId (references to the "Cart" model, required)
- date: Date (default: current date)

### Message
- content: String (required)
- userId: ObjectId (reference to the "User" model, required)

## Project Structure
```
project-root/
├── controllers/         # Request handlers
│   ├── admin_controller.js
│   ├── cart_controller.js
│   ├── message_controller.js
│   ├── order_controller.js
│   ├── product_controller.js
│   └── user_controller.js
├── models/             # Database models
│   ├── admin_model.js
│   ├── cart_model.js
│   ├── message_model.js
│   ├── order_model.js
│   ├── product_model.js
│   └── user_model.js
├── middleware/         # Custom middleware
│   └── authMiddleware.js
├── routes/            # API routes
│   ├── admin_routes.js
│   ├── cart_routes.js
│   ├── message_routes.js
│   ├── order_routes.js
│   ├── product_routes.js
│   └── user_routes.js
├── utils/             # Helper functions
│   ├── checkers.js
│   └── jwt.js
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── index.js          # Application entry point
└── package.json      # Project dependencies
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/elmehdi-rezoug/e-commerce-api.git
```

2. Clone the repository
```bash
cd e-commerce-api
```

3. Install dependencies
```bash
npm install
```

4. Create a .env file with the following variables:
```
PORT=9000 or whatever port you want
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
```

4. Start the server
```bash
npm start
```

## Authentication

The API uses JWT for authentication. Protected routes require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

## Error Handling

Standard HTTP status codes are used:
- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

**Elmehdi REZOUG**  
- **Email**: [elmehdirezoug100@gmail.com](mailto:elmehdirezoug100@gmail.com)  
- **LinkedIn**: [linkedin.com/in/elmehdi-rezoug](https://linkedin.com/in/elmehdi-rezoug)

For more information, visit the project on GitHub:  
**Project Link**: [e-commerce-api GitHub Repository](https://github.com/elmehdi-rezoug/e-commerce-api)
