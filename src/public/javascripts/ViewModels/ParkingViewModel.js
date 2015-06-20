(function() {
    'use strict';

    function ParkingViewModel() {
        var self = {};

        self.Map = window.YandexMap;

        self.isParkingEnabled = ko.observable(false);

        self.ShowForm = function(){
            self.Map.setGetCoordsCallback(addPlacemarkerCallback);
            self.isParkingEnabled(false);
        };

        function addPlacemarkerCallback() {

        }

        return self;
    }

    window.ViewModels.ParkingViewModel = ParkingViewModel;
})();