/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template: JST['app/scripts/templates/home.ejs'],
        el: '#wrap',
        render: function() {
          this.$el.html(this.template());
        }
    });

    return HomeView;
});