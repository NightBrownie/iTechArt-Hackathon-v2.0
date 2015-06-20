var express = require('express');
var router = express.Router();
var Place = require('../../../models/place');
var auth = require('../../../service/authentication/auth');

router.get('/', auth(true), function(req, res, next) {
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;
    var radius = req.query.radius; //in meters

    var criteria = {};

    if (longitude !== undefined && latitude !== undefined && radius && radius > 0) {
        criteria = {
            'location.coordinates': {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude] },
                        $maxDistance : radius * 1.0
                    }
                }
            };
    }

    Place.find(criteria, function(err, places) {
            if (err) return res.send(500);

            places = places || [];

            places = places.map(function(place) {
                return {
                    longitude: place._doc.location.coordinates[0],
                    latitude: place._doc.location.coordinates[1],
                    lastUpdated: place._doc.lastUpdated,
                    state: place._doc.state,
                    username: place._doc.username
                };
            });

            res.json(places);
        });
});

router.post('/', auth(true), function(req, res, next) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var state = req.body.state;
    var lastUpdated = new Date(req.body.lastUpdated); //unixtime here

    var username = undefined;

    if (state === 'just_reserver') {
        username = req.session.currentUser.username;
        state = 'busy';
    }

    if (!latitude || !longitude || !state || !state || !lastUpdated) {
        return res.send(400);
    }

    Place.remove({username: username}, function(err) {
        if (err) return res.send(500);

        var place = new Place();
        place.username = username;
        place.state = state;
        place.lastUpdated = lastUpdated;

        place.location = {coordinates: [longitude, latitude]};

        place.save(function(err) {
            if (err) return res.send(500);

            res.end();
        });
    });
});

module.exports = router;