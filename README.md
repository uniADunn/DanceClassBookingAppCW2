# DanceClassBookingAppCW2
cw2 dance booking app
this is a small readme file for use of the dance booking app

there are pre-registered users

REGULAR USER -
username - user1
username - user2

ADMIN USER -
username - admin

all user passwords are: password

the app requires a .env file

the contents of the .env file are

PORT = 3000 
SECRET_ACCESS_TOKEN = "a_jwt_secret_string"

the port to listen on
the secret access token string for the cookie.

ROLES 

Guest Role -
guest roles can
    * home page
    * about page
    * view all classes
    * view all courses
    * register
    * book class or course via a bookin form

User Role -
user roles can do the same as guest roles +
    * book class or course without requireing to use booking form (one click booking)

Admin Role -
Admin roles can do the same as user roles +
    * add new classes and courses
    * add new admininstrators
    * remove administrators
    * view class management lists to edit, delete classes
    * view course management lists to edit, delete courses
    * view participants for specific courses or classes
    * remove participants guest or users booked into specific class or courses


