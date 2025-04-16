# DanceClassBookingAppCW2

- `PORT`: The port the application listens on
- `SECRET_ACCESS_TOKEN`: Secret string for JWT cookie authentication

## User Roles and Permissions

### Guest Role
Guests can:
- View home page
- View about page
- View all classes
- View all courses
- Register as a user
- Book classes/courses via booking form

### User Role
Users can do everything guests can, plus:
- One-click booking for classes/courses (no form required)

### Admin Role
Admins can do everything users can, plus:
- Add new classes and courses
- Add/remove administrators
- View management lists to:
  - Edit/delete classes
  - Edit/delete courses
- View participants for specific courses/classes
- Remove participants (guests or users) from specific classes/courses