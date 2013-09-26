require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        highChart: "vendor/highcharts",
        hcExport: "vendor/exporting"
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(["jquery", 'highChart', 'hcExport'], function($, hc, ex) {
	$(function () {
        $('#graphView').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                // text: 'Monthly Average Temperature'
                text:""
            },
            subtitle: {
                // text: 'Source: WorldClimate.com'
                text:""
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                // categories: ['0', "500", "1,000", "1,500", "2,000"]
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            tooltip: {
                valueSuffix: 'Views'
            },
            // legend: {
            //     layout: 'vertical',
            //     align: 'right',
            //     verticalAlign: 'middle',
            //     borderWidth: 0
            // },

            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },
            series: [
            {
                name: 'Page Views',
                data: [1050, 1300, 1200, 950, 1000, 1200, 1000, 1150, 1400, 1000, 1600, 1450]
            }
            ,{
                name: 'DMP App Views',
                data: [750, 1000, 1300, 1200, 1300, 1500, 1400, 1700, 1800, 1600, 1900, 1800]
            }, 
            // {
            //     name: 'DaNang',
            //     data: [1150, 1200, 1400, 1050, 1200, 1100, 900, 1000, 1300, 1200, 1500, 1300]
            // }
            ]
        });
    });


    $(function () {
        $('#socialView').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                // text: 'Monthly Average Temperature'
                text:""
            },
            subtitle: {
                // text: 'Source: WorldClimate.com'
                text:""
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                // categories: ['0', "500", "1,000", "1,500", "2,000"]
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            tooltip: {
                valueSuffix: 'Views'
            },
            // legend: {
            //     layout: 'vertical',
            //     align: 'right',
            //     verticalAlign: 'middle',
            //     borderWidth: 0
            // },

            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },
            series: [
            {
                name: 'Page Views',
                data: [1050, 1300, 1200, 950, 1000, 1200, 1000, 1150, 1400, 1000, 1600, 1450]
            }
            ,{
                name: 'DMP App Views',
                data: [750, 1000, 1300, 1200, 1300, 1500, 1400, 1700, 1800, 1600, 1900, 1800]
            }, 
            {
                name: 'Social Views',
                data: [1150, 1200, 1400, 1050, 1200, 1100, 900, 1000, 1300, 1200, 1500, 1300]
            }
            ]
        });
    });
});
