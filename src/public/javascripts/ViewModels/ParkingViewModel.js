(function() {
    'use strict';

    function ParkingViewModel() {
        var self = {};

        self.Map = window.YandexMap;

        self.isParkingEnabled = ko.observable(false);

        self.ShowForm = function () {
            self.Map.setGetCoordsCallback(addPlacemarkerCallback);
            self.isParkingEnabled(false);
            getPlaceMarks();
        };

        self.getMyCoordinates = function () {
            var location = self.Map.getGeolocation();
            self.Map.setCenter(location);
            //self.Map.renderCircle(location);
            self.Map.addPlacemark(location.latitude, location.longitude, 'You', 'You', '/images/current.png');
        };

        self.TakePlace = function () {
            var location = self.Map.getGeolocation();
            var date = new Date();

            $.post('/api/place', {state: 'just_reserved', latitude: location.latitude, longitude: location.longitude, lastUpdated: (date).toJSON()}, function (data) {
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
                    alert('Nearest Empty Place');
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