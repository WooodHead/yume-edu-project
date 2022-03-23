import React, { ReactNode, useEffect, useState } from "react";
import "antd/dist/antd.css";
import ManagerLayout from "../../../../components/layout";
import { Card, Col, Form, Input, Row, Select, Tabs } from "antd";
import AddCourseDetailForm from "../../../../components/course/course-detail";
import AddCourseScheduleForm from "../../../../components/course/course-schedule";
import { getCourseByCourseDetails, getCourseByCourseId } from "../../../api/api-service";

const { Option } = Select;
const { TabPane } = Tabs;

export default function AddCourses() {
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [option, setOption] = useState("type");
  const [filteredList, setFilteredList] = useState([]);
  const [searchedForm] = Form.useForm();

  useEffect(() => {
    if (!!searchCourse) {
      const path = `courses?${option}=${searchCourse}`;
      getCourseByCourseDetails(path).then((res) => {
        setFilteredList(res.courses)
      });
    }
  }, [option, searchCourse]);

  return (
    <ManagerLayout>
      <Row gutter={24}>
        <Col span="12">
          <Input.Group>
            <Select
              defaultValue="category"
              onSelect={(el: string) => {
                setOption(el);

                if(el==="type"){
                  el = "category";
                }else if(el==="uid"){
                  el="code"
                } 
                setPlaceholder(`search course by ${el}`); 
              }}
              style={{ width: "20%" }}
            >
              <Option value="type" className="category" >Category</Option>
              <Option value="name" >Name</Option>
              <Option value="uid" >Code</Option>
            </Select>

            <Select
              onSearch={(e: string) => { return setSearchCourse(e);}}
              onSelect={(id:number)=>{ 
                // get course details 
                getCourseByCourseId(id).then((res)=>{ 
                  searchedForm.setFieldsValue(res)
                  console.log("set 进去？",searchedForm.getFieldsValue(true))
                  console.log(res) 
                })
              }}
              placeholder={placeholder || "search course by category"}
              filterOption={false}
              showSearch
              style={{ width: "80%" }}
            >
             {
               filteredList.map(({id, name, teacherName, uid})=>{
                return <Option key={id} value={id}>{name}-{teacherName}-{uid}</Option>
               })
             }
            </Select>
          </Input.Group>
        </Col>
      </Row>

      <Row gutter={24} style={{ padding: "20px 12px", width: "100%" }}>
        <Tabs defaultActiveKey="courseDetail" style={{ width: "100%" }}>
          <TabPane tab="Course Detail" key="courseDetail">
            <AddCourseDetailForm />
          </TabPane>

          <TabPane tab="Course Schedule" key="courseSchedule">
            <AddCourseScheduleForm />
          </TabPane>
        </Tabs>
      </Row>
    </ManagerLayout>
  );
}
