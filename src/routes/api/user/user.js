var express = require('express');
var User = require('../../../models/user.js');
var logger = require('../../../service/logging/logger');
var auth = require('../../../service/authentication/auth');

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

router.post('/login', auth(false), function(req, res, next) {
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

        req.session.currentUser = {username: username};

        res.end();
    });
});

router.post('/register', auth(false), function(req, res, next) {
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

            req.session.currentUser = {username: username};

            res.end();
        });
    });
});

router.post('/logout', auth(true), function(req, res, next) {
    if (!req.session.currentUser) {
        return res.send(401);
    }

    req.session.currentUser = undefined;
    res.end();
});

router.post('/usernameallowed', auth(false), function(req, res) {
    var username = req.body.value || '';

    if (username === '') return res.send(400);

    User.findOne({'local.username': username}, function(err, user) {
        if (err) return res.send(500);

        if (!user)
            return res.end();
        else
            return res.send(400);
    });
});

router.get('/', auth(true), function(req, res) {
    var usernames = req.query.username;

    if (!usernames && req.session.currentUser) {
        usernames = [req.session.currentUser.username];
    }

    if (!(usernames instanceof Array)) {
        usernames = [usernames];
    }

    User.find({'local.username': {'$in': usernames}}, function(err, users) {
        if (err) return res.send(500);

        if (!users || !users.length) return res.send(404);

        res.json(users.map(function(user) {
            return {
                username: user._doc.local.username
            };
        }));
    });
});


module.exports = router;