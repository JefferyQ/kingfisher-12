/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'highcharts'
], function ($, _, Backbone, JST) {
    'use strict';

    var CountrydataView = Backbone.View.extend({
        template: JST['app/scripts/templates/countryData.ejs'],
        render: function() {
          this.$el.html(this.template({
            country : this.model.toJSON()
          }));

          this.renderChart();
        },

        renderChart: function() {
          var dates = this.model.getDates();
          var series = this.model.getSeries();

          this.$('.chart').highcharts({
            title: this.model.get('name'),
            yAxis: [
              {
                title: {
                    text: 'Volume',
                    style: {
                        color: '#89A54E'
                    }
                },
                labels: {
                    format: '{value} Orders',
                    style: {
                        color: '#89A54E'
                    }
                }
              },
              {
                title: {
                    text: 'Value',
                    style: {
                        color: '#4572A7'
                    }
                },
                labels: {
                    format: '{value} Dollars',
                    style: {
                        color: '#4572A7'
                    }
                },
                opposite: true
              },

            ],
            xAxis: {
                categories: dates
            },
            series: series
          })
          
        }
    });

    return CountrydataView;
});