/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CountriesView = Backbone.View.extend({
        template: JST['app/scripts/templates/countries.ejs']
    });

    return CountriesView;
});