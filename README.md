# eCommerce Application

This is a simple eCommerce application built with Node.js, Express.js, and MongoDB. The application allows users to:

- Register and login (User authentication).
- View products.
- Add products to their shopping cart.
- Manage the cart (add/remove products).

## Features

- **User Management**: Register, login, and authentication using JWT.
- **Product Management**: View available products.
- **Shopping Cart**: Add products to the cart, view cart, and remove products from the cart.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: dotenv
- **Package Management**: npm

## Project Structure
ecommerce-application/
├── config/
│   └── db.js                # MongoDB connection setup
├── controllers/
│   ├── authController.js     # User registration, login, and authentication logic
│   ├── productController.js  # Logic for product CRUD operations
│   └── cartController.js     # Logic for managing the shopping cart
├── models/
│   ├── user.js               # Mongoose schema for user
│   ├── product.js            # Mongoose schema for product
│   └── cart.js               # Mongoose schema for cart
├── routes/
│   ├── authRoutes.js         # User authentication routes (register, login)
│   ├── productRoutes.js      # Product management routes (view, add, update)
│   └── cartRoutes.js         # Cart management routes (add to cart, view, remove)
├── middleware/
│   └── authMiddleware.js     # Middleware to protect routes requiring authentication
├── .env                      # Environment variables (e.g., database URL, JWT secret)
├── .gitignore                # Git ignore file
├── package.json              # Project metadata and dependencies
├── README.md                 # Project documentation (this file)
└── server.js                 # Main entry point for the application
# 1. Create a project directory
mkdir ecommerce-application
cd ecommerce-application

# 2. Initialize Node.js
npm init -y

# 3. Install dependencies
npm install express mongoose dotenv jsonwebtoken bcryptjs cors
npm install --save-dev nodemon

# 4. Create project structure
mkdir config models routes controllers middleware
touch config/db.js .env .gitignore server.js

# 5. Add environment variables
echo "PORT=5000" >> .env
echo "MONGODB_URI=mongodb://localhost:27017/ecommerce" >> .env
echo "JWT_SECRET=your-secret-key" >> .env

# 6. Add .gitignore
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore

# 7. Run the server
npm run dev




# 1. Initialize a Git repository
git init

# 2. Add all files to the staging area
git add .

# 3. Commit the changes
git commit -m "Initial commit"

# 4. Create a new repository on GitHub
# (Do this step on GitHub website or using GitHub CLI)

# 5. Add the GitHub repository as a remote (replace <repository-url> with your GitHub repo URL)
git remote add origin <repository-url>

# 6. Push the code to the GitHub repository
git branch -M main # Rename branch to 'main' if needed
git push -u origin main

