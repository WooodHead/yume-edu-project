import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
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
  ICourse,
  postCourse,
} from "../../pages/api/api-service";
import Dragger from "antd/lib/upload/Dragger";
import moment from "moment";
import { durations } from "../../lib/model/config";
import { format, getTime } from 'date-fns';
import { IType } from "../../lib/model/course";

const { Option } = Select;

interface ITeacher {
  teacherId: number;
  name: string;
}

export default function AddCourseDetail(props: {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [form] = Form.useForm();
  const { current, setCurrent } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState(""); // value of input
  const [teacherDetails, setTeacherDetails] = useState<ITeacher[]>([]); // teacherId & name
  const [durationUnit, setDurationUnit] = useState<number>(); // store current selected 
 
  const [courseType, setCourseType] = useState<IType[]>([]);
  const [courseCode, setCourseCode] = useState();
  const [fileList, setFileList] = useState([]); // cover
  const [value, setValue] = useState();

  // test
  // console.log(teachers)

  // Search Teacher
  useEffect(() => {
    setLoading(true);
    if (!!searchValue) {
      getTeacherList(searchValue).then((res) => {
        const { teachers } = res;

        // set and store teachers Id & name
        const teacherValue: ITeacher[] = [];
        teachers.map((obj: { id: any; name: any }) => {
          return teacherValue.push({ teacherId: obj.id, name: obj.name });
        });
        console.log("teacherValue", teacherValue);

        // form.setFieldsValue({teacherId: teachers.id})
        setTeacherDetails(teacherValue);
        console.log("teacherDetails:", teacherDetails);

        setLoading(false);
      });
    }
  }, [searchValue]);

  // Get type
  useEffect(() => {
    getCourseType().then((res) => {
      setCourseType(res);
    });
    // Get course Code
    getCourseCode().then((res) => {
      form.setFieldsValue({ uid: res }); // Set course Code
      setCourseCode(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (value:any) => {
    // console.log("value:", value);
    const result:ICourse = {
      ...value,
      durationUnit: durationUnit,
      // startTime: value.startTime && format(value.startTime, 'yyy-MM-dd') 
      startTime:"2020-12-08"  // 问题：
    }
    // goes to next page
    if (!!result) {
      postCourse(result).then((res) => {
        console.log("res:",res)
      }).finally(() => {
        setCurrent(current + 1);
        message.success("success");
      })

     
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24} style={{ padding: "20px 0" }}>
          <Col span="8">
            <Form.Item
              label="Course Name"
              name="name"
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
                  name="teacherId"
                  rules={[{ required: true, message: "teacher is required!" }]}
                >
                  <Select
                    showSearch
                    notFoundContent={loading ? <Spin size="small" /> : null}
                    filterOption={false}
                    placeholder="search teacher"
                    onSearch={(value) => setSearchValue(value)}
                  >
                    {teacherDetails.map((obj: ITeacher) => {
                      return (
                        <Option key={obj.teacherId} value={obj.teacherId}>
                          {obj.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span="8">
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: "type is required!" }]}
                >
                  <Select
                    showSearch
                    mode="multiple"
                    allowClear
                    filterOption={false}
                  >
                    {courseType.map((obj) => {
                      return (
                        <Option key={obj.id} value={obj.id}>
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
                  name="uid"
                  rules={[
                    { required: true, message: "course code is required!" },
                  ]}
                >
                  <Input type="text" disabled={courseCode ? true : false} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={24} style={{ padding: "20px 0" }}>
          <Col span="8">
            <Form.Item label="Start Date" name="startTime">
            <DatePicker
                style={{ width: '100%' }}
                disabledDate={(current) => {
                  const today = getTime(new Date());
                  const date = current.valueOf();

                  return date < today;
                }}
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
              name="maxStudents"
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
              rules={[
                { required: true, message: "Duration must be greater than 0!" },
              ]}
            >
              <InputNumber
                addonAfter={
                  <Select defaultValue="month" onSelect={(el) => setDurationUnit(el)}>
                    {durations.map((el) => {
                      return (
                        <Option key={el.durationUnit} value={el.durationUnit}>
                          {el.duration}
                        </Option>
                      );
                    })}
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
              name="detail"
              rules={[
                { required: true, message: "description is required!" },
                {
                  type: "string",
                  min: 10,
                  max: 100,
                  message:
                    "Description length must between 100 - 1000 characters",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Course description"
                style={{ minHeight: "292px" }}
              />
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
                  <p
                    style={{ color: "	#808080", fontSize: "24px" }}
                    className="ant-upload-text"
                  >
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
