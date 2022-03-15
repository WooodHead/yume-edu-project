import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {
  getCourseCode,
  getCourseType,
  getTeacherList,
} from "../../pages/api/api-service";
import Dragger from "antd/lib/upload/Dragger";
import moment from "moment";
import { duration } from "../../lib/model/config";

const { Option } = Select;

export default function AddCourseForm() {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState({}); // value of input
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [courseType, setCourseType] = useState([]);
  const [courseCode, setCourseCode] = useState();
  const [fileList, setFileList] = useState([]); // cover

  // Search Teacher
  useEffect(() => {
    setLoading(true);
    if (!!searchValue) {
      getTeacherList(searchValue).then((res) => {
        const { teachers } = res;
        setTeacherDetails(teachers);
        setLoading(false);
      });
    }
  }, [searchValue]);
  // const onChange = (selectedTeacher: string) => {
  //   console.log("selected:", selectedTeacher);
  // };

  // Get type
  useEffect(() => {
    getCourseType().then((res) => {
      setCourseType(res);
    });
  }, []);

  // Get course Code
  useEffect(() => {
    getCourseCode().then((res) => {
      setCourseCode(res);
    });
  }, []);

  const onFinish = (value: any) => {
    console.log("value", value);
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={24} style={{ padding: "20px 0" }}>
          <Col span="8">
            <Form.Item
              label="Course Name"
              name="courseName"
              rules={[
                {
                  required: true,
                  message: "name is required!",
                },
                {
                  type: "string",
                  min: 3,
                  max: 100,
                  message: "name must be between 3 and 100 characters",
                },
              ]}
            >
              <Input placeholder="course name" />
            </Form.Item>
          </Col>
          <Col span="16">
            <Row gutter={24}>
              <Col span="8">
                <Form.Item
                  label="Teacher"
                  name="teacher"
                  rules={[{ required: true, message: "teacher is required!" }]}
                >
                  <Select
                    showSearch
                    notFoundContent={loading ? <Spin size="small" /> : null}
                    filterOption={false}
                    placeholder="search teacher"
                    onSearch={(value) => setSearchValue(value)}
                    // onChange={onChange}
                  >
                    {teacherDetails?.map(
                      (obj: { id: number; name: string }) => (
                        <Option key={obj.id} value={obj.name}>
                          {obj.name}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>

              <Col span="8">
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: "type is required!" }]}
                >
                  <Select showSearch filterOption={false}>
                    {courseType.map((obj: { id: string; name: string }) => {
                      return (
                        <Option key={obj.id} value={obj.name}>
                          {obj.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span="8">
                <Form.Item
                  label="Course Code"
                  name="courseCode"
                  rules={[
                    { required: true, message: "course code is required!" },
                  ]}
                >
                  <Input
                    type="text"
                    disabled={courseCode ? true : false}
                    placeholder={courseCode}
                    value={courseCode}
                  />
                  {/* 问题： 提交表单时显示“course code required”，但是我已经设置input value={courseCode}了啊， 它自己不应该是默认填写了value吗 */}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={24} style={{ padding: "20px 0" }}>
          <Col span="8">
            <Form.Item label="Start Date" name="startDate">
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current < moment().endOf("day")
                }
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "price is required!" }]}
            >
              <InputNumber
                prefix="$"
                min={0}
                type="text"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Student Limit"
              name="studentLimit"
              rules={[
                { required: true, message: "student limit is required!" },
              ]}
            >
              <InputNumber
                min={1}
                max={10}
                type="text"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: "Duration must be greater than 0!" }]}
            >
              <InputNumber
                addonAfter={
                  <Select defaultValue="month">
                    {duration.map((el) => (
                      <Option key={el} value={el}>
                        {el}
                      </Option>
                    ))}
                  </Select>
                }
                min={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span="8">
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "description is required!" }]}
            >
              <Input.TextArea placeholder="Course description" style={{ minHeight: "292px" }} />
            </Form.Item>
          </Col>

          <Col span="8">
            <Form.Item label="Cover" name="cover">
              <ImgCrop rotate>
                <Dragger
                  style={{
                    minHeight: "292px",
                    backgroundColor: "#F0F0F0",
                    border: "2px dashed #DCDCDC",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p style={{color: "	#808080", fontSize:"24px"}}  className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </Dragger>
              </ImgCrop>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24} style={{ padding: "20px 0" }}>
          <Col span="8">
            <Button type="primary" htmlType="submit">
              Create Course
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
