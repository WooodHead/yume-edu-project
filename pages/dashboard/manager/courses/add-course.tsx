import React, { useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/layout";
import { Button, Col, Form, Input, Row, Space, Steps } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AddCourseDetailForm from "../../../../components/course/course-detail";
import AddCourseScheduleForm from "../../../../components/course/course-schedule";

const { Step } = Steps;

export default function AddCourses() {
  const [current, setCurrent] = useState(0); // current step 0, 1 , 2
  // console.log("current:",current)

  const step = [
    <AddCourseDetailForm key="stepOne" current={current} setCurrent={setCurrent} />,

    <AddCourseScheduleForm key="stepTwo" current={current} setCurrent={setCurrent}/>,

    <p key="success">step three</p>,
  ];

  const onChange = (e: number) => {
    return setCurrent(e);
  };

  return (
    <ManagerLayout>
      <Steps type="navigation" current={current} onChange={onChange}>
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>

      {step[current]}
    </ManagerLayout>
  );
}
