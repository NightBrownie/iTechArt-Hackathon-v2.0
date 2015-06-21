(function() {
    'use strict';

    function ParkingViewModel() {
        var self = {};
        /*var d = [{
            lastUpdated: "2015-06-21T03:43:31.803Z",
            latitude: 53.90109,
            longitude: 27.558759,
            state: "busy",
            username: "z"
        },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.890109,
                longitude: 27.560759,
                state: "free",
                username: "s"
            },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.90509,
                longitude: 27.550759,
                state: "busy",
                username: "k"
            },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.90509,
                longitude: 27.561759,
                state: "free",
                username: "l"
            },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.90999,
                longitude: 27.56200,
                state: "busy",
                username: "z"
            },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.88109,
                longitude: 27.539759,
                state: "busy",
                username: "m"
            },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.87109,
                longitude: 27.568759,
                state: "free",
                username: "z"
            },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.90109,
                longitude: 27.549909,
                state: "busy",
                username: "o"
            },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.92109,
                longitude: 27.553759,
                state: "busy",
                username: "zc"
            },
            {
                lastUpdated: "2015-06-21T03:43:31.803Z",
                latitude: 53.90109,
                longitude: 27.563759,
                state: "busy",
                username: "fv"
            }];*/

        self.Map = window.YandexMap;

        self.isParkingEnabled = ko.observable(false);

        self.ShowForm = function () {
            self.Map.setGetCoordsCallback(addPlacemarkerCallback);
            self.isParkingEnabled(false);
            getPlaceMarks();
        };

        self.ShowMarkers = function () {
            getPlaceMarks();
        };

        self.isTrackPlacingEnabled = ko.observable(false);

        self.Track = function () {
            self.isTrackPlacingEnabled(!self.isTrackPlacingEnabled());
            self.Map.enabledTrack = self.isTrackPlacingEnabled();
        };

        self.getMyCoordinates = function () {
            var location = self.Map.getGeolocation();
            self.Map.setCenter(location, true);
            self.Map.addPlacemark(location.latitude, location.longitude, 'You', 'You', '/images/current.png');
        };

        self.TakePlace = function () {
            var location = self.Map.getGeolocation();
            var date = new Date();

            $.post('/api/place', {state: 'just_reserver', latitude: location.latitude, longitude: location.longitude, lastUpdated: (date).toJSON()}, function (data) {
                self.Map.addPlacemark(location.latitude, location.longitude, 'Your Place', 'Your Place', '/images/busy.png');
            });
        };

        self.ShowNearestParkingPlace = function() {
            var location = self.Map.getGeolocation();
            $.ajax({
                url: "/api/place/nearestfree",
                type: 'GET',
                data: {latitude: location.latitude, longitude: location.longitude},
                context: document.body
            }).done(function (data) {
                if(data.hasOwnProperty('latitude')) {
                    self.Map.setCenter({latitude: data.latitude, longitude: data.longitude});
                }
                else {
                    alert('Free Place Not Found');
                }
            });
        };

        function addPlacemarkerCallback() {

        }

        function getPlaceMarks() {
            var location = self.Map.getGeolocation();
            $.ajax({
                url: "/api/place",
                type: 'GET',
                data: {latitude: location.latitude, longitude: location.longitude, radius: 500},
                context: document.body
            }).done(function (data) {
                /*if (data.length <= 1) data = d;*/
                data.forEach(function(item){
                    var date = new Date(item.lastUpdated);
                    var content = item.state == 'free' ?'FREE: ' + date.getHours() +':'+date.getMinutes(): 'BUSY: ' + date.getHours() +':'+date.getMinutes();
                    var img = item.state == 'free' ?'/images/free.png' : '/images/busy.png';
                    self.Map.addPlacemark(item.latitude, item.longitude, content, content, img);
                });

            });
        }

        return self;
    }

    window.ViewModels.ParkingViewModel = ParkingViewModel;
})();