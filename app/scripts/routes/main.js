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

    // trigger the loaded event once the collection has loaded
    countries.fetch().done(function() {
      Backbone.trigger('loadedData');
    })

    // the main router
    var MainRouter = Backbone.Router.extend({
        routes: {
          '' : 'index',
          'countryList' : 'countryList',
          'countryMap' : 'countryMap',
          'country/:country' : 'countryDetail',
          'opco/:country' : 'opcoDetail'
        },


        // just redirect to the map
        index : function() {
          this.navigate('countryMap', {trigger:true});
        },

        // list of countries - we dont really use this
        countryList : function() {
          var countryList = new CountryListView({
            collection: countries
          });
          
        },

        // create the map view
        countryMap : function() {
          
          var countryMap = new CountryMapView({
            collection: countries
          });

          countryMap.render()

        },

        // lookup a given country and render the country detail view
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

        // lookup a given country and render the opco view
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