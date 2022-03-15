import React, { useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/layout";
import { Steps } from "antd";
import AddCourseForm from "../../../../components/course/add-course";

const { Step } = Steps;

export default function AddCourses() {
  const [current, setCurrent] = useState(0); // 0, 1 , 2

  const onChange = (e: number) => {
    return setCurrent(e);
  };

  return (
    <ManagerLayout>
      <Steps type="navigation" current={current} onChange={onChange}>
        <Step title="Course Detail" />
        <Step title="Course SSchedule" />
        <Step title="Success" />
      </Steps>
      {(() => {
        switch (current) {
          case 0:
            return <AddCourseForm />;
          case 1:
            return <p>step 2</p>;
          case 2:
            return <p>step 3</p>;
        }
      })()}
    </ManagerLayout>
  );
}
