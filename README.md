This file provides a complete guide for users to set up and run the frontend application along with integration details for the backend API.

# Shopping Cart Frontend

This repository contains the frontend for the Shopping Cart application built with React. It provides a user interface for browsing products, managing a shopping cart, and performing user authentication.

## Features

- Product listing with "Add to Cart" functionality
- User authentication via a login popup
- Cart management (add, update, remove items)
- Responsive design with a modern layout
- Integration with the backend API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16 or later)
- Backend API (refer to the [Shopping Cart Backend Repo](https://github.com/johnarman/shopping-cart-backend))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/johnarman/shopping-cart-frontend.git
   cd shopping-cart-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Backend API URL**:
   In the `src/config.js` file, set the URL to point to your running backend API.

4. **Run the development server**:
   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000` by default.

### Backend Setup

Ensure that you have the backend API running. Follow the instructions in the [Shopping Cart Backend Repo](https://github.com/johnarman/shopping-cart-backend) to set up the backend.

### Testing the Application

1. **Login Credentials**:
   A default demo user is created in the backend:
   - **Username**: `admin`
   - **Password**: `admin123`

2. **Swagger for Backend API**:
   The backend API has interactive documentation available through Swagger. You can access it at `http://localhost:5001/swagger` when the backend is running.

### Project Structure

```plaintext
src/
├── components/        -> React components for the application
├── context/           -> Context API for state management
├── styles/            -> CSS and styling files
├── App.js             -> Main app component
├── index.js           -> Entry point
```

### Technologies

- **React**: Frontend library
- **React Context API**: For managing global state (authentication, cart)
- **Axios**: For making HTTP requests to the backend API
- **React Router**: For handling client-side routing
- **Toastify**: For showing notifications
