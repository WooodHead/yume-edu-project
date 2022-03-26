import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CourseType } from "../../lib/model/course";
import { StudentType } from "../../lib/model/student";

export interface IGender {
  female: number;
  male: number;
  unknown: number;
}

export default function PieChart(props: {
  studentType?: StudentType[];
  courseType?: CourseType[];
  gender?: any;
  title?: string;
}) {
  const { studentType, courseType, gender, title } = props;
  const data = [studentType, courseType, gender].filter(
    (obj) => obj !== undefined
  );

  console.log("newData", data);

  const options: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: title,
    },
    tooltip: {
      pointFormat:
        "Percentage: <b>{point.percentage:.1f}%</b> <br> Total:<b>{point.y}</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          connectorColor: "silver",
        },
      },
    },
    series: [
      {
        type: "pie",
        // data:

        // data[0].map(({ name, amount }) => {
        //   return {
        //     name: name,
        //     y: amount,
        //   };
        // }),
      },
    ],
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    ></HighchartsReact>
  );
}
