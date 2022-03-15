import React, { useState } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import { ICourseDetails } from "../../lib/model/course";
import { weekDays } from "../../lib/model/config";


export default function WeekTable(props: { courseData: ICourseDetails }) {
  const timeData = props.courseData.schedule?.classTime;

  const columns = weekDays.map((title, index) => {
    const data = timeData?.find((item)=>{
        return item.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    }) || "";
    const classTime = data.split(" ")[1]

    return {
      title,
      key: index,
      align: "center",
      render: ()=>{
          return classTime
      }
    };
  });

  const dataSource = [{}]; // 

  return <Table style={{width: "100%"}} columns={columns} dataSource={dataSource} pagination={false} />;
}
