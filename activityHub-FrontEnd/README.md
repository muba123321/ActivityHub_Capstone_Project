# ActivityHub

ActivityHub is a web application for creating, managing, and participating in various activities. Users can create public or private activities, upload images, and edit or delete activities they own. Participants can join activities and interact with the content.

## Features

- User Authentication (Sign Up, Sign In, and Sign Out)
- Create, Edit, and Delete activities
- Upload images for activities
- Pagination for viewing activities
- Secure access using Firebase authentication and JWT tokens
- Role-based functionality (only activity owners can edit/delete activities)
- Real-time updates with user feedback through toast notifications
- Responsive design using React-Bootstrap

## Tech Stack

- Frontend: React, Redux, React-Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB
- Storage: Firebase Storage for image hosting
- Authentication: Firebase Authentication with JWT
- API: RESTful API for activity management
- Hosting: Firebase (for images), MongoDB (for activities and user data)

## Usage

- Sign Up to create an account.
- Sign In to access the dashboard.
- Create Activities by clicking on the "Create Activity" button.
- Edit or Delete activities you own using the icons on the top-right of each activity.
- Join Activities by clicking on the "Join" button in any activity.

## Contributing

- Feel free to submit pull requests or issues. For major changes, please open an issue first to discuss what you would like to change.
