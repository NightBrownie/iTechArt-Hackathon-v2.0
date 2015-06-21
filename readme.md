To run the project execute following commands:
    npm i ./src
    node ./src/bin/www

API:

    User:

POST    /api/user/login {username: [String], password: [String]}
POST    /api/user/register {username: [String], password: [String]}
POST    /api/user/logout
POST    /api/user/usernameallowed {username: [String]}
GET    /api/user/ {username: [String]}

    Place:

POST    /api/place {state: 'just_reserver', latitude: -55.02, longitude: 43.2, lastUpdated: new Date()}
    states: [
        'free',
        'busy',
        'just_reserved' - used is only when sent to server to show that current user is just reserved place
    ]
GET    /api/place    ?latitude=-55.02&longitude=43.2&radius=1
GET    /api/place/nearestfree    ?latitude=-55.02,longitude=43.2
