import React from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/student/manager-layout";
import router from "next/router";



export default function CourseDetails() {
    console.log(router.query.id)
  return (
    <ManagerLayout>
       Course ID: {router.query.id}
        
    </ManagerLayout>
  );
}
