/*global define*/

define([
    'jquery',
    'backbone',
    'views/home',
    'collections/countries',
    'views/countryList',
    'views/countryMap',
    'views/countryData',
    'views/countryOpco'
], function ($, Backbone, HomeView, CountriesCollection, CountryListView, CountryMapView, CountrydataView, CountryOpcoView) {
    'use strict';

    var countries = new CountriesCollection();
    countries.fetch()

    var MainRouter = Backbone.Router.extend({
        routes: {
          '' : 'index',
          'countryList' : 'countryList',
          'countryMap' : 'countryMap',
          'country/:country' : 'countryDetail',
          'opco/:country' : 'opcoDetail'
        },

        index : function() {
          
        },
        countryList : function() {
          var countryList = new CountryListView({
            collection: countries
          });
          
        },
        countryMap : function() {
          
          var countryMap = new CountryMapView({
            collection: countries
          });

          countryMap.render();

        },

        countryDetail : function(countryName) {
          var model = countries.findWhere({name: countryName});
          if (model) {
            var countryDetail = new CountrydataView({
              model: model,
              el: '#content'
            });
            countryDetail.render();
          }
        },

        opcoDetail : function(countryName) {
          var model = countries.findWhere({name: countryName});
          if (model) {
            var countryDetail = new CountryOpcoView({
              model: model,
              el: '#content'
            });
            countryDetail.render();
          }
        }

    });

    return MainRouter;
});