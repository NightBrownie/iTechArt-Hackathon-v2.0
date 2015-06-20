require(['jquery', 'yandexMap'], function($, yandexMap){

    var self = {};

    self.YandexMap = function() {
        var self = {};

        var myMap;

        var defaults = {
            center: [53.88855, 27.5445],
            zoom: 15
        };

        self.getDefaults = function() {
            $.ajax({
                dataType: "json",
                url: url,
                success: function(data) {
                    data = JSON.parse(data);
                    defaults.center = data.center;
                    defaults.zoom = data.zoom;
                }
            });
        };

        self.init = function() {
           myMap = new ymaps.Map("map", {
               center: defaults.center,
               zoom: defaults.zoom
           });
        };

        function addPlacemark(width, length, hintContent, balloonContent) {
            var newPlacemark = new ymaps.Placemark([width, length], {
                hintContent: hintContent,
                balloonContent: balloonContent
            });

            myMap.geoObjects.add(newPlacemark);
        }

        return self;
    }();

    ymaps.ready(self.YandexMap.init);

    return self;
});