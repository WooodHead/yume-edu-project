import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function HeatChart() {
    
const options: Highcharts.Options =  {

    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Sales per employee per weekday'
    },

    xAxis: {
        categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
    },

    yAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        title: null,
        reversed: true
    },

    accessibility: {
        // point: {
        //     descriptionFormatter: function (point) {
        //         var ix = point.index + 1,
        //             xName = getPointCategoryName(point, 'x'),
        //             yName = getPointCategoryName(point, 'y'),
        //             val = point.value;
        //         return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
        //     }
        // }
    },

    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        // maxColor: Highcharts.getOptions().colors[0]
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },

    tooltip: {
        // formatter: function () {
        //     return '<b>' + getPointCategoryName(this.point, 'x') + '</b> sold <br><b>' +
        //         this.point.value + '</b> items on <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';
        // }
    },

    series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        data: [[0],[0]],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        formatter: function () {
                            return this.value.charAt(0);
                        }
                    }
                }
            }
        }]
    }

}
return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    ></HighchartsReact>
  );
}