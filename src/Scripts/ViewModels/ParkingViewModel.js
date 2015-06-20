(function() {
    'use strict';

    function ParkingViewModel(Map) {
        var self = {};
        self.Map = Map;

        self.isParkingEnabled = ko.observable(false);

        return self;
    }

    window.ViewModels.ParkingViewModel = ParkingViewModel;
})();