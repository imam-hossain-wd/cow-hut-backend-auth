


# Cow-Hut-Backend-auth

## Project Overview
This project is a backend server implementation for an "Online Cow Selling" platform specifically designed for Eid Ul Adha. It leverages Express.js, TypeScript, MongoDB with Mongoose, and incorporates JWT for enhanced security and role-based permissions for a better user management experience.

### Goal
The primary goal is to streamline the process of buying and selling cows online, addressing the unique needs of buyers and sellers during the festive period of Eid Ul Adha.

### Main Features
1. **CRUD Operations**: Comprehensive Create, Read, Update, and Delete functionalities for managing user profiles and cow listings.
2. **Error Handling**: Advanced error handling mechanisms with global error handling middleware.
3. **Pagination and Filtering**: Efficient retrieval of cow listings through pagination and filtering options.
4. **Transactions**: Simulation of the transaction process for purchasing cows, adding realism to the buying experience.
5. **User Authentication and Authorization**: Enhanced security and user experience through JWT-based authentication and role-based authorization.

## Key Components
1. **User Model**: Differentiates between 'seller' and 'buyer' roles, offering tailored functionalities for each.
2. **Cow Model**: Contains comprehensive details about cows such as name, age, breed, price, etc.
3. **Order History and Transaction Management**: Keeps track of user purchases and transactions, ensuring transparency and reliability.

## Technology Stack
- **Express.js**: For creating a robust server-side application.
- **TypeScript**: Ensures type safety and improves the development experience.
- **MongoDB with Mongoose**: For a scalable database solution.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Role-Based Permissions**: To differentiate access levels between different user types.
- **Other Dependencies**: Including CORS, dotenv, Winston (for logging), ESLint (for code quality), and Prettier (for code formatting).

## Enhanced Endpoints Implementation
In addition to the standard CRUD operations, the project includes advanced features for a comprehensive backend experience:

- **JWT-Based Authentication Endpoints**: Secure login and token generation.
- **Role-Based Access Control (RBAC)**: Different endpoints or functionalities based on user roles (Admin, Seller, Buyer).

## Advanced Security Features
- **JWT Integration**: Secure user authentication and session management.
- **Role-Based Permissions**: Customizable access control for different user roles.

## API Endpoints  ### 

## Base URL
`https://cow-hut-backend-ten.vercel.app/api/v1/`

### Enhanced User Endpoints
`
`  ### Auth (User) 
 -  **Create User**  -  `POST /auth/signup` 
  -  **Login User**  -  `POST /auth/login`  
  -  **Refresh Token**  -  `POST /auth/refresh-token`

## Auth (Admin)

  - **Create Admin**  -  `POST /admins/create-admin`  
  -   **Login Admin**  -  `POST /admins/login`  
  
## User

  -  **Get All Users**  -  `GET /users`  
  -   **Get Single User by ID**  -  `GET /users/:id`  
  -   **Delete a User**  -  `DELETE /users/:id`  -
  -  **Update User**  -  `PUT /users/:id
`

### Cows, Orders, and Other Endpoints

## Cows

  **Create Cow**  -  `POST /cows`  
    **Get All Cows**  -  `GET /cows`  
      **Get Cow by ID**  -  `GET /cows/:id`  
        **Update Cow**  -  `PUT /cows/:id`  -  
        **Delete Cow**  -  `DELETE /cows/:id`  

## Orders

   **Create Order**  -  `POST /orders`  
       **Get All Orders**  -  `GET /orders` 
        **Get Single Order by ID**  -  `GET /orders/:id`  

## My Profile

   **Get User Profile**  -  `GET /users/my-profile` 
**Update User Profile**  -  `PATCH /users/my-profile`  -
 **Get Admin Profile**  -  `GET /admins/my-profile`  - 
 **Update Admin Profile**  -  `PATCH /admins/my-profile`




## Challenges and Solutions
- **Scalability**: Optimized database queries and efficient code to handle large volumes of data.
- **Security**: Implemented JWT and role-based permissions to secure user data.
- **Testing**: Plans for a comprehensive test suite to ensure reliability and robustness (yet to be implemented).


## Installation and Running the Project

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [yarn](https://classic.yarnpkg.com/en/)
- [MongoDB](https://www.mongodb.com/)

## Cloning the Repository

To clone the repository and run this project, follow these steps:

 1. Open your terminal.
 2. Clone the repository: git clone https://github.com/your-username/your-project-repository.git
 3. Navigate to the project directory: cd Cow-Hut-Backend 
 4. Installing Dependencies : yarn install
 5. Configuring the Environment

## .env 

 - NODE_ENV="development
 - PORT=5000 
 - DATABASE_URL=mongodb://your-mongodb-url
 -  BCRYPT_SALT_ROUNDS=12 
 - JWT_SECRET=your-jwt-secret 
 - JWT_REFRESH_SECRET=your-jwt-refresh-secret 
 - JWT_EXPIRES_IN=your-jwt-expiration-time 
 - JWT_REFRESH_EXPIRES_IN=your-jwt-refresh-expiration-time

## Conclusion
The Cow-Hut-Backend is a state-of-the-art backend solution, designed for an online cow selling platform. It emphasizes security, efficiency, and user-friendliness, particularly for the festive occasion of Eid Ul Adha.

## Contact

For further information, suggestions, or queries, please contact:
- 📧 Email: [imamhossain6t9@gmail.com](mailto:imamhossain6t9@gmail.com)
- 📱 Phone: +8801624243747

