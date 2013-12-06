/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/country',
    'views/countryData'
], function ($, _, Backbone, JST, CountryView, CountryDataView) {
    'use strict';

    var CountrylistView = Backbone.View.extend({
      template: JST['app/scripts/templates/countryList.ejs'],
      el : '#content',

      initialize : function() {
        var that = this;
        this._countryViews = [];
        this.collection.on('sync', this.createViews, this);
        Backbone.on('selectedCountry', this.displayCountry, this);
      },

      createViews : function() {
        var that = this;
        this.collection.each(function(country) {
          that._countryViews.push(new CountryView({
            model : country
          }));
        })
        // return this so we can chain
        return this.render();
      },

      render : function() {
        var that = this;
        // Clear out this element.
        this.$el.empty();
        this.$el.html(this.template());

        var countryContainer = this.$('#countryList')

        // Render each sub-view and append it to the parent view's element.
        _(this._countryViews).each(function(countryView) {
          countryContainer.append(countryView.render().el);
        });
      },

      displayCountry: function(model) {

        this.countryDataView = new CountryDataView({
          model: model,
          el: '#main'
        });

        this.countryDataView.render();

      }



    });

    return CountrylistView;
});