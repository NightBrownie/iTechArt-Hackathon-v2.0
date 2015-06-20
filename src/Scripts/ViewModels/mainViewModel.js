(function() {
    'use strict';

    function MainViewModel() {
        var self = {};
        self.vm = window.ViewModels;

        self.MapViewModel = new self.vm.MapViewModel();

        self.ParkingViewModel = new self.vm.ParkingViewModel();


        return self;
    }

    window.ViewModels.MainViewModel = MainViewModel;
})();