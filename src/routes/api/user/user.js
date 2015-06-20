var express = require('express');
var User = require('../../../models/user.js');
var logger = require('../../../service/logging/logger');

var router = express.Router();

/* user entity structure:
{
    _id: [String - login],
    passwHash: [string],
    passwSalt: [string]
} */


var mockStorage = {
    users: []
};

router.post('/login', function(req, res, next) {
    /* expected input: {
        login: [String],
        password: [String]
    }*/

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username === '' || password === '') {
        return res.send(400);
    }

    User.findOne({'local.username': username}, function(err, user) {
        if (err) return res.send(400);

        if (!user) return res.send(401);

        if (!user.validPassword(password)) return res.send(401);

        res.end();
    });
});

router.post('/register', function(req, res, next) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username === '' || password === '') {
        return res.send(400);
    }

    User.findOne({ 'local.username': username}, function(err, user) {
        if (err) return res.send(400);

        if (user) return res.send(401);

        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);

        newUser.save(function(err) {
            if (err) throw err;

            res.end();
        });
    });
});

module.exports = router;