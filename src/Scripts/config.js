define(function () {
    'use strict';

    require.config({
        baseUrl: '../src/Scripts/',
        paths: {
            'jquery': 'Libs/jquery-2.1.1',
            'yandexMap': 'Libs/yandexMap',
            'MapPlugin': 'MapPlugin',
            'main': 'main',
            'knockout': 'Libs/knockout-3.2.0',
            'mainViewModel': 'ViewModels/mainViewModel'
        },
        shim : {
            MapPlugin :{
                deps:['yandexMap']
            }
        }
    });
});
