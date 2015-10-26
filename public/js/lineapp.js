/**
 * Created by susanta on 10/25/15.
 */
var app = angular.module('chartApp', [
    'chartApp.chartDataService',
    'chartApp.linearD3'
]);

app.controller('MainCtrl', ['$scope', 'ChartDataService', function ($scope, ChartDataService) {

    $scope.chartData = [
        {time: 0, frequency: 0}
    ];
    ChartDataService.getChartData().then(
        function (response) {

            $scope.chartData = response.data;
        })

}]);


