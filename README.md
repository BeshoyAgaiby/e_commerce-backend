🛒 E-Commerce RESTful API

A scalable and modular E-Commerce Backend API built with Node.js, Express, and MongoDB, following clean architecture principles and real-world backend development practices.

This project simulates a production-level e-commerce system including authentication, role-based authorization, product management, cart system, orders, payments, reviews, coupons, filtering, and pagination.

Features

🔐 Authentication & Authorization

JWT-based authentication

Role-based access control (Admin / User)

Secure password hashing

Protected routes middleware

👤 User Management

Register & Login

Profile management

Admin control over users

🏷️ Catalog System

Categories & Subcategories

Brands management

Product CRUD operations

Image upload via Cloudinary

Slug generation

🛒 Shopping System

Add/remove products from cart

Update cart quantities

Apply discount coupons

Automatic total price calculation

📦 Orders & Payments

Create order from cart

Integrated payment system

Order lifecycle management (pending, paid, shipped, delivered, cancelled)

Users can view their own orders

Admin can manage all orders

⭐ Reviews System

Add product reviews

Rating calculation per product

⚙️ Advanced Backend Features

Pagination

Filtering

Sorting

Search

Factory pattern for reusable CRUD operations

Services Layer (business logic separation)

Centralized error handling

Validation using Joi

Clean modular architecture

src/
│
├── modules/
│ ├── authentication/
│ ├── user/
│ ├── category/
│ ├── subCategory/
│ ├── brand/
│ ├── product/
│ ├── cart/
│ ├── coupon/
│ ├── order/
│ └── review/
│
├── middleware/
├── services/
├── utilities/
├── cloudinary/
└── database/

Architecture Overview

Controllers → Handle HTTP requests & responses

Services → Business logic layer

Models → Mongoose schemas

Middleware → Auth, validation, error handling

Utilities → Reusable helper functions

🛠️ Tech Stack

Node.js

Express.js

MongoDB

Mongoose

JWT

Joi

Cloudinary

Multer

⚙️ Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/BeshoyAgaiby/ecommerce-api.git
cd ecommerce-api

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PAYMENT_SECRET=your_payment_secret

4️⃣ Run the server
nodemon index.js or
nodemon

🔑 Authentication

Authorization: Bearer <JWT_TOKEN>

📌 Example API Endpoints

POST /api/v1/users/signup
POST /api/v1/users/signin

GET /api/v1/products?page=1&limit=10&sort=price
POST /api/products (Admin)

POST /api/v1/cart
POST /api//v1/orders
PATCH /api/orders/:id (Admin)

Security & Best Practices

Password hashing

Role-based middleware

Request validation (Joi)

Centralized error handler

Environment variable configuration

Clean separation (Controller / Service pattern)

📈 Future Improvements

Docker support

CI/CD pipeline

Unit & Integration testing

Redis caching

Deployment (Render / Railway / VPS)

## 📄 API Documentation
[Download API Documentation](./E-Commerce%20APP%20Documentation.pdf)

👨‍💻 Author

Beshoy Agaiby Gamal
Software Engineering Student
Backend Developer | Node.js | MongoDB
Interested in Backend Development & Artificial Intelligence & knowledge in Frontend (React.js)
"# e_commerce-backend" 
