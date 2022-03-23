import React, { useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/layout";
import { Button, Col, Form, Input, Row, Space, Steps } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AddCourseDetailForm from "../../../../components/course/course-detail";
import AddCourseScheduleForm from "../../../../components/course/course-schedule";
import { getCourseByCourseId } from "../../../api/api-service";
import styled from "styled-components";
import { Content } from "antd/lib/layout/layout";
import { CheckOutlined } from "@ant-design/icons";

const { Step } = Steps;

export default function AddCourses() {
  const [current, setCurrent] = useState(0); // current step 0, 1 , 2
  const [scheduleId, setScheduleId] = useState<number>(0);
  const [courseId, setCourseId] = useState<number>(0);
  const [filledForm] = Form.useForm();
  const filledDetailsForm = filledForm.getFieldsValue(true)
  console.log("filled details form?", filledDetailsForm)

  const step = [
    <AddCourseDetailForm
      key="stepOne"
      current={current}
      setCurrent={setCurrent}
      setScheduleId={setScheduleId}
      setCourseId={setCourseId}
      filledForm={filledForm}
      filledDetailsForm={filledDetailsForm}
    />,

    <AddCourseScheduleForm
      key="stepTwo"
      current={current}
      setCurrent={setCurrent}
      scheduleId={scheduleId}
      courseId={courseId}
    />,

    <div
      key="stepThree"
      current={current}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CheckOutlined style={{ fontSize: 50, color: "green" }} />
      <h2>Successful Create Course!</h2>
      <div>
        <Button>Go Course</Button>
        <Button>Create Again</Button>
      </div>
    </div>,
  ];



  return (
    <ManagerLayout>
      <Steps type="navigation" current={current} onChange={(e:number)=>{
        if(true){
          setCurrent(0)
          console.log("set current 0?",current)
        }
      }} >
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>

      {step[current]}
    </ManagerLayout>
  );
}
