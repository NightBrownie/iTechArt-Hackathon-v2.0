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
            //self.Map.setCenter(location);
            //self.Map.renderCircle(location);
            self.Map.addPlacemark(location.latitude, location.longitude, 'You', 'You', '/images/current.png');
        };

        self.TakePlace = function () {
            var location = self.Map.getGeolocation();
            $.post('/api/place', function (data) {
                self.Map.addPlacemark(location.latitude, location.longitude, 'You', 'You', '/images/current.png');
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
                self.Map.addPlacemark(location.latitude, location.longitude, 'You', 'You', '/images/current.png');
            });

            /*for (var i = 0; i < 5; i++)
                self.Map.addPlacemark('53.88' + (i + 3) + '5' + '5'.toString(), 27.5445, 'UNKNOW', 'UNKNOW', '/images/unknown.png');*/
            /*                }
             });*/
        }

        return self;
    }

    window.ViewModels.ParkingViewModel = ParkingViewModel;
})();