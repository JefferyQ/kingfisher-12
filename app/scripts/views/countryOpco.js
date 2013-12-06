/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'highcharts'
], function ($, _, Backbone, JST) {
    'use strict';

    var CountryOpcoView = Backbone.View.extend({
        template: JST['app/scripts/templates/countryOpco.ejs'],
        render: function() {
          this.$el.html(this.template({
            country : this.model.toJSON()
          }));

          this.renderChart();
        },

        renderChart: function() {
          var dates = this.model.getForecastDates();
          var series = this.model.getForecastSeries();
          var cumsums = series.map(function(s) {
            var s2 = _.clone(s);
            var cumsum = []
            for(var i=0;i<s2.data.length;i++) {
              if(i==0) cumsum[i] = s2.data[0];
              else cumsum[i] = cumsum[i-1] + s2.data[i];
            }
            s2.data = cumsum;
            return s2;
          })

          this.$('.chart').highcharts({
            title: {
              text: "Orders Forecast"
            },
            plotOptions: {
              area : {
                stacking: 'normal'
              }
            },
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
              }
            ],
            xAxis: {
                categories: dates
            },
            series: series
          })

          this.$('.cumulative').highcharts({
            title: {
              text: "Cumulative Orders Forecast"
            },
            plotOptions: {
              area : {
                stacking: 'normal'
              }
            },
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
              }
            ],
            xAxis: {
                categories: dates
            },
            series: cumsums
          })
          
        }
    });

    return CountryOpcoView;
});