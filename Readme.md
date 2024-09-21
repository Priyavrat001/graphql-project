# GraphQL Authentication Server

This project is a backend server built using **Apollo Server**, **Express**, and **GraphQL** to handle authentication and user management. It uses **Passport.js** for authentication and **MongoDB** for data storage.

## Features
- GraphQL API with Apollo Server
- User authentication with Passport.js and bcryptjs
- MongoDB for data storage using Mongoose
- Session management with express-session and MongoDB session store
- Environment variable management with dotenv

## Tech Stack

- **Node.js**: Server environment
- **Express.js**: Web framework for Node.js
- **Apollo Server**: GraphQL server implementation
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB
- **Passport.js**: Authentication middleware for Node.js
- **bcryptjs**: Library for hashing passwords
- **Nodemon**: Development tool to automatically restart the server on file changes

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
MONGO_URI=<Your MongoDB connection string>
SESSION_SECRET=<Your session secret>
