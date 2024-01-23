# E-commerce-Nike-website Using Express.js , Node.js , MongoDB , HTML , CSS

This project is a E-commerce website built using Node.js and Express.js for the server-side, MongoDB as the database, and Laravel Mix for managing frontend assets. The system allows users to navigate through a user-friendly interface to order products, view their cart, login, register, and manage their orders.

Directory Structure and NPM Setup:
Initialized an NPM project and installed essential dependencies such as Express and EJS for templating.

Express Server:
Created a server.js file to set up the Express server.

Frontend Styling:
Integrated Laravel Mix to manage JavaScript and SCSS files.
Installed and configured Tailwind CSS for styling.

Basic HTML Pages:
Developed a Home page using HTML and CSS.
Implemented a Cart page with order summary and empty cart sections.

Route Organization and Controllers:
Moved routes to separate files for better organization.
Created dedicated controllers for various functionalities.

Adding Items to Cart:
Implemented the functionality to fetch items from a database and display them on the Home page.
Created a menu model with dummy data and connected it to MongoDB.
Integrated axios for AJAX requests and installed the Noty notification library.

User Authentication:
Implemented a login page with a dedicated route.
Developed a registration page with CRUD operations for user registration.
Integrated passport for user authentication.
Used Bcrypt.js for Password Hashing

Order Management:
Created an Order controller and linked it in server.js.
Developed an Orders view with tables for both customers and admin users.
Implemented the ability to place orders and view them on the customer orders page.
Displayed orders on the admin orders page with the capability to change order status.

Order Tracker with Socket Connection:
Implemented a socket connection for real-time order tracking using Socket.io.
