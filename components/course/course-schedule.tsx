import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Col, Form, Input, message, Row, Select, Space, Steps, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { weekDays } from "../../lib/model/config";
import { format } from 'date-fns';
import moment from "moment";
import { ISchedule, IScheduleReq } from "../../lib/model/course";
import { putSchedule } from "../../pages/api/api-service";

const { Option } = Select;

export default function AddCourseScheduleForm(props: {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  scheduleId: number | null;
  courseId: number | null;
}) {
  const [form] = Form.useForm();
  const {current, setCurrent, scheduleId, courseId} = props;

  const onFinish = (value:ISchedule)=>{
    const chapters = value.chapters.map(obj => {
      return {id: Math.random(), ...obj}
    })
    const classTime = value.classTime.map(( {week, selectTime}: string | number ) =>{
      return week + " " + moment(selectTime).format('HH:mm:ss')
    }) 
    
    const req:IScheduleReq = {chapters, classTime, scheduleId, courseId }
    console.log("req value:", req)

    if(value){
      putSchedule(req).then((res) => console.log("update schedule res:",res) )
    }

  }

  return (
    <Form form={form} name="courseSchedule" autoComplete="off" onFinish={onFinish} >
      <Row gutter={24} style={{ padding: "20px 0" }}>
        <Col span="12">
          <h2>Chapters</h2>
          <Form.List name="chapters" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    {/* test */}
                    {console.log("fields:", fields.length)}

                    <Row key={key} gutter={12}>
                      <Col span="10">
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "chapter name is required",
                            },
                          ]}
                        >
                          <Input placeholder="Chapter Name" />
                        </Form.Item>
                      </Col>
                      <Col span="12">
                        <Form.Item
                          {...restField}
                          name={[name, "content"]}
                          rules={[
                            {
                              required: true,
                              message: "chapter content is required",
                            },
                          ]}
                        >
                          <Input placeholder="Chapter Content" />
                        </Form.Item>
                      </Col>
                      <Col span="2">
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(name);
                            } else {
                              message.warning(
                                "You must set at least one chapter"
                              );
                            }
                          }}
                        />
                      </Col>
                    </Row>
                  </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ width: "91.5%" }}
                  >
                    Add Chapter
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>

        <Col span="12">
          <h2>Class times</h2>
          <Form.List name="classTime" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Row gutter={12}>
                      <Col span="10">
                        <Form.Item
                          {...restField}
                          name={[name, "week"]}
                          rules={[
                            {
                              required: true,
                              message: "week is required",
                            },
                          ]}
                        >
                          <Select >
                            {
                              weekDays.map((weekDay) =>{
                                return <Option key={weekDay} value={weekDay}>{weekDay}</Option>
                              })
                            }
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span="12">
                        <Form.Item
                          {...restField}
                          name={[name, "selectTime"]}
                          rules={[
                            {
                              required: true,
                              message: "select time is required",
                            },
                          ]}
                        >
                          <TimePicker style={{width:"100%"}} placeholder="select time" />
                        </Form.Item>
                      </Col>
                      <Col span="2">
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(name);
                            } else {
                              message.warning(
                                "You must set at least one class time"
                              );
                            }
                          }}
                        />
                      </Col>
                    </Row>
                  </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ width: "91.5%" }}
                  >
                    Add Class Time
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>

      <Row gutter={24} style={{ padding: "20px 0" }}>
        <Col span="24">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
