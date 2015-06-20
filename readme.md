To run the project execute following commands:
    npm i ./src
    node ./src/bin/www

API:

POST    /api/user/login {username: [String], password: [String]}
POST    /api/user/register {username: [String], password: [String]}
POST    /api/user/logout
POST    /api/user/usernameallowed {username: [String]}
GET    /api/user/ {username: [String]}