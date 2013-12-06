/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CountryView = Backbone.View.extend({
      template: JST['app/scripts/templates/country.ejs'],
      tagName: 'li',
      className: 'country',

      events : {
        'click' : 'selected'
      },

      initialize: function() {
        this.model.on('change', this.render, this);
      },

      render: function() {
        this.$el.html(this.template({country : this.model.toJSON()}));
        if (this.model.get('selected')) {
          this.$el.addClass('selected');
        } else {
          this.$el.removeClass('selected');
        }
        return this;
      },

      selected: function(event) {
        Backbone.trigger('selectedCountry', this.model);
      }

    });

    return CountryView;
});