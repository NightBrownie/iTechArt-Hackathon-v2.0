(function() {
    'use strict';

    window.YandexMap = function () {

        var LOCALSTORAGE_NAMES = {
            DEFAULTS: "ParkingYandexMapDefaults"
        };

        var defaults = {
            center: [53.88855, 27.5445],
            zoom: 15
        };

        loadDefaults();

        ymaps.ready(init);
        var myMap;

        var self = {};

        self.addPlacemark = function(width, length, hintContent, balloonContent) {
            var newPlacemark = new ymaps.Placemark([width, length], {
                hintContent: hintContent,
                balloonContent: balloonContent
            }, {

                iconImageHref: 'http://trololo.sto47.net/trololo.jpg',

                iconImageSize: [30, 30],

                iconImageOffset: [-15, -15]
            });

            myMap.geoObjects.add(newPlacemark);
        };


        function init(){
            myMap = new ymaps.Map("map", {
                center: defaults.center,
                zoom: defaults.zoom
            });

            myMap.events.add('click', function (e) {
                    var coords = e.get('coordPosition');
                    myMap.balloon.open(coords, {
                        contentBody:'<p>position</p>'
                    });
            });
        }

        function getDefaults() {
            $.ajax({
                dataType: 'json',
                url: 'http://google.com',
                success: function (data) {
                    var data = {
                        center: [53.88855, 27.5445],
                        zoom: 15
                    };
/*                    data = JSON.parse(data);*/
                    defaults.center = data.center;
                    defaults.zoom = data.zoom;
                }
            });
        }

        function loadDefaults() {
            var defaultsFromJson = localStorage.getItem(LOCALSTORAGE_NAMES.DEFAULTS);
            defaultsFromJson = JSON.parse(defaultsFromJson) || null;
            if(defaultsFromJson == null) {
                getDefaults();
                addDefaultsToLocalStorage();
            }
            else {
                defaults.center = defaultsFromJson.center;
                defaults.zoom   = defaultsFromJson.zoom;
            }
        }

        function addDefaultsToLocalStorage() {
            var defaultsToJson = {};
            defaultsToJson.center =  defaults.center;
            defaultsToJson.zoom = defaults.zoom;

                var defaultsJsonData = JSON.stringify(defaultsToJson);
                localStorage.setItem(LOCALSTORAGE_NAMES.DEFAULTS, defaultsJsonData);
            }

        return self;
    }();
})();