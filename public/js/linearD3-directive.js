/**
 * Created by susanta on 10/25/15.
 */
angular.module('chartApp.linearD3', [])
    .directive('linearD3', function ($window) {
        return {
            restrict: 'EA',
            scope: {
                data: "="
            },
            template: "<svg width= '850' height='200'></svg>",
            link: function (scope, elem, attrs) {

                var plottingData = scope.data,
                    padding = 20,
                    pathClass = "path",
                    xScale,
                    yScale,
                    xAxis,
                    yAxis,
                    chartFun,
                    d3 = $window.d3,
                    svgFrame = elem.find('svg'),
                    svg = d3.select(svgFrame[0]);

                /**
                 * Keep watching the data for any other updates. This will update tehchart once the service fetches
                 * latest data
                 */
                scope.$watch('data', function (newVals, oldVals) {
                    plottingData = newVals;
                    drawLine();
                }, true);

                /**
                 * function to initialize the params
                 */
                function initializeParams() {

                    xScale = d3.scale.linear()
                        .domain([plottingData[0].time, plottingData[plottingData.length - 1].time])
                        .range([padding + 5, svgFrame.attr("width") - padding]);

                    yScale = d3.scale.linear()
                        .domain([0, d3.max(plottingData, function (d) {
                            return d.frequency;
                        })])
                        .range([svgFrame.attr("height") - padding, 0]);

                    xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(plottingData.length - 1);

                    yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(5);

                    chartFun = d3.svg.line()
                        .x(function (d) {
                            return xScale(d.time);
                        })
                        .y(function (d) {
                            return yScale(d.frequency);
                        })
                        .interpolate("basis");
                }

                /**
                 * Function to drw the line chat
                 */
                function drawLine() {

                    //clean up the svg
                    svg.selectAll("*").remove();

                    initializeParams();

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0,180)")
                        .call(xAxis);

                    var gy = svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(20,0)")
                        .call(yAxis);

                    svg.append("path")
                        .attr({
                            d: chartFun(plottingData),
                            "stroke": "red",
                            "stroke-width": 2,
                            "fill": "none",
                            "class": pathClass
                        });
                }

                drawLine();
            }
        };
    });