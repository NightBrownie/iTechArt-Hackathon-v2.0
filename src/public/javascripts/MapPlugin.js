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

        var getCoordsCallback;

        loadDefaults();

        ymaps.ready(init);
        var myMap;

        var self = {};

        self.addPlacemark = function(width, length, hintContent, balloonContent, url) {

            var newPlacemark = new ymaps.Placemark([width, length], {
                hintContent: balloonContent
            }, {
                iconImageHref: url || 'http://trololo.sto47.net/trololo.jpg',
                iconImageSize: [10, 10],
                iconImageOffset: [-15, -15]
            });
            newPlacemark.events.add('click', function (e) {
                if ($('#menu').css('display') == 'block') {
                    $('#menu').remove();
                } else {
                    // HTML-содержимое контекстного меню.
                    var menuContent =
                        '<div id="placemarker-menu">\
                            <ul id="menu_list">\
                            <span>' + balloonContent + '</span>\
                                <button>make free</button>\
                                <button>make busy</button>\
                            </ul>\
                        </div>';

                    // Размещаем контекстное меню на странице
                    $('body').append(menuContent);

                    // Задаем позицию меню.
                    $('#placemarker-menu').css({
                        left: e.get('position')[0],
                        top: e.get('position')[1] - 82
                    });
                }
            });

            myMap.geoObjects.add(newPlacemark);
        };


        self.setGetCoordsCallback = function(callback){
            getCoordsCallback = callback;
        };

        function initCallback(){
            for(var i = 0; i<5; i++)
            window.YandexMap.addPlacemark('53.88' + (i + 3) + '5' + '5'.toString(), 27.5445, i, 'Занято: '+ (i+1).toString() + i.toString() +':' + i.toString() + (i+1).toString())
        }

        function init(){
            myMap = new ymaps.Map("map", {
                center: defaults.center,
                zoom: defaults.zoom
            });

            myMap.controls.add('smallZoomControl', { top: 5 });

            myMap.events.add('click', function (e) {
                    var coords = e.get('coordPosition');

                if(getCoordsCallback){
                    getCoordsCallback(coords);
                }
            });
            initCallback();
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