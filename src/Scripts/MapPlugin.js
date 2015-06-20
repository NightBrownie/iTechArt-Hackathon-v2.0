(function() {
    'use strict';

    window.YandexMap = function () {
        ymaps.ready(init);
        var myMap;

        var self = {};

        var defaults = {
            center: [53.88855, 27.5445],
            zoom: 15
        };

        self.getDefaults = function () {
            $.ajax({
                dataType: "json",
                url: url,
                success: function (data) {
                    data = JSON.parse(data);
                    defaults.center = data.center;
                    defaults.zoom = data.zoom;
                }
            });
        };

        self.addPlacemark = function(width, length, hintContent, balloonContent) {
            var newPlacemark = new ymaps.Placemark([width, length], {
                hintContent: hintContent,
                balloonContent: balloonContent
            });

            myMap.geoObjects.add(newPlacemark);
        };

        function init(){
            myMap = new ymaps.Map("map", {
                center: defaults.center,
                zoom: defaults.zoom
            });
        }

        return self;
    }();
})();