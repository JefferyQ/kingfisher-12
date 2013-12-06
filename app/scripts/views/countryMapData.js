/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CountryMapDataView = Backbone.View.extend({
        template: JST['app/scripts/templates/countryMapData.ejs'],
        el: '#mapInfo',
        render: function() {
          var html = this.template({country:this.model.toJSON()})
          $('#mapInfo').html(html);
          console.log(html);

        },
    });

    return CountryMapDataView;
});