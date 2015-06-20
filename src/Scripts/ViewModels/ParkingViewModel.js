(function() {
    'use strict';

    function ParkingViewModel() {
        var self = {};
        self.Map = window.YandexMap;

        self.isParkingEnabled = ko.observable(false);

        return self;
    }

    window.ViewModels.ParkingViewModel = ParkingViewModel;
})();