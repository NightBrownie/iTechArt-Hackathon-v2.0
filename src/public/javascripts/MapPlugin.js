(function() {
    'use strict';

    function randomBool(){
        return Math.random()<.5;
    }

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

        self.enabledTrack;


        self.addPlacemark = function (width, length, hintContent, balloonContent, url) {

            var baloonCont = '';
            var newPlacemark = new ymaps.Placemark([width, length], {
                hintContent: balloonContent
            }, {
                iconImageHref: url || 'http://trololo.sto47.net/trololo.jpg',
                iconImageSize: hintContent === 'PACMAN' ? ([35, 35]) : [15, 15],
                iconImageOffset: [-15, -15]
            });
            newPlacemark.events.add('click', function (e) {

                var newPlacemark = e.get('target');

                if ($('#placemarker-menu').css('display') == 'block') {
                    $('#placemarker-menu').remove();
                } else {
                    // HTML-содержимое контекстного меню.
                    var menuContent = getMenuContent(baloonCont || balloonContent);


                    // Размещаем контекстное меню на странице
                    $('body').append(menuContent);
                    var coords = e.get('position');
                    // Задаем позицию меню.
                    $('#placemarker-menu').css({
                        left: coords[0],
                        top: coords[1] - 100
                    });

                    coords = e.get('coordPosition');
                    var $menuButtons = $('#placemarker-menu button');

                    $($menuButtons.get(0)).one('click', function () {
                        var newPlacemark = e.get('target');
                        var date = new Date();
                        $.post('/api/place', {state: 'free', latitude: coords[0], longitude: coords[1], lastUpdated: date}, function (data) {
                            baloonCont = 'FREE: ' + date.getHours() + ':' + date.getMinutes();
                            newPlacemark.properties.set('hintContent', baloonCont);

                            newPlacemark.options["_be"].iconImageHref = '/images/free.png';

                            myMap.geoObjects.remove(newPlacemark);
                            myMap.geoObjects.add(newPlacemark);
                        });
                    });

                    $($menuButtons.get(1)).one('click', function () {
                        var newPlacemark = e.get('target');
                        var date = new Date();

                        $.post('/api/place', {state: 'busy', latitude: coords[0], longitude: coords[1], lastUpdated: date}, function (data) {
                            baloonCont = 'BUSY: ' + date.getHours() + ':' + date.getMinutes();
                            newPlacemark.properties.set('hintContent', baloonCont);

                            newPlacemark.options["_be"].iconImageHref = '/images/busy.png';
                            myMap.geoObjects.remove(newPlacemark);
                            myMap.geoObjects.add(newPlacemark);
                        });
                    });
                    $menuButtons.one('click', function () {
                        if ($('#placemarker-menu').css('display') == 'block') {
                            $('#placemarker-menu').remove();
                        }
                    });
                }
            });
            newPlacemark.events.add('tap', function (e) {

                var newPlacemark = e.get('target');

                if ($('#placemarker-menu').css('display') == 'block') {
                    $('#placemarker-menu').remove();
                } else {
                    // HTML-содержимое контекстного меню.
                    var menuContent = getMenuContent(baloonCont || balloonContent);


                    // Размещаем контекстное меню на странице
                    $('body').append(menuContent);
                    var coords = e.get('position');
                    // Задаем позицию меню.
                    $('#placemarker-menu').css({
                        left: coords[0],
                        top: coords[1] - 100
                    });

                    coords = e.get('coordPosition');
                    var $menuButtons = $('#placemarker-menu button');

                    $menuButtons.get(0).one('click', function () {
                        var newPlacemark = e.get('target');
                        var date = new Date();
                        $.post('/api/place', {state: 'free', latitude: coords[0], longitude: coords[1], lastUpdated: date}, function (data) {
                            baloonCont = 'FREE: ' + date.getHours() + ':' + date.getMinutes();
                            newPlacemark.properties.set('hintContent', baloonCont);

                            newPlacemark.options["_be"].iconImageHref = '/images/free.png';

                            myMap.geoObjects.remove(newPlacemark);
                            myMap.geoObjects.add(newPlacemark);
                        });
                    });

                    $menuButtons.get(1).one('click', function () {
                        var newPlacemark = e.get('target');
                        var date = new Date();
                        $.post('/api/place', {state: 'busy', latitude: coords[0], longitude: coords[1], lastUpdated: date}, function (data) {
                            baloonCont = 'BUSY: ' + date.getHours() + ':' + date.getMinutes();
                            newPlacemark.properties.set('hintContent', baloonCont);

                            newPlacemark.options["_be"].iconImageHref = '/images/busy.png';
                            myMap.geoObjects.remove(newPlacemark);
                            myMap.geoObjects.add(newPlacemark);
                        });
                    });
                    $menuButtons.one('click', function () {
                        if ($('#placemarker-menu').css('display') == 'block') {
                            $('#placemarker-menu').remove();
                        }
                    });
                    $menuButtons.one('tap', function () {
                        if ($('#placemarker-menu').css('display') == 'block') {
                            $('#placemarker-menu').remove();
                        }
                    });
                }
            });
            myMap.geoObjects.add(newPlacemark);
            if(hintContent === 'PACMAN')
            PacmanMove(newPlacemark);
        };
        var pacman;
        function PacmanMove(newPlacemark){

                pacman = newPlacemark;

            var coords = pacman.geometry.getCoordinates();
            setTimeout(RemovePacman,400);
            function RemovePacman() {
                myMap.geoObjects.remove(pacman);
                coords[1] +=0.0003;
                pacman = AddPacman(coords[0],coords[1], '/images/pacman_gif_2.gif');
                pacman();
            }
        }
        function AddPacman(width, length, url) {
            var newPlacemark = new ymaps.Placemark([width, length], {
            }, {
                iconImageHref: url,
                iconImageSize: [35, 35],
                iconImageOffset: [-15, -15]
            });
            return function() {
                myMap.geoObjects.add(newPlacemark);
                PacmanMove(newPlacemark);
            }
        }


        self.getGeolocation = function () {
            return ymaps.geolocation;
        };

        self.setCenter = function(location, roundCallback){
            myMap.setCenter([location.latitude, location.longitude]);
            if(roundCallback){
                var $map = $('#map');
                var off = $map.offset();


                var element = '<div class="map-circle">';
                var $e = $(element);
                $e.css('left', off.left + 555 - 204);
                $e.css('top', off.top + 425 - 204);
                $(window.document.body).append($e);
            }
        };


        function getMenuContent(balloonContent) {
            return '<div id="placemarker-menu" class="btn-group-vertical" role="group">\
<span>' + balloonContent + '</span>' + ((balloonContent == 'You' || balloonContent == 'PACMAN' )? '' : '<button class="btn btn-success">make free</button> <button class="btn btn-danger">make busy</button>')+'</div>';
        }

        self.setGetCoordsCallback = function (callback) {
            getCoordsCallback = callback;
        };

        function init() {
            myMap = new ymaps.Map("map", {
                center: defaults.center,
                zoom: defaults.zoom,
                balloon: false
            });

            myMap.events.add('actionbegin', function () {
                if ($('#placemarker-menu').css('display') == 'block') {
                    $('#placemarker-menu').remove();
                }
                if ($('.map-circle').css('display') == 'block') {
                    $('.map-circle').remove();
                }
            });

            myMap.controls.add('smallZoomControl', {top: 5});

            myMap.events.add('click', function (e) {
                var coords = e.get('coordPosition');
                if(self.enabledTrack)
                    self.addPlacemark(coords[0],coords[1],'PACMAN','PACMAN','/images/pacman_gif_2.gif');
                else {

                    self.addPlacemark(coords[0],coords[1],'','','/images/busy.png');
                    $.post('/api/place', {state: randomBool() ? 'free' : 'busy', latitude: coords[0], longitude: coords[1], lastUpdated: new Date()}, function (data) {});
                }
            });
            myMap.events.add('tap', function (e) {
                var coords = e.get('coordPosition');
                if(self.enabledTrack)
                    self.addPlacemark(coords[0],coords[1],'PACMAN','PACMAN','/images/pacman_gif_2.gif')
            });
        }

        function getDefaults() {
                var data = {
                    center: [53.88855, 27.5445],
                    zoom: 15
                };
                defaults.center = data.center;
                defaults.zoom = data.zoom;
            }

        function loadDefaults() {
            var defaultsFromJson = localStorage.getItem(LOCALSTORAGE_NAMES.DEFAULTS);
            defaultsFromJson = JSON.parse(defaultsFromJson) || null;
            if (defaultsFromJson == null) {
                getDefaults();
                addDefaultsToLocalStorage();
            }
            else {
                defaults.center = defaultsFromJson.center;
                defaults.zoom = defaultsFromJson.zoom;
            }
        }

        function addDefaultsToLocalStorage() {
            var defaultsToJson = {};
            defaultsToJson.center = defaults.center;
            defaultsToJson.zoom = defaults.zoom;

            var defaultsJsonData = JSON.stringify(defaultsToJson);
            localStorage.setItem(LOCALSTORAGE_NAMES.DEFAULTS, defaultsJsonData);
        }

        return self;
    }();
})();