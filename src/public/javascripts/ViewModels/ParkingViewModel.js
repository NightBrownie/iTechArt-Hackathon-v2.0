(function() {
    'use strict';

    function ParkingViewModel() {
        var self = {};

        self.Map = window.YandexMap;

        self.isParkingEnabled = ko.observable(false);

        self.ShowForm = function(){
            self.Map.setGetCoordsCallback(addPlacemarkerCallback);
            self.isParkingEnabled(false);
            getPlaceMarks();

        };

        function addPlacemarkerCallback() {

        }

        function getPlaceMarks() {
           /* $.ajax({
                dataType: 'json',
                url: 'http://localhost:3000',
                fail: function (data) {
                    var data = {
                        center: [53.88855, 27.5445],
                        zoom: 15
                    };
                    *//*                    data = JSON.parse(data);*//*
                    for(var i = 0; i<5; i++)
                        self.Map.addPlacemark('53.88' + (i + 3) + '5' + '5'.toString(), 27.5445, i, 'Занято: '+ (i+1).toString() + i.toString() +':' + i.toString() + (i+1).toString());
                },
                always: function (data) {
                    var data = {
                        center: [53.88855, 27.5445],
                        zoom: 15
                    };
                    *//*                    data = JSON.parse(data);*/
                    for(var i = 0; i<5; i++)
                        self.Map.addPlacemark('53.88' + (i + 3) + '5' + '5'.toString(), 27.5445, i, 'Занято: '+ (i+1).toString() + i.toString() +':' + i.toString() + (i+1).toString()/*,  freeCallback, busyCallback*/);
/*                }
            });*/
        }

        function freeCallback(e) {
return function() {
    var coords = e.get('position');
    addNewPlacemark(coords[0], coords[1], 'busy')
}
        }

        function busyCallback(e) {
            return function() {
                var coords = e.get('position');
                //addNewPlacemark(coords[0], coords[1], 'free')
            }
        }

        function addNewPlacemark(c1, c2, type) {
            self.Map.addPlacemark(c1, c2, type, type + ': ',  freeCallback(), busyCallback());
        }

        return self;
    }

    window.ViewModels.ParkingViewModel = ParkingViewModel;
})();