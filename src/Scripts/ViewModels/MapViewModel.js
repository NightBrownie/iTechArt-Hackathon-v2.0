(function() {
    'use strict';

    function MapViewModel() {
        var self = {};
        self.Map = window.YandexMap();

        self.isMapEnabled = ko.observable(false);

        return self;
    }

    window.ViewModels.MapViewModel = MapViewModel;
})();