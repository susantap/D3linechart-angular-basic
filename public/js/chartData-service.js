/**
 * Created by susanta on 10/25/15.
 * A simple service to fetch the information from Backend
 */
angular.module('chartApp.chartDataService', [])

    .service('ChartDataService', function ($q, $http) {
        var service = this;

        service.getChartData = function () {
            return $http({
                method: 'get',
                url: '/chart',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                return response
            })
        }
    });