(function() {
    'use strict';

    function MainViewModel() {
        var self = {};
        self.Map = window.YandexMap();
        return self;
    }

    window.ViewModels.MainViewModel = MainViewModel;
})();