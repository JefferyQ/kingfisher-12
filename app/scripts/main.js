/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        highcharts: {
            deps: ['jquery'],
        },
        d3: {
            exports: 'd3'
        }
    },
    paths: {
        d3: '../bower_components/d3/d3',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        highcharts: '../bower_components/highcharts/highcharts'
    }
});

require([
    'backbone', 'routes/Main'
], function (Backbone, MainRouter) {
    var router = new MainRouter();

    Backbone.on('gotoCountry', function(countryName) {
      router.navigate('country/' + countryName, {trigger: true});
    });
    Backbone.on('loadedData', function() {
        console.log('loadedData');
        Backbone.history.start();
    })
});
