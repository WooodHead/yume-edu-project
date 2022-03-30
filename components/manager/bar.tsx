import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function BarChart() {
  

  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Student VS Teacher",
    },
    subtitle: {
        text: "Comparing what students are interested in and teachers' skills",
      },
    yAxis: {
      title: {
        text: "Interested VS Skills",
      },
    },

    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      
      
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    ></HighchartsReact>
  );
}