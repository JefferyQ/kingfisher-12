/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CountryModel = Backbone.Model.extend({
        defaults: {
        },

        initialize: function() {
          this.calculateStatus();
        },

        getDates: function() {
          var dates = [];
          var data = this.get('data');
          var i, dp;
          for (i = 0; i < data.length; i++) {
            dp = data[i];
            var date = new Date();
            if (Date.parse(dp.date) <= date) {
              dates.push(dp.date)
            }
          }
          return dates;
        },

        getForecastDates: function() {
          var dates = [];
          var data = this.get('data');
          var i, dp;
          for (i = 0; i < data.length; i++) {
            dp = data[i]
            // var date = new Date();
            // if (Date.parse(dp.date) >= date) {
              dates.push(dp.date);
            // }
          }
          return dates;
        },

        getVolStatus: function(date) {
          var data = this.get('data');
          var i, dp;
          for (i = 0; i < data.length; i++) {
            dp = data[i];
            if (date === dp.date) {
              return dp.vol_status;
            }
          }
          return 'unknown';

        },

        getValStatus: function(date) {
          var data = this.get('data');
          var i, dp;
          for (i = 0; i < data.length; i++) {
            dp = data[i];
            if (date === dp.date) {
              return dp.val_status;
            }
          }
          return 'unknown';

        },

        calculateStatus: function() {
          var data = this.get('data');

          var i, dp;
          for (i = 0; i < data.length; i++) {
            dp = data[i];
            var vol_v_pct = Number(dp.vol_v)/Number(dp.vol);
            dp.vol_status = 'ok'
            if (vol_v_pct < 0) dp.vol_status = 'warn'
            if (vol_v_pct < -0.1) dp.vol_status = 'alert'

            var val_v_pct = Number(dp.val_v)/Number(dp.vol);
            dp.val_status = 'ok'
            if (val_v_pct < 0) dp.val_status = 'warn'
            if (val_v_pct < -0.1) dp.val_status = 'alert'

          }

        },


        getForecastSeries: function() {

          var series = [
            {
              name: 'Exceptions',
              data: [],
              color: '#FF0600',
              stack: 1,
              type: 'area',
              tooltip: {
                valueSuffix: ' Orders'
              }
            },
            {
              name: 'In flight',
              color: '#26FF00',
              data: [],
              stack: 1,
              type: 'area',
              tooltip: {
                valueSuffix: ' Orders'
              }
            },
            {
              name: 'Forecast',
              data: [],
              type: 'line',
              color: '#4572A7',
              tooltip: {
                valueSuffix: ' Orders'
              }
            }
          ];

          var data = this.get('data');

          var i, dp;

          for (i = 0; i < data.length; i++) {
            dp = data[i];

            // var date = new Date();
            // if (Date.parse(dp.date) >= date) {
              series[0].data.push(Number(dp.vol_e))
              series[1].data.push(Number(dp.vol))
              series[2].data.push(Number(dp.vol_f))
            // }
          }
          return series;

        },

        getSeries: function() {

          var series = [
            {
              name: 'Volume Actual',
              data: [],
              color: '#89a54e',
              tooltip: {
                valueSuffix: ' Orders'
              }
            },
            {
              name: 'Volume Forecast',
              data: [],
              color: '#acc27e',
              tooltip: {
                valueSuffix: ' Orders'
              }
            },
            {
              name: 'Value Actual',
              data: [],
              color: '#4572A7',
              yAxis: 1,
              tooltip: {
                valueSuffix: ' Dollars'
              }
            },
            {
              name: 'Value Forecast',
              data: [],
              color: '#5299A7',
              yAxis: 1,
              tooltip: {
                valueSuffix: ' Dollars'
              }
            }
          ];

          var data = this.get('data');

          var i, dp;

          for (i = 0; i < data.length; i++) {
            dp = data[i];

            var date = new Date();
            if (Date.parse(dp.date) <= date) {
              series[0].data.push(Number(dp.vol))
              series[1].data.push(Number(dp.vol_f))
              series[2].data.push(Number(dp.val))
              series[3].data.push(Number(dp.val_f))
            }
          }

          return series;
        }

    });

    return CountryModel;
});