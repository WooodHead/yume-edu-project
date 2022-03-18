import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Col, Form, Input, message, Row, Space, Steps } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function AddCourseScheduleForm(props: {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [form] = Form.useForm();

  return (
    <Form form={form} name="courseSchedule" autoComplete="off">
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

                    <Row gutter={12}>
                      <Col span="10">
                        <Form.Item
                          {...restField}
                          name={[name, "chapterName"]}
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
                          name={[name, "chapterContent"]}
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
          <Form.List name="classTimes" initialValue={[{}]}>
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
                          <Input />
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
                          <Input placeholder="Select time" />
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
