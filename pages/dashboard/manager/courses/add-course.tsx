import React, { useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/layout";
import { Steps } from "antd";
import AddCourseForm from "../../../../components/course/add-course";

const { Step } = Steps;



export default function AddCourses() {
  const [current, setCurrent] = useState(0); // current step 0, 1 , 2
  console.log("current:",current)

  const step = [
    <AddCourseForm key="add-course" current={current} setCurrent={setCurrent} />,
    <p key="step-two">step two</p>,
    <p  key="step-two">step three</p>,
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
