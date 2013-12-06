/*global define*/

define([
    'underscore',
    'backbone',
    'models/country'
], function (_, Backbone, CountryModel) {
    'use strict';

    var CountriesCollection = Backbone.Collection.extend({
      model: CountryModel,
      url: '/data.json',
      initialize: function() {
        Backbone.on('selectedCountry', this.handleSelected, this) 
      },

      handleSelected: function(selectedCountry) {

        this.each(function(country) {
          if (selectedCountry.get('name') === country.get('name')) {
            country.set('selected', true)
          } else {
            country.set('selected', false)
          }
        })


      }

    });

    return CountriesCollection;
});