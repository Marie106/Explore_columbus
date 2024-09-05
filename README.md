# capstone
Explore Columbus: A Guide to Family, Women’s, and Couples’ Activities **Introduction**: As a software engineer and a mother of two, I have experienced the challenges of finding suitable places for various activities, especially when traveling. Whether it's looking for kid-friendly restaurants, safe spaces for women, or fun activities for couples or friends, the information is often scattered across different sources. This project aims to create a comprehensive and user-friendly website that consolidates all these options into one place, making it easier for residents and visitors in Columbus to find activities that suit their needs. 

Frontend Development
1. Setup and Configuration:
○ Initialize a React project using Create React App or a similar setup.
○ Install necessary dependencies (e.g., React Router, Axios, Redux if state
management is needed).
2. Design and Wireframing:
○ Create wireframes for each page (Home, Families, Women, Couples, Map, About
Us).
○ Decide on the overall theme and style (color schemes, fonts, etc.).
3. Components and Pages:
○ Home Page:
■ Header with logo and navigation menu.
■ Welcome message and quick links to other sections.
■ Featured activities and highlights section.
■ Footer with contact information and legal links.
○ Families Page:
■ Header with navigation.
■ Search and filter options.
■ List of family-friendly activities (cards with images, descriptions, ratings).
■ Interactive map showing locations.
■ Footer.
○ Women’s Safe Spaces Page:
■ Similar to Families Page, but focused on safe spaces for women.
■ Search and filter by location, type, and amenities.
■ List and map display.
○ Couples & Friends Page:
■ Similar to Families Page, focused on couples and friends' activities.
■ Search and filter options.
■ List and map display.
○ Map View:
■ A full-page map that shows all activity locations with filters.
○ About Us Page:
■ Basic information about the website’s purpose, team, and contact details.
4. State Management:
○ Use React Hooks or Redux for managing application state (e.g., handling user
data, search filters, and activity lists).
5. API Integration:
○ Set up Axios or Fetch to make calls to the backend APIs for retrieving activities,
user information, and reviews.
○ Handle API responses and update the UI accordingly.
6. Routing:
○ Implement navigation using React Router to handle different views/pages.
7. User Interaction:
○ Add interactive elements (e.g., search bars, buttons, maps) to enhance user
experience.
○ Implement user feedback collection (e.g., rating activities, submitting reviews).
8. Responsive Design:
○ Ensure the site is fully responsive and works well on desktop, tablet, and mobile
devices.
○ Test on different screen sizes.
9. Testing:
○ Test the frontend thoroughly to ensure all components work as expected.
○ Fix any bugs or layout issues.
Backend Development
1. Setup and Configuration:
○ Initialize a Node.js project.
○ Set up Express as the web framework.
○ Install necessary packages (e.g., Mongoose for MongoDB, body-parser, CORS).
2. API Endpoints:
○ Activity Endpoints:
■ POST /activities: Create a new activity.
■ GET /activities: Retrieve all activities.
■ GET /activities/:id: Retrieve a specific activity by ID.
■ PUT /activities/:id: Update an activity.
■ DELETE /activities/:id: Delete an activity.
○ User Endpoints:
■ POST /users: Register a new user.
■ GET /users/:id: Retrieve user profile.
■ PUT /users/:id: Update user information.
■ DELETE /users/:id: Delete user account.
○ Review Endpoints:
■ POST /reviews: Add a new review.
■ GET /reviews: List all reviews.
■ GET /reviews/:id: Retrieve a specific review.
■ PUT /reviews/:id: Update a review.
■ DELETE /reviews/:id: Remove a review.
3. User Authentication:
○ Implement user authentication using JWT (JSON Web Token).
○ Protect routes that require authentication (e.g., posting reviews, updating user
info).
4. Error Handling:
○ Implement error handling for all routes.
○ Return meaningful error messages for client-side handling.
5. Data Validation:
○ Validate incoming data using middleware (e.g., Joi or express-validator).
Database Setup Tasks
1. MongoDB Setup:
○ Set up a MongoDB database (e.g., using MongoDB Atlas for cloud hosting).
○ Configure database connection in the backend using Mongoose.
2. Data Models:
○ Activity Model:
■ Fields: activityId, name, description, type, location, price,
rating, reviews.
○ User Model:
■ Fields: userId, name, email, password, favorites, reviews.
○ Review Model:
■ Fields: reviewId, activityId, userId, rating, comment, date.
3. Indexes:
○ Apply indexes to important fields for faster querying (e.g., activityId,
location, userId).
