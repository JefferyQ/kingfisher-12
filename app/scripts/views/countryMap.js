/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'd3',
    'views/countryMapData'
], function ($, _, Backbone, JST, d3, CountryMapDataView) {
    'use strict';

    var CountryMapView = Backbone.View.extend({
        template: JST['app/scripts/templates/countryMap.ejs'],
        el : '#content',

        initialize: function() {
          this.dataView = new CountryMapDataView();
        },

        render: function() {
          this.$el.html(this.template());
          this.drawMap();

          $(window).resize(this.resize.bind(this));

          var _el = this.$('#main');
          this.width = _el.width();
          this.height = _el.height();

          this.svg = d3.select('#mapContainer').append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

          this.drawMap();
        },

        resize: function() {
          var _el = this.$('#main');
          this.width = _el.width();
          this.height = _el.height();
          this.svg.attr('width', this.width);
          this.svg.attr('height', this.height);
        },

        drawMap: function() {
          var svg = d3.select('#mapContainer').select('svg');
          var projection = d3.geo.mercator()
            .scale(600)
            .translate([this.width/3, this.height*1.5]);

          var that = this;

          // load the json data
          d3.json('/countries.geo.json', function(error, data) {

            var countries = svg.selectAll('path')
            .data(data.features);

            countries.enter().append('path')
              .attr("class", "country")
              .attr("id", function(d) {
                return d.properties.name;
              });

            countries
              .attr("d", d3.geo.path().projection(projection))
              .attr("class", function(d) {
                var country = d.properties.name;

                var model = that.collection.findWhere({name : country})
                if (model) {
                  return "country " + model.getValStatus('2013-04-01');
                } else {
                  return "country notused"
                }
              })
              // .on('mouseover', function(d) {
              //   var country = d.properties.name;

              //   var model = that.collection.findWhere({name : country})
              //   if (model) {
              //     that.dataView.model = model;
              //     that.dataView.render();
              //   } 
              // })
              .on('click', function(d) {
                var country = d.properties.name;
                var model = that.collection.findWhere({name : country})
                if (model) {
                  that.dataView.model = model;
                  that.dataView.render();
                } 
              })

          });

        }

    });

    return CountryMapView;
});